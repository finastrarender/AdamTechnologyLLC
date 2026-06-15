/** Shared defaults for seed + UI fallback when DB is empty. */
export const defaultLogoSrc = "";

export const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/project" },
  { label: "Contact", href: "/contact" },
];

export type FooterLink = { label: string; href: string };
export type FooterMetaLink = { label: string; href: string; icon?: string };
export type FooterLinkColumn = { title: string; links: FooterLink[] };

export const defaultFooterServicesColumn: FooterLinkColumn = {
  title: "Services",
  links: [
    { label: "Cybersecurity", href: "/services#cybersecurity" },
    { label: "Cloud Solutions", href: "/services#cloud" },
    { label: "Data Services", href: "/services#data" },
    { label: "Blockchain", href: "/services#blockchain" },
  ],
};

export const defaultFooterCompanyColumn: FooterLinkColumn = {
  title: "Company",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/project" },
    { label: "Contact", href: "/contact" },
  ],
};

export const defaultFooterColumns: FooterLinkColumn[] = [
  defaultFooterServicesColumn,
  defaultFooterCompanyColumn,
];

export const defaultFooterMeta = {
  brand: "Adam Technology",
  description:
    "Pioneering secure digital horizons from the heart of Dubai, fully licensed and enterprise-ready.",
  officeAddress:
    "Adam Technology LLC, ART XV Residency, Office 103, Marasi Dr, Business Bay, Dubai, UAE",
  social: [
    {
      icon: "globe",
      label: "Website",
      href: "https://www.adamtechnology.ae",
    },
    {
      icon: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/adamtechnology",
    },
  ],
  copyright: "© 2026 Adam Technology LLC",
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and conditions", href: "/terms" },
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
