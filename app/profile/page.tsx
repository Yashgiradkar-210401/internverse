"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setName(data.name || "");
      setCollege(data.college || "");
      setLinkedin(data.linkedin || "");
      setBio(data.bio || "");
    }
  }

  async function saveProfile() {
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
        .from("profiles")
        .upsert({
          id: user.id,
          name,
          college,
          linkedin,
          bio,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-7xl">

        {/* Cover Banner */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

          <div className="relative px-8 pb-8">

            <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">

              <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">

                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-blue-600 shadow-lg">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>

                <div className="mt-4 text-center md:mt-0 md:text-left">

                  <h1 className="text-4xl font-bold text-slate-900">
                    {name || "Your Name"}
                  </h1>

                  <p className="mt-1 text-lg text-slate-600">
                    {college || "Community Contributor"}
                  </p>

                  <p className="mt-2 text-slate-500">
                    InternVerse Contributor
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left Card */}
          <div className="rounded-3xl bg-white p-6 shadow-xl">

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Profile Summary
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-medium text-slate-900">
                  {name || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  College / Organization
                </p>

                <p className="font-medium text-slate-900">
                  {college || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  LinkedIn
                </p>

                {linkedin ? (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600"
                  >
                    View Profile →
                  </a>
                ) : (
                  <p>Not Added</p>
                )}
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Bio
                </p>

                <p className="text-sm text-slate-700">
                  {bio || "No bio added yet."}
                </p>
              </div>

            </div>

          </div>

          {/* Right Form */}
          <div className="rounded-3xl bg-white p-8 shadow-xl lg:col-span-2">

            <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Edit Profile
            </h2>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  College / Organization
                </label>

                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="NL Dalmia, Amdocs, Deloitte..."
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  LinkedIn URL
                </label>

                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Bio
                </label>

                <textarea
                  rows={6}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the community about yourself..."
                  className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-blue-500"
                />
              </div>

              <button
                onClick={saveProfile}
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-70"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}