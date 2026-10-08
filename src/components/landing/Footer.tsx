import { Send, Mail, Globe } from "lucide-react";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";
const links = [
  { href: "#features", label: "ویژگی‌ها" },

  { href: "#insights", label: "بینش مالی" },
  { href: "#faq", label: "سوالات متداول" },
  { href: "#about", label: "درباره ما" },
];
export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
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

          <nav className="flex flex-wrap justify-center gap-6 text-xs text-muted">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-muted">
            <a href="#" aria-label="Telegram" className="hover:text-brand">
              <Send size={18} />
            </a>
            <a href="#" aria-label="Email" className="hover:text-brand">
              <Mail size={18} />
            </a>
            <a href="#" aria-label="Website" className="hover:text-brand">
              <Globe size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted md:flex-row"></div>
      </div>
    </footer>
  );
}
