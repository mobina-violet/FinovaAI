import { startOfMonth, subMonths } from "date-fns-jalali";
import { prisma } from "@/lib/prisma";
import { formatMonthShort, formatNumber } from "@/lib/format";

export type MonthPoint = { label: string; income: number; expense: number };
export type Slice = { name: string; value: number };

function buildInsights(cur: MonthPoint, prev: MonthPoint, slices: Slice[]): string[] {
  if (cur.income === 0 && cur.expense === 0) {
    return [
      "هنوز تراکنشی برای این ماه ثبت نشده است. با ثبت اولین تراکنش، تحلیل وضعیت مالی شما اینجا نمایش داده می‌شود.",
    ];
  }

  const out: string[] = [];
  const net = cur.income - cur.expense;
  out.push(
    net >= 0
      ? `سود خالص این ماه تا امروز ${formatNumber(net)} تومان است.`
      : `این ماه تا امروز ${formatNumber(-net)} تومان زیان داشته‌اید؛ هزینه‌ها از درآمد بیشتر است.`
  );

  if (prev.income > 0) {
    const pct = Math.round((cur.income / prev.income) * 100);
    out.push(`درآمد این ماه تا امروز معادل ${formatNumber(pct)}٪ از کل درآمد ماه قبل است.`);
  }

  if (slices.length > 0 && cur.expense > 0) {
    const top = slices[0];
    const pct = Math.round((top.value / cur.expense) * 100);
    out.push(`بیشترین هزینه مربوط به «${top.name}» است (${formatNumber(pct)}٪ از کل هزینه‌ها).`);
  }

  return out;
}

export async function getDashboardData(businessId: string) {
  const now = new Date();
  const monthStarts = Array.from({ length: 6 }, (_, i) =>
    startOfMonth(subMonths(now, 5 - i))
  );
  const horizon = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const [txs, recent, totalCount, chequeRows] = await Promise.all([
    prisma.transaction.findMany({
      where: { businessId, occurredAt: { gte: monthStarts[0] } },
      select: {
        type: true,
        amount: true,
        quantity: true,
        occurredAt: true,
        category: { select: { name: true } },
      },
    }),
    prisma.transaction.findMany({
      where: { businessId },
      orderBy: { occurredAt: "desc" },
      take: 8,
      select: {
        id: true,
        type: true,
        amount: true,
        description: true,
        occurredAt: true,
        category: { select: { name: true } },
      },
    }),
    prisma.transaction.count({ where: { businessId } }),
    prisma.cheque.findMany({
      where: { businessId, status: "PENDING", dueDate: { lte: horizon } },
      orderBy: { dueDate: "asc" },
      take: 5,
      select: { id: true, type: true, amount: true, partyName: true, dueDate: true },
    }),
  ]);

  const months: MonthPoint[] = monthStarts.map((d) => ({
    label: formatMonthShort(d),
    income: 0,
    expense: 0,
  }));
  const categoryTotals = new Map<string, number>();
  let soldUnits = 0;
  const last = months.length - 1;

  for (const t of txs) {
    let idx = -1;
    for (let i = last; i >= 0; i--) {
      if (t.occurredAt >= monthStarts[i]) {
        idx = i;
        break;
      }
    }
    if (idx === -1) continue;

    const amount = Number(t.amount);
    if (t.type === "INCOME") {
      months[idx].income += amount;
      if (idx === last) soldUnits += t.quantity ?? 0;
    } else {
      months[idx].expense += amount;
      if (idx === last) {
        const name = t.category?.name ?? "بدون دسته";
        categoryTotals.set(name, (categoryTotals.get(name) ?? 0) + amount);
      }
    }
  }

  const sorted = [...categoryTotals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  const top = sorted.slice(0, 4);
  const rest = sorted.slice(4).reduce((s, c) => s + c.value, 0);
  const slices: Slice[] = rest > 0 ? [...top, { name: "سایر", value: rest }] : top;

  const current = months[last];
  const previous = months[last - 1];

  const cheques = chequeRows.map((c) => ({
    ...c,
    daysLeft: Math.ceil((c.dueDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)),
  }));

  return {
    months,
    current,
    soldUnits,
    slices,
    recent,
    totalCount,
    cheques,
    insights: buildInsights(current, previous, slices),
  };
}