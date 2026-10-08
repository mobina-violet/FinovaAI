export const BUSINESS_CATEGORIES = [
  "کتاب‌فروشی",
  "خرده‌فروشی",
  "رستوران و کافه",
  "خدمات",
  "تولیدی",
  "فروشگاه آنلاین",
  "سایر",
] as const;

export type CategoryOptions = { INCOME: string[]; EXPENSE: string[] };

/** دسته‌بندی‌های پیش‌فرضی که موقع ساخت کسب‌وکار ساخته می‌شن */
export const DEFAULT_CATEGORIES: { name: string; type: "INCOME" | "EXPENSE" }[] = [
  { name: "فروش", type: "INCOME" },
  { name: "سایر درآمدها", type: "INCOME" },
  { name: "خرید کالا", type: "EXPENSE" },
  { name: "اجاره", type: "EXPENSE" },
  { name: "حقوق", type: "EXPENSE" },
  { name: "قبوض", type: "EXPENSE" },
  { name: "حمل‌ونقل", type: "EXPENSE" },
  { name: "تبلیغات", type: "EXPENSE" },
  { name: "سایر هزینه‌ها", type: "EXPENSE" },
];