import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { Article } from "@/lib/insights";
import { formatDate, formatNumber } from "@/lib/format";

/** ظهرِ UTC تا تاریخ توی هیچ تایم‌زونی یه روز جابه‌جا نشه */
export const articleDate = (a: Article) => formatDate(new Date(`${a.date}T12:00:00Z`));

/* ---------- تصویرهای کاور: هر مقاله یه مینی‌گراف مرتبط با موضوعش ---------- */

const svgProps = {
  viewBox: "0 0 320 160",
  preserveAspectRatio: "xMidYMid slice",
  className: "absolute inset-0 h-full w-full",
  fill: "none",
} as const;

function Grid() {
  return (
    <g stroke="white" strokeOpacity="0.06">
      <path d="M0 40H320M0 80H320M0 120H320" />
    </g>
  );
}

/** هوش مصنوعی: نمودار صعودی با یه نقطه‌ی برجسته */
function AiVisual() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="ai-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a9d6b" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2a9d6b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Grid />
      <path d="M0 126L20 122C60 114 80 96 112 100S172 72 204 62S262 42 300 30L320 26V160H0Z" fill="url(#ai-area)" />
      <path d="M0 126L20 122C60 114 80 96 112 100S172 72 204 62S262 42 300 30L320 26" stroke="#2a9d6b" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="204" cy="62" r="12" fill="#c6a15b" fillOpacity="0.18" />
      <circle cx="204" cy="62" r="5" fill="#c6a15b" />
      <rect x="216" y="28" width="58" height="18" rx="9" fill="#c6a15b" fillOpacity="0.14" stroke="#c6a15b" strokeOpacity="0.4" />
      <rect x="226" y="35" width="26" height="4" rx="2" fill="#c6a15b" fillOpacity="0.7" />
    </svg>
  );
}

/** نقدینگی: ستون درآمد/هزینه با خط موجودی */
function CashVisual() {
  const bars = [
    [38, 22], [52, 30], [34, 44], [60, 28], [70, 36],
  ];
  return (
    <svg {...svgProps}>
      <Grid />
      {bars.map(([inc, exp], i) => {
        const x = 46 + i * 52;
        return (
          <g key={i}>
            <rect x={x} y={140 - inc * 1.4} width="14" height={inc * 1.4} rx="3" fill="#2a9d6b" fillOpacity="0.85" />
            <rect x={x + 18} y={140 - exp * 1.4} width="14" height={exp * 1.4} rx="3" fill="#e5484d" fillOpacity="0.7" />
          </g>
        );
      })}
      <path d="M52 96L104 80L156 92L208 62L260 50" stroke="#c6a15b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="260" cy="50" r="4.5" fill="#c6a15b" />
    </svg>
  );
}

/** چک‌ها: ردیف سررسیدها، یکی برجسته */
function ChequeVisual() {
  const rows = [
    { y: 36, c: "#2a9d6b", hot: false },
    { y: 70, c: "#c6a15b", hot: true },
    { y: 104, c: "#2a9d6b", hot: false },
  ];
  return (
    <svg {...svgProps}>
      {rows.map(({ y, c, hot }) => (
        <g key={y}>
          <rect x="52" y={y} width="216" height="26" rx="8" fill="white" fillOpacity={hot ? 0.07 : 0.04} stroke={hot ? "#c6a15b" : "white"} strokeOpacity={hot ? 0.5 : 0.08} />
          <circle cx="252" cy={y + 13} r="5" fill={c} />
          <rect x="190" y={y + 9} width="48" height="4" rx="2" fill="white" fillOpacity="0.28" />
          <rect x="206" y={y + 16} width="32" height="3" rx="1.5" fill="white" fillOpacity="0.14" />
          <rect x="64" y={y + 7} width="40" height="12" rx="6" fill={c} fillOpacity="0.18" />
        </g>
      ))}
    </svg>
  );
}

/** ثبت سریع: نوار ورودی و چیپ‌های استخراج‌شده */
function EntryVisual() {
  return (
    <svg {...svgProps}>
      <rect x="40" y="86" width="240" height="38" rx="19" fill="black" fillOpacity="0.35" stroke="#c6a15b" strokeOpacity="0.45" />
      <circle cx="62" cy="105" r="11" fill="#c6a15b" />
      <path d="M58 105H66M63 101L67 105L63 109" stroke="#0b0d0c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="196" y="101" width="64" height="4" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="150" y="101" width="38" height="4" rx="2" fill="white" fillOpacity="0.22" />
      <rect x="196" y="110" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.16" />
      <rect x="150" y="40" width="54" height="22" rx="11" fill="#2a9d6b" fillOpacity="0.2" stroke="#2a9d6b" strokeOpacity="0.5" />
      <rect x="212" y="40" width="46" height="22" rx="11" fill="white" fillOpacity="0.07" stroke="white" strokeOpacity="0.14" />
      <rect x="104" y="40" width="38" height="22" rx="11" fill="white" fillOpacity="0.07" stroke="white" strokeOpacity="0.14" />
      <path d="M170 46V56M165 51H175" stroke="#2a9d6b" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const visuals: Record<string, () => React.JSX.Element> = {
  "ai-cut-expenses": AiVisual,
  "cash-flow-basics": CashVisual,
  "cheque-management": ChequeVisual,
  "log-in-30-seconds": EntryVisual,
};

export function ArticleCover({
  article,
  className = "h-36",
}: {
  article: Article;
  className?: string;
}) {
  const Visual = visuals[article.slug];
  const Icon = article.icon;
  return (
    <div
      aria-hidden
      className={`relative isolate overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-forest/45 via-surface-2 to-bg ${className}`}>
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      {Visual ? (
        <Visual />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gold">
          <Icon size={26} />
        </div>
      )}
    </div>
  );
}

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-2.5 text-[11px] text-muted">
      <span>{articleDate(article)}</span>
      <span className="h-0.5 w-0.5 rounded-full bg-muted" />
      <span className="inline-flex items-center gap-1">
        <Clock size={11} />
        {formatNumber(article.readMinutes)} دقیقه
      </span>
    </div>
  );
}

export function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group grid items-center gap-5 rounded-2xl border border-border bg-surface p-4 transition hover:border-gold/40 md:grid-cols-[1fr_1.05fr] md:gap-8 md:p-5">
      <div className="order-2 md:order-1">
        <span className="inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] text-gold">
          مقاله‌ی ویژه · {article.category}
        </span>
        <h2 className="mt-3 text-lg font-bold leading-9 transition-colors group-hover:text-gold sm:text-xl">
          {article.title}
        </h2>
        <p className="mt-2 text-[13px] leading-7 text-muted">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <ArticleMeta article={article} />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand">
            ادامه‌ی مطلب
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          </span>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <ArticleCover article={article} className="h-44 md:h-56" />
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-3 transition hover:border-brand/50">
      <ArticleCover article={article} />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <span className="text-[11px] text-brand">{article.category}</span>
        <h3 className="mt-1.5 text-sm font-bold leading-7 transition-colors group-hover:text-gold">
          {article.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-muted">{article.excerpt}</p>
        <div className="mt-auto pt-4">
          <ArticleMeta article={article} />
        </div>
      </div>
    </Link>
  );
}