const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC = "٠١٢٣٤٥٦٧٨٩";

export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(PERSIAN.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC.indexOf(d)));
}

/** مبلغ تومانی (با کاما یا اعداد فارسی) به bigint مثبت، یا null */
export function parseAmount(raw: string): bigint | null {
  const cleaned = toLatinDigits(raw).replace(/[,\s٬،]/g, "");
  if (!/^\d{1,15}$/.test(cleaned)) return null;
  const value = BigInt(cleaned);
  return value > BigInt(0) ? value : null;
}

const numberFmt = new Intl.NumberFormat("fa-IR");
const dateFmt = new Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const monthFmt = new Intl.DateTimeFormat("fa-IR", { month: "short" });

export const formatNumber = (v: number | bigint) => numberFmt.format(v);
export const formatDate = (d: Date) => dateFmt.format(d);
export const formatMonthShort = (d: Date) => monthFmt.format(d);