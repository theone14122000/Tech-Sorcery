export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "How long does a project take?",
    a: "A Basic site ships in 5–7 working days, Standard takes 10–14 working days, and Premium builds run 3–5 weeks depending on scope. The timeline is agreed in writing before work starts.",
  },
  {
    q: "Who provides the domain and hosting?",
    a: "You do. The domain is always purchased in your name so you keep full ownership. I guide you on choosing it, and hosting guidance plus deployment help are included in every package.",
  },
  {
    q: "How many revisions are included?",
    a: "Basic includes 1 revision round, Standard includes 2, and Premium includes unlimited minor revisions during the build plus 3 major revision rounds. Extra rounds are always quoted upfront — never surprise-billed.",
  },
  {
    q: "What are the payment terms?",
    a: "50% advance to reserve the slot and start work, 50% on delivery before handover. Larger projects can be split into milestones. Payment via bank transfer or UPI.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes — 100%. On final payment you receive the complete repository, build setup and deployment access. No lock-in, no licence fees, no dependency on me.",
  },
  {
    q: "What support do I get after launch?",
    a: "Every package includes post-launch support: 7 days on Basic, 30 days on Standard and 90 days on Premium, covering bug fixes and small adjustments. Ongoing maintenance retainers are available afterwards.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your brand assets and logo (or a colour direction), content or raw notes for each page, references you like, and access details once we reach deployment. We start with a short call to lock the scope.",
  },
  {
    q: "Is a GST invoice available?",
    a: "Invoice provided on request — share your business name and GSTIN (if applicable) and a compliant invoice is issued for every payment.",
  },
];
