import Link from "next/link";
import { BarChart3, BellRing, ChevronLeft, Plus, Receipt } from "lucide-react";
import { Card, CashflowChart } from "@/components/dashboard/widgets";
import { requireBusiness } from "@/lib/business";
import { getDashboardData } from "@/lib/dashboard-data";
import { formatDate, formatNumber } from "@/lib/format";

export const metadata = { title: "داشبورد | FinovaAI" };

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-gold">
      {children}
      <ChevronLeft size={14} />
    </Link>
  );
}

export default async function DashboardPage() {
  const { user, business } = await requireBusiness();
  // وقتی API هوش مصنوعی آماده شد، فقط داده‌ی «months» رو از اون بگیر؛ بقیه‌ی صفحه عوض نمی‌شه
  const { months, recent, cheques } = await getDashboardData(business.id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">سلام{user.name ? `، ${user.name}` : ""} 👋</h1>
          <p className="mt-1 text-sm text-muted">نمای کلی «{business.name}»</p>
        </div>
        <Link
          href="/dashboard/transactions/new"
          className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold px-4 text-sm font-semibold text-black transition hover:brightness-105">
          <Plus size={16} />
          ثبت تراکنش
        </Link>
      </div>

      {/* نمودار اصلی */}
      <Card
        title="درآمد و هزینه، ۶ ماه اخیر"
        icon={<BarChart3 size={16} />}
        action={<MoreLink href="/dashboard/reports">گزارش کامل</MoreLink>}>
        <CashflowChart months={months} heightClass="h-64 sm:h-80" />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title="آخرین تراکنش‌ها"
          icon={<Receipt size={16} />}
          action={<MoreLink href="/dashboard/reports">همه</MoreLink>}>
          {recent.length === 0 ? (
            <p className="py-6 text-center text-sm leading-7 text-muted">
              هنوز تراکنشی ثبت نشده است.{" "}
              <Link href="/dashboard/assistant" className="text-gold hover:text-gold-light">
                با دستیار هوشمند شروع کنید
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {recent.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">
                      {t.description || (t.type === "INCOME" ? "درآمد" : "هزینه")}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {formatDate(t.occurredAt)}
                      {t.category ? ` · ${t.category.name}` : ""}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold ${
                      t.type === "INCOME" ? "text-brand" : "text-fg/80"
                    }`}>
                    {t.type === "INCOME" ? "+" : "−"}
                    {formatNumber(t.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="سررسیدهای نزدیک"
          icon={<BellRing size={16} />}
          action={<MoreLink href="/dashboard/reports">همه</MoreLink>}>
          {cheques.length === 0 ? (
            <p className="py-6 text-center text-sm leading-7 text-muted">
              چک نزدیک به سررسیدی ندارید.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {cheques.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">
                      {c.partyName ?? (c.type === "RECEIVABLE" ? "چک دریافتی" : "چک پرداختی")}
                    </p>
                    <p className={`mt-0.5 text-xs ${c.daysLeft < 0 ? "text-gold" : "text-muted"}`}>
                      {c.daysLeft < 0
                        ? `${formatNumber(-c.daysLeft)} روز از سررسید گذشته`
                        : c.daysLeft === 0
                          ? "امروز سررسید است"
                          : `${formatNumber(c.daysLeft)} روز دیگر`}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold ${
                      c.type === "RECEIVABLE" ? "text-brand" : "text-fg/80"
                    }`}>
                    {formatNumber(c.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}