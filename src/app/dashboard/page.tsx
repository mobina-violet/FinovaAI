import Link from "next/link";
import {
  BellRing,
  PieChart,
  Receipt,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  BarChart3,
} from "lucide-react";
import QuickEntry from "@/components/dashboard/QuickEntry";
import { getCategoryOptions, requireBusiness } from "@/lib/business";
import { getDashboardData, type MonthPoint, type Slice } from "@/lib/dashboard-data";
import { formatDate, formatNumber } from "@/lib/format";

export const metadata = { title: "داشبورد | Finova AI" };

const SLICE_COLORS = ["#c6a15b", "#2a9d6b", "#1c7a52", "#8f9b95", "#e5484d"];

function Card({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-2xl p-5 ${className}`}>
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg/90">
        <span className="text-gold">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatCard({
  label,
  value,
  unit = "تومان",
  hint,
  color,
  icon,
}: {
  label: string;
  value: string;
  unit?: string;
  hint: string;
  color: string;
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
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function CashflowChart({ months }: { months: MonthPoint[] }) {
  const max = Math.max(1, ...months.flatMap((m) => [m.income, m.expense]));
  const hasData = months.some((m) => m.income || m.expense);

  return (
    <div>
      <div className="relative flex h-48 items-end justify-between gap-3 border-b border-white/10 pb-0">
        {[25, 50, 75].map((p) => (
          <div
            key={p}
            style={{ bottom: `${p}%` }}
            className="pointer-events-none absolute inset-x-0 border-t border-dashed border-white/[0.06]"
          />
        ))}
        {months.map((m) => (
          <div key={m.label} className="relative flex h-full flex-1 items-end justify-center gap-1">
            <div
              title={`درآمد: ${formatNumber(m.income)} تومان`}
              style={{ height: `${(m.income / max) * 100}%`, minHeight: 3 }}
              className="w-3 rounded-t bg-gradient-to-t from-forest to-brand sm:w-5"
            />
            <div
              title={`هزینه: ${formatNumber(m.expense)} تومان`}
              style={{ height: `${(m.expense / max) * 100}%`, minHeight: 3 }}
              className="w-3 rounded-t bg-gradient-to-t from-danger/30 to-danger/80 sm:w-5"
            />
          </div>
        ))}
        {!hasData && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            هنوز داده‌ای ثبت نشده است
          </p>
        )}
      </div>
      <div className="mt-2 flex justify-between gap-3">
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
          <i className="h-2 w-2 rounded-full bg-danger" /> هزینه
        </span>
      </div>
    </div>
  );
}

function Donut({ slices }: { slices: Slice[] }) {
  const total = slices.reduce((s, c) => s + c.value, 0);
  if (total === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted">
        هنوز هزینه‌ای در این ماه ثبت نشده است
      </p>
    );
  }

  let acc = 0;
  const stops = slices
    .map((s, i) => {
      const from = (acc / total) * 100;
      acc += s.value;
      const to = (acc / total) * 100;
      return `${SLICE_COLORS[i % SLICE_COLORS.length]} ${from}% ${to}%`;
    })
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative h-36 w-36 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      >
        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-[#0d1512]">
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

export default async function DashboardPage() {
  const { user, business } = await requireBusiness();
  const [data, categories] = await Promise.all([
    getDashboardData(business.id),
    getCategoryOptions(business.id),
  ]);
  const { current, months, slices, recent, cheques, insights, totalCount, soldUnits } = data;
  const net = current.income - current.expense;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">سلام{user.name ? `، ${user.name}` : ""} 👋</h1>
        <p className="mt-1 text-sm text-muted">خلاصه‌ی وضعیت مالی «{business.name}» در این ماه</p>
      </div>

      <QuickEntry categories={categories} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="درآمد این ماه"
          value={formatNumber(current.income)}
          hint={soldUnits > 0 ? `${formatNumber(soldUnits)} واحد فروش` : "ماه جاری"}
          color="text-brand"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="هزینه این ماه"
          value={formatNumber(current.expense)}
          hint="ماه جاری"
          color="text-danger"
          icon={<TrendingDown size={18} />}
        />
        <StatCard
          label={net >= 0 ? "سود خالص" : "زیان"}
          value={`${net < 0 ? "−" : ""}${formatNumber(Math.abs(net))}`}
          hint="درآمد منهای هزینه"
          color={net >= 0 ? "text-gold" : "text-danger"}
          icon={<Wallet size={18} />}
        />
        <StatCard
          label="تراکنش‌های ثبت‌شده"
          value={formatNumber(totalCount)}
          unit="مورد"
          hint="از ابتدا تا امروز"
          color="text-fg"
          icon={<Receipt size={18} />}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="درآمد و هزینه، ۶ ماه اخیر" icon={<BarChart3 size={16} />} className="xl:col-span-2">
          <CashflowChart months={months} />
        </Card>
        <Card title="توزیع هزینه‌ها" icon={<PieChart size={16} />}>
          <Donut slices={slices} />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="آخرین تراکنش‌ها" icon={<Receipt size={16} />} className="xl:col-span-2">
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              هنوز تراکنشی ثبت نشده است. از کادر «ثبت سریع» بالا شروع کنید.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-muted">
                    <th className="pb-3 text-start font-normal">تاریخ</th>
                    <th className="pb-3 text-start font-normal">شرح</th>
                    <th className="pb-3 text-start font-normal">دسته</th>
                    <th className="pb-3 text-end font-normal">مبلغ (تومان)</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((t) => (
                    <tr key={t.id} className="border-b border-white/[0.05] last:border-0">
                      <td className="py-3 text-xs text-muted">{formatDate(t.occurredAt)}</td>
                      <td className="max-w-[220px] truncate py-3">
                        {t.description || (t.type === "INCOME" ? "درآمد" : "هزینه")}
                      </td>
                      <td className="py-3 text-xs text-muted">{t.category?.name ?? "—"}</td>
                      <td
                        className={`py-3 text-end font-semibold ${
                          t.type === "INCOME" ? "text-brand" : "text-danger"
                        }`}
                      >
                        {t.type === "INCOME" ? "+" : "−"}
                        {formatNumber(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="space-y-4">
          <Card title="خلاصه‌ی وضعیت" icon={<Sparkles size={16} />}>
            <ul className="space-y-3 text-sm leading-7 text-fg/80">
              {insights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {line}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="اعلان‌ها و سررسیدها" icon={<BellRing size={16} />}>
            {cheques.length === 0 ? (
              <p className="text-sm leading-7 text-muted">
                هنوز چکی ثبت نشده است. چک‌های نزدیک به سررسید اینجا هشدار داده می‌شوند.
              </p>
            ) : (
              <ul className="space-y-2">
                {cheques.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm">
                        {c.partyName ?? (c.type === "RECEIVABLE" ? "چک دریافتی" : "چک پرداختی")}
                      </p>
                      <p className={`text-xs ${c.daysLeft < 0 ? "text-danger" : "text-muted"}`}>
                        {c.daysLeft < 0
                          ? `${formatNumber(-c.daysLeft)} روز از سررسید گذشته`
                          : c.daysLeft === 0
                            ? "امروز سررسید است"
                            : `${formatNumber(c.daysLeft)} روز دیگر`}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-sm font-semibold ${
                        c.type === "RECEIVABLE" ? "text-brand" : "text-danger"
                      }`}
                    >
                      {formatNumber(c.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <p className="text-center text-xs text-muted">
        همه‌ی داده‌ها در حساب شما ذخیره می‌شوند و هر زمان که برگردید در دسترس‌اند.{" "}
        <Link href="/dashboard/transactions/new" className="text-gold hover:text-gold-light">
          ثبت تراکنش با فرم کامل
        </Link>
      </p>
    </div>
  );
}