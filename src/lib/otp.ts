/**منطق امنیتی اینجاست. کد هش ذخیره می‌شه (با HMAC و OTP_SECRET)، پس اگه دیتابیس لو بره کدها خوانا نیستن. */
import { createHmac, randomInt, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOtpSms } from "@/lib/sms";

const OTP_TTL_MS = 2 * 60 * 1000; // اعتبار کد: ۲ دقیقه
const RESEND_COOLDOWN_MS = 60 * 1000; // فاصله‌ی دو ارسال: ۱ دقیقه
const MAX_ATTEMPTS = 5; // تلاش اشتباه مجاز برای هر کد
const MAX_SENDS_PER_HOUR = 5; // حداکثر ارسال در ساعت برای هر شماره
const HOUR_MS = 60 * 60 * 1000;

const fa = (n: number) => n.toLocaleString("fa-IR");

type RequestResult =
  | { ok: true; cooldownSeconds: number }
  | { ok: false; error: string };

type VerifyResult = { ok: true } | { ok: false; error: string };

function hashCode(phone: string, code: string): string {
  const secret = process.env.OTP_SECRET;
  if (!secret) throw new Error("OTP_SECRET در .env تنظیم نشده است");
  return createHmac("sha256", secret).update(`${phone}:${code}`).digest("hex");
}

export async function requestOtp(phone: string): Promise<RequestResult> {
  const now = Date.now();

  const recent = await prisma.otpCode.findMany({
    where: { phone, createdAt: { gt: new Date(now - HOUR_MS) } },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });

  const last = recent[0];
  if (last) {
    const wait = Math.ceil(
      (last.createdAt.getTime() + RESEND_COOLDOWN_MS - now) / 1000,
    );
    if (wait > 0) {
      return {
        ok: false,
        error: `برای ارسال مجدد ${fa(wait)} ثانیه صبر کنید.`,
      };
    }
  }
  if (recent.length >= MAX_SENDS_PER_HOUR) {
    return {
      ok: false,
      error:
        "تعداد درخواست‌ها بیش از حد مجاز است. بعد از مدتی دوباره تلاش کنید.",
    };
  }

  const code = String(randomInt(100000, 1000000)); // رمزنگارانه امن (نه Math.random)

  // کدهای قبلی باطل می‌شن؛ فقط آخرین کد معتبره
  const record = await prisma.$transaction(async (tx) => {
    await tx.otpCode.updateMany({
      where: { phone, usedAt: null },
      data: { usedAt: new Date() },
    });
    return tx.otpCode.create({
      data: {
        phone,
        codeHash: hashCode(phone, code),
        expiresAt: new Date(now + OTP_TTL_MS),
      },
      select: { id: true },
    });
  });

  try {
    await sendOtpSms(phone, code);
  } catch (e) {
    console.error("[OTP] ارسال پیامک ناموفق بود:", e);
    await prisma.otpCode.delete({ where: { id: record.id } }).catch(() => {});
    return {
      ok: false,
      error: "ارسال پیامک ناموفق بود. چند لحظه بعد دوباره تلاش کنید.",
    };
  }

  return { ok: true, cooldownSeconds: RESEND_COOLDOWN_MS / 1000 };
}

export async function verifyOtp(
  phone: string,
  code: string,
): Promise<VerifyResult> {
  const record = await prisma.otpCode.findFirst({
    where: { phone, usedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return { ok: false, error: "کد منقضی شده است. کد جدید دریافت کنید." };
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    return {
      ok: false,
      error: "تعداد تلاش‌ها بیش از حد مجاز است. کد جدید دریافت کنید.",
    };
  }

  const expected = Buffer.from(record.codeHash, "hex");
  const actual = Buffer.from(hashCode(phone, code), "hex");
  const match =
    expected.length === actual.length && timingSafeEqual(expected, actual);

  if (!match) {
    await prisma.otpCode.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    const left = MAX_ATTEMPTS - record.attempts - 1;
    return {
      ok: false,
      error:
        left > 0
          ? `کد اشتباه است. ${fa(left)} تلاش دیگر باقی مانده.`
          : "کد اشتباه است. کد جدید دریافت کنید.",
    };
  }

  // مصرف اتمیک: جلوی استفاده‌ی دوباره از یک کد با دو درخواست همزمان رو می‌گیره
  const consumed = await prisma.otpCode.updateMany({
    where: { id: record.id, usedAt: null },
    data: { usedAt: new Date() },
  });
  if (consumed.count !== 1) {
    return { ok: false, error: "این کد قبلاً استفاده شده است." };
  }

  return { ok: true };
}
