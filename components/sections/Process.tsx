import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-2 to-transparent"
      />

      <Container>
        <SectionHeader
          index="05"
          eyebrow="// process"
          title={
            <>
              Five steps from <span className="text-gradient-accent">hello</span> to handover.
            </>
          }
          lead="A predictable path with written scope, a live preview link and no black boxes."
        />

        <div className="relative mt-14 lg:mt-20">
          <div
            aria-hidden
            className="hairline-x absolute top-6 right-6 left-6 hidden h-px lg:block"
          />
          <div
            aria-hidden
            className="absolute top-6 bottom-6 left-[23px] w-px bg-gradient-to-b from-violet/40 via-cyan/30 to-transparent lg:hidden"
          />

          <Stagger className="grid gap-10 lg:grid-cols-5 lg:gap-6" stagger={0.1}>
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.id} className="relative lg:pr-4">
                  <div className="flex items-start gap-5 lg:block">
                    <div className="relative z-10 shrink-0">
                      <span className="grid size-12 place-items-center rounded-full border border-violet/45 bg-void font-mono text-[0.78rem] tracking-widest text-violet-soft shadow-[0_0_28px_-6px_rgba(124,92,255,0.85)]">
                        {step.step}
                      </span>
                    </div>

                    <div className="lg:mt-6">
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-4 text-cyan" aria-hidden />
                        <span className="font-mono text-[0.66rem] tracking-[0.18em] text-mist-4 uppercase">
                          {step.meta}
                        </span>
                      </div>

                      <h3 className="mt-2.5 text-lg font-semibold tracking-[-0.02em] text-mist sm:text-xl">
                        {step.title}
                      </h3>

                      <p className="mt-2.5 text-[0.92rem] leading-relaxed text-mist-3">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 border-t border-line pt-6 font-mono text-[0.7rem] tracking-[0.16em] text-mist-4 uppercase">
            Fixed scope · fixed quote · written timeline — agreed before the first commit
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
