"use server";

import { requireBusiness } from "@/lib/business";
import { parseEntry } from "@/lib/entry-parser";
import type { PreviewState } from "./types";

/** فقط جمله رو تحلیل می‌کنه و پیش‌نویس برمی‌گردونه؛ چیزی ذخیره نمی‌شه */
export async function previewEntryAction(
  _prev: PreviewState,
  formData: FormData
): Promise<PreviewState> {
  await requireBusiness();

  const text = String(formData.get("text") ?? "").trim();
  if (text.length < 3) {
    return { error: "یک جمله بنویسید؛ مثلاً: امروز ۱۲ تا کتاب فروختم، ۳ میلیون تومان" };
  }
  if (text.length > 300) {
    return { error: "متن خیلی طولانی است (حداکثر ۳۰۰ کاراکتر)." };
  }

  return { draft: parseEntry(text), nonce: Date.now() };
}