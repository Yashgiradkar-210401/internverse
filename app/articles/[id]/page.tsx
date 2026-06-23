"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function ArticleDetailPage() {
  const supabase = createClient();
  const params = useParams();

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      if (!params?.id) return;

     const { data, error } = await supabase
  .from("articles")
  .select("*")
  .eq("id", Number(params.id))
  .eq("status", "approved")
  .single();
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setArticle(data);
      setLoading(false);
    }

    fetchArticle();
  }, [params]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="animate-pulse">
          <div className="h-64 rounded-3xl bg-slate-200"></div>
          <div className="mt-8 h-12 w-3/4 rounded bg-slate-200"></div>
          <div className="mt-4 h-6 w-1/3 rounded bg-slate-200"></div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
          <h1 className="text-4xl font-bold">
            Article Not Found
          </h1>

          <p className="mt-4 text-slate-500">
            The article you are looking for does not exist.
          </p>

          <Link
            href="/articles"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Back to Articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">

      {/* Hero Banner */}
  <div className="mb-10 flex h-48 md:h-56 items-center rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-10 shadow-xl">

  <div>
    <p className="text-white/80">
      InternVerse Article
    </p>

    <h2 className="mt-2 text-3xl font-bold text-white">
      Career Insights & Internship Learning
    </h2>
  </div>

</div>

      {/* Category */}
      <div className="mb-6">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          {article.category}
        </span>
      </div>

      {/* Title */}
    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
        {article.title}
      </h1>

      {/* Meta */}
    <div className="mt-6 flex flex-wrap gap-3 text-slate-500">
  <span>
    Published on{" "}
    {new Date(article.created_at).toLocaleDateString()}
  </span>

  <span>•</span>

  <span>2 min read</span>

  <span>•</span>

  <span>InternVerse Community</span>
</div>

      <div className="my-10 border-b"></div>

      {/* Content */}
 <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-lg">
  <article className="text-xl leading-9 text-slate-700">
          {article.content}
        </article>
      </div>

      {/* CTA */}
    <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-xl">
        <h3 className="text-2xl font-bold">
          Enjoyed this article?
        </h3>

        <p className="mt-3 text-slate-600">
          Explore more internship stories, career insights,
          and interview experiences from our community.
        </p>

        <Link
          href="/articles"
       className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition hover:scale-105"
        >
          Explore More Articles
        </Link>
      </div>

      {/* Back Link */}
      <div className="mt-10">
        <Link
          href="/articles"
          className="font-semibold text-blue-600"
        >
          ← Back to Articles
        </Link>
      </div>

    </main>
  );
}