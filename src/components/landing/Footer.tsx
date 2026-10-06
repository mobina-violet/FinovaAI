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
          {/* راست: لوگو */}
          <Link
            href="/"
            aria-label="Finova AI - صفحه اصلی"
            className="shrink-0">
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
