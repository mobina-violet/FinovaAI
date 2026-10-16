export type SendState = {
  ok?: boolean;
  phone?: string;
  nonce?: number;
  cooldown?: number;
  error?: string;
  demoCode?: string; // فقط برای حالت SMS_PROVIDER=console
};

export type VerifyState = {
  error?: string;
};

export type PreviewState = {
  error?: string;
  draft?: unknown;
  nonce?: number;
};