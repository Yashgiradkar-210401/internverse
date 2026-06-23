"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function ArticlesPage() {
  const supabase = createClient();

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
     const { data, error } = await supabase
  .from("articles")
  .select("*")
  .eq("status", "approved")
  .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setArticles(data || []);
      setLoading(false);
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Loading Articles...
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Articles
        </h1>

        <Link
          href="/articles/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Create Article
        </Link>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Link
            href={`/articles/${article.id}`}
            key={article.id}
            className="block rounded-2xl border p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">
              {article.title}
            </h2>

            <p className="mt-2 text-gray-500">
              {article.category}
            </p>

            <p className="mt-4 line-clamp-3">
              {article.content}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Status: {article.status}
              </span>

              <span className="text-sm font-medium text-blue-600">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}