import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { Article } from "@/lib/insights";
import { formatDate, formatNumber } from "@/lib/format";

/** ظهرِ UTC تا تاریخ توی هیچ تایم‌زونی یه روز جابه‌جا نشه */
export const articleDate = (a: Article) => formatDate(new Date(`${a.date}T12:00:00Z`));

/** کاور مقاله: تا وقتی عکس واقعی نداریم یه کاور شیشه‌ای با آیکون */
export function ArticleCover({
  article,
  className = "h-44",
}: {
  article: Article;
  className?: string;
}) {
  const Icon = article.icon;
  return (
    <div
      aria-hidden
      className={`relative isolate flex items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-forest/70 via-surface-2 to-bg ${className}`}>
      <div className="absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -top-10 right-1/4 h-32 w-32 rounded-full bg-brand/25 blur-3xl" />
      <div className="absolute -bottom-10 left-1/4 h-28 w-28 rounded-full bg-gold/15 blur-3xl" />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/25 bg-black/30 text-gold shadow-[0_0_40px_rgba(198,161,91,0.2)] backdrop-blur">
        <Icon size={30} />
      </div>
    </div>
  );
}

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <span>{articleDate(article)}</span>
      <span className="h-1 w-1 rounded-full bg-muted/50" />
      <span className="inline-flex items-center gap-1">
        <Clock size={12} />
        {formatNumber(article.readMinutes)} دقیقه مطالعه
      </span>
    </div>
  );
}

export function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="glass group grid items-center gap-6 rounded-3xl p-5 transition hover:border-gold/30 md:grid-cols-[1.1fr_1fr] md:p-6">
      <div className="order-2 md:order-1">
        <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
          {article.category} · مقاله‌ی ویژه
        </span>
        <h2 className="mt-4 text-xl font-bold leading-[1.9] transition-colors group-hover:text-gold sm:text-2xl">
          {article.title}
        </h2>
        <p className="mt-3 text-sm leading-8 text-muted">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ArticleMeta article={article} />
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            ادامه‌ی مطلب
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <ArticleCover article={article} className="h-52 md:h-64" />
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-4 transition hover:border-brand/50">
      <ArticleCover article={article} />
      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs text-brand">{article.category}</span>
        <h3 className="mt-2 text-[15px] font-bold leading-8 transition-colors group-hover:text-gold">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <ArticleMeta article={article} />
          <ArrowLeft
            size={15}
            className="text-muted transition group-hover:-translate-x-1 group-hover:text-gold"
          />
        </div>
      </div>
    </Link>
  );
}