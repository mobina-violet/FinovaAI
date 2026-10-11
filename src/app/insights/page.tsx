
import type { Metadata } from "next";
import { Eye, Sparkles, ShieldCheck } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CtaBanner from "@/components/landing/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import ArticleExplorer from "./ArticleExplorer";

export const metadata: Metadata = {
  title: "دیدگاه فینوا | Finova AI",
  description:
    "نگاه ما به مدیریت مالی کسب‌وکارهای کوچک: ساده، شفاف و هوشمند. مقاله‌ها و نکته‌های کاربردی تیم Finova AI.",
};

const principles = [
  {
    icon: Sparkles,
    title: "ساده بگو، ساده ثبت کن",
    text: "مدیریت مالی نباید به دانش حسابداری نیاز داشته باشد. همان‌طور که حرف می‌زنید بنویسید؛ بقیه‌اش با دستیار.",
  },
  {
    icon: Eye,
    title: "داده را به تصمیم تبدیل کن",
    text: "عدد به‌تنهایی کمکی نمی‌کند. ما داده‌های شما را به نکته‌هایی تبدیل می‌کنیم که می‌شود طبق آن‌ها عمل کرد.",
  },
  {
    icon: ShieldCheck,
    title: "شفاف و قابل‌اعتماد",
    text: "هوش مصنوعی پیشنهاد می‌دهد، تصمیم با شماست. اطلاعات مالی‌تان فقط برای حساب خودتان قابل دسترسی است.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <Header />

      <main dir="rtl">
        <PageHero
          eyebrow="دیدگاه فینوا"
          title={
            <>
              نگاهی{" "}
              <span className="bg-gradient-to-l from-gold-light to-gold bg-clip-text text-transparent">
                هوشمندانه‌تر
              </span>{" "}
              به مالی کسب‌وکار
            </>
          }
          description="ما باور داریم هر کسب‌وکار کوچکی لایق ابزاری است که مالی را ساده کند و تصمیم‌گیری را روشن. اینجا درباره‌ی نگاه‌مان و چیزهایی که در مسیر یاد می‌گیریم می‌نویسیم."
        />

        {/* اصول و فلسفه */}
        <section className="border-b border-border py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 text-center">
              <p className="text-xs font-medium text-brand">
                رویکرد ما
              </p>

              <h2 className="mt-2 text-xl font-bold leading-9 sm:text-2xl">
                سه اصل که Finova AI بر آن‌ها ساخته شده
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {principles.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-brand/50 sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-4 text-base font-bold leading-7">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* مقاله‌ها */}
        <section
          id="articles"
          className="border-b border-border py-12 sm:py-14"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-7 text-center">
              <p className="text-xs font-medium text-brand">
                بینش مالی
              </p>

              <h2 className="mt-2 text-xl font-bold leading-9 sm:text-2xl">
                نکته‌هایی برای تصمیم‌های بهتر
              </h2>
            </div>

            <ArticleExplorer />
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
