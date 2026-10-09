import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { getCurrentUser } from "@/lib/session";
import AuthFlow from "./AuthFlow";

export const metadata = {
  title: "ورود یا ثبت‌نام | Finova AI",
};

export default async function AuthPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
      <AmbientBackground />

      <div className="relative w-full max-w-[420px]">
        <Link
          href="/"
          aria-label="Finova AI - صفحه اصلی"
          className="mb-8 flex justify-center">
          <Image
            src="/images/logo.webp"
            alt="Finova AI"
            width={96}
            height={105}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <div className="glass relative rounded-3xl p-8 sm:p-9">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <AuthFlow />
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
          <Lock size={13} className="text-gold/80" />
          ورود امن با کد یک‌بارمصرف
        </p>
        <Link
          href="/"
          className="mt-3 block text-center text-xs text-muted transition-colors hover:text-gold">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </main>
  );
}
