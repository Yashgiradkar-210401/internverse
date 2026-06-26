"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function ContributorsPage() {
  const supabase = createClient();

  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributors();
  }, []);

  async function fetchContributors() {
const { data, error } = await supabase
  .from("profiles")
  .select(`
    id,
    name,
    role,
    is_public
  `)
  .eq("is_public", true)
  .not("name", "is", null)
  .order("created_at", { ascending: false })

    setContributors(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-12 w-72 rounded bg-slate-200"></div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="h-72 rounded-3xl bg-slate-200"></div>
            <div className="h-72 rounded-3xl bg-slate-200"></div>
            <div className="h-72 rounded-3xl bg-slate-200"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">

      {/* Hero */}
      <div className="mb-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold md:text-5xl">
          Top Contributors
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-white/90">
          Meet the students and professionals sharing internship
          experiences, career insights, interview preparation
          strategies, and industry knowledge.
        </p>

        <div className="mt-8 inline-flex rounded-2xl bg-white/20 px-5 py-3 backdrop-blur">
          <span className="font-semibold">
            {contributors.length} Contributors
          </span>
        </div>

      </div>

      {/* Empty State */}
      {contributors.length === 0 ? (
        <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">

          <h2 className="text-3xl font-bold">
            No Contributors Found
          </h2>

          <p className="mt-4 text-slate-500">
            Contributors will appear here once profiles are created.
          </p>

        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {contributors.map((user) => (
            <div
              key={user.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-3xl font-bold text-white">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Name */}
              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                {user.name}
              </h2>

              {/* College */}
              <p className="mt-2 text-blue-600">
                {user.college || "Community Contributor"}
              </p>

              {/* Bio */}
              <p className="mt-5 line-clamp-4 leading-7 text-slate-600">
                {user.bio || "No bio added yet."}
              </p>

              {/* Stats Area */}
              <div className="mt-6 flex gap-3">

                <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm">
                  Contributor
                </div>

                <div className="rounded-xl bg-blue-100 px-4 py-2 text-sm text-blue-700">
                  Active
                </div>

              </div>

              {/* LinkedIn */}
              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                  View LinkedIn
                </a>
              )}

            </div>
          ))}

        </div>
      )}
    </main>
  );
}