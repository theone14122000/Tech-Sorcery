// TODO(testimonials): replace with real testimonials — name, role and quote only.
// No photos or avatars: the design is deliberately text-only.

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

/** Generic, deliberately modest placeholder quotes. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Shubham took a rough idea and turned it into a site that actually loads fast on mobile. The handover was clean and I never had to chase him for updates.",
    name: "Rohit",
    role: "Travel Business Owner",
  },
  {
    id: "t2",
    quote:
      "We finally know where leads come from. The GA4 and GTM setup alone changed how we plan our ad spend every month.",
    name: "Neha",
    role: "Boutique Fitness Studio",
  },
  {
    id: "t3",
    quote:
      "Straightforward scope, honest timeline, no surprises on the invoice. The site went live a day earlier than promised.",
    name: "Arjun",
    role: "Recruitment Consultancy",
  },
  {
    id: "t4",
    quote:
      "He suggested cutting two features we thought we needed. That saved us time and the finished site is simpler for our customers to use.",
    name: "Priya",
    role: "Hospitality Brand",
  },
  {
    id: "t5",
    quote:
      "Support after launch was the differentiator — small fixes handled within a day, plus a proper walkthrough before handover.",
    name: "Karan",
    role: "D2C E-commerce Founder",
  },
];
