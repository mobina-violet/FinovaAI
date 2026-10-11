import Image from "next/image";
import Link from "next/link";
import { Send, Mail, ArrowUpLeft } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/#features", label: "ویژگی‌ها" },
  { href: "/#faq", label: "سوالات متداول" },
  { href: "/#about", label: "درباره ما" },
  { href: "/insights", label: "مجله فینوا" },
  { href: "/contact", label: "تماس با ما" },
];

const socials = [
  {
    href: siteConfig.telegram,
    label: "تلگرام",
    icon: Send,
  },
  ...(siteConfig.email
    ? [
        {
          href: `mailto:${siteConfig.email}`,
          label: "ایمیل",
          icon: Mail,
        },
      ]
    : []),
].filter((item) => Boolean(item.href));

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#0b0e0c]">
      {/* نور پس‌زمینه‌ی ظریف */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-64 w-64 rounded-full bg-emerald-500/[0.06] blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* بخش اصلی */}
        <div className="grid gap-10 py-12 md:grid-cols-[1.3fr_1fr] md:items-start md:gap-16 md:py-16">
          {/* برند و توضیحات */}
          <div className="flex flex-col items-start gap-5">
            <Link
              href="/"
              aria-label="صفحه اصلی FinovaAI"
              className="group inline-flex items-center gap-3 rounded-xl">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-emerald-400/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                />
                <Image
                  src="/images/logo.webp"
                  alt=""
                  width={48}
                  height={48}
                  className="relative h-12 w-12 object-contain"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span
                  dir="ltr"
                  className="text-xl font-bold tracking-tight text-white">
                  Finova<span className="text-emerald-400">AI</span>
                </span>
                <span
                  dir="ltr"
                  className="text-[10px] font-medium tracking-wide text-white/45">
                  Your Smart Financial Assistant
                </span>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-8 text-white/55">
              مدیریت هوشمند امور مالی کسب‌وکار؛ شفاف‌تر ببینید، دقیق‌تر تحلیل
              کنید و با اطمینان بیشتری تصمیم بگیرید.
            </p>

            {/* شبکه‌های ارتباطی */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-1">
                {socials.map(({ href, label, icon: Icon }) => {
                  const isExternal = href.startsWith("http");

                  return (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      title={label}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition-colors duration-200 hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                      <Icon size={18} strokeWidth={1.8} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* لینک‌ها */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <h2 className="mb-5 text-sm font-semibold text-white">
                دسترسی سریع
              </h2>

              <nav
                aria-label="لینک‌های فوتر"
                className="flex flex-col items-start gap-4">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                    <span>{label}</span>
                    <ArrowUpLeft
                      size={13}
                      aria-hidden="true"
                      className="opacity-0 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="mb-5 text-sm font-semibold text-white">
                همراه فینوا
              </h2>

              <p className="max-w-[220px] text-sm leading-7 text-white/50">
                قدم بعدی کسب‌وکارت را با شناخت بهتر از وضعیت مالی بردار.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                با ما در ارتباط باش
                <ArrowUpLeft size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
