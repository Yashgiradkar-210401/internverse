import Footer from "../components/layout/Footer";
import StatsSection from "../components/home/StatsSection";
import FeaturedArticles from "../components/home/FeaturedArticles";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero */}
       <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background Decoration */}
<div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

<div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>

<div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-300 opacity-10 blur-3xl"></div>
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">

            {/* Left Side */}
            <div>

              <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
                🚀 Internship Community Platform
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
                Learn from{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Real Internship
                </span>{" "}
                Experiences
              </h1>

              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">
                Explore internship stories, interview experiences, MBA insights,
                analytics careers, consulting journeys, and industry knowledge
                shared by students and professionals.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="/articles"
                  className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700"
                >
                  Explore Articles →
                </a>

                <a
                  href="/experiences/create"
                  className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-slate-100"
                >
                  Share Experience
                </a>

              </div>

            </div>

            {/* Right Side */}
            <div className="relative hidden lg:flex items-center justify-center">

              {/* Main Dashboard Card */}
              <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">

                <h2 className="text-2xl font-bold text-slate-900">
Everything You Need                </h2>

                <p className="mt-2 text-slate-500">
                  Discover articles, internship experiences and contributors.
                </p>

                <div className="mt-8 space-y-5">

                  <div className="flex items-center justify-between rounded-2xl bg-blue-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                    <div>
                      <h3 className="font-semibold">Articles</h3>
                      <p className="text-sm text-slate-500">
                        Learn from real stories
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-600 px-4 py-2 text-white">
                      →
                    </div>
                  </div>

            <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div>
                      <h3 className="font-semibold">
                        Experiences
                      </h3>

                      <p className="text-sm text-slate-500">
                        Internship journeys
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-600 px-4 py-2 text-white">
                      →
                    </div>
                  </div>

         <div className="flex items-center justify-between rounded-2xl bg-purple-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                    <div>

                      <h3 className="font-semibold">
                        Contributors
                      </h3>

                      <p className="text-sm text-slate-500">
                        Community members
                      </p>

                    </div>

                    <div className="rounded-xl bg-purple-600 px-4 py-2 text-white">
                      →
                    </div>

                  </div>

                </div>

              </div>

              {/* Floating Card */}
              <div className="absolute -top-8 -right-8 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-xl">
                🚀 Build Your Career
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 rounded-2xl bg-white px-6 py-4 shadow-xl">
              📖 Learn from Real Stories
              </div>

            </div>

          </div>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* Articles */}
        <FeaturedArticles />

      </main>

      <Footer />
    </>
  );
}