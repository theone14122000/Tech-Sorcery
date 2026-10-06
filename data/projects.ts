// TODO(portfolio): add real case studies here to populate the Work section.
// Keep the fields generic — no confidential client data, no stock imagery.
// Any project added below renders automatically in the portfolio grid.

export type ProjectTag =
  | "Next.js"
  | "React"
  | "AI"
  | "SEO"
  | "GTM & Analytics"
  | "Dashboard"
  | "E-commerce"
  | "Landing Page";

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  tags: ProjectTag[];
  /** Optional outbound link to the live build. */
  link?: string;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [];
