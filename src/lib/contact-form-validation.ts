import { z } from "zod";

const LETTERS_AND_SPACES = /^[A-Za-z\s]+$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name must be at most 100 characters.")
    .regex(LETTERS_AND_SPACES, "Full name can only contain letters and spaces."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address.")
    .max(320, "Email address is too long."),
  company: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .min(2, "Company name must be at least 2 characters.")
    .max(100, "Company name must be at most 100 characters.")
    .regex(LETTERS_AND_SPACES, "Company name can only contain letters and spaces."),
  inquiryType: z.string().trim().min(1, "Please select an interest area.").max(200),
  message: z
    .string()
    .trim()
    .min(1, "Project brief is required.")
    .min(20, "Project brief must be at least 20 characters.")
    .max(1000, "Project brief must be at most 1000 characters.")
    .regex(LETTERS_AND_SPACES, "Project brief can only contain letters and spaces."),
  phone: z.string().trim().max(120).optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormField = keyof ContactFormValues;
export type ContactFormFieldErrors = Partial<Record<ContactFormField, string>>;

export function validateContactForm(data: unknown):
  | { success: true; data: ContactFormValues }
  | { success: false; errors: ContactFormFieldErrors; message: string } {
  const parsed = contactFormSchema.safeParse(data);
  if (parsed.success) {
    return { success: true, data: parsed.data };
  }

  const errors: ContactFormFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !errors[field as ContactFormField]) {
      errors[field as ContactFormField] = issue.message;
    }
  }

  return {
    success: false,
    errors,
    message: "Please fix the highlighted fields and try again.",
  };
}
