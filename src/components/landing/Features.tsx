import { Brain, Database, ShieldCheck, Clock } from "lucide-react";

const items = [
  {
    icon: Brain,
    title: "تحلیل هوشمند با AI",
    text: "دریافت گزارش‌های دقیق، پیش‌بینی روندها و پیشنهادهای کاربردی بر اساس داده‌های واقعی شما.",
  },
  {
    icon: Database,
    title: "اتصال به داده‌های واقعی",
    text: "امکان اتصال به سیستم‌های حسابداری و بانکی و دریافت خودکار اطلاعات مالی کسب‌وکار شما.",
  },
  {
    icon: ShieldCheck,
    title: "امنیت و اعتماد",
    text: "با استفاده از جدیدترین استانداردهای امنیتی، اطلاعات شما همیشه محفوظ می‌مانند.",
  },
  {
    icon: Clock,
    title: "مدیریت ساده و سریع",
    text: "ثبت درآمدها، هزینه‌ها، بدهی‌ها و دریافت گزارش‌ها در چند کلیک، بدون نیاز به دانش حسابداری.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs text-brand">ویژگی‌های اصلی</p>
          <h2 className="mt-3 text-3xl font-bold">
            چرا <span dir="ltr" className="inline-block">Finova <span className="text-brand">AI</span></span>؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
            ما با ترکیب قدرت هوش مصنوعی و داده‌های واقعی کسب‌وکار شما، به شما کمک می‌کنیم تا
            همیشه یک قدم جلوتر باشید.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-5 rounded-2xl border border-border bg-surface p-6 transition hover:border-brand/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Icon size={26} />
              </div>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}