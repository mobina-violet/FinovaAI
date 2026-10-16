export type SendState = {
  ok?: boolean;
  phone?: string;
  nonce?: number;
  cooldown?: number;
  error?: string;
  demoCode?: string;
};

export type VerifyState = {
  error?: string;
};