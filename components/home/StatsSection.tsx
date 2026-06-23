"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function StatsSection() {
  const supabase = createClient();

  const [articles, setArticles] = useState(0);
  const [experiences, setExperiences] = useState(0);
  const [contributors, setContributors] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
   const { count: articleCount } = await supabase
  .from("articles")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("status", "approved");

   const { count: experienceCount } = await supabase
  .from("experiences")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("status", "approved");

    const { count: contributorCount } = await supabase
      .from("profiles")
      .select("*", {
        count: "exact",
        head: true,
      });

    setArticles(articleCount || 0);
    setExperiences(experienceCount || 0);
    setContributors(contributorCount || 0);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
          <h2 className="text-5xl font-bold">
            {articles}
          </h2>

          <p className="mt-3 text-lg">
            Articles Published
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-xl">
          <h2 className="text-5xl font-bold">
            {experiences}
          </h2>

          <p className="mt-3 text-lg">
            Internship Experiences
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-pink-600 p-8 text-white shadow-xl">
          <h2 className="text-5xl font-bold">
            {contributors}
          </h2>

          <p className="mt-3 text-lg">
            Contributors
          </p>
        </div>

      </div>
    </section>
  );
}