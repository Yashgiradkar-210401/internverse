"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function CreateExperiencePage() {
  const supabase = createClient();
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [learning, setLearning] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const { error } = await supabase
        .from("experiences")
        .insert({
          user_id: user.id,
          company,
          role,
          duration,
          learning,
          advice,
          status: "pending",
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Experience submitted successfully and is awaiting approval."
      );

      router.push("/experiences");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Community Contribution
          </span>

          <h1 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Share Your Internship Experience
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Help students and professionals learn from your journey,
            challenges, and key takeaways.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-10">

          <div className="space-y-6">

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Company Name
              </label>

              <input
                type="text"
                placeholder="e.g. Deloitte, Amdocs, Recordent"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Role
              </label>

              <input
                type="text"
                placeholder="e.g. Business Analyst Intern"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Duration
              </label>

              <input
                type="text"
                placeholder="e.g. 2 Months"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Key Learnings
              </label>

              <textarea
                rows={6}
                placeholder="Share your responsibilities, skills learned, projects worked on, and achievements."
                value={learning}
                onChange={(e) => setLearning(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Advice For Others
              </label>

              <textarea
                rows={6}
                placeholder="What advice would you give future interns?"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Publishing..."
                : "Publish Experience"}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}