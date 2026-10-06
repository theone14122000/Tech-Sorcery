import { Container, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { standards } from "@/data/services";

export function Standards() {
  return (
    <section id="standards" className="relative py-20 sm:py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-abyss/60" />

      <Container>
        <SectionHeader
          index="06"
          eyebrow="// tech & standards"
          title={
            <>
              What ships with <span className="text-gradient-accent">every</span> project.
            </>
          }
          lead="No tier gets a worse engineering standard. These are defaults, not upgrades."
        />

        <Stagger
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {standards.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={item.title}
                className="group bg-panel p-6 transition-colors duration-500 hover:bg-panel-2 sm:p-7"
              >
                <span className="grid size-10 place-items-center rounded-lg border border-line-2 bg-white/[0.03] text-mist-3 transition-all duration-500 group-hover:border-cyan/50 group-hover:bg-cyan/10 group-hover:text-cyan">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-mist">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-3">{item.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
