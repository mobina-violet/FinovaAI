import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

const highlights = ["گزارش سود و زیان", "یادآوری چک‌ها", "دستیار هوشمند"];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-border"
    >
      {/* عکس پس‌زمینه، چسبیده به سمت راست */}
      <Image
        src="/images/hero1.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-left"
      />

      {/* موبایل: لایه‌ی تیره‌ی یکدست برای خوانایی */}
      <div className="absolute inset-0 -z-20 bg-bg/75 md:hidden" />

      {/* دسکتاپ: از چپ (تیره) به راست (عکس) محو می‌شه */}
      <div className="absolute inset-0 -z-20 hidden bg-gradient-to-l from-bg via-bg/85 to-bg/10 md:block" />

      {/* گلوی سبز سمت راست */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_40%,rgba(17,82,52,0.35),transparent_60%)]" />

      {/* سایه‌ی بالا برای خوانایی هدر شیشه‌ای */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      {/* محو شدن پایین هیرو به سکشن بعدی */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto flex min-h-[min(100svh,760px)] max-w-6xl items-center px-4 pb-20 pt-32">
        {/* md:mr-auto یعنی بلوک متن بره سمت چپ و عکس سمت راست دیده بشه */}
        <div className="w-full max-w-xl md:ml-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            دستیار مالی هوشمند برای کسب‌وکارها
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-[1.6] sm:text-4xl lg:text-[2.5rem]">
            داده‌های مالی شما،
            <span className="block bg-gradient-to-l from-gold-light to-gold bg-clip-text text-transparent">
              تصمیم‌های هوشمند
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-8 text-muted sm:text-base">
            با Finova AI تمام اطلاعات مالی کسب‌وکار خود را در یک پلتفرم مدرن و
            هوشمند مدیریت کنید؛ از ثبت درآمد و هزینه‌ها تا تحلیل سود و زیان. همه
            چیز با کمک هوش مصنوعی در اختیار شماست.
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
      </div>
    </section>
  );
}