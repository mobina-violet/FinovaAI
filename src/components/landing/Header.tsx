"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "home", label: "خانه" },
  { id: "features", label: "ویژگی‌ها" },
  { id: "insights", label: "بینش مالی" },
  { id: "about", label: "درباره ما" },
  { id: "insights", label: "دیدگاه فینوا" }, //جای کلمه مقالات
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-gold/20 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-black/20 backdrop-blur-md"
      }`}>
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src="/images/logo.webp"
              alt="لوگوی FinovaAI"
              width={48}
              height={48}
              quality={90}
              className="relative h-12 w-12 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              priority
            />
          </div>
          <div className="-mr-1 leading-tight">
            <p className="text-lg font-bold tracking-wide text-brand">
              Finova<span className="text-gold">AI</span>
            </p>
            <p className="hidden text-[10px] font-medium text-gold/80 sm:block">
              Your Smart Financial Assistant
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`group relative py-2 text-[15px] font-medium transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-white/70 hover:text-white"
                }`}>
                {l.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300 ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* CTA + Mobile Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-l from-gold to-amber-400 px-5 py-2.5 text-sm font-bold text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)] hover:scale-[1.03]">
            <span className="relative z-10">ورود / ثبت‌نام</span>
            <div className="absolute inset-0 bg-gradient-to-l from-green-500 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="منو"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-gold/30 hover:bg-white/10 md:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-out md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}>
        <nav className="border-t border-gold/10 bg-black/70 px-4 py-4 backdrop-blur-xl">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ${
                active === l.id
                  ? "bg-gold/10 text-gold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}>
              {l.label}
              {active === l.id && (
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
