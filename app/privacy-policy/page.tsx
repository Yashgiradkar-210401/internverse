import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-6 text-slate-600">
          Last Updated: June 2026
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold">
              Information We Collect
            </h2>

            <p className="mt-4 text-slate-600">
              We may collect information such as your name,
              email address, profile information, articles,
              experiences, and platform activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              How We Use Information
            </h2>

            <p className="mt-4 text-slate-600">
              Information is used to provide platform
              functionality, improve user experience,
              and enable content sharing within the community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Data Security
            </h2>

            <p className="mt-4 text-slate-600">
              We take reasonable measures to protect user
              information and maintain platform security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Third-Party Services
            </h2>

            <p className="mt-4 text-slate-600">
              InternVerse may use trusted third-party services
              such as authentication, analytics, hosting,
              and database providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Contact
            </h2>

            <p className="mt-4 text-slate-600">
              If you have any questions regarding this privacy
              policy, please contact us through the Contact page.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}