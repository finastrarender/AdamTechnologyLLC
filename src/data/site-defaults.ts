/** Shared defaults for seed + UI fallback when DB is empty. */
export const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const defaultFooterColumns = [];

export const defaultFooterMeta = {
  brand: "ADAM TECH",
  description: "",
  social: [],
  copyright:
    "© 2024 ADAM TECHNOLOGY L.L.C. ALL RIGHTS RESERVED. DUBAI LICENSED.",
  legal: [
    { label: "PRIVACY POLICY", href: "/privacy" },
    { label: "TERMS OF SERVICE", href: "/terms" },
    { label: "SYSTEM STATUS", href: "/status" },
    { label: "CONTACT", href: "/contact" },
  ],
};

export const defaultApplyNowModal = {
  panelTitle: "Unlock Your Potential",
  panelDescription:
    "Join a global community of innovators and business leaders in Dubai's premier business hub.",
  panelHighlights: ["Elite Faculty", "Global Network", "Startup Incubator"],
  formTitle: "Request Information",
  formDescription: "Fill in the details below to receive a personalized program consultation.",
  fullNameLabel: "FULL NAME",
  fullNamePlaceholder: "Enter your full name",
  phoneLabel: "PHONE NUMBER",
  phonePlaceholder: "+971      50 123 4567",
  emailLabel: "WORK EMAIL",
  emailPlaceholder: "email@company.com",
  cityLabel: "SELECT CITY",
  cityPlaceholder: "Choose City",
  cityOptions: ["Dubai", "Abu Dhabi", "Sharjah"],
  experienceLabel: "EXPERIENCE",
  experiencePlaceholder: "Years of Experience",
  experienceOptions: ["0-2 Years", "3-5 Years", "6-10 Years", "10+ Years"],
  messageLabel: "MESSAGE (OPTIONAL)",
  messagePlaceholder: "Tell us about your career goals...",
  customFields: [] as Array<{
    label: string;
    placeholder: string;
    inputType: "text" | "email" | "number";
  }>,
  termsText: "I agree to the Terms of Service and Privacy Policy.",
  marketingConsentText: "I consent to receive promotional offers and communication via email and SMS.",
  submitLabel: "ENROLL NOW",
};
