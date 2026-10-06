import {
  Bot,
  Gauge,
  LineChart,
  type LucideIcon,
  Search,
  Smartphone,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

export interface Service {
  id: string;
  index: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  bullets: string[];
}

export const services: Service[] = [
  {
    id: "websites",
    index: "01",
    title: "Website Building",
    icon: Terminal,
    summary:
      "Fast, responsive, SEO-ready websites built in Next.js and React — engineered for Core Web Vitals, not just for screenshots.",
    bullets: [
      "Next.js & React builds",
      "Component-driven UI",
      "90+ Lighthouse target",
      "CMS-ready structure",
    ],
  },
  {
    id: "ai",
    index: "02",
    title: "AI Integration",
    icon: Bot,
    summary:
      "LLM-powered chatbots, lead qualification and workflow automation wired directly into your site, CRM and inbox.",
    bullets: [
      "Custom AI assistants",
      "Lead qualification flows",
      "Content automation",
      "OpenAI / LLM APIs",
    ],
  },
  {
    id: "seo",
    index: "03",
    title: "SEO Integration",
    icon: Search,
    summary:
      "Technical SEO from the ground up: metadata, schema, sitemaps, clean semantics and page structure that search engines can actually read.",
    bullets: ["Schema markup", "Sitemap & robots", "Core Web Vitals", "On-page structure"],
  },
  {
    id: "gtm",
    index: "04",
    title: "GTM & Analytics",
    icon: LineChart,
    summary:
      "Google Tag Manager, GA4 events, conversion tracking and Meta Pixel — so you finally know which rupee produced which lead.",
    bullets: [
      "GTM container build",
      "GA4 event design",
      "Conversion tracking",
      "Custom dashboards",
    ],
  },
];

export const standards = [
  {
    icon: Smartphone,
    title: "Mobile-first by default",
    body: "Every layout is designed at 360px first, then scaled up to 4K.",
  },
  {
    icon: Gauge,
    title: "Lighthouse-optimised",
    body: "Performance budgets set before the first component ships.",
  },
  {
    icon: Terminal,
    title: "Clean TypeScript",
    body: "Strict mode, typed props, zero `any`, no dead code.",
  },
  {
    icon: Search,
    title: "SEO foundations",
    body: "Semantic HTML, metadata and schema on every page.",
  },
  {
    icon: Zap,
    title: "Deployed on Vercel",
    body: "Preview deployments on every change, production on merge.",
  },
  {
    icon: Sparkles,
    title: "Full source handover",
    body: "You own the repo, the code and the keys. Always.",
  },
] as const;

export const marqueeTech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Laravel",
  "Prisma",
  "MySQL",
  "PostgreSQL",
  "Vercel",
  "Google Tag Manager",
  "GA4",
  "Technical SEO",
  "Schema.org",
  "OpenAI API",
  "LLM Automation",
  "Razorpay",
  "Framer Motion",
] as const;
