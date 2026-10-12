import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, Sparkles } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/seo/JsonLd";
import {
  ArticleCard,
  ArticleCover,
  ArticleMeta,
} from "@/components/insights/ArticleCard";
import { articles, getArticle, getRelated } from "@/lib/insights";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Finova AI`,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      locale: "fa_IR",
      url: `/insights/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelated(article.slug);

  return (
    <>
      <Header />
      <main className="relative isolate">
        <AmbientBackground />

        <article className="mx-auto max-w-3xl px-4 pb-16 pt-32">
          {/* مسیر صفحه */}
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt,
              datePublished: article.date,
              inLanguage: "fa-IR",
              author: { "@type": "Organization", name: "Finova AI" },
              publisher: { "@type": "Organization", name: "Finova AI" },
              mainEntityOfPage: `${siteConfig.url}/insights/${article.slug}`,
            }}
          />
          <nav
            aria-label="مسیر صفحه"
            className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-fg">
              خانه
            </Link>
            <ChevronLeft size={12} />
            <Link href="/insights" className="transition-colors hover:text-fg">
              دیدگاه فینوا
            </Link>
            <ChevronLeft size={12} />
            <span className="text-fg/70">{article.category}</span>
          </nav>

          <header className="mt-8">
            <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
              {article.category}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-[2] sm:text-3xl">
              {article.title}
            </h1>
            <p className="mt-4 text-[15px] leading-8 text-muted">
              {article.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs text-muted">تیم Finova AI</span>
              <span className="h-1 w-1 rounded-full bg-muted/50" />
              <ArticleMeta article={article} />
            </div>
          </header>

          <ArticleCover article={article} className="mt-8 h-56 sm:h-72" />

          {/* متن مقاله */}
          <div className="mt-10 space-y-5">
            {article.body.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="pt-4 text-xl font-bold">
                      {block.text}
                    </h2>
                  );
                case "list":
                  return (
                    <ul
                      key={i}
                      className="space-y-3 text-[15px] leading-8 text-fg/85">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={i}
                      className="rounded-xl border-s-2 border-gold/60 bg-gold/5 px-5 py-4 text-[15px] leading-8 text-fg/90">
                      {block.text}
                    </blockquote>
                  );
                default:
                  return (
                    <p key={i} className="text-[15px] leading-9 text-fg/85">
                      {block.text}
                    </p>
                  );
              }
            })}
          </div>

          {/* دعوت به شروع */}
          <div className="glass mt-14 flex flex-col items-center gap-5 rounded-2xl p-6 text-center sm:flex-row sm:text-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
              <Sparkles size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">همین حالا امتحانش کنید</h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                ثبت اولین تراکنش‌تان چند ثانیه بیشتر وقت نمی‌گیرد.
              </p>
            </div>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-gold-light">
              شروع کنید
              <ArrowLeft size={16} />
            </Link>
          </div>
        </article>

        {/* مقاله‌های مرتبط */}
        {related.length > 0 && (
          <section className="border-t border-border py-16">
            <div className="mx-auto max-w-6xl px-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">بیشتر بخوانید</h2>
                <Link
                  href="/insights"
                  className="text-sm text-brand transition-colors hover:text-gold">
                  همه‌ی مقاله‌ها
                </Link>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
