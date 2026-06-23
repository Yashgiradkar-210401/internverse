import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-4xl">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            About InternVerse
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Helping Students Learn From Real Career Experiences.
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            InternVerse is a community-driven platform where MBA students,
            graduates, and working professionals share internship experiences,
            career journeys, interview stories, and industry insights.
          </p>

          <p className="mt-4 text-lg text-slate-600">
            Our goal is simple: help students make better career decisions
            through authentic experiences rather than generic advice.
          </p>
        </div>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Learn</h2>

            <p className="mt-4 text-slate-600">
              Read articles, internship stories, and career insights from
              students and professionals.
            </p>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Share</h2>

            <p className="mt-4 text-slate-600">
              Publish your own experiences and help the next generation of
              students.
            </p>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Grow</h2>

            <p className="mt-4 text-slate-600">
              Build your professional presence and contribute to the community.
            </p>
          </div>
        </section>

        <section className="mt-20 rounded-3xl bg-slate-50 p-10">
          <h2 className="text-3xl font-bold">
            Our Mission
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            We believe every internship experience, interview story, and career
            lesson can help someone else make a better decision.
          </p>

          <p className="mt-4 text-lg text-slate-600">
            InternVerse aims to become the most trusted knowledge-sharing
            platform for students and professionals across industries.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}