"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingDown, TrendingUp } from "lucide-react";
import { createTransactionAction } from "@/app/dashboard/transactions/actions";
import type { TxState } from "@/app/dashboard/transactions/types";
import type { CategoryOptions } from "@/lib/business-config";
import type { Draft } from "@/lib/entry-parser";
import { toLatinDigits } from "@/lib/format";
import {
  FormAlert,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@/components/ui/form";

const initialState: TxState = {};

const withCommas = (digits: string) =>
  digits ? Number(digits).toLocaleString("en-US") : "";

type Props = {
  categories: CategoryOptions;
  initial?: Partial<Draft>;
  redirectTo?: string;
  onDone?: () => void;
  onCancel?: () => void;
};

export default function TransactionForm({
  categories,
  initial,
  redirectTo,
  onDone,
  onCancel,
}: Props) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createTransactionAction, initialState);
  const [type, setType] = useState<"INCOME" | "EXPENSE">(initial?.type ?? "INCOME");

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!state.savedAt) return;
    if (redirectTo) router.push(redirectTo);
    onDoneRef.current?.();
  }, [state.savedAt, redirectTo, router]);

  const toggle = (value: "INCOME" | "EXPENSE", active: string, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setType(value)}
      aria-pressed={type === value}
      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm transition-colors ${
        type === value ? active : "text-muted hover:text-fg"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <form action={action} noValidate className="space-y-5">
      {initial?.hints && initial.hints.length > 0 && (
        <ul className="space-y-1 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-xs leading-6 text-gold-light">
          {initial.hints.map((h) => (
            <li key={h}>• {h}</li>
          ))}
        </ul>
      )}

      <FormAlert message={state.errors?.type} />

      <div>
        <span className="mb-2 block text-sm text-fg/80">نوع تراکنش</span>
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-black/25 p-1">
          {toggle("INCOME", "bg-brand/20 text-brand", "درآمد", <TrendingUp size={16} />)}
          {toggle("EXPENSE", "bg-danger/15 text-danger", "هزینه", <TrendingDown size={16} />)}
        </div>
        <input type="hidden" name="type" value={type} />
      </div>

      <TextField
        label="مبلغ"
        name="amount"
        ltr
        suffix="تومان"
        inputMode="numeric"
        placeholder="0"
        autoComplete="off"
        defaultValue={state.values?.amount ?? withCommas(initial?.amount ?? "")}
        error={state.errors?.amount}
        onChange={(e) => {
          const digits = toLatinDigits(e.target.value).replace(/\D/g, "").slice(0, 15);
          e.target.value = withCommas(digits);
        }}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="تعداد (اختیاری)"
          name="quantity"
          ltr
          inputMode="numeric"
          placeholder="مثلاً ۱۲"
          autoComplete="off"
          defaultValue={state.values?.quantity ?? initial?.quantity ?? ""}
          error={state.errors?.quantity}
        />
        <div>
          <TextField
            label="دسته‌بندی"
            name="category"
            list="tx-categories"
            placeholder="انتخاب یا نوشتن دسته"
            autoComplete="off"
            defaultValue={state.values?.category ?? initial?.category ?? ""}
            error={state.errors?.category}
          />
          <datalist id="tx-categories">
            {categories[type].map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
      </div>

      <TextAreaField
        label="توضیحات (اختیاری)"
        name="description"
        rows={2}
        placeholder="مثلاً: فروش رمان به مشتری حضوری"
        defaultValue={state.values?.description ?? initial?.description ?? ""}
        error={state.errors?.description}
      />

      <div className="flex gap-3">
        <SubmitButton pending={pending}>ثبت تراکنش</SubmitButton>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-12 shrink-0 rounded-xl border border-white/10 px-5 text-sm text-fg/80 transition-colors hover:bg-white/5"
          >
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}