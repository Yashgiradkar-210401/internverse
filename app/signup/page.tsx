"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.user) {
        await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            name,
            college,
            course,
            passing_year: passingYear,
            linkedin,
          });
      }

      alert("Account Created Successfully");

      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">

      <div className="mx-auto max-w-3xl">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-center text-white shadow-xl">

          <h1 className="text-5xl font-bold">
            Join InternVerse
          </h1>

          <p className="mt-3 text-lg text-white/90">
            Share internship experiences and grow with the community.
          </p>

        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">

          <div className="grid gap-6 md:grid-cols-2">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl border p-4"
            />

            <input
              type="text"
              placeholder="College / Organization"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="rounded-2xl border p-4"
            />

            <input
              type="text"
              placeholder="Course / Degree"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="rounded-2xl border p-4"
            />

            <input
              type="text"
              placeholder="Passing Year"
              value={passingYear}
              onChange={(e) => setPassingYear(e.target.value)}
              className="rounded-2xl border p-4"
            />

          </div>

          <input
            type="url"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="mt-6 w-full rounded-2xl border p-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-6 w-full rounded-2xl border p-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-6 w-full rounded-2xl border p-4"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

      </div>

    </main>
  );
}