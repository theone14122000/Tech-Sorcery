/**
 * Single source of truth for brand + contact details.
 * Edit once here — it propagates to the navbar, hero, contact, footer,
 * floating button, metadata and JSON-LD.
 */

export const site = {
  name: "Tech Sorcery",
  shortName: "TS",
  tagline: "Websites that rank, convert and feel unfair.",
  description:
    "Tech Sorcery is the freelance practice of Shubham Sharma — a full-stack developer building fast websites, AI integrations, SEO systems and GTM setups for businesses that want to grow.",
  owner: {
    name: "Shubham Sharma",
    role: "Freelance Full-Stack Developer",
    since: 2021,
    experience: "5+",
    headline: "5+ years shipping production websites, platforms and growth systems.",
  },
  /** Replace with the production domain after deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techsorcery.dev",
  email: "theone14122000@gmail.com",
  phoneDisplay: "+91 98050 29089",
  phoneHref: "tel:+919805029089",
  whatsapp:
    "https://wa.me/919805029089?text=Hi%20Shubham%2C%20I%20found%20Tech%20Sorcery%20and%20want%20to%20discuss%20a%20project",
  whatsappNumber: "919805029089",
  emailHref: "mailto:theone14122000@gmail.com",
  location: "Working with clients across India & worldwide",
  availability: "Replies within a few hours, usually same day",
  status: "available for new projects",
  languages: ["English", "Hindi"],
} as const;

export const keywords = [
  "freelance web developer India",
  "Next.js developer for hire",
  "full-stack developer freelance",
  "AI integration services",
  "SEO services India",
  "Google Tag Manager setup",
  "GA4 analytics setup",
  "website development India",
  "React web developer",
  "lead generation website",
] as const;

/** Quick-jump navigation — also drives the navbar active-section highlight. */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
] as const;

export const trustChips = ["Since 2021", "5+ Years Experience", "Pan-India Clients"] as const;
