export type TxField = "type" | "amount" | "quantity" | "category" | "description";
///. ثبت تراکنش (ذخیره در دیتابیس)
export type TxState = {
  errors?: Partial<Record<TxField, string>>;
  values?: {
    amount?: string;
    quantity?: string;
    category?: string;
    description?: string;
  };
  /** زمان ذخیره‌ی موفق؛ فرم با دیدنش می‌بنده یا ریدایرکت می‌کنه */
  savedAt?: number;
};