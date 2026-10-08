"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/business";
import { BUSINESS_CATEGORIES, DEFAULT_CATEGORIES } from "@/lib/business-config";
import type { OnboardingState } from "./types";

export async function createBusinessAction(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const user = await requireUser();

  const ownerName = String(formData.get("ownerName") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const values = { ownerName, name, category };

  const errors: NonNullable<OnboardingState["errors"]> = {};
  if (ownerName.length < 2) errors.ownerName = "نام خود را وارد کنید";
  else if (ownerName.length > 60) errors.ownerName = "نام خیلی طولانی است";
  if (name.length < 2) errors.name = "نام کسب‌وکار را وارد کنید";
  else if (name.length > 60) errors.name = "نام خیلی طولانی است";
  if (!(BUSINESS_CATEGORIES as readonly string[]).includes(category)) {
    errors.category = "نوع کسب‌وکار را انتخاب کنید";
  }
  if (Object.keys(errors).length > 0) return { errors, values };

  const existing = await prisma.business.findFirst({
    where: { ownerId: user.id },
    select: { id: true },
  });

  if (!existing) {
    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { name: ownerName } }),
      prisma.business.create({
        data: {
          name,
          category,
          ownerId: user.id,
          categories: { create: DEFAULT_CATEGORIES },
        },
      }),
    ]);
  }

  redirect("/dashboard");
}