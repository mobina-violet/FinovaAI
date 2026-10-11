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
      <div
        role="tablist"
        aria-label="دسته‌بندی مقالات"
        className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active
                  ? "border-gold/50 bg-gold/10 text-gold"
                  : "border-border text-muted hover:border-white/20 hover:text-fg"
              }`}>
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-10 space-y-6">
        {featured && <FeaturedArticleCard article={featured} />}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}