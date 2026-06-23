"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function FeaturedArticles() {
  const supabase = createClient();

  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "approved")
      .limit(3)
      .order("created_at", {
        ascending: false,
      });

    setArticles(data || []);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">
          Featured Articles
        </h2>

        <Link
          href="/articles"
          className="font-semibold text-blue-600"
        >
          View All →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {article.category}
            </span>

            <h3 className="mt-4 text-xl font-bold">
              {article.title}
            </h3>

            <p className="mt-3 text-slate-600 line-clamp-3">
              {article.content}
            </p>

            <Link
              href={`/articles/${article.id}`}
              className="mt-6 inline-block text-blue-600"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}