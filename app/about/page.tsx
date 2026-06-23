import Link from "next/link";
import Footer from "../../components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-24 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              About InternVerse
            </span>

            <h1 className="mt-6 text-5xl font-bold md:text-6xl">
              Helping Students Learn From Real Career Experiences
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90">
              InternVerse is a community-driven platform where students,
              MBA graduates, and professionals share internship experiences,
              career journeys, interview stories, and industry insights.
            </p>

          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-7xl px-6 py-20">

          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="text-4xl font-bold text-slate-900">
              Our Mission
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Most students struggle to find authentic internship experiences.
              Advice online is often generic, while real lessons remain hidden
              with individuals.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              InternVerse bridges this gap by enabling students and professionals
              to share genuine experiences that help others make better career
              decisions.
            </p>

          </div>

        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-6 pb-20">

          <h2 className="mb-12 text-center text-4xl font-bold text-slate-900">
            Why InternVerse?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1">
              <div className="text-5xl">🚀</div>

              <h3 className="mt-4 text-2xl font-bold">
                Learn
              </h3>

              <p className="mt-4 text-slate-600">
                Read internship stories, interview experiences,
                and career insights from real contributors.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1">
              <div className="text-5xl">🤝</div>

              <h3 className="mt-4 text-2xl font-bold">
                Share
              </h3>

              <p className="mt-4 text-slate-600">
                Publish your own experiences and help the next
                generation of students.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1">
              <div className="text-5xl">📈</div>

              <h3 className="mt-4 text-2xl font-bold">
                Grow
              </h3>

              <p className="mt-4 text-slate-600">
                Build your professional presence and contribute
                to a growing knowledge community.
              </p>
            </div>

          </div>

        </section>

       
        {/* CTA */}
        <section className="bg-slate-900 py-20 text-white">

          <div className="mx-auto max-w-4xl px-6 text-center">

            <h2 className="text-4xl font-bold">
              Ready to Contribute?
            </h2>

            <p className="mt-4 text-lg text-slate-300">
              Share your internship journey and help others learn from your experience.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                href="/experiences/create"
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
              >
                Share Experience
              </Link>

              <Link
                href="/articles"
                className="rounded-xl border border-white px-8 py-4 font-semibold hover:bg-white hover:text-slate-900"
              >
                Explore Articles
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}