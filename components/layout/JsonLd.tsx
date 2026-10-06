import { site } from "@/data/site";
import { tiers } from "@/data/packages";

/**
 * Structured data: who I am, what the business is, and the packages offered.
 * Rendered once in the root layout.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.owner.name,
        jobTitle: site.owner.role,
        url: site.url,
        email: site.emailHref,
        telephone: site.phoneDisplay,
        worksFor: { "@id": `${site.url}/#business` },
        description: site.owner.headline,
        sameAs: [site.whatsapp],
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        description: site.description,
        email: site.email,
        telephone: site.phoneDisplay,
        founder: { "@id": `${site.url}/#person` },
        areaServed: ["India", "Worldwide"],
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        availableLanguage: site.languages,
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Freelance web development, AI integration, SEO and GTM setup",
            description: site.description,
          },
        },
        offerCatalog: {
          "@type": "OfferCatalog",
          name: "Tech Sorcery packages",
          itemListElement: tiers.map((tier) => ({
            "@type": "Offer",
            name: `${tier.name} package`,
            price:
              tier.price
                .replace(/[₹,\s]/g, "")
                .split("–")[0]
                ?.trim() ?? "",
            priceCurrency: "INR",
            description: tier.tagline,
            itemOffered: {
              "@type": "Service",
              name: `${tier.name} website package`,
              description: tier.features.join(" · "),
            },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; React escapes it safely inside script tags.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
