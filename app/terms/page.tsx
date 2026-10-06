import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { packageNote } from "@/data/packages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Scope, payment, revision and ownership terms for projects delivered by ${site.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: "Scope & quotations",
    body: "Every project starts with a written scope and a fixed quotation. Work begins only after the scope is agreed in writing. Anything outside that scope is quoted separately before it is started.",
  },
  {
    heading: "Payment terms",
    body: "50% advance to reserve the slot and begin work, 50% on delivery prior to handover. Larger engagements may be split into milestones. Payment is accepted via bank transfer or UPI.",
  },
  {
    heading: "Revisions",
    body: "Revision rounds are defined per package: 1 for Basic, 2 for Standard, and unlimited minor revisions plus 3 major rounds for Premium. Additional rounds are always quoted in advance.",
  },
  {
    heading: "Timelines",
    body: "Delivery windows are working-day estimates confirmed in the written scope. Timelines depend on the timely provision of content, assets, credentials and feedback.",
  },
  {
    heading: "Domain & hosting",
    body: packageNote,
  },
  {
    heading: "Ownership",
    body: "On receipt of final payment, full ownership of the delivered source code transfers to you. Third-party libraries remain under their own open-source licences.",
  },
  {
    heading: "Post-launch support",
    body: "Support windows (7 / 30 / 90 days by package) cover bug fixes and small adjustments to delivered work. New features, content changes and maintenance are scoped separately.",
  },
  {
    heading: "Invoices",
    body: "A compliant invoice is provided on request. Share your business name and GSTIN (if applicable) when making payment.",
  },
];

export default function TermsPage() {
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
            Terms of Service
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

          <div className="mt-12 rounded-2xl border border-line bg-white/[0.02] p-6 text-sm leading-relaxed text-mist-3">
            Questions about these terms?{" "}
            <a
              href={site.emailHref}
              className="text-cyan underline decoration-cyan/40 underline-offset-4"
            >
              {site.email}
            </a>{" "}
            or{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan underline decoration-cyan/40 underline-offset-4"
            >
              WhatsApp us
            </a>
            .
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
