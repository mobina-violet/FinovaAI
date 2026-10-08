export type OnboardingState = {
  errors?: Partial<Record<"ownerName" | "name" | "category", string>>;
  values?: { ownerName?: string; name?: string; category?: string };
};