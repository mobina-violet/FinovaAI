"use client";

import { useEffect } from "react";
import Link from "next/link";
import AmbientBackground from "@/components/ui/AmbientBackground";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-4">
      <AmbientBackground />
      <div className="glass w-full max-w-md rounded-3xl p-8 text-center">
        <h1 className="text-xl font-bold">مشکلی پیش آمد</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید؛ اگر ادامه داشت با ما در تماس باشید.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light">
            تلاش دوباره
          </button>
          <Link
            href="/"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-fg/80 transition hover:border-gold/40 hover:text-gold">
            صفحه‌ی اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}