/**
 * قرارداد: sendOtpSms(phone, code) باید پیامک را بفرستد و اگر نشد throw کند.
 * بقیه‌ی پروژه فقط همین تابع را صدا می‌زند.
 * این تنها فایلی است که با سرویس پیامک حرف می‌زند.
 */

export async function sendOtpSms(phone: string, code: string): Promise<void> {
  const provider = clean(process.env.SMS_PROVIDER) ?? "console";

  switch (provider) {
    case "console":
      // روی سرور واقعی فقط وقتی مجاز است که دمو را عمداً روشن کرده باشی
      if (process.env.NODE_ENV === "production" && !isDemoOtp()) {
        throw new Error(
          "SMS_PROVIDER=console روی پروداکشن فقط با DEMO_OTP=true مجاز است",
        );
      }
      console.log(`\n[OTP DEMO] ${phone} → ${code}\n`);
      return;

    case "kavenegar":
      return sendWithKavenegar(phone, code);

    default:
      throw new Error(`SMS_PROVIDER ناشناخته است: ${provider}`);
  }
}

/**
 * حالت دمو فقط با DEMO_OTP=true روشن می‌شود (پیش‌فرض: خاموش).
 * وقتی روشن باشد، کد تأییدِ هر شماره روی صفحه نشان داده می‌شود؛
 * یعنی هر کسی با دانستن شماره می‌تواند وارد آن حساب شود. فقط برای نمایش آزمایشی.
 */
export function isDemoOtp(): boolean {
  return clean(process.env.DEMO_OTP)?.toLowerCase() === "true";
}

/** فاصله و کوتیشن‌های اضافه‌ی مقدارهای .env را پاک می‌کند */
function clean(value: string | undefined): string | undefined {
  const v = value?.trim().replace(/^["']|["']$/g, "").trim();
  return v ? v : undefined;
}

const KAVENEGAR_HINTS: Record<number, string> = {
  403: "API Key نامعتبر است",
  404: "معمولاً API Key یا نام قالب اشتباه وارد شده",
  411: "شماره‌ی گیرنده نامعتبر است",
  416: "IP سرور در لیست IPهای مجاز پنل نیست",
  418: "اعتبار حساب کافی نیست",
  424: "قالب پیدا نشد یا هنوز تأیید نشده",
};

async function sendWithKavenegar(phone: string, code: string) {
  const apiKey = clean(process.env.KAVENEGAR_API_KEY);
  const template = clean(process.env.KAVENEGAR_TEMPLATE);
  if (!apiKey || !template) {
    throw new Error(
      "KAVENEGAR_API_KEY یا KAVENEGAR_TEMPLATE در .env تنظیم نشده است",
    );
  }

  const url = new URL(
    `https://api.kavenegar.com/v1/${encodeURIComponent(apiKey)}/verify/lookup.json`,
  );
  url.searchParams.set("receptor", phone);
  url.searchParams.set("token", code);
  url.searchParams.set("template", template);

  const res = await fetch(url, { cache: "no-store" });
  const data = (await res.json().catch(() => null)) as
    | { return?: { status?: number; message?: string } }
    | null;

  const status = data?.return?.status;
  if (!res.ok || status !== 200) {
    const hint = status ? KAVENEGAR_HINTS[status] : undefined;
    throw new Error(
      `Kavenegar [${status ?? `HTTP ${res.status}`}] ${data?.return?.message ?? ""}` +
        (hint ? ` | احتمالاً: ${hint}` : ""),
    );
  }
}