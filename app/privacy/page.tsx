import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: "What we collect",
    body: "Only what you type into the contact form: your name, email, phone number, budget range, the package you're interested in and your message. We do not run advertising trackers on this site by default.",
  },
  {
    heading: "How it's used",
    body: "Your details are used for one purpose: to reply to your enquiry and, if you choose to engage us, to scope and deliver the project. We do not sell, rent or share your information with third parties.",
  },
  {
    heading: "Storage & retention",
    body: "Enquiries are delivered to our inbox. We keep them only as long as needed to respond and to maintain a basic record of project correspondence, then delete them on request.",
  },
  {
    heading: "Cookies & analytics",
    body: "This site uses no non-essential cookies. If analytics or Google Tag Manager is enabled, it is configured to operate without collecting personally identifiable information.",
  },
  {
    heading: "Third-party links",
    body: "Links to WhatsApp, email or external sites are provided for your convenience. Their privacy practices are governed by their own policies.",
  },
  {
    heading: "Your rights",
    body: `You may request a copy of, or the deletion of, any information you have shared. Write to ${site.email} or message us on WhatsApp and we'll respond promptly.`,
  },
];

export default function PrivacyPage() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-field opacity-60" />
        <div className="absolute inset-0 vignette" />
      </div>

      <Container>
        <div className="max-w-3xl">
          <p className="font-mono text-[0.72rem] tracking-[0.26em] text-cyan uppercase">
            {"// legal"}
          </p>
          <h1 className="mt-5 text-[clamp(2.4rem,6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-mist">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-[0.72rem] tracking-[0.14em] text-mist-4 uppercase">
            Last updated · January 2026
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.heading} className="border-l border-line pl-5 sm:pl-7">
                <h2 className="text-lg font-semibold tracking-tight text-mist sm:text-xl">
                  {section.heading}
                </h2>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-mist-3">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-line bg-white/[0.02] p-6">
            <a
              href={site.emailHref}
              className="font-mono text-sm text-cyan underline decoration-cyan/40 underline-offset-4"
            >
              {site.email}
            </a>
            <span aria-hidden className="text-mist-4">
              ·
            </span>
            <a
              href={site.phoneHref}
              className="font-mono text-sm text-cyan underline decoration-cyan/40 underline-offset-4"
            >
              {site.phoneDisplay}
            </a>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.16em] text-mist-4 uppercase transition-colors hover:text-mist"
          >
            ← Back to home
          </Link>
        </div>
      </Container>
    </section>
  );
}
