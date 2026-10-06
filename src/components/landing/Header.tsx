"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "خانه" },
  { id: "features", label: "ویژگی‌ها" },
  { id: "insights", label: "بینش مالی" },
  { id: "faq", label: "سوالات متداول" },
  { id: "about", label: "درباره ما" },
  { id: "contact", label: "تماس با ما" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
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
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-white/10 bg-black/70"
          : "border-white/5 bg-black/20"
      }`}>
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4">
        {/* راست: لوگو */}
        <Link href="/" aria-label="Finova AI - صفحه اصلی" className="shrink-0">
          <Image
            src="/FinovaAI_logo_gold_transparent.webp"
            alt="Finova AI"
            width={240}
            height={240}
            quality={80}
            className="h-10 w-10 object-contain"
            priority
          />
        </Link>

        {/* وسط: منو */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`group relative py-2 text-sm transition-colors duration-200 ${
                  isActive ? "text-gold" : "text-fg/70 hover:text-fg"
                }`}>
                {l.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-right bg-gold transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* چپ: ورود / ثبت‌نام */}
        <div className="flex items-center gap-2">
          <Link
            href="/auth"
            className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-green">
            ورود / ثبت‌نام
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="منو"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-fg transition-colors hover:bg-white/10 md:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {open && (
        <nav className="border-t border-white/10 bg-black/80 px-4 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 text-sm transition-colors ${
                active === l.id ? "text-gold" : "text-fg/70 hover:text-fg"
              }`}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
