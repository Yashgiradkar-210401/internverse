import Footer from "../components/layout/Footer";
import StatsSection from "../components/home/StatsSection";
import FeaturedArticles from "../components/home/FeaturedArticles";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">

            <div className="max-w-4xl">

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                Internship Community Platform
              </span>

              <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 md:text-7xl">
                Learn from Real Internship Experiences
              </h1>

              <p className="mt-8 max-w-2xl text-xl text-slate-600">
                Explore internship stories, interview experiences,
                MBA insights, analytics careers, consulting journeys,
                and industry knowledge shared by students and professionals.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="/articles"
                  className="rounded-xl bg-blue-600 px-8 py-4 text-white shadow-lg transition hover:bg-blue-700"
                >
                  Explore Articles
                </a>

                <a
                  href="/experiences/create"
                  className="rounded-xl border border-slate-300 bg-white px-8 py-4 transition hover:bg-slate-50"
                >
                  Share Experience
                </a>

              </div>

            </div>

          </div>
        </section>

        {/* Dynamic Stats */}
        <StatsSection />

      <FeaturedArticles />
      </main>

      <Footer />
    </>
  );
}