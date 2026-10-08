"use client";

import { useActionState, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { previewEntryAction } from "@/app/dashboard/actions";
import type { PreviewState } from "@/app/dashboard/types";
import type { CategoryOptions } from "@/lib/business-config";
import TransactionForm from "./TransactionForm";

const examples = [
  "امروز ۱۲ تا کتاب فروختم، ۳ میلیون تومان",
  "اجاره‌ی مغازه ۵ میلیون پرداخت کردم",
  "خرید کتاب از ناشر ۲ میلیون",
];

const initialState: PreviewState = {};

export default function QuickEntry({ categories }: { categories: CategoryOptions }) {
  const [state, action, pending] = useActionState(previewEntryAction, initialState);
  const [dismissed, setDismissed] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showDraft = Boolean(state.draft) && state.nonce !== dismissed;

  return (
    <section className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div className="pointer-events-none absolute -top-20 left-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 text-gold">
            <Sparkles size={16} />
          </span>
          ثبت سریع با جمله
        </h2>
        <p className="mt-1.5 text-xs leading-6 text-muted">
          هر اتفاق مالی را همان‌طور که می‌گویید بنویسید؛ پیش‌نویس را می‌بینید و بعد از تأیید ذخیره می‌شود.
        </p>

        {!showDraft && (
          <>
            <form action={action} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                ref={inputRef}
                name="text"
                placeholder="مثلاً: امروز ۱۲ تا کتاب فروختم، ۳ میلیون تومان"
                autoComplete="off"
                maxLength={300}
                className="h-12 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-fg outline-none transition placeholder:text-muted/50 focus:border-gold/50 focus:ring-4 focus:ring-gold/10"
              />
              <button
                type="submit"
                disabled={pending}
                className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold px-6 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(198,161,91,0.25)] transition hover:brightness-105 disabled:opacity-60"
              >
                {pending && <Loader2 size={16} className="animate-spin" />}
                بررسی و ثبت
              </button>
            </form>

            {state.error && <p className="mt-2 text-xs text-danger">{state.error}</p>}

            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.value = ex;
                      inputRef.current.focus();
                    }
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold/30 hover:text-gold"
                >
                  {ex}
                </button>
              ))}
            </div>
          </>
        )}

        {showDraft && state.draft && (
          <div className="mt-5 border-t border-white/10 pt-5">
            <TransactionForm
              key={state.nonce}
              categories={categories}
              initial={state.draft}
              onDone={() => setDismissed(state.nonce ?? null)}
              onCancel={() => setDismissed(state.nonce ?? null)}
            />
          </div>
        )}
      </div>
    </section>
  );
}