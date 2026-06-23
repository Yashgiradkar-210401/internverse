"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function CreateArticlePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("articles")
      .insert({
        user_id: user.id,
        title,
        category,
        content,
        status: "pending",
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Article Created Successfully");

    router.push("/articles");
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Create Article
      </h1>

      <div className="space-y-5">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          rows={10}
          placeholder="Write your article..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border p-4"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          {loading ? "Publishing..." : "Publish Article"}
        </button>
      </div>
    </main>
  );
}