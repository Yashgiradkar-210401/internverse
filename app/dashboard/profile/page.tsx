"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function ProfilePage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setName(data?.name || "");
    setCollege(data?.college || "");
    setLinkedin(data?.linkedin || "");
    setBio(data?.bio || "");

    setLoading(false);
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          name,
          college,
          linkedin,
          bio,
        })
        .eq("id", user.id);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Profile Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading Profile...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Cover Section */}
      <div className="h-72 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

      <div className="mx-auto max-w-7xl px-6">

        {/* Profile Header */}
        <div className="-mt-24 rounded-3xl bg-white p-8 shadow-xl">

          <div className="flex flex-col items-center gap-6 md:flex-row">

            <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-blue-600 to-indigo-600 text-6xl font-bold text-white shadow-lg">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>

            <div className="flex-1">

              <h1 className="text-5xl font-bold text-slate-900">
                {name || "Your Name"}
              </h1>

              <p className="mt-2 text-xl text-slate-600">
                {college || "Community Contributor"}
              </p>

              <p className="mt-3 text-slate-500">
                Build your professional identity on InternVerse.
              </p>

            </div>

          </div>

        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Sidebar */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">

            <h2 className="mb-6 text-xl font-bold">
              Profile Overview
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-semibold">
                  {name || "Not Added"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  College
                </p>

                <p className="font-semibold">
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
                    className="font-semibold text-blue-600"
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

                <p className="text-slate-700">
                  {bio || "No bio available"}
                </p>
              </div>

            </div>

          </div>

          {/* Edit Form */}
          <div className="rounded-3xl bg-white p-8 shadow-lg lg:col-span-2">

            <h2 className="mb-8 text-3xl font-bold">
              Edit Profile
            </h2>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  College / Organization
                </label>

                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="NL Dalmia, Amdocs, Deloitte..."
                  className="w-full rounded-2xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  LinkedIn URL
                </label>

                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full rounded-2xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Bio
                </label>

                <textarea
                  rows={6}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the community about yourself..."
                  className="w-full rounded-2xl border border-slate-300 p-4 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}