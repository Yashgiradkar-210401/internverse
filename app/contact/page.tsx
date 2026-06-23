import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            We'd Love To Hear From You
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Have a question, suggestion, partnership opportunity,
            or feedback about InternVerse? Reach out to us.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">
              Get In Touch
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-slate-600">
                  hello@internverse.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <p className="text-slate-600">
                  linkedin.com/company/internverse
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-slate-600">
                  India
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border p-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl border p-4"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full rounded-xl border p-4"
              />

              <button className="w-full rounded-xl bg-blue-600 py-3 text-white">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}