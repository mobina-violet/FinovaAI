import { toLatinDigits } from "@/lib/format";
//حلیل‌گر جمله‌ی «ثبت سریع». بعداً با مدل زبانی عوض می‌شه، ولی خروجی (Draft) همین می‌مونه.
export type Draft = {
  type: "INCOME" | "EXPENSE";
  amount: string; // فقط رقم، بدون کاما
  quantity: string;
  category: string;
  description: string;
  hints: string[];
};

const INCOME_WORDS = [
  "فروختم",
  "فروش",
  "درآمد",
  "دریافت",
  "گرفتم",
  "واریز",
  "وصول",
];
const EXPENSE_WORDS = [
  "خریدم",
  "خرید",
  "هزینه",
  "پرداخت",
  "دادم",
  "اجاره",
  "حقوق",
  "قبض",
  "شارژ",
  "مالیات",
  "تبلیغ",
];

const CATEGORY_RULES: {
  words: string[];
  name: string;
  type: "INCOME" | "EXPENSE";
}[] = [
  { words: ["اجاره"], name: "اجاره", type: "EXPENSE" },
  { words: ["حقوق", "دستمزد"], name: "حقوق", type: "EXPENSE" },
  {
    words: ["قبض", "برق", "گاز", "اینترنت", "تلفن"],
    name: "قبوض",
    type: "EXPENSE",
  },
  {
    words: ["حمل", "ارسال", "پست", "تاکسی", "اسنپ"],
    name: "حمل‌ونقل",
    type: "EXPENSE",
  },
  { words: ["تبلیغ"], name: "تبلیغات", type: "EXPENSE" },
  { words: ["خرید", "خریدم"], name: "خرید کالا", type: "EXPENSE" },
  { words: ["فروش", "فروختم"], name: "فروش", type: "INCOME" },
];

const SCALE: Record<string, number> = {
  میلیارد: 1e9,
  میلیون: 1e6,
  هزار: 1e3,
};

function firstIndex(text: string, words: string[]): number {
  const found = words.map((w) => text.indexOf(w)).filter((i) => i >= 0);
  return found.length ? Math.min(...found) : -1;
}

function extractAmount(
  text: string,
  skip: [number, number] | null,
): number | null {
  const re = /(\d+(?:\.\d+)?)\s*(میلیارد|میلیون|هزار)?\s*(تومان|تومن)?/g;
  const candidates: { value: number; explicit: boolean }[] = [];

  for (const m of text.matchAll(re)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (skip && start < skip[1] && end > skip[0]) continue; // این عدد «تعداد» است
    const value = Math.round(Number(m[1]) * (m[2] ? SCALE[m[2]] : 1));
    candidates.push({ value, explicit: Boolean(m[2] || m[3]) });
  }

  const explicit = candidates.find((c) => c.explicit);
  if (explicit) return explicit.value;

  const largest = candidates
    .filter((c) => c.value >= 1000)
    .sort((a, b) => b.value - a.value)[0];
  return largest?.value ?? null;
}

export function parseEntry(raw: string): Draft {
  const description = raw.trim();
  const text = toLatinDigits(raw)
    .replace(/[,٬،]/g, " ")
    .replace(/٫/g, ".")
    .trim();
  const hints: string[] = [];

  // نوع
  const inc = firstIndex(text, INCOME_WORDS);
  const exp = firstIndex(text, EXPENSE_WORDS);
  let type: "INCOME" | "EXPENSE" = "INCOME";
  if (inc === -1 && exp === -1) {
    hints.push("نوع تراکنش را تشخیص ندادم؛ لطفاً بررسی کنید.");
  } else if (inc !== -1 && exp !== -1) {
    type = inc < exp ? "INCOME" : "EXPENSE";
    hints.push("هم نشانه‌ی درآمد و هم هزینه بود؛ نوع تراکنش را بررسی کنید.");
  } else {
    type = inc !== -1 ? "INCOME" : "EXPENSE";
  }

  // تعداد
  const qty = text.match(
    /(\d+)\s*(?:تا|عدد|جلد|بسته|کیلو|متر|لیتر|دست)(?![\u0600-\u06FF])/,
  );
  const quantity = qty ? qty[1] : "";
  const skip: [number, number] | null =
    qty && qty.index !== undefined
      ? [qty.index, qty.index + qty[0].length]
      : null;

  // مبلغ
  const amount = extractAmount(text, skip);
  if (amount === null) hints.push("مبلغ را تشخیص ندادم؛ لطفاً وارد کنید.");

  // دسته
  const rule = CATEGORY_RULES.find(
    (r) => r.type === type && r.words.some((w) => text.includes(w)),
  );

  return {
    type,
    amount: amount === null ? "" : String(amount),
    quantity,
    category: rule?.name ?? "",
    description,
    hints,
  };
}
