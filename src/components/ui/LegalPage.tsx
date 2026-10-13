//ui/LegalPage (امروز): قالب قوانین و حریم خصوصی با فهرست مطالب.
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import AmbientBackground from "@/components/ui/AmbientBackground";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

const num = (n: number) =>
  n.toLocaleString("fa-IR", { minimumIntegerDigits: 2 });

/** قالب مشترک صفحه‌های حقوقی (قوانین، حریم خصوصی) */
export default function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: Props) {
  return (
    <>
      <Header />
      <main className="relative isolate">
        <AmbientBackground />

        <div className="mx-auto max-w-5xl px-4 pb-20 pt-28">
          {/* مسیر صفحه */}
          <nav
            aria-label="مسیر صفحه"
            className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-fg">
              خانه
            </Link>
            <ChevronLeft size={12} />
            <span className="text-fg/80">{eyebrow}</span>
          </nav>

          {/* سربرگ: راست‌چین و کم‌حجم */}
          <header className="mt-6 border-b border-border pb-8">
            <h1 className="text-2xl font-bold leading-[1.6] sm:text-3xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              {description}
            </p>
            <p className="mt-4 text-xs text-muted/80">
              آخرین به‌روزرسانی: {updatedAt}
            </p>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[13rem_1fr] lg:gap-14">
            {/* فهرست: موبایل تاشو، دسکتاپ ثابت کنار صفحه */}
            <aside>
              <details className="rounded-xl border border-border bg-surface/60 lg:hidden">
                <summary className="cursor-pointer select-none px-4 py-3 text-sm">
                  فهرست مطالب
                </summary>
                <nav className="border-t border-border px-2 py-2">
                  {sections.map((s, i) => (
                    <a
                      key={s.title}
                      href={`#s${i + 1}`}
                      className="block rounded-lg px-3 py-2 text-sm text-fg/75 hover:bg-white/5">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </details>

              <nav
                aria-label="فهرست مطالب"
                className="sticky top-28 hidden border-r border-border pr-4 text-sm lg:block">
                <p className="mb-3 text-xs text-muted">فهرست مطالب</p>
                <ul className="space-y-0.5">
                  {sections.map((s, i) => (
                    <li key={s.title}>
                      <a
                        href={`#s${i + 1}`}
                        className="block rounded-md py-1.5 leading-6 text-fg/65 transition-colors hover:text-gold">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* متن */}
            <article className="min-w-0">
              {sections.map((s, i) => (
                <section
                  key={s.title}
                  id={`s${i + 1}`}
                  className="scroll-mt-28 border-b border-border/60 py-8 first:pt-0 last:border-b-0">
                  <h2 className="flex items-baseline gap-3 text-base font-bold sm:text-lg">
                    <span className="text-sm font-normal text-gold/80">
                      {num(i + 1)}
                    </span>
                    {s.title}
                  </h2>

                  {s.paragraphs?.map((p) => (
                    <p
                      key={p}
                      className="mt-3 text-sm leading-8 text-fg/75 sm:text-[15px]">
                      {p}
                    </p>
                  ))}

                  {s.list && (
                    <ul className="mt-3 space-y-1.5">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="relative pr-5 text-sm leading-8 text-fg/75 before:absolute before:right-0 before:top-[0.85rem] before:h-1 before:w-1 before:rounded-full before:bg-brand sm:text-[15px]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
