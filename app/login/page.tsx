"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

          {/* Left Section */}
          <div className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-white md:flex md:flex-col md:justify-center">

            <h1 className="text-5xl font-bold">
              Welcome Back
            </h1>

            <p className="mt-6 text-lg text-white/90">
              Continue your journey with InternVerse.
              Discover internship experiences, career insights,
              MBA stories and industry knowledge from students
              and professionals.
            </p>

            <div className="mt-10 space-y-4">

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                📚 Explore Real Internship Stories
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                🚀 Share Your Experiences
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                🌎 Connect With Contributors
              </div>

            </div>

          </div>

          {/* Right Section */}
          <div className="p-8 md:p-12">

            <div className="mb-10 text-center">

              <h2 className="text-4xl font-bold text-slate-900">
                InternVerse Login
              </h2>

              <p className="mt-3 text-slate-500">
                Sign in to access your dashboard and content.
              </p>

            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-70"
              >
                {loading ? "Logging In..." : "Login"}
              </button>

              <div className="text-center text-slate-500">
                New to InternVerse?
                <a
                  href="/signup"
                  className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create Account
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}