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
      .order("created_at", {
        ascending: false,
      })
      .limit(3);

    setArticles(data || []);
  }

  return (
   <section className="mx-auto max-w-7xl px-6 pt-20 pb-8">

      {/* Header */}
      <div className="mb-12 flex items-end justify-between">

        <div>
          <h2 className="text-5xl font-bold text-slate-900">
            Featured Articles
          </h2>

          <p className="mt-3 max-w-2xl text-lg text-slate-500">
            Curated internship experiences, interview stories and career
            insights shared by students and professionals.
          </p>
        </div>

        <Link
          href="/articles"
          className="rounded-xl border border-blue-200 px-5 py-3 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
        >
          View All →
        </Link>

      </div>

      {/* Empty State */}
      {articles.length === 0 ? (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">

          <div className="text-6xl">
            📚
          </div>

          <h3 className="mt-6 text-3xl font-bold">
            No Articles Yet
          </h3>

          <p className="mt-3 text-slate-500">
            Featured articles will appear here once approved.
          </p>

        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {articles.map((article) => (

            <Link
              href={`/articles/${article.id}`}
              key={article.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Gradient Top */}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

              <div className="p-7">

                {/* Category */}
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {article.category || "General"}
                </span>

                {/* Title */}
                <h3 className="mt-5 line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
                  {article.title}
                </h3>

                {/* Content */}
                <p className="mt-4 line-clamp-4 leading-7 text-slate-600">
                  {article.content}
                </p>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between border-t pt-5">

                  <div>

                    <p className="text-sm text-slate-500">
                      Published
                    </p>

                    <p className="font-semibold">
                      {new Date(article.created_at).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="rounded-xl bg-blue-600 px-4 py-2 text-white transition group-hover:scale-110">
                    →
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>
      )}

    </section>
  );
}