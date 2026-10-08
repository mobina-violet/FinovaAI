import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import DashboardVisual from "@/components/DashboardVisual";

const highlights = [
  "گزارش سود و زیان",
  "یادآوری چک‌ها",
  "دستیار هوشمند",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-border"
    >
      {/* پس‌زمینه */}
      <div className="absolute inset-0 -z-30 bg-bg" />

      {/* نور سبز */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_80%_40%,rgba(17,82,52,0.35),transparent_60%)]" />

      {/* سایه بالای صفحه */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      {/* محو شدن پایین */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto flex min-h-[min(100svh,760px)] max-w-7xl items-center px-4 pb-20 pt-32">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* متن */}
          <div className="order-2 w-full max-w-xl lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3.5 py-1.5 text-xs text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              دستیار مالی هوشمند برای کسب‌وکارها
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-[1.6] sm:text-4xl lg:text-[2.5rem]">
              داده‌های مالی شما،
              <span className="block bg-gradient-to-l from-gold-light to-gold bg-clip-text text-transparent">
                تصمیم‌های هوشمند
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-8 text-muted sm:text-base">
              با Finova AI تمام اطلاعات مالی کسب‌وکار خود را در یک پلتفرم
              مدرن و هوشمند مدیریت کنید؛ از ثبت درآمد و هزینه‌ها تا تحلیل
              سود و زیان. همه چیز با کمک هوش مصنوعی در اختیار شماست.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-gold-light"
              >
                شروع کنید
                <ArrowLeft size={17} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm text-fg backdrop-blur transition-colors duration-200 hover:bg-white/10"
              >
                مشاهده ویژگی‌ها
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-fg/70">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <Check size={15} className="text-brand" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* داشبورد متحرک */}
          <div className="order-1 lg:order-2">
            <DashboardVisual />
          </div>

        </div>
      </div>
    </section>
  );
}