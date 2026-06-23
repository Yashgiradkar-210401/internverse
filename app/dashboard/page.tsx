"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setEmail(user?.email || "");
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold">
          Loading Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6">

      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold md:text-5xl">
          Welcome Back 👋
        </h1>

        <p className="mt-4 text-lg text-white/90">
          Logged in as {email}
        </p>

      </div>

      {/* Stats */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-blue-600">
            0
          </h2>

          <p className="mt-2 text-slate-600">
            Articles Published
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-green-600">
            0
          </h2>

          <p className="mt-2 text-slate-600">
            Experiences Shared
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="text-4xl font-bold text-purple-600">
            Active
          </h2>

          <p className="mt-2 text-slate-600">
            Account Status
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">

          <a
            href="/create-article"
            className="rounded-2xl bg-blue-600 px-6 py-3 text-white"
          >
            Write Article
          </a>

          <a
            href="/experiences/create"
            className="rounded-2xl bg-indigo-600 px-6 py-3 text-white"
          >
            Share Experience
          </a>

          <a
            href="/profile"
            className="rounded-2xl border px-6 py-3"
          >
            Edit Profile
          </a>

        </div>

      </div>

    </main>
  );
}