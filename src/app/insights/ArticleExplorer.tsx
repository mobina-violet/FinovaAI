"use client";

import { useState } from "react";
import { articles, categories } from "@/lib/insights";
import { ArticleCard, FeaturedArticleCard } from "@/components/insights/ArticleCard";

export default function ArticleExplorer() {
  const [category, setCategory] = useState("همه");

  const showAll = category === "همه";
  const visible = showAll ? articles : articles.filter((a) => a.category === category);
  const featured = showAll ? articles.find((a) => a.featured) : undefined;
  const rest = featured ? visible.filter((a) => a.slug !== featured.slug) : visible;

  return (
    <div>
      {/* عنوان + فیلتر توی یک ردیف */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] text-brand">بینش مالی</p>
          <h2 className="mt-1.5 text-xl font-bold">نکته‌هایی برای تصمیم‌های بهتر</h2>
        </div>

        <div role="tablist" aria-label="دسته‌بندی مقالات" className="flex flex-wrap gap-1.5">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  active
                    ? "border-gold/50 bg-gold/10 text-gold"
                    : "border-border text-muted hover:border-white/20 hover:text-fg"
                }`}>
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {featured && <FeaturedArticleCard article={featured} />}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}