"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, ShieldCheck, Smartphone } from "lucide-react";
import { toLatinDigits } from "@/lib/phone";
import { sendOtpAction, verifyOtpAction } from "./actions";
import type { SendState, VerifyState } from "./types";

const fa = new Intl.NumberFormat("fa-IR");

const initialSend: SendState = {};
const initialVerify: VerifyState = {};

const inputClass =
  "h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-fg outline-none transition placeholder:text-muted/50 focus:border-gold/50 focus:bg-black/40 focus:ring-4 focus:ring-gold/10";

function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold shadow-[0_0_30px_rgba(198,161,91,0.15)]">
      {children}
    </div>
  );
}

function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold text-sm font-semibold text-black shadow-[0_8px_24px_rgba(198,161,91,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

function ResendButton({
  seconds,
  phone,
  action,
}: {
  seconds: number;
  phone: string;
  action: (formData: FormData) => void;
}) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  if (left > 0) {
    return (
      <p className="text-center text-xs text-muted">
        ارسال مجدد کد تا {fa.format(left)} ثانیه دیگر
      </p>
    );
  }

  return (
    <form action={action} className="text-center">
      <input type="hidden" name="phone" value={phone} />
      <button
        type="submit"
        className="text-xs text-gold transition-colors hover:text-gold-light"
      >
        ارسال مجدد کد
      </button>
    </form>
  );
}

export default function AuthFlow() {
  const [send, sendAction, sending] = useActionState(sendOtpAction, initialSend);
  const [verify, verifyAction, verifying] = useActionState(
    verifyOtpAction,
    initialVerify
  );
  const [dismissed, setDismissed] = useState<number | null>(null);

  const codeStep = Boolean(send.ok) && send.nonce !== dismissed;

  if (!codeStep) {
    return (
      <div>
        <StepIcon>
          <Smartphone size={22} />
        </StepIcon>
        <h1 className="text-xl font-semibold">ورود یا ثبت‌نام</h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          شماره موبایل خود را وارد کنید تا کد تأیید برایتان ارسال شود.
        </p>

        <form action={sendAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="phone" className="sr-only">
              شماره موبایل
            </label>
            <div className="relative">
              <Smartphone
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                autoFocus
                defaultValue={send.phone}
                placeholder="0912 345 6789"
                aria-invalid={Boolean(send.error)}
                onChange={(e) => {
                  e.target.value = toLatinDigits(e.target.value);
                }}
                className={`${inputClass} pl-11 text-left tracking-wide`}
              />
            </div>
            {send.error && (
              <p className="mt-2 text-xs text-danger">{send.error}</p>
            )}
          </div>

          <SubmitButton pending={sending}>دریافت کد تأیید</SubmitButton>
        </form>

        <p className="mt-6 text-center text-xs leading-6 text-muted">
          ادامه دادن به معنی پذیرش قوانین و مقررات است.
        </p>
      </div>
    );
  }

  return (
    <div>
      <StepIcon>
        <ShieldCheck size={22} />
      </StepIcon>
      <h1 className="text-xl font-semibold">کد تأیید را وارد کنید</h1>
      <p className="mt-2 text-sm leading-7 text-muted">
        کد ۶ رقمی به{" "}
        <span dir="ltr" className="text-fg">
          {send.phone}
        </span>{" "}
        ارسال شد.{" "}
        <button
          type="button"
          onClick={() => setDismissed(send.nonce ?? null)}
          className="text-gold transition-colors hover:text-gold-light"
        >
          ویرایش شماره
        </button>
      </p>

      <form action={verifyAction} className="mt-8 space-y-4">
        <input type="hidden" name="phone" value={send.phone ?? ""} />
        <div>
          <label htmlFor="code" className="sr-only">
            کد تأیید
          </label>
          <input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            dir="ltr"
            autoFocus
            maxLength={6}
            placeholder="••••••"
            aria-invalid={Boolean(verify.error)}
            onChange={(e) => {
              const digits = toLatinDigits(e.target.value)
                .replace(/\D/g, "")
                .slice(0, 6);
              e.target.value = digits;
              if (digits.length === 6 && !verifying) {
                e.currentTarget.form?.requestSubmit();
              }
            }}
            className={`${inputClass} text-center text-2xl tracking-[0.6em]`}
          />
          {(verify.error ?? send.error) && (
            <p className="mt-2 text-xs text-danger">
              {verify.error ?? send.error}
            </p>
          )}
        </div>

        <SubmitButton pending={verifying}>تأیید و ادامه</SubmitButton>
      </form>

      <div className="mt-6">
        <ResendButton
          key={send.nonce}
          seconds={send.cooldown ?? 60}
          phone={send.phone ?? ""}
          action={sendAction}
        />
      </div>

      {process.env.NODE_ENV !== "production" && (
        <p className="mt-6 text-center text-[11px] text-muted/70">
          حالت توسعه: کد در ترمینال سرور چاپ می‌شود.
        </p>
      )}
    </div>
  );
}