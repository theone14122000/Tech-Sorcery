# Tech Sorcery

Personal-brand marketing site for **Shubham Sharma** — freelance full-stack developer
(India · working since 2021). Single-page, anchor-navigated site with legal pages,
a validated contact form and a three-tier pricing section.

> Dark, developer-grade premium. Zero raster images — every visual is typography, CSS,
> SVG, gradients, grids and lucide icons.

---

## Stack

| Layer         | Choice                                                     |
| ------------- | ---------------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack) + React 19              |
| Language      | TypeScript (strict)                                        |
| Styling       | Tailwind CSS 4 (CSS-first tokens in `app/globals.css`)     |
| Motion        | Framer Motion (+ `MotionConfig reducedMotion="user"`)      |
| Smooth scroll | Lenis (auto-disabled under `prefers-reduced-motion`)       |
| Forms         | react-hook-form + zod + `@hookform/resolvers`              |
| Mail          | Nodemailer (SMTP) or Resend, with a WhatsApp fallback      |
| Icons         | lucide-react                                               |
| Fonts         | `next/font` — Space Grotesk + JetBrains Mono (self-hosted) |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs without any env vars
npm run dev                  # http://localhost:3000
```

### Scripts

| Command                | What it does                          |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Dev server                            |
| `npm run build`        | Production build (must be error-free) |
| `npm start`            | Serve the production build            |
| `npm run lint`         | ESLint                                |
| `npm run typecheck`    | `tsc --noEmit`                        |
| `npm run format`       | Prettier write                        |
| `npm run format:check` | Prettier check                        |

---

## Environment variables

All optional. Copy `.env.example` → `.env.local`.

| Variable                  | Purpose                                                             |
| ------------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | Canonical URL used for metadata, OG, sitemap and JSON-LD            |
| `SMTP_HOST` / `SMTP_PORT` | SMTP server for the contact form (`587` by default)                 |
| `SMTP_SECURE`             | `true` for port 465                                                 |
| `SMTP_USER` / `SMTP_PASS` | SMTP credentials (omitted = unauthenticated relay)                  |
| `SMTP_FROM`               | Override the `From:` header                                         |
| `CONTACT_EMAIL`           | Where enquiries are delivered (defaults to the site email)          |
| `CONTACT_REPLY_TO`        | Reply-to override (defaults to the sender's email)                  |
| `RESEND_API_KEY`          | Alternative transport used when SMTP is not configured              |
| `RESEND_FROM_EMAIL`       | Verified sender for Resend                                          |
| `NEXT_PUBLIC_GTM_ID`      | Google Tag Manager container (`GTM-XXXXXXX`). Empty = no GTM script |

**Fallback behaviour:** if neither SMTP nor Resend is configured, `POST /api/contact`
answers `{ ok: false, fallback: true }` and the client opens WhatsApp with the whole
message pre-filled. No enquiry is ever silently dropped.

---

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD, chrome
  page.tsx              Single page — composes every section
  globals.css           Design tokens, textures, surfaces, motion
  not-found.tsx         Custom 404
  icon.svg              "TS" SVG monogram favicon
  opengraph-image.tsx   OG card generated with next/og (text + gradients only)
  sitemap.ts  robots.ts
  api/contact/route.ts  Validated contact-form endpoint (SMTP / Resend / fallback)
  privacy/  terms/      Legal pages
components/
  layout/               Navbar, Footer, Logo, SmoothScroll, ScrollProgress,
                        FloatingActions, Analytics, JsonLd
  sections/             Hero, TechMarquee, About, Services, Packages, Process,
                        Standards, Portfolio, Testimonials, Faq, Contact,
                        CodeTerminal, PortfolioPlaceholder
  ui/                   Button, Chip, Section, Reveal/Stagger, SpotlightCard,
                        Counter, Marquee, Accordion, Magnetic, GlowOrb
data/                   ← ALL editable copy, prices and contact details
  site.ts  services.ts  packages.ts  process.ts  timeline.ts  stats.ts
  faq.ts  testimonials.ts  projects.ts
hooks/                  use-active-section, use-reduced-motion, use-media-query,
                        use-copy-to-clipboard
lib/                    utils (cn), events (package pre-select), validation (zod)
```

### Editing content

- **Brand, phone, WhatsApp, email, nav** → `data/site.ts`
- **Package prices, features, comparison table** → `data/packages.ts`
- **Services and standards** → `data/services.ts`
- **Process steps, timeline, stats** → `data/process.ts`, `data/timeline.ts`, `data/stats.ts`
- **FAQ answers** → `data/faq.ts`
- **Testimonials** → `data/testimonials.ts` (marked `// TODO(testimonials)`)
- **Portfolio** → `data/projects.ts` (marked `// TODO(portfolio)`)
- **Colours, fonts, animations** → `app/globals.css` (`@theme` block)

### Adding the real logo later

`components/layout/Logo.tsx` is marked `// TODO(logo)`. It currently renders an SVG
"TS" monogram plus the "Tech Sorcery" wordmark. Replace the contents of `<Logo />` with
your artwork — the navbar, footer, 404 and legal pages all import that one component.
To change the favicon too, edit `app/icon.svg`.

### Adding portfolio projects later

`data/projects.ts` exports `projects: Project[] = []`. Push objects in and the section
switches from the "case studies loading" placeholder to a real card grid automatically:

```ts
export const projects: Project[] = [
  {
    id: "acme",
    title: "Acme marketing site",
    client: "Acme",
    year: "2026",
    summary: "Next.js rebuild focused on Core Web Vitals.",
    tags: ["Next.js", "SEO"],
    link: "https://example.com",
    metrics: [{ label: "Lighthouse", value: "98" }],
  },
];
```

---

## Accessibility & performance

- Semantic landmarks, exactly one `<h1>`, logical heading order, skip-to-content link
- WCAG AA contrast, visible cyan focus rings, keyboard-operable menu/accordion/carousel
- `prefers-reduced-motion` honoured by CSS, Framer Motion and Lenis
- Zero raster assets; everything is CSS/SVG/type — no layout-shifting images
- Honeypot field + zod validation on both client and server

## Deploy

Built for Vercel (or any Node host). Set `NEXT_PUBLIC_SITE_URL` to your production
domain and configure either SMTP or Resend for real form delivery.
