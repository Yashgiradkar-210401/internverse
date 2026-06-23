"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminUsersPage() {
  const supabase = createClient();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setUsers(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Loading Users...
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Manage Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl border p-6"
          >
            <h2 className="text-xl font-bold">
              {user.name || "No Name"}
            </h2>

            <p className="text-gray-600">
              {user.email}
            </p>

            <p className="mt-2">
              College: {user.college || "N/A"}
            </p>

            <p>
              Role:{" "}
              <span className="font-semibold">
                {user.role}
              </span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}