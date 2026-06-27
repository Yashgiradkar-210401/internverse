"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function Navbar() {
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
    });

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
  <div className="mx-auto flex max-w-[1450px] items-center justify-between px-8 py-4">

    {/* Logo */}
    <Link
      href="/"
      className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
    >
      <Image
        src="/Company_Logo.png"
        alt="InternVerse Logo"
        width={52}
        height={52}
        priority
        className="rounded-xl"
      />

      <div>
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent">
          InternVerse
        </h1>

        <p className="-mt-1 text-xs tracking-wide text-slate-500">
          Learn • Share • Grow
        </p>
      </div>
    </Link>

    {/* Desktop Menu */}
    <div className="hidden items-center gap-4 lg:gap-6 md:flex">

      <Link
        href="/"
        className="rounded-full px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
      >
        Home
      </Link>

      <Link
        href="/articles"
        className="rounded-full px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
      >
        Articles
      </Link>

      <Link
        href="/experiences"
        className="rounded-full px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
      >
        Experiences
      </Link>

      <Link
        href="/contributors"
        className="rounded-full px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
      >
        Contributors
      </Link>

      <Link
        href="/about"
        className="rounded-full px-4 py-2 font-medium text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
      >
        About
      </Link>

      {user ? (
        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <span className="font-medium">
              My Account
            </span>

            <span className="text-sm">
              ▼
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

              <div className="border-b bg-slate-50 p-4">
                <p className="truncate font-semibold">
                  {user.email}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {role}
                </p>
              </div>

              <Link
                href="/dashboard"
                className="block px-5 py-3 transition hover:bg-slate-100"
              >
                📊 Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                className="block px-5 py-3 transition hover:bg-slate-100"
              >
                👤 My Profile
              </Link>

              {role === "super_admin" && (
                <Link
                  href="/admin"
                  className="block px-5 py-3 transition hover:bg-slate-100"
                >
                  ⚙ Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full border-t px-5 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                🚪 Logout
              </button>

            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Signup
          </Link>
        </>
      )}
    </div>

    {/* Mobile Menu Button */}
    <button
      className="rounded-xl border border-slate-200 bg-white p-2 text-2xl shadow-sm transition hover:bg-slate-100 md:hidden"
      onClick={() => setIsOpen(!isOpen)}
    >
      ☰
    </button>

  </div>
        {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-2 px-6 py-6">

            <Link
              href="/"
              className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
            >
              Home
            </Link>

            <Link
              href="/articles"
              className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
            >
              Articles
            </Link>

            <Link
              href="/experiences"
              className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
            >
              Experiences
            </Link>

            <Link
              href="/contributors"
              className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
            >
              Contributors
            </Link>

            <Link
              href="/about"
              className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
            >
              About
            </Link>

            <hr className="my-2" />

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
                >
                  📊 Dashboard
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
                >
                  👤 My Profile
                </Link>

                {role === "super_admin" && (
                  <Link
                    href="/admin"
                    className="block rounded-xl px-4 py-3 transition hover:bg-blue-50"
                  >
                    ⚙ Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-3 w-full rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-xl border border-slate-300 px-4 py-3 text-center font-medium transition hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center font-semibold text-white shadow-lg transition hover:shadow-xl"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}