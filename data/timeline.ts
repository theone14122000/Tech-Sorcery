export interface TimelineItem {
  year: string;
  title: string;
  body: string;
}

/** Truthful, generic milestones — no client names. */
export const timeline: TimelineItem[] = [
  {
    year: "2021",
    title: "Started freelancing",
    body: "First client projects — learning what production really demands: deadlines, revisions and live traffic.",
  },
  {
    year: "2022",
    title: "First full-stack production projects",
    body: "End-to-end platforms shipped: authentication, databases, dashboards and services that had to stay online.",
  },
  {
    year: "2023",
    title: "AI, SEO & analytics added",
    body: "LLM integrations, technical SEO and GA4/GTM became part of every build instead of an afterthought.",
  },
  {
    year: "2024",
    title: "SaaS & platform builds",
    body: "Multi-tenant tools, lead-generation systems and admin panels for teams that had outgrown a brochure site.",
  },
  {
    year: "2025 → now",
    title: "Premium, growth-focused delivery",
    body: "Animation-heavy marketing sites engineered around ranking, conversion and measurable pipeline.",
  },
];
