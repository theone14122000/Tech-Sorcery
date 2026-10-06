import { Compass, FlaskConical, Rocket, Sparkles, Telescope, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  body: string;
  meta: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery",
    body: "We map the business goal, audience, competitors and success metric before a single pixel moves. You get a written scope and a fixed quote.",
    meta: "Call · scope · quote",
    icon: Compass,
  },
  {
    id: "structure",
    step: "02",
    title: "Design & Structure",
    body: "Information architecture, wireframes and the visual direction — typography, palette, motion language — approved before the build starts.",
    meta: "Sitemap · wireframe · UI direction",
    icon: Telescope,
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    body: "Production TypeScript, component-driven UI, content modelling and integrations. You get a live preview link that updates as work lands.",
    meta: "Next.js · TypeScript · integrations",
    icon: Sparkles,
  },
  {
    id: "launch",
    step: "04",
    title: "Test & Launch",
    body: "Cross-device QA, accessibility passes, Lighthouse scoring, SEO checks, analytics wiring — then DNS, deployment and go-live.",
    meta: "QA · Lighthouse · deploy",
    icon: Rocket,
  },
  {
    id: "growth",
    step: "05",
    title: "Support & Growth",
    body: "Post-launch fixes, performance monitoring and the next iteration — new pages, campaigns, AI features or conversion work.",
    meta: "Support · iterate · scale",
    icon: FlaskConical,
  },
];
