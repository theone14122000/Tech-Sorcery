import { z } from "zod";

/**
 * Shared between the contact form (client validation) and the API route
 * (server validation) so both sides always agree.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (at least 2 characters)."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s()-]{7,18}$/, "Enter a valid phone number (7–18 digits)."),
  package: z.string().min(1, "Pick a package — or choose 'Not sure yet'."),
  budget: z.string().min(1, "Pick a budget range."),
  message: z
    .string()
    .trim()
    .min(15, "Tell me a little more — 15 characters minimum.")
    .max(2000, "That's a bit long. Keep it under 2000 characters."),
  /** Honeypot: real humans never see or fill this field. */
  website: z.string().max(200),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactOutput = z.output<typeof contactSchema>;

export const contactDefaultValues: ContactInput = {
  name: "",
  email: "",
  phone: "",
  package: "Not sure yet",
  budget: "Not sure yet",
  message: "",
  website: "",
};
