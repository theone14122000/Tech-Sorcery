import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden pt-32 pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-field" />
        <div className="absolute inset-0 vignette" />
        <span className="absolute -top-24 -left-24 size-[26rem] rounded-full bg-violet/20 blur-[120px] animate-drift" />
        <span className="absolute -right-20 bottom-0 size-[22rem] rounded-full bg-cyan/16 blur-[120px] animate-drift-slow" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.72rem] tracking-[0.28em] text-cyan uppercase">
            {"// 404 · page not found"}
          </p>

          <h1 className="mt-6 text-[clamp(4.5rem,20vw,11rem)] leading-[0.82] font-semibold tracking-[-0.06em]">
            <span className="text-gradient">404</span>
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-mist-3 sm:text-xl">
            This route doesn&apos;t exist — the incantation was misspelled. Head back home, or tell
            me what you were looking for.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg">
              <Home className="size-4" />
              Back to home
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              <Search className="size-4" />
              Report a broken link
            </Button>
          </div>

          <p className="mt-10 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.16em] text-mist-4 uppercase">
            <ArrowLeft className="size-4 text-violet" aria-hidden />
            or press the browser back button
          </p>
        </div>
      </Container>
    </section>
  );
}
