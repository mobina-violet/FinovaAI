"use client";

import { useActionState } from "react";
import { BUSINESS_CATEGORIES } from "@/lib/business-config";
import { SelectField, SubmitButton, TextField } from "@/components/ui/form";
import { createBusinessAction } from "./actions";
import type { OnboardingState } from "./types";

const initialState: OnboardingState = {};

export default function OnboardingForm() {
  const [state, action, pending] = useActionState(createBusinessAction, initialState);

  return (
    <form action={action} noValidate className="mt-8 space-y-5">
      <TextField
        label="نام شما"
        name="ownerName"
        placeholder="مثلاً: مبینا احمدی"
        autoComplete="name"
        defaultValue={state.values?.ownerName}
        error={state.errors?.ownerName}
      />
      <TextField
        label="نام کسب‌وکار"
        name="name"
        placeholder="مثلاً: کتاب‌فروشی پارسا"
        defaultValue={state.values?.name}
        error={state.errors?.name}
      />
      <SelectField
        label="نوع کسب‌وکار"
        name="category"
        options={BUSINESS_CATEGORIES}
        defaultValue={state.values?.category}
        error={state.errors?.category}
      />
      <SubmitButton pending={pending}>ورود به داشبورد</SubmitButton>
    </form>
  );
}