export type TierId = "basic" | "standard" | "premium";

export type CellValue = boolean | string;

export interface PackageTier {
  id: TierId;
  index: string;
  name: string;
  tagline: string;
  /** Big display price, e.g. "₹8,000" */
  price: string;
  /** Small qualifier printed under the price. */
  pricePrefix?: string;
  priceNote?: string;
  badge?: string;
  cta: string;
  delivery: string;
  revisions: string;
  support: string;
  domainNote: string;
  features: string[];
  excluded?: string[];
}

export interface ComparisonRow {
  label: string;
  /** [basic, standard, premium] */
  cells: [CellValue, CellValue, CellValue];
}

export const packageNote =
  "Domain is provided by the customer in every package. Hosting guidance and deployment help included.";

export const packageFootnote =
  "Final quote depends on scope. Prices are starting figures and exclude GST where applicable.";

export const tiers: PackageTier[] = [
  {
    id: "basic",
    index: "01",
    name: "Basic",
    tagline: "Get online fast, professionally.",
    price: "₹8,000",
    pricePrefix: "starting at",
    cta: "Get Basic",
    delivery: "5–7 working days",
    revisions: "1 revision round",
    support: "7 days post-launch support",
    domainNote: "Domain provided by customer",
    features: [
      "Basic 4-page website (Home, About, Services, Contact)",
      "Mobile-responsive modern design — template-based, customised with your branding and colours",
      "Contact form with email notifications",
      "Click-to-call and WhatsApp chat button",
      "Basic on-page SEO (title, meta description, headings)",
      "Google Maps embed and social media links",
      "Free deployment on a free hosting platform (Vercel/Netlify)",
      "1 round of revisions",
      "Delivery in 5 to 7 working days",
      "7 days post-launch support",
      "Domain provided by customer",
    ],
    excluded: ["Custom animations", "Blog / CMS", "AI features", "Advanced SEO", "Analytics setup"],
  },
  {
    id: "standard",
    index: "02",
    name: "Standard",
    tagline: "A custom-built site that actually brings leads.",
    price: "₹15,000",
    pricePrefix: "one-time",
    badge: "Most Popular",
    cta: "Get Standard",
    delivery: "10–14 working days",
    revisions: "2 revision rounds",
    support: "30 days post-launch support",
    domainNote: "Domain provided by customer",
    features: [
      "Everything in Basic, plus:",
      "Up to 8 custom-designed pages (no templates; unique UI built for your brand)",
      "Smooth animations and micro-interactions",
      "Blog or dynamic content section (simple CMS or MDX)",
      "Technical SEO setup: sitemap, robots.txt, Open Graph tags, schema markup, image/performance optimisation",
      "Google Analytics 4 and Google Search Console setup",
      "Lead capture forms with auto-reply emails",
      "Speed optimisation (target 90+ Lighthouse score)",
      "Business email setup guidance",
      "2 rounds of revisions",
      "Delivery in 10 to 14 working days",
      "30 days post-launch support",
      "Domain provided by customer",
    ],
  },
  {
    id: "premium",
    index: "03",
    name: "Premium",
    tagline: "The complete growth system, built end to end.",
    price: "₹25,000 – ₹30,000",
    pricePrefix: "depending on scope",
    priceNote: "Final price depends on scope",
    badge: "Complete Solution",
    cta: "Get Premium",
    delivery: "3–5 weeks depending on scope",
    revisions: "Unlimited minor + 3 major rounds",
    support: "90 days post-launch support & maintenance",
    domainNote: "Domain provided by customer",
    features: [
      "Everything in Standard, plus:",
      "Up to 15+ pages or a full custom platform (multi-section site, dashboards or admin panel if required)",
      "Premium, award-style UI/UX with advanced animations",
      "AI integration: smart chatbot or AI assistant trained on your business, AI lead qualification, or automation workflows (scope-dependent)",
      "Advanced SEO: keyword mapping, on-page optimisation for all pages, schema markup, Core Web Vitals tuning, local SEO setup",
      "Full GTM implementation: Google Tag Manager, GA4 events, conversion tracking, Meta Pixel, custom event dashboards",
      "Custom backend and database (Prisma + MySQL/PostgreSQL), authentication or admin panel if needed",
      "Third-party integrations: CRM, payment gateway such as Razorpay, email marketing, WhatsApp API",
      "Security hardening and performance optimisation (target 95+ Lighthouse score)",
      "Unlimited minor revisions during build, plus 3 major revision rounds",
      "Priority communication and weekly progress updates",
      "Delivery in 3 to 5 weeks depending on scope",
      "90 days post-launch support and maintenance",
      "Full source code, documentation and handover walkthrough",
      "Domain provided by customer",
    ],
  },
];

export const comparisonRows: ComparisonRow[] = [
  { label: "Pages included", cells: ["4 pages", "Up to 8 pages", "15+ or full platform"] },
  {
    label: "Design approach",
    cells: ["Template, customised", "Custom UI, no template", "Premium award-style UI"],
  },
  { label: "Animations & micro-interactions", cells: [false, true, "Advanced"] },
  { label: "Contact form + email notifications", cells: [true, true, true] },
  { label: "Click-to-call & WhatsApp button", cells: [true, true, true] },
  { label: "Basic on-page SEO", cells: [true, true, true] },
  { label: "Technical SEO (sitemap, OG, schema)", cells: [false, true, true] },
  { label: "Blog / dynamic content", cells: [false, true, true] },
  { label: "GA4 + Search Console setup", cells: [false, true, true] },
  { label: "Full GTM, conversions & Meta Pixel", cells: [false, false, true] },
  { label: "AI integration", cells: [false, false, true] },
  { label: "Custom backend & database", cells: [false, false, true] },
  { label: "Third-party integrations (CRM, Razorpay)", cells: [false, false, true] },
  { label: "Lighthouse target", cells: ["70+", "90+", "95+"] },
  { label: "Revision rounds", cells: ["1", "2", "Unlimited minor + 3 major"] },
  { label: "Delivery time", cells: ["5–7 working days", "10–14 working days", "3–5 weeks"] },
  { label: "Post-launch support", cells: ["7 days", "30 days", "90 days"] },
  { label: "Source code ownership", cells: [true, true, true] },
  { label: "Docs & handover walkthrough", cells: [false, false, true] },
  { label: "Priority communication", cells: [false, false, true] },
  { label: "Domain provided by customer", cells: [true, true, true] },
];

export const budgetOptions = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
] as const;

/** Values used by the contact form's package <select>, in display order. */
export const packageSelectOptions = [
  "Not sure yet",
  "Basic",
  "Standard",
  "Premium",
  "Custom scope",
] as const;
