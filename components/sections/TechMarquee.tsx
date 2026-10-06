import { Marquee } from "@/components/ui/Marquee";
import { marqueeTech } from "@/data/services";

export function TechMarquee() {
  const first = marqueeTech.slice(0, Math.ceil(marqueeTech.length / 2));
  const second = marqueeTech.slice(Math.ceil(marqueeTech.length / 2));

  return (
    <section
      aria-label="Technology stack"
      className="relative border-y border-line bg-abyss/70 py-7 sm:py-9"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-field opacity-40" />

      <div className="relative">
        <p className="container-page mb-5 font-mono text-[0.68rem] tracking-[0.28em] text-mist-4 uppercase">
          {"// stack"}
        </p>

        <Marquee items={first} className="py-1" />
        <Marquee items={second} reverse className="mt-3 py-1" separator="／" />
      </div>
    </section>
  );
}
