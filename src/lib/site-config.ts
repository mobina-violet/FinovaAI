//اطلاعات تماس و آدرس سایت.
export const siteConfig = {
  /** آدرس اصلی سایت، بدون اسلش آخر. موقع دیپلوی تو env بذار */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "support@finova.ai",
  /** شماره‌ی تماس کامل؛ مثال: "02112345678" (خالی باشه، کارت تلفن نمایش داده نمی‌شه) */
  phone: "",
  phoneDisplay: "",
  telegram: "https://t.me/finova_ai",
  telegramHandle: "@finova_ai",
  workingHours: "شنبه تا چهارشنبه، ۹ تا ۱۷",
  responseTime: "معمولاً کمتر از ۲۴ ساعت کاری",
} as const;
