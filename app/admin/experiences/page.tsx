"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminExperiencesPage() {
  const supabase = createClient();

  const [experiences, setExperiences] = useState<any[]>([]);

  async function fetchExperiences() {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setExperiences(data || []);
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
    const { error } = await supabase
      .from("experiences")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchExperiences();
  }

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Manage Experiences
      </h1>

      <div className="space-y-6">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="rounded-xl border p-6"
          >
            <h2 className="text-2xl font-bold">
              {experience.company}
            </h2>

            <p className="mt-2 text-gray-500">
              {experience.role}
            </p>

            <p className="mt-4">
              {experience.learning}
            </p>

            <p className="mt-4">
              Status:
              <span className="ml-2 font-semibold">
                {experience.status}
              </span>
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() =>
                  updateStatus(
                    experience.id,
                    "approved"
                  )
                }
                className="rounded bg-green-600 px-4 py-2 text-white"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    experience.id,
                    "rejected"
                  )
                }
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}