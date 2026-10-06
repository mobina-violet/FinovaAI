import { Check } from "lucide-react";

const points = [
  "گزارش مالی و تحلیلی",
  "مدیریت درآمد و هزینه ",
  " هشدارهای هوشمندانه ",
  "رابط کاربری ساده و مدرن",
  "پشتیبانی حرفه‌ای و سریع",
  "تجربه کاربری لذت‌بخش",
];

export default function WhyUs() {
  return (
    <section className="border-b border-border bg-surface/40 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <p className="text-xs text-gold">چرا باید ما را انتخاب کنید؟</p>
          <h2 className="mt-3 text-3xl font-bold">
            یک قدم جلوتر با <span className="text-brand">Finova AI</span>
          </h2>
          <p className="mt-5 leading-8 text-muted">
            ما در Finova AI با هدف ساده‌سازی مدیریت مالی کسب‌وکارها و کمک به رشد
            آن‌ها، این پلتفرم را توسعه داده‌ایم. ترکیب هوش مصنوعی با داده‌های
            واقعی باعث می‌شود تصمیم‌های مالی شما دقیق‌تر، سریع‌تر و هوشمندانه‌تر
            باشد.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check size={16} className="text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* ماکاپ داشبورد دوم */}
        <div className="rounded-2xl border border-border bg-bg p-4 shadow-xl shadow-black/50">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-lg bg-surface p-3">
              <div className="text-muted">درآمد امروز</div>
              <div className="mt-1 font-bold text-brand">+۱۵,۰۰۰,۰۰۰</div>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <div className="text-muted">هزینه امروز</div>
              <div className="mt-1 font-bold text-danger">−۶,۰۰۰,۰۰۰</div>
            </div>
            <div className="rounded-lg bg-surface p-3">
              <div className="text-muted">سود خالص</div>
              <div className="mt-1 font-bold text-brand">+۱۶,۰۰۰,۰۰۰</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="col-span-2 flex h-32 items-end gap-1.5 rounded-lg bg-surface p-3">
              {[20, 35, 28, 50, 42, 65, 55, 80, 70, 95].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-brand/80"
                />
              ))}
            </div>
            <div className="flex items-center justify-center rounded-lg bg-surface">
              <div className="h-20 w-20 rounded-full border-[10px] border-brand border-t-gold border-l-brand-dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
