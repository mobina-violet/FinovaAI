import type { MonthPoint, Slice } from "@/lib/dashboard-data";
import { formatNumber } from "@/lib/format";

export const SLICE_COLORS = ["#c6a15b", "#2a9d6b", "#1c7a52", "#8f9b95", "#5b6a62"];

export function Card({
  title,
  icon,
  action,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-2xl p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-fg/90">
          <span className="text-gold">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  unit = "تومان",
  hint,
  color = "text-fg",
  icon,
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  color?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${color}`}>
          {icon}
        </span>
      </div>
      <p className={`mt-4 text-2xl font-bold ${color}`}>
        {value} <span className="text-xs font-normal text-muted">{unit}</span>
      </p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

/** نمودار میله‌ای ۶ ماه اخیر. ارتفاعش با heightClass تنظیم می‌شه */
export function CashflowChart({
  months,
  heightClass = "h-48",
}: {
  months: MonthPoint[];
  heightClass?: string;
}) {
  const max = Math.max(1, ...months.flatMap((m) => [m.income, m.expense]));
  const hasData = months.some((m) => m.income || m.expense);

  return (
    <div>
      <div
        className={`relative flex items-end justify-between gap-3 border-b border-white/10 sm:gap-5 ${heightClass}`}>
        {[25, 50, 75].map((p) => (
          <div
            key={p}
            style={{ bottom: `${p}%` }}
            className="pointer-events-none absolute inset-x-0 border-t border-dashed border-white/[0.06]"
          />
        ))}
        {months.map((m) => (
          <div key={m.label} className="relative flex h-full flex-1 items-end justify-center gap-1.5">
            <div
              title={`درآمد: ${formatNumber(m.income)} تومان`}
              style={{ height: `${(m.income / max) * 100}%`, minHeight: 3 }}
              className="w-4 rounded-t-md bg-gradient-to-t from-forest to-brand sm:w-8"
            />
            <div
              title={`هزینه: ${formatNumber(m.expense)} تومان`}
              style={{ height: `${(m.expense / max) * 100}%`, minHeight: 3 }}
              className="w-4 rounded-t-md bg-gradient-to-t from-gold/25 to-gold/80 sm:w-8"
            />
          </div>
        ))}
        {!hasData && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            هنوز داده‌ای ثبت نشده است
          </p>
        )}
      </div>
      <div className="mt-2 flex justify-between gap-3 sm:gap-5">
        {months.map((m) => (
          <span key={m.label} className="flex-1 text-center text-[11px] text-muted">
            {m.label}
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-5 text-xs text-muted">
        <span className="flex items-center gap-2">
          <i className="h-2 w-2 rounded-full bg-brand" /> درآمد
        </span>
        <span className="flex items-center gap-2">
          <i className="h-2 w-2 rounded-full bg-gold" /> هزینه
        </span>
      </div>
    </div>
  );
}

export function Donut({ slices }: { slices: Slice[] }) {
  const total = slices.reduce((s, c) => s + c.value, 0);
  if (total === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted">
        هنوز هزینه‌ای در این ماه ثبت نشده است
      </p>
    );
  }

  const stops = slices
    .map((s, i) => {
      const before = slices.slice(0, i).reduce((sum, c) => sum + c.value, 0);
      const from = (before / total) * 100;
      const to = ((before + s.value) / total) * 100;
      return `${SLICE_COLORS[i % SLICE_COLORS.length]} ${from}% ${to}%`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative h-36 w-36 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}>
        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-surface">
          <span className="text-[11px] text-muted">کل هزینه</span>
          <span className="text-sm font-semibold">{formatNumber(total)}</span>
        </div>
      </div>
      <ul className="w-full space-y-2 text-xs">
        {slices.map((s, i) => (
          <li key={s.name} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <i
                className="h-2 w-2 rounded-full"
                style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }}
              />
              {s.name}
            </span>
            <span className="text-muted">{formatNumber(Math.round((s.value / total) * 100))}٪</span>
          </li>
        ))}
      </ul>
    </div>
  );
}