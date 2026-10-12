import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Send, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/#features", label: "ویژگی‌ها" },
  { href: "/#faq", label: "سوالات متداول" },
  { href: "/#about", label: "درباره ما" },
  { href: "/insights", label: "دیدگاه فینوا" },
  { href: "/contact", label: "تماس با ما" },
];

const legal = [
  { href: "/terms", label: "قوانین و مقررات" },
  { href: "/privacy", label: "حریم خصوصی" },
];

const socials = [
  { href: siteConfig.telegram, label: "Telegram", icon: Send },
  { href: siteConfig.email ? `mailto:${siteConfig.email}` : "", label: "Email", icon: Mail },
].filter((s) => s.href);

/** یک بخش تاشو (فقط موبایل) */
function Accordion({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-sm text-fg/90 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={16}
          className="text-muted transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <ul className="space-y-1 pb-3">
        {items.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-lg px-1 py-2 text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="group flex shrink-0 items-center gap-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src="/images/logo.webp"
                alt="لوگوی FinovaAI"
                width={48}
                height={48}
                quality={90}
                className="relative h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] md:h-12 md:w-12"
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

          {/* دسکتاپ: لینک‌ها وسط */}
          <nav
            aria-label="لینک‌های فوتر"
            className="hidden flex-wrap justify-center gap-6 text-xs text-muted md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-muted">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-brand">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* موبایل: بخش‌های تاشو */}
        <div className="mt-6 border-t border-border md:hidden">
          <Accordion title="لینک‌های سایت" items={links} />
          <Accordion title="قوانین و حریم خصوصی" items={legal} />
        </div>

        {/* پایین فوتر */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted md:mt-8 md:flex-row md:border-t md:border-border md:pt-6">
          <p dir="ltr">© {new Date().getFullYear()} Finova AI. All rights reserved.</p>

          <nav aria-label="لینک‌های حقوقی" className="hidden items-center gap-5 md:flex">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
          </nav>

          <p>ساخته‌شده برای کسب‌وکارهای آینده</p>
        </div>
      </div>
    </footer>
  );
}