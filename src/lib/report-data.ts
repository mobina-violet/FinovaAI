import { startOfMonth } from "date-fns-jalali";
import { prisma } from "@/lib/prisma";
import { getDashboardData } from "@/lib/dashboard-data";

/** همه‌ی داده‌های صفحه‌ی گزارش‌ها. بعداً بخش «تحلیل» از API هوش مصنوعی می‌آید */
export async function getReportData(businessId: string) {
  const monthStart = startOfMonth(new Date());

  const [dash, chequeList, receivable, payable, purchases, transactions, notifications] =
    await Promise.all([
      getDashboardData(businessId),
      prisma.cheque.findMany({
        where: { businessId },
        orderBy: { dueDate: "asc" },
        take: 30,
        select: {
          id: true,
          type: true,
          amount: true,
          partyName: true,
          bank: true,
          dueDate: true,
          status: true,
        },
      }),
      prisma.cheque.aggregate({
        where: { businessId, type: "RECEIVABLE", status: "PENDING" },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.cheque.aggregate({
        where: { businessId, type: "PAYABLE", status: "PENDING" },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.transaction.aggregate({
        where: {
          businessId,
          deletedAt: null,
          type: "EXPENSE",
          occurredAt: { gte: monthStart },
          category: { name: "خرید کالا" },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.findMany({
        where: { businessId, deletedAt: null },
        orderBy: { occurredAt: "desc" },
        take: 15,
        select: {
          id: true,
          type: true,
          amount: true,
          description: true,
          occurredAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.notification.findMany({
        where: { businessId },
        orderBy: { sendAt: "desc" },
        take: 6,
        select: { id: true, title: true, body: true, sendAt: true, readAt: true },
      }),
    ]);

  return {
    ...dash,
    chequeList,
    receivable: { total: Number(receivable._sum.amount ?? 0), count: receivable._count },
    payable: { total: Number(payable._sum.amount ?? 0), count: payable._count },
    purchases: Number(purchases._sum.amount ?? 0),
    transactions,
    notifications,
  };
}