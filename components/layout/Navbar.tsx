"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function Navbar() {
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          setRole(data?.role || "");
        } else {
          setRole("");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role || "");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            InternVerse
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/articles"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Articles
          </Link>

          <Link
            href="/experiences"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Experiences
          </Link>

          <Link
            href="/contributors"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Contributors
          </Link>

          <Link
            href="/about"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="font-medium text-slate-700 transition hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                className="font-medium text-slate-700 transition hover:text-blue-600"
              >
                Profile
              </Link>

              {role === "super_admin" && (
                <Link
                  href="/admin"
                  className="font-medium text-slate-700 transition hover:text-blue-600"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-5 py-2 font-medium transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 font-medium text-white shadow-md transition hover:scale-105"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-3xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">

            <Link href="/">Home</Link>
            <Link href="/articles">Articles</Link>
            <Link href="/experiences">Experiences</Link>
            <Link href="/contributors">Contributors</Link>
            <Link href="/about">About</Link>

            {user ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/profile">Profile</Link>

                {role === "super_admin" && (
                  <Link href="/admin">Admin</Link>
                )}

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/signup">Signup</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}