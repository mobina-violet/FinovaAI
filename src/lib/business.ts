import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import type { CategoryOptions } from "@/lib/business-config";

export const requireUser = cache(async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");
  return user;
});

/** کاربر واردشده و کسب‌وکارش. اگه کسب‌وکار نداشت می‌فرستدش به onboarding */
export const requireBusiness = cache(async () => {
  const user = await requireUser();
  const business = await prisma.business.findFirst({
    where: { ownerId: user.id },
    orderBy: { createdAt: "asc" },
  });
  if (!business) redirect("/onboarding");
  return { user, business };
});

export async function getCategoryOptions(
  businessId: string
): Promise<CategoryOptions> {
  const rows = await prisma.category.findMany({
    where: { businessId },
    orderBy: { name: "asc" },
    select: { name: true, type: true },
  });
  return {
    INCOME: rows.filter((r) => r.type === "INCOME").map((r) => r.name),
    EXPENSE: rows.filter((r) => r.type === "EXPENSE").map((r) => r.name),
  };
}