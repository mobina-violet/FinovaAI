import type { Draft } from "@/lib/entry-parser";

export type PreviewState = {
  draft?: Draft;
  nonce?: number;
  error?: string;
};