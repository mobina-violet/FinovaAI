"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireBusiness } from "@/lib/business";
import { parseAmount, toLatinDigits } from "@/lib/format";
import type { TxState } from "./types";

export async function createTransactionAction(
  _prev: TxState,
  formData: FormData
): Promise<TxState> {
  // همیشه از روی سشن، نه از ورودی فرم: کاربر فقط توی کسب‌وکار خودش می‌نویسه
  const { business } = await requireBusiness();

  const type = String(formData.get("type") ?? "");
  const amountRaw = String(formData.get("amount") ?? "");
  const quantityRaw = toLatinDigits(String(formData.get("quantity") ?? "")).trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const values = { amount: amountRaw, quantity: quantityRaw, category, description };

  const errors: NonNullable<TxState["errors"]> = {};

  if (type !== "INCOME" && type !== "EXPENSE") errors.type = "نوع تراکنش نامعتبر است";

  const amount = parseAmount(amountRaw);
  if (amount === null) errors.amount = "مبلغ را به‌صورت عدد مثبت وارد کنید";

  let quantity: number | null = null;
  if (quantityRaw) {
    if (!/^\d{1,7}$/.test(quantityRaw) || Number(quantityRaw) < 1) {
      errors.quantity = "تعداد باید عدد مثبت باشد";
    } else {
      quantity = Number(quantityRaw);
    }
  }
  if (category.length > 40) errors.category = "نام دسته خیلی طولانی است";
  if (description.length > 300) errors.description = "توضیحات خیلی طولانی است";

  if (
    Object.keys(errors).length > 0 ||
    amount === null ||
    (type !== "INCOME" && type !== "EXPENSE")
  ) {
    return { errors, values };
  }

  let categoryId: string | null = null;
  if (category) {
    const row = await prisma.category.upsert({
      where: {
        businessId_name_type: { businessId: business.id, name: category, type },
      },
      create: { businessId: business.id, name: category, type },
      update: {},
      select: { id: true },
    });
    categoryId = row.id;
  }

  await prisma.transaction.create({
    data: {
      businessId: business.id,
      categoryId,
      type,
      amount,
      quantity,
      description: description || null,
    },
  });

  revalidatePath("/dashboard");
  return { savedAt: Date.now() };
}