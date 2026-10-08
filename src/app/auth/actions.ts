"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requestOtp, verifyOtp } from "@/lib/otp";
import { parseIranPhone, parseOtpCode } from "@/lib/phone";
import { createSession, destroySession } from "@/lib/session";
import type { SendState, VerifyState } from "./types";

export async function sendOtpAction(
  prev: SendState,
  formData: FormData
): Promise<SendState> {
  const phone = parseIranPhone(String(formData.get("phone") ?? ""));
  if (!phone) {
    return { ...prev, error: "شماره موبایل معتبر نیست. مثال: ۰۹۱۲۱۲۳۴۵۶۷" };
  }

  const result = await requestOtp(phone);
  if (!result.ok) return { ...prev, error: result.error };

  return {
    ok: true,
    phone,
    nonce: Date.now(),
    cooldown: result.cooldownSeconds,
  };
}

export async function verifyOtpAction(
  _prev: VerifyState,
  formData: FormData
): Promise<VerifyState> {
  const phone = parseIranPhone(String(formData.get("phone") ?? ""));
  const code = parseOtpCode(String(formData.get("code") ?? ""));

  if (!phone) return { error: "شماره موبایل معتبر نیست. صفحه را رفرش کنید." };
  if (!code) return { error: "کد تأیید باید ۶ رقم باشد." };

  const result = await verifyOtp(phone, code);
  if (!result.ok) return { error: result.error };

  // اگه کاربر بود وارد می‌شه، وگرنه همین‌جا ثبت‌نام می‌شه
  const user = await prisma.user.upsert({
    where: { phone },
    update: {},
    create: { phone },
    select: { id: true },
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
