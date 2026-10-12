import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import AmbientBackground from "@/components/ui/AmbientBackground";

export const metadata: Metadata = { title: "صفحه پیدا نشد | Finova AI" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pb-16 pt-32">
        <AmbientBackground />
        <div className="text-center">
          <p className="bg-gradient-to-b from-gold-light to-gold/20 bg-clip-text text-8xl font-bold text-transparent sm:text-9xl">
            ۴۰۴
          </p>
          <h1 className="mt-4 text-2xl font-bold">این صفحه پیدا نشد</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
            آدرس را اشتباه وارد کرده‌اید یا صفحه جابه‌جا شده است. از لینک‌های زیر ادامه بدهید.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light">
              بازگشت به خانه
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/15 px-6 py-2.5 text-sm text-fg/80 transition hover:border-gold/40 hover:text-gold">
              تماس با ما
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}