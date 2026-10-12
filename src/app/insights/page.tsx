import type { Metadata } from "next";
import { ArrowDown, Quote } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import CtaBanner from "@/components/landing/CtaBanner";
import AmbientBackground from "@/components/ui/AmbientBackground";
import ArticleExplorer from "./ArticleExplorer";

export const metadata: Metadata = {
  title: "دیدگاه فینوا | FinovaAI",
  description:
    "نگاه ما به مدیریت مالی کسب‌وکارهای کوچک: ساده، شفاف و هوشمند. مقاله‌ها و نکته‌های کاربردی تیم Finova AI.",
};

const principles = [
  {
    n: "۰۱",
    title: "ساده بگو، ساده ثبت کن",
    text: "مدیریت مالی نباید دانش حسابداری بخواهد. همان‌طور که حرف می‌زنید بنویسید.",
  },
  {
    n: "۰۲",
    title: "داده را به تصمیم تبدیل کن",
    text: "عدد به‌تنهایی کمکی نمی‌کند؛ نکته‌ای که بشود طبقش عمل کرد، چرا.",
  },
  {
    n: "۰۳",
    title: "شفاف و قابل‌اعتماد",
    text: "هوش مصنوعی پیشنهاد می‌دهد، تصمیم با شماست. داده‌هایتان فقط برای خودتان.",
  },
];

export default function InsightsPage() {
  return (
    <>
      <Header />
      <main dir="rtl">
        {/* هیرو: متن + نقل‌قول */}
        <section className="relative isolate overflow-hidden">
          <AmbientBackground />
   
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-16 lg:pt-36">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1 text-[11px] text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                دیدگاه فینوا
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-[1.7] sm:text-4xl sm:leading-[1.7]">
                نگاهی{" "}
                <span className="bg-gradient-to-l from-gold-light to-gold bg-clip-text text-transparent">
                  هوشمندانه‌تر
                </span>
                <br />
                به مالی کسب‌وکار
              </h1>
              <p className="mt-4 max-w-md text-sm leading-8 text-muted">
                باور داریم هر کسب‌وکار کوچکی لایق ابزاری است که مالی را ساده کند
                و تصمیم‌گیری را روشن. اینجا درباره‌ی نگاه‌مان و چیزهایی که در
                مسیر یاد می‌گیریم می‌نویسیم.
              </p>
              <a
                href="#articles"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light">
                مطالعه‌ی مقاله‌ها
                <ArrowDown size={15} />
              </a>
            </div>

            <figure className="glass relative rounded-2xl p-6 sm:p-8">
              <Quote size={26} className="text-gold/70" />
              <blockquote className="mt-4 text-lg font-medium leading-10 sm:text-xl sm:leading-[2.6rem]">
                هدف این نیست که عددهای بیشتری ببینید؛ هدف این است که بدانید با
                کدام عدد باید کاری کرد.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-xs text-muted">
                <span className="h-px w-8 bg-gold/60" />
                تیم Finova AI
              </figcaption>
            </figure>
          </div>
        </section>

        {/* سه اصل: یک نوار، نه سه کارت */}
        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto grid max-w-6xl px-4 md:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.n}
                className="border-b border-border px-1 py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:ps-0 md:last:pe-0 md:not-first:border-s">
                <span className="text-xs font-bold text-gold">{p.n}</span>
                <h3 className="mt-2 text-sm font-bold">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* مقاله‌ها */}
        <section id="articles" className="pb-4 pt-12 sm:pt-14">
          <div className="mx-auto max-w-6xl px-4">
            <ArticleExplorer />
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
