"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function ExperiencesPage() {
  const supabase = createClient();

  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      const { data, error } = await supabase
        .from("experiences")
.select("*")
.eq("status", "approved")
.order("created_at", { ascending: false });
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setExperiences(data || []);
      setLoading(false);
    }

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 rounded bg-slate-200"></div>
          <div className="h-64 rounded-3xl bg-slate-200"></div>
          <div className="h-64 rounded-3xl bg-slate-200"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">

      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-slate-900">
            Internship Experiences
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Learn directly from students and professionals who have completed internships across industries.
          </p>
        </div>

        <Link
          href="/experiences/create"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-center text-white shadow-lg transition hover:scale-105"
        >
          Share Experience
        </Link>

      </div>

      {/* Empty State */}
      {experiences.length === 0 ? (
        <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">

          <h2 className="text-3xl font-bold">
            No Experiences Yet
          </h2>

          <p className="mt-4 text-slate-500">
            Be the first contributor to share your internship journey.
          </p>

          <Link
            href="/experiences/create"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Share Experience
          </Link>

        </div>
      ) : (
        <div className="grid gap-8">

          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Top Section */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {experience.company}
                  </h2>

                  <p className="mt-2 text-lg font-medium text-blue-600">
                    {experience.role}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 px-5 py-3 text-blue-700">
                  {experience.duration}
                </div>

              </div>

              {/* Content */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="mb-3 text-xl font-semibold">
                    📚 Key Learnings
                  </h3>

                  <p className="leading-7 text-slate-600">
                    {experience.learning}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6">
                  <h3 className="mb-3 text-xl font-semibold">
                    💡 Advice
                  </h3>

                  <p className="leading-7 text-slate-600">
                    {experience.advice}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </main>
  );
}