import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronLeft,
  Sparkles,
  Target,
  Heart,
  Shield,
  Lightbulb,
  Users,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "درباره ما | FinovaAI",
  description:
    "داستان FinovaAI؛ دستیار مالی هوشمندی که برای کسب‌وکارهای کوچک ایرانی ساخته شده تا مدیریت پول ساده‌تر، دقیق‌تر و هوشمندتر باشد.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Lightbulb,
    title: "سادگی هوشمند",
    desc: "پیچیدگی حسابداری را حذف کردیم. فقط آنچه واقعاً لازم داری را می‌بینی.",
  },
  {
    icon: Shield,
    title: "اعتماد و امنیت",
    desc: "داده‌های مالی‌ات روی سرورهای محافظت‌شده نگهداری می‌شود و فقط خودت به آن‌ها دسترسی داری.",
  },
  {
    icon: Heart,
    title: "طراحی برای کسب‌وکارهای کوچک",
    desc: "از روز اول برای صاحب‌کار، فروشنده و فریلنسر ساخته شدیم؛ نه برای شرکت‌های بزرگ.",
  },
  {
    icon: Sparkles,
    title: "هوش مصنوعی کاربردی",
    desc: "AI فقط برای نمایش نیست. هشدار می‌دهد، پیشنهاد می‌دهد و کمک می‌کند تصمیم بگیری.",
  },
];

const timeline = [
  {
    step: "۰۱",
    title: "شروع از یک درد واقعی",
    text: "بسیاری از کسب‌وکارهای کوچک یا دفتر حساب ندارند، یا در اکسل گم می‌شوند. ما از همین نقطه شروع کردیم.",
  },
  {
    step: "۰۲",
    title: "ساخت دستیار، نه نرم‌افزار سنگین",
    text: "به‌جای یک سیستم حسابداری پیچیده، یک دستیار سبک و هوشمند ساختیم که در چند دقیقه راه می‌افتد.",
  },
  {
    step: "۰۳",
    title: "ترکیب داده + هوش مصنوعی",
    text: "ثبت درآمد و هزینه به زبان ساده، مدیریت چک و گزارش‌های لحظه‌ای با کمک AI؛ همه در یک جا.",
  },
  {
    step: "۰۴",
    title: "ادامهٔ راه با تو",
    text: "FinovaAI هنوز در حال رشد است. بازخوردهای تو مسیر بعدی ما را مشخص می‌کند.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="relative isolate">
        <AmbientBackground />

        <div className="mx-auto max-w-5xl px-4 pb-24 pt-28">
          {/* مسیر صفحه */}
          <nav
            aria-label="مسیر صفحه"
            className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-fg">
              خانه
            </Link>
            <ChevronLeft size={12} />
            <span className="text-fg/80">درباره ما</span>
          </nav>

          {/* Hero */}
          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-medium tracking-wide text-gold">
              داستان ما
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-[1.55] sm:text-4xl">
              ما برای کسانی می‌سازیم که{" "}
              <span className="text-brand">وقت حسابداری ندارند</span>
              ، اما به پول‌شان اهمیت می‌دهند.
            </h1>
            <p className="mt-5 text-base leading-8 text-muted sm:text-[17px]">
              FinovaAI یک دستیار مالی هوشمند است که به کسب‌وکارهای کوچک کمک
              می‌کند درآمد و هزینه‌شان را ساده ثبت کنند، چک‌ها را مدیریت کنند و
              با کمک هوش مصنوعی تصمیم‌های دقیق‌تری بگیرند — بدون دفتر حساب پیچیده
              و بدون دردسر.
            </p>
          </header>

          {/* کارت مأموریت */}
          <section className="mt-14 grid gap-5 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6 sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <Target size={22} />
              </div>
              <h2 className="text-lg font-bold">مأموریت ما</h2>
              <p className="mt-3 text-sm leading-7 text-fg/75">
                ساده کردن مدیریت مالی برای صاحبان کسب‌وکارهای کوچک، تا بتوانند
                بیشتر روی رشد کارشان تمرکز کنند و کمتر درگیر عدد و رقم شوند.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Users size={22} />
              </div>
              <h2 className="text-lg font-bold">چشم‌انداز ما</h2>
              <p className="mt-3 text-sm leading-7 text-fg/75">
                تبدیل شدن به دستیار مالی پیش‌فرض هر کسب‌وکار کوچک ایرانی؛ جایی
                که داده، هوش مصنوعی و سادگی در کنار هم کار می‌کنند.
              </p>
            </div>
          </section>

          {/* ارزش‌ها */}
          <section className="mt-16">
            <div className="mb-8">
              <p className="text-xs text-gold">ارزش‌هایی که روی آن‌ها ایستاده‌ایم</p>
              <h2 className="mt-2 text-2xl font-bold">چیزی که برایمان مهم است</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group rounded-2xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:border-brand/30 hover:bg-surface">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand/20">
                    <v.icon size={20} />
                  </div>
                  <h3 className="font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* مسیر شکل‌گیری */}
          <section className="mt-16">
            <div className="mb-8">
              <p className="text-xs text-gold">مسیر شکل‌گیری</p>
              <h2 className="mt-2 text-2xl font-bold">از یک ایده تا دستیار تو</h2>
            </div>

            <div className="relative space-y-0">
              {/* خط عمودی */}
              <div className="absolute right-[1.15rem] top-3 bottom-3 w-px bg-gradient-to-b from-brand/60 via-gold/40 to-transparent sm:right-[1.35rem]" />

              {timeline.map((item) => (
                <div
                  key={item.step}
                  className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-bg text-xs font-bold text-brand sm:h-11 sm:w-11 sm:text-sm">
                    {item.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-fg">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA نهایی */}
          <section className="mt-16 overflow-hidden rounded-2xl border border-border">
            <div className="relative bg-gradient-to-l from-forest/40 via-surface to-surface px-6 py-10 sm:px-10 sm:py-12">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-brand/15 blur-3xl" />

              <div className="relative max-w-lg">
                <h2 className="text-2xl font-bold leading-snug">
                  آماده‌ای کنترل مالی کسب‌وکارت را به دست بگیری؟
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  همین حالا ثبت‌نام کن و در کمتر از یک دقیقه اولین تراکنشت را
                  ثبت کن. نیازی به دانش حسابداری نیست.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/auth"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-gold to-amber-400 px-5 py-2.5 text-sm font-bold text-black shadow-[0_4px_20px_rgba(198,161,91,0.3)] transition-all hover:scale-[1.03]">
                    شروع رایگان
                    <ArrowLeft size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-5 py-2.5 text-sm text-fg/90 transition-colors hover:border-brand/40 hover:bg-white/10">
                    تماس با ما
                  </Link>
                </div>
                <p className="mt-4 text-xs text-muted">
                  سؤال داری؟ به{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-gold hover:underline">
                    {siteConfig.email}
                  </a>{" "}
                  پیام بده.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}