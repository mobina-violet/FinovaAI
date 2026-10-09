"use client";
//. پوسته‌ی داشبورد
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import AmbientBackground from "@/components/ui/AmbientBackground";

type NavItem = { label: string; icon: LucideIcon; href?: string };

const nav: NavItem[] = [
  { label: "داشبورد", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "ثبت تراکنش",
    icon: PlusCircle,
    href: "/dashboard/transactions/new",
  },
  { label: "تراکنش‌ها", icon: ArrowLeftRight },
  { label: "چک‌ها", icon: FileText },
  { label: "پیش‌بینی مالی", icon: TrendingUp },
  { label: "گزارش‌ها", icon: BarChart3 },
  { label: "تنظیمات", icon: Settings },
];

function SidebarContent({
  pathname,
  userName,
  phone,
  onNavigate,
}: {
  pathname: string;
  userName: string | null;
  phone: string;
  onNavigate?: () => void;
}) {
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col p-4">
      <Link
        href="/"
        aria-label="Finova AI"
        className="mb-6 flex justify-center px-2 pt-1">
        <Image
          src="/images/logo.webp"
          alt="Finova AI"
          width={96}
          height={105}
          priority
          className="h-11 w-auto"
        />
      </Link>

      <nav className="flex-1 space-y-1">
        {nav.map(({ label, icon: Icon, href }) =>
          href ? (
            <Link
              key={label}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive(href)
                  ? "bg-gold/12 text-gold ring-1 ring-gold/25"
                  : "text-fg/70 hover:bg-white/5 hover:text-fg"
              }`}>
              <Icon size={18} />
              {label}
            </Link>
          ) : (
            <div
              key={label}
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted/60">
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px]">
                به‌زودی
              </span>
            </div>
          ),
        )}
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/60 text-sm text-fg">
            {(userName ?? "ک").charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm">{userName ?? "کاربر"}</p>
            <p dir="ltr" className="text-right text-xs text-muted">
              {phone}
            </p>
          </div>
        </div>
        <form action={logoutAction}>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg/70 transition-colors hover:bg-white/5 hover:text-danger">
            <LogOut size={18} />
            خروج از حساب
          </button>
        </form>
      </div>
    </div>
  );
}

export default function DashboardShell({
  businessName,
  userName,
  phone,
  children,
}: {
  businessName: string;
  userName: string | null;
  phone: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative isolate flex min-h-screen gap-3 p-3">
      <AmbientBackground fixed />

      {/* سایدبار دسکتاپ */}
      <aside className="glass sticky top-3 hidden h-[calc(100vh-1.5rem)] w-60 shrink-0 rounded-2xl lg:block">
        <SidebarContent pathname={pathname} userName={userName} phone={phone} />
      </aside>

      {/* منوی موبایل */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <aside className="glass absolute inset-y-3 right-3 w-72 rounded-2xl">
            <button
              onClick={() => setOpen(false)}
              aria-label="بستن منو"
              className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/10">
              <X size={18} />
            </button>
            <SidebarContent
              pathname={pathname}
              userName={userName}
              phone={phone}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <header className="glass sticky top-3 z-30 flex h-14 items-center justify-between rounded-2xl px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="باز کردن منو"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg hover:bg-white/10 lg:hidden">
              <Menu size={20} />
            </button>
            <div>
              <p className="text-[11px] leading-none text-muted">کسب‌وکار</p>
              <p className="mt-1 text-sm font-semibold leading-none">
                {businessName}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-6">{children}</main>
      </div>
    </div>
  );
}
