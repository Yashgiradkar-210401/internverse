"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

type Article = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  status: string;
  created_at: string;
};

export default function ArticlesPage() {
  const supabase = createClient();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "approved")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setArticles((data as Article[]) || []);
    setLoading(false);
  }

  const categories = useMemo(() => {
    const values = Array.from(
      new Set(
        articles
          .map((article) => article.category)
          .filter(Boolean)
      )
    );

    return ["All", ...(values as string[])];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" ||
        article.category === selectedCategory;

      const matchesSearch =
        query === "" ||
        article.title?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, search, selectedCategory]);

  function getReadingTime(text: string) {
    if (!text) return "1 min read";

    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`;
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="animate-pulse">
          <div className="h-12 w-72 rounded-xl bg-slate-200"></div>

          <div className="mt-6 h-6 w-[500px] rounded bg-slate-200"></div>

          <div className="mt-10 h-14 rounded-2xl bg-slate-200"></div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-80 rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">      {/* Hero */}
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 text-white shadow-2xl md:px-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              📚 Knowledge Hub
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl">
              Discover Articles
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              Learn from authentic internship experiences, interview journeys,
              MBA insights, analytics careers and professional stories shared by
              students and working professionals.
            </p>
          </div>

          <Link
            href="/articles/create"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            + Create Article
          </Link>
        </div>
      </section>

      {/* Search */}
      <div className="mt-12">
        <input
          type="text"
          placeholder="🔍 Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-lg shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Categories */}
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Latest Articles
          </h2>

          <p className="mt-1 text-slate-500">
            {filteredArticles.length} article
            {filteredArticles.length !== 1 && "s"} found
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">        {filteredArticles.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-14 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-5xl">
              📚
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              No Articles Found
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              We couldn't find any articles matching your search.
              Try another keyword or be the first to publish an article.
            </p>

            <Link
              href="/articles/create"
              className="mt-8 inline-flex rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              + Create Article
            </Link>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Top Gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

              <div className="p-7">
                {/* Category */}
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {article.category || "General"}
                </span>

                {/* Title */}
                <h2 className="mt-5 line-clamp-2 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
                  {article.title}
                </h2>

                {/* Content */}
                <p className="mt-4 line-clamp-4 leading-7 text-slate-600">
                  {article.content}
                </p>

                {/* Footer */}
                <div className="mt-8 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{formatDate(article.created_at)}</span>

                    <span>{getReadingTime(article.content)}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                      {article.status}
                    </span>

                    <span className="font-semibold text-blue-600 transition group-hover:translate-x-1">
                      Read Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}