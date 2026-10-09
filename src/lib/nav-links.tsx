export type NavLink =
  | { label: string; kind: "section"; id: string } // بخشی از صفحه‌ی اصلی
  | { label: string; kind: "page"; href: string }; // صفحه‌ی جدا

export const navLinks: NavLink[] = [
  { label: "خانه", kind: "section", id: "home" },
  { label: "ویژگی‌ها", kind: "section", id: "features" },
  { label: "درباره ما", kind: "section", id: "why-us" },
  { label: "سوالات متداول", kind: "section", id: "faq" },
  { label: "دیدگاه فینوا", kind: "page", href: "/insights" },
  { label: "تماس با ما", kind: "section", id: "contact" },
];

/** آیدی بخش‌های صفحه‌ی اصلی، برای تشخیص بخش فعال موقع اسکرول */
export const sectionIds = navLinks.flatMap((l) =>
  l.kind === "section" ? [l.id] : []
);

/** لینک بخش‌ها با /# شروع می‌شه تا از هر صفحه‌ای به خونه برگرده */
export const hrefOf = (l: NavLink) =>
  l.kind === "section" ? `/#${l.id}` : l.href;