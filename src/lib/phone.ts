const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC = "٠١٢٣٤٥٦٧٨٩";

/** اعداد فارسی و عربی رو به انگلیسی تبدیل می‌کنه */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(PERSIAN.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC.indexOf(d)));
}

/** هر شکلی از موبایل ایرانی (0912..., +98912..., ۰۹۱۲...) رو به 09xxxxxxxxx تبدیل می‌کنه، یا null */
export function parseIranPhone(raw: string): string | null {
  let v = toLatinDigits(raw).replace(/[\s\-()]/g, "");

  if (v.startsWith("+98")) v = v.slice(3);
  else if (v.startsWith("0098")) v = v.slice(4);
  else if (/^98\d{10}$/.test(v)) v = v.slice(2);
  else if (v.startsWith("0")) v = v.slice(1);

  return /^9\d{9}$/.test(v) ? `0${v}` : null;
}

/** کد ۶ رقمی OTP یا null */
export function parseOtpCode(raw: string): string | null {
  const v = toLatinDigits(raw).replace(/\s/g, "");
  return /^\d{6}$/.test(v) ? v : null;
}