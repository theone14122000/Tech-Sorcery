import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Standards } from "@/components/sections/Standards";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Services />
      <Packages />
      <Process />
      <Standards />
      <Portfolio />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
