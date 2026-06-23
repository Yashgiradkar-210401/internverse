"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminArticlesPage() {
  const supabase = createClient();

  const [articles, setArticles] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "super_admin") {
      setAuthorized(true);
      fetchArticles();
    }

    setLoading(false);
  }

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    setArticles(data || []);
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
    await supabase
      .from("articles")
      .update({ status })
      .eq("id", id);

    fetchArticles();
  }

  if (loading) {
    return (
      <main className="p-10">
        Loading...
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="p-10">
        <h1 className="text-4xl font-bold text-red-600">
          Access Denied
        </h1>

        <p className="mt-4">
          Super Admin access required.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Manage Articles
      </h1>

      <div className="space-y-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="rounded-xl border p-6"
          >
            <h2 className="text-2xl font-bold">
              {article.title}
            </h2>

            <p>{article.category}</p>

            <p className="mt-4">
              {article.content}
            </p>

            <p className="mt-4">
              Status: {article.status}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() =>
                  updateStatus(
                    article.id,
                    "approved"
                  )
                }
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    article.id,
                    "rejected"
                  )
                }
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}