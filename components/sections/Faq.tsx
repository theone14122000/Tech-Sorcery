import { Accordion } from "@/components/ui/Accordion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/data/faq";

export function Faq() {
  const items = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    question: faq.q,
    answer: faq.a,
  }));

  return (
    <section id="faq" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              index="09"
              eyebrow="// faq"
              title={
                <>
                  Questions, <span className="text-gradient-accent">answered</span> before you ask.
                </>
              }
              lead="Everything about timelines, payments and ownership — in plain language."
            />

            <Reveal delay={0.08}>
              <p className="mt-8 rounded-2xl border border-line bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-mist-3">
                Still unsure?{" "}
                <a
                  href="#contact"
                  className="text-cyan underline decoration-cyan/40 underline-offset-4 hover:decoration-cyan"
                >
                  Send a message
                </a>{" "}
                — you&apos;ll get a straight answer, not a sales call.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <Accordion items={items} defaultOpenId="faq-0" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
