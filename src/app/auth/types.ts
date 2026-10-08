export type SendState = {
  ok?: boolean;
  phone?: string;
  /** شناسه‌ی هر ارسال موفق؛ برای تشخیص مرحله و ریست تایمر */
  nonce?: number;
  cooldown?: number;
  error?: string;
};

export type VerifyState = {
  error?: string;
};