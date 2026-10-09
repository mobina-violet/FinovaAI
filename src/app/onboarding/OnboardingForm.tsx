"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// بخش‌های صفحه‌ی اصلی id دارن؛ «دیدگاه فینوا» صفحه‌ی جداست
const links = [
  { label: "خانه", href: "/#home", id: "home" },
  { label: "ویژگی‌ها", href: "/#features", id: "features" },
  { label: "درباره ما", href: "/#about", id: "about" },
  { label: "سوالات متداول", href: "/#faq", id: "faq" },
  { label: "دیدگاه فینوا", href: "/insights" },
  { label: "تماس با ما", href: "/#contact", id: "contact" },
];

const sectionIds = links.flatMap((l) => (l.id ? [l.id] : []));

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // تشخیص بخش فعال، فقط توی صفحه‌ی اصلی
  useEffect(() => {
    if (!onHome) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const isActive = (l: (typeof links)[number]) =>
    l.id ? onHome && active === l.id : pathname.startsWith(l.href);

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-gold/20 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-black/20 backdrop-blur-md"
      }`}>
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* راست: لوگو + منو توی یک گروه، تا لینک‌ها کنار لوگو بمونن */}
        <div className="flex items-center gap-8 xl:gap-12">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/images/logo.webp"
                alt="لوگوی FinovaAI"
                width={96}
                height={105}
                priority
                className="relative h-11 w-auto drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-wide text-brand">
                Finova<span className="text-gold">AI</span>
              </p>
              <p className="hidden text-[10px] font-medium text-gold/80 sm:block">
                Your Smart Financial Assistant
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {links.map((l) => {
              const current = isActive(l);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  aria-current={current ? "true" : undefined}
                  className={`group relative py-2 text-[15px] font-medium transition-colors duration-300 ${
                    current ? "text-gold" : "text-white/70 hover:text-white"
                  }`}>
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300 ${
                      current
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* چپ: ورود / ثبت‌نام */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-l from-gold to-amber-400 px-5 py-2.5 text-sm font-bold text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)]">
            <span className="relative z-10">ورود / ثبت‌نام</span>
            <div className="absolute inset-0 bg-gradient-to-l from-green-500 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="منو"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-gold/30 hover:bg-white/10 lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* منوی موبایل: ارتفاع خودکار، آیتم‌ها بریده نمی‌شن */}
      <div
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="overflow-hidden">
          <nav className="border-t border-gold/10 bg-black/70 px-4 py-4 backdrop-blur-xl">
            {links.map((l) => {
              const current = isActive(l);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ${
                    current
                      ? "bg-gold/10 text-gold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}>
                  {l.label}
                  {current && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}