import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
   <footer className="mt-8 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Image
                src="/Company_Logo.png"
                alt="InternVerse"
                width={50}
                height={50}
                className="rounded-xl"
              />

              <div>

                <h2 className="text-3xl font-bold text-slate-900">
                  InternVerse
                </h2>

                <p className="text-sm text-slate-500">
                  Learn • Share • Grow
                </p>

              </div>

            </Link>

            <p className="mt-6 leading-7 text-slate-600">
              Helping students make informed career decisions through
              authentic internship experiences, interview stories,
              and career insights shared by the community.
            </p>

          </div>

          {/* Explore */}
          <div>

            <h3 className="mb-5 text-lg font-bold text-slate-900">
              Explore
            </h3>

            <div className="space-y-3">

              <Link
                href="/articles"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Articles
              </Link>

              <Link
                href="/experiences"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Experiences
              </Link>

              <Link
                href="/contributors"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Contributors
              </Link>

              <Link
                href="/experiences/create"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Share Experience
              </Link>

            </div>

          </div>

          {/* Resources */}
          <div>

            <h3 className="mb-5 text-lg font-bold text-slate-900">
              Resources
            </h3>

            <div className="space-y-3">

              <Link
                href="/about"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                About
              </Link>

              <Link
                href="/privacy-policy"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/contact"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Community */}
          <div>

            <h3 className="mb-5 text-lg font-bold text-slate-900">
              Community
            </h3>

            <div className="space-y-3">

              <Link
                href="/login"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Sign Up
              </Link>

              <Link
                href="/dashboard"
                className="block text-slate-600 transition hover:text-blue-600"
              >
                Dashboard
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 md:flex-row">

          <p className="text-center text-slate-500 md:text-left">
            © {new Date().getFullYear()} InternVerse. Built for students,
            by students.
          </p>

          <div className="flex items-center gap-6">

            <a
              href="https://www.linkedin.com/company/130384447/admin/feed/following/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-500 transition hover:text-blue-600"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-500 transition hover:text-slate-900"
            >
              GitHub
            </a>

            <a
              href="mailto:contact@internverse.com"
              className="font-medium text-slate-500 transition hover:text-blue-600"
            >
              Email
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}