"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

type Contributor = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  college: string | null;
  course: string | null;
  passing_year: string | null;
  linkedin: string | null;
  is_public: boolean;
};

export default function ContributorProfilePage() {
  const params = useParams();
  const supabase = createClient();

  const [user, setUser] = useState<Contributor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchContributor(params.id as string);
    }
  }, [params]);

  async function fetchContributor(id: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        name,
        role,
        bio,
        college,
        course,
        passing_year,
        linkedin,
        is_public
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (!data.is_public) {
      setLoading(false);
      return;
    }

    setUser(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 rounded bg-slate-200"></div>
          <div className="h-80 rounded-3xl bg-slate-200"></div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">
          Contributor Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          This contributor doesn't exist or has chosen to keep their profile
          private.
        </p>

        <Link
          href="/contributors"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Back to Contributors
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link
        href="/contributors"
        className="mb-8 inline-flex text-blue-600 hover:underline"
      >
        ← Back to Contributors
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-5xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            {user.name}
          </h1>

          <p className="mt-2 rounded-full bg-blue-100 px-5 py-2 text-blue-700">
            {user.role || "Community Contributor"}
          </p>
        </div>

        {/* About & Education */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">

          {/* About */}
          <div className="rounded-2xl border p-6">
            <h2 className="mb-4 text-2xl font-bold">
              About
            </h2>

            <p className="leading-8 text-slate-600">
              {user.bio || "This contributor hasn't added a bio yet."}
            </p>
          </div>

          {/* Education */}
          <div className="rounded-2xl border p-6">
            <h2 className="mb-4 text-2xl font-bold">
              Education
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">
                  College
                </p>

                <p className="font-semibold">
                  {user.college || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Course
                </p>

                <p className="font-semibold">
                  {user.course || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Passing Year
                </p>

                <p className="font-semibold">
                  {user.passing_year || "Not Added"}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* LinkedIn */}
        {user.linkedin && (
          <div className="mt-10 text-center">
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              View LinkedIn
            </a>
          </div>
        )}
      </div>
    </main>
  );
}