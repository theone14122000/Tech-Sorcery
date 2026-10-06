import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { BackToTop } from "@/components/layout/FloatingActions";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";
import { services } from "@/data/services";

const contactLinks = [
  { label: site.phoneDisplay, href: site.phoneHref, icon: Phone, mono: true },
  { label: "WhatsApp chat", href: site.whatsapp, icon: MessageCircle },
  { label: site.email, href: site.emailHref, icon: Mail, mono: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-abyss">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-x" />

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <a href="#top" aria-label="Tech Sorcery — back to top">
              <Logo />
            </a>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-mist-3">
              {site.tagline} Freelance full-stack development, AI, SEO and analytics — built in
              India, shipping worldwide.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/[0.03] px-5 py-3 text-sm font-medium text-mist transition-all duration-300 hover:border-violet/60 hover:bg-violet/12"
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[0.7rem] tracking-[0.22em] text-mist-4 uppercase">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.95rem] text-mist-3 transition-colors hover:text-mist"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="font-mono text-[0.7rem] tracking-[0.22em] text-mist-4 uppercase">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[0.95rem] text-mist-3 transition-colors hover:text-mist"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.7rem] tracking-[0.22em] text-mist-4 uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-3">
              {contactLinks.map(({ label, href, icon: Icon, mono }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex max-w-full items-center gap-2.5 text-[0.95rem] text-mist-3 transition-colors hover:text-mist"
                  >
                    <Icon className="size-4 shrink-0 text-violet" aria-hidden />
                    <span className={`truncate ${mono ? "font-mono text-[0.85rem]" : ""}`}>
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-mist-4">{site.location}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="font-mono text-[0.78rem] text-mist-4">
              © {year} {site.name}. Crafted by {site.owner.name}.
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-mist-4">
              <span className="size-1.5 rounded-full bg-emerald animate-blip" aria-hidden />
              {site.status}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="font-mono text-[0.72rem] tracking-[0.14em] text-mist-4 uppercase transition-colors hover:text-mist"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="font-mono text-[0.72rem] tracking-[0.14em] text-mist-4 uppercase transition-colors hover:text-mist"
            >
              Terms
            </a>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
