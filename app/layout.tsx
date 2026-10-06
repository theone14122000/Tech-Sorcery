import { MotionConfig } from "framer-motion";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { FloatingWhatsApp } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { keywords, site } from "@/data/site";
import { JsonLd } from "@/components/layout/JsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-jetbrains",
});

const siteUrl = new URL(site.url);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Tech Sorcery — Freelance Full-Stack Developer in India",
    template: "%s · Tech Sorcery",
  },
  description: site.description,
  keywords: [...keywords],
  applicationName: site.name,
  authors: [{ name: site.owner.name }],
  creator: site.owner.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
    title: "Tech Sorcery — Websites that rank, convert and feel unfair.",
    description: site.description,
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Sorcery — Freelance Full-Stack Developer in India",
    description: site.description,
    creator: "@techsorcery",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="noise-layer antialiased">
        <MotionConfig reducedMotion="user">
          <a
            href="#main-content"
            className="skip-link rounded-full border border-cyan/50 bg-void px-5 py-3 text-sm font-medium text-cyan"
          >
            Skip to content
          </a>

          <ScrollProgress />
          <Navbar />
          <CommandPalette />
          <SmoothScroll />

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />
          <FloatingWhatsApp />
          <JsonLd />
          <Analytics />
        </MotionConfig>
      </body>
    </html>
  );
}
