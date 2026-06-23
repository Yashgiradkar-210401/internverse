import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/admin/articles"
          className="rounded-2xl border p-6"
        >
          Manage Articles
        </Link>

        <Link
          href="/admin/experiences"
          className="rounded-2xl border p-6"
        >
          Manage Experiences
        </Link>

        <Link
          href="/admin/users"
          className="rounded-2xl border p-6"
        >
          Manage Users
        </Link>
      </div>
    </main>
  );
}