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
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          InternVerse
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/">Home</Link>

          <Link href="/articles">
            Articles
          </Link>

          <Link href="/experiences">
            Experiences
          </Link>

          <Link href="/contributors">
            Contributors
          </Link>

          {user ? (
            <>
              <Link href="/dashboard">
                Dashboard
              </Link>

              <Link href="/dashboard/profile">
                Profile
              </Link>

              {role === "super_admin" && (
                <Link href="/admin">
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border px-4 py-2"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-4 p-4">
            <Link href="/">Home</Link>

            <Link href="/articles">
              Articles
            </Link>

            <Link href="/experiences">
              Experiences
            </Link>

            <Link href="/contributors">
              Contributors
            </Link>

            {user ? (
              <>
                <Link href="/dashboard">
                  Dashboard
                </Link>

                <Link href="/dashboard/profile">
                  Profile
                </Link>

                {role === "super_admin" && (
                  <Link href="/admin">
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  Login
                </Link>

                <Link href="/signup">
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