import {
  BarChart3,
  BellRing,
  FileText,
  HandCoins,
  Landmark,
  PieChart,
  Receipt,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Card, CashflowChart, Donut, StatCard } from "@/components/dashboard/widgets";
import { requireBusiness } from "@/lib/business";
import { formatDate, formatNumber } from "@/lib/format";
import { getReportData } from "@/lib/report-data";

export const metadata = { title: "گزارش‌ها | Finova AI" };

const CHEQUE_STATUS: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "در انتظار", cls: "bg-gold/10 text-gold" },
  CLEARED: { label: "وصول‌شده", cls: "bg-brand/15 text-brand" },
  BOUNCED: { label: "برگشتی", cls: "bg-danger/15 text-danger" },
  CANCELLED: { label: "لغوشده", cls: "bg-white/10 text-muted" },
};

function Th({ children, end }: { children: React.ReactNode; end?: boolean }) {
  return (
    <th className={`pb-3 font-normal ${end ? "text-end" : "text-start"}`}>{children}</th>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-8 text-center text-sm leading-7 text-muted">{children}</p>;
}

export default async function ReportsPage() {
  const { business } = await requireBusiness();
  const r = await getReportData(business.id);
  const { current, months, slices, insights, soldUnits } = r;
  const net = current.income - current.expense;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">گزارش‌ها</h1>
        <p className="mt-1 text-sm text-muted">
          همه‌ی جزئیات مالی «{business.name}» در یک صفحه؛ فروش، هزینه، چک‌ها و پیش‌بینی.
        </p>
      </div>

      {/* خلاصه‌ی ماه جاری */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="فروش این ماه"
          value={formatNumber(current.income)}
          hint={soldUnits > 0 ? `${formatNumber(soldUnits)} واحد فروش` : "ماه جاری"}
          color="text-brand"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="هزینه‌ها"
          value={formatNumber(current.expense)}
          hint="ماه جاری"
          color="text-gold"
          icon={<TrendingDown size={18} />}
        />
        <StatCard
          label="خرید کالا"
          value={formatNumber(r.purchases)}
          hint="ماه جاری"
          icon={<ShoppingBag size={18} />}
        />
        <StatCard
          label={net >= 0 ? "سود خالص" : "زیان"}
          value={`${net < 0 ? "−" : ""}${formatNumber(Math.abs(net))}`}
          hint="درآمد منهای هزینه"
          color={net >= 0 ? "text-brand" : "text-danger"}
          icon={<Wallet size={18} />}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="بستانکاری (چک‌های دریافتی)"
          value={formatNumber(r.receivable.total)}
          hint={`${formatNumber(r.receivable.count)} چک در انتظار`}
          color="text-brand"
          icon={<HandCoins size={18} />}
        />
        <StatCard
          label="بدهکاری (چک‌های پرداختی)"
          value={formatNumber(r.payable.total)}
          hint={`${formatNumber(r.payable.count)} چک در انتظار`}
          color="text-gold"
          icon={<Landmark size={18} />}
        />
        <section className="glass rounded-2xl p-5 sm:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-gold">
                <Sparkles size={16} />
              </span>
              پیش‌بینی مالی
            </h2>
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-muted">
              به‌زودی
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            پیش‌بینی فروش، هزینه و جریان نقدی ماه‌های آینده بعد از اتصال دستیار هوشمند اینجا
            نمایش داده می‌شود.
          </p>
        </section>
      </div>

      {/* نمودار و توزیع هزینه */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="درآمد و هزینه، ۶ ماه اخیر" icon={<BarChart3 size={16} />} className="xl:col-span-2">
          <CashflowChart months={months} />
        </Card>
        <Card title="توزیع هزینه‌ها" icon={<PieChart size={16} />}>
          <Donut slices={slices} />
        </Card>
      </div>

      {/* تحلیل */}
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

      {/* چک‌ها */}
      <Card title="چک‌ها" icon={<FileText size={16} />}>
        {r.chequeList.length === 0 ? (
          <Empty>هنوز چکی ثبت نشده است.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-muted">
                  <Th>سررسید</Th>
                  <Th>طرف حساب</Th>
                  <Th>نوع</Th>
                  <Th>وضعیت</Th>
                  <Th end>مبلغ (تومان)</Th>
                </tr>
              </thead>
              <tbody>
                {r.chequeList.map((c) => {
                  const st = CHEQUE_STATUS[c.status];
                  return (
                    <tr key={c.id} className="border-b border-white/[0.05] last:border-0">
                      <td className="py-3 text-xs text-muted">{formatDate(c.dueDate)}</td>
                      <td className="py-3">{c.partyName ?? "—"}</td>
                      <td className="py-3 text-xs text-muted">
                        {c.type === "RECEIVABLE" ? "دریافتی" : "پرداختی"}
                      </td>
                      <td className="py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] ${st.cls}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="py-3 text-end font-semibold">{formatNumber(c.amount)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* تراکنش‌ها */}
      <Card title="آخرین تراکنش‌ها" icon={<Receipt size={16} />}>
        {r.transactions.length === 0 ? (
          <Empty>هنوز تراکنشی ثبت نشده است.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-muted">
                  <Th>تاریخ</Th>
                  <Th>شرح</Th>
                  <Th>دسته</Th>
                  <Th end>مبلغ (تومان)</Th>
                </tr>
              </thead>
              <tbody>
                {r.transactions.map((t) => (
                  <tr key={t.id} className="border-b border-white/[0.05] last:border-0">
                    <td className="py-3 text-xs text-muted">{formatDate(t.occurredAt)}</td>
                    <td className="max-w-[240px] truncate py-3">
                      {t.description || (t.type === "INCOME" ? "درآمد" : "هزینه")}
                    </td>
                    <td className="py-3 text-xs text-muted">{t.category?.name ?? "—"}</td>
                    <td
                      className={`py-3 text-end font-semibold ${
                        t.type === "INCOME" ? "text-brand" : "text-fg/80"
                      }`}>
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

      {/* اعلان‌ها */}
      <Card title="اعلان‌ها" icon={<BellRing size={16} />}>
        {r.notifications.length === 0 ? (
          <Empty>اعلان جدیدی ندارید.</Empty>
        ) : (
          <ul className="space-y-2">
            {r.notifications.map((n) => (
              <li key={n.id} className="rounded-xl bg-white/[0.04] px-4 py-3">
                <p className="flex items-center gap-2 text-sm">
                  {!n.readAt && <i className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  {n.title}
                </p>
                <p className="mt-1 text-xs leading-6 text-muted">{n.body}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}