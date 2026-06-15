/**
 * Canonical marketing page section content — matches the public website (fallback-pages).
 * Used by admin defaults, seed script, and fallback page data.
 */
import {
  DEFAULT_PROJECTS_CAPABILITIES,
  DEFAULT_PROJECTS_HERO,
  DEFAULT_PROJECTS_PORTFOLIO,
} from "@/data/projects-reference";
import { DEFAULT_SERVICES_GRID } from "@/data/services-reference";
import { DEFAULT_LEGAL_DOCUMENT, DEFAULT_LEGAL_HERO } from "@/data/terms-reference";
import { DEFAULT_PRIVACY_DOCUMENT, DEFAULT_PRIVACY_HERO } from "@/data/privacy-reference";
import type { SectionType } from "@/types/section";

export const HERO_SECTION_DEFAULT = {
  badge: "DUBAI LICENSED TECHNOLOGY COMPANY",
  title: ["Powering Secure and", "Future-Ready", "Technology"],
  description:
    "Dubai-based experts in Cybersecurity, Cloud Infrastructure, Blockchain Services, and Intelligent Technology Solutions tailored for enterprise excellence.",
  highlights: [
    "Licensed UAE Company",
    "Enterprise Security Solutions",
    "Blockchain & Cloud Experts",
  ],
  primaryAction: { label: "Schedule Consultation", href: "/contact" },
  secondaryAction: { label: "Explore Services", href: "/services" },
  visualImage: "/home/hero-visual.png",
};

export const INTRO_SECTION_DEFAULT = {
  eyebrow: "",
  title: ["THE ARCHITECT OF", "ENTERPRISE TRUST"],
  description:
    "Headquartered in Dubai, Adam Technology L.L.C. stands at the intersection of security and innovation. We provide the sovereign digital foundations that global enterprises rely on.",
  more:
    'Our approach is rooted in "Cyber-Industrialism"--treating every software deployment and security protocol as a critical infrastructure project that requires absolute precision and zero-fail resilience.',
  highlights: [],
  image: "/home/headquarters.png",
  href: "/about",
  buttonLabel: "About us",
  icon: "",
  expcount: 0,
};

export const SERVICES_SECTION_DEFAULT = {
  eyebrow: "OUR EXPERTISE",
  title: "Integrated Tech Ecosystem",
  description: "",
  backgroundImage: "",
  cards: [
    {
      icon: "shield",
      title: "Cybersecurity",
      description:
        "Defensive architecture and threat intelligence systems built to withstand the most sophisticated breaches.",
    },
    {
      icon: "cloud",
      title: "Data & Cloud",
      description:
        "High-performance cloud migration and sovereign data warehousing for sensitive enterprise assets.",
    },
    {
      icon: "code",
      title: "Software & Dev",
      description:
        "Custom enterprise software engineered with a security-first methodology and technical excellence.",
    },
    {
      icon: "nodes",
      title: "Consulting",
      description:
        "Strategic advisory and specialized workforce training to foster a culture of technological resilience.",
    },
  ],
};

export const WHY_CHOOSE_SECTION_DEFAULT = {
  title: "The Technology Ecosystem",
  subheading:
    "Our solutions aren't silos; they are interconnected nodes designed to amplify each other. A secure cloud powers your data, while blockchain ensures the integrity of every transaction.",
  items: [
    {
      icon: "ShieldCheck",
      title: "Licensed Excellence",
      description:
        "Operating under Dubai's strict regulatory standards for absolute compliance.",
      tags: [],
    },
    {
      icon: "Rocket",
      title: "Scalable Future",
      description: "Systems designed to grow seamlessly with your enterprise demands.",
      tags: [],
    },
  ],
};

export const CTA_SECTION_DEFAULT = {
  title: "Ready to Secure Your Digital Infrastructure?",
  description:
    "Join the ranks of Dubai's most secure enterprises. Let's build your future-ready technology stack today.",
  action: { label: "Book Consultation", href: "/contact" },
};

export const SERVICES_HERO_SECTION_DEFAULT = {
  eyebrow: "STRATEGIC TECHNOLOGY PARTNER",
  title: "Our Services",
  description:
    "We provide high-stakes enterprise technology excellence, architecting resilient infrastructures and innovative software solutions that drive global digital transformation.",
};

export const SERVICES_GRID_SECTION_DEFAULT = DEFAULT_SERVICES_GRID;

export const ABOUT_HERO_SECTION_DEFAULT = {
  titleAccent: "The Digital",
  titleMain: "Architect",
  description:
    "Engineering high-precision digital ecosystems for global enterprises. We bridge the gap between industrial reliability and neural-speed innovation.",
  backgroundImage: "/about/hero-office.jpg",
  stats: [
    { value: "14+", label: "GLOBAL NODES" },
    { value: "99.99%", label: "PROTOCOL UPTIME" },
  ],
};

export const ABOUT_VISION_MISSION_SECTION_DEFAULT = {
  overview: {
    title: "COMPANY OVERVIEW",
    description:
      "Adam Technology LLC is a premier IT and cybersecurity solutions provider headquartered in Dubai, UAE. Licensed by the Department of Economy and Tourism, the company specializes in protecting digital assets and modernizing the technology infrastructure of modern enterprises.",
    subDescription:
      "The firm bridges the gap between complex emerging technologies—such as Blockchain and the Metaverse—and practical, secure enterprise operations.",
    image: "/about/company-buildings.jpg",
  },
  items: [
    {
      title: "MISSION",
      description:
        "To design and deploy bulletproof infrastructure that empowers the next generation of sovereign enterprise data. We don't just host; we architect resilience.",
      icon: "Zap",
      accentColor: "#191d24",
    },
    {
      title: "VISION",
      description:
        "Securing the flow of global digital assets through hardware-first intelligence and cryptographical precision.",
      icon: "Eye",
      accentColor: "#6385cf",
    },
  ],
};

export const ABOUT_VALUES_SECTION_DEFAULT = {
  title: "Our Core Values",
  description:
    "The foundational principles that guide every interaction and project delivery at Adam Technology.",
  items: [
    {
      title: "Innovation",
      description: "Pushing boundaries to find smarter, more efficient ways to solve complex challenges.",
      icon: "lightbulb",
    },
    {
      title: "Security",
      description: "A non-negotiable priority built into the core of every solution we architect.",
      icon: "shieldCheck",
    },
    {
      title: "Reliability",
      description: "Consistency in performance and integrity in our commitments to clients.",
      icon: "handshake",
    },
    {
      title: "Client Success",
      description: "Measuring our performance by the growth and success of the businesses we serve.",
      icon: "trophy",
    },
  ],
};

export const ABOUT_ADVANTAGE_SECTION_DEFAULT = {
  title: "Why Choose Adam Technology?",
  description: "Combining technical depth with local market insight to deliver superior results.",
  items: [
    {
      title: "Enterprise Security",
      description:
        "Bank-grade security architectures designed to protect your most sensitive data assets from modern threats.",
      icon: "shieldCheck",
    },
    {
      title: "Cloud Expertise",
      description:
        "Seamless migration and management of multi-cloud environments for high-availability performance.",
      icon: "cloud",
    },
    {
      title: "Blockchain Integration",
      description:
        "Deploying distributed ledger technologies to enhance transparency and efficiency in operational workflows.",
      icon: "network",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Deep knowledge of local UAE data laws and global standards like GDPR and ISO/IEC 27001.",
      icon: "gavel",
    },
    {
      title: "Scalable Solutions",
      description:
        "Architectures that grow with your business, preventing technical debt and future-proofing investments.",
      icon: "trendingUp",
    },
    {
      title: "Technical Support",
      description:
        "Dedicated 24/7 expert support ensuring your technology ecosystem remains robust and operational.",
      icon: "headset",
    },
  ],
};

export const CONTACT_INQUIRY_SECTION_DEFAULT = {
  heroTitleLines: ["Secure Connection"],
  heroSideCopy:
    "Contact our strategic advisory team to deploy enterprise-grade solutions tailored for high-stakes environments.",
  formTitle: "Initialize Engagement",
  formDescription: "",
  submitLabel: "Submit Inquiry",
  formFields: {
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "John Doe",
    companyLabel: "Company Name",
    companyPlaceholder: "Global Enterprise LLC",
    workEmailLabel: "Business Email",
    workEmailPlaceholder: "j.doe@enterprise.com",
    interestLabel: "Interest Area",
    messageLabel: "Project Brief",
    messagePlaceholder: "Describe your technical requirements...",
    disclaimerText: "Your data is protected under UAE Federal Decree-Law No. 45 of 2021.",
    successMessage: "Thank you — our consultants will be in touch shortly.",
    errorMessage: "Network error",
  },
  inquiryOptions: [
    "Cloud Architecture",
    "Cybersecurity",
    "Cloud & Data",
    "Software Engineering",
    "Consulting",
    "Managed Services",
  ],
  officeHeading: "ADAM TECHNOLOGY LLC",
  officeItems: [
    {
      title: "ADAM TECHNOLOGY LLC",
      lines: ["ART XV RESIDENCY", "Office 103, Marasi Dr, Business Bay, Dubai, UAE"],
      icon: "location",
    },
    {
      title: "Phone",
      lines: ["+971 4 338 7946"],
      icon: "phone",
    },
    {
      title: "Email",
      lines: ["info@adamtechnology.ae"],
      icon: "mail",
    },
    {
      title: "Website",
      lines: ["www.adamtechnology.ae"],
      icon: "globe",
    },
  ],
  mapEmbedUrl: "",
  mapLabelTitle: "ADAM TECHNOLOGY LLC",
  mapLabelSubtitle: "ART XV RESIDENCY",
};

export const PROJECTS_HERO_SECTION_DEFAULT = DEFAULT_PROJECTS_HERO;
export const PROJECTS_CAPABILITIES_SECTION_DEFAULT = DEFAULT_PROJECTS_CAPABILITIES;
export const PROJECTS_PORTFOLIO_SECTION_DEFAULT = DEFAULT_PROJECTS_PORTFOLIO;

export const LEGAL_HERO_SECTION_DEFAULT = DEFAULT_LEGAL_HERO;
export const LEGAL_DOCUMENT_SECTION_DEFAULT = DEFAULT_LEGAL_DOCUMENT;
export const PRIVACY_HERO_SECTION_DEFAULT = DEFAULT_PRIVACY_HERO;
export const PRIVACY_DOCUMENT_SECTION_DEFAULT = DEFAULT_PRIVACY_DOCUMENT;

export function joinOverviewDescription(description?: string, subDescription?: string): string {
  const main = description?.trim() ?? "";
  const sub = subDescription?.trim() ?? "";
  if (!sub) return main;
  if (!main) return sub;
  return `${main}\n\n${sub}`;
}

export function splitOverviewDescription(text: string) {
  const splitMarker = "The firm bridges";
  const idx = text.indexOf(splitMarker);
  if (idx === -1) {
    return { description: text.trim(), subDescription: undefined as string | undefined };
  }
  return {
    description: text.slice(0, idx).trim(),
    subDescription: text.slice(idx).trim(),
  };
}

const SECTION_DEFAULTS: Partial<Record<SectionType, Record<string, unknown>>> = {
  hero: HERO_SECTION_DEFAULT,
  intro: INTRO_SECTION_DEFAULT,
  services: SERVICES_SECTION_DEFAULT,
  whyChoose: WHY_CHOOSE_SECTION_DEFAULT,
  cta: CTA_SECTION_DEFAULT,
  servicesHero: SERVICES_HERO_SECTION_DEFAULT,
  servicesGrid: SERVICES_GRID_SECTION_DEFAULT,
  aboutHero: ABOUT_HERO_SECTION_DEFAULT,
  aboutVisionMission: ABOUT_VISION_MISSION_SECTION_DEFAULT,
  aboutValues: ABOUT_VALUES_SECTION_DEFAULT,
  aboutAdvantage: ABOUT_ADVANTAGE_SECTION_DEFAULT,
  contactInquiry: CONTACT_INQUIRY_SECTION_DEFAULT,
  projectsHero: PROJECTS_HERO_SECTION_DEFAULT,
  projectsCapabilities: PROJECTS_CAPABILITIES_SECTION_DEFAULT,
  projectsPortfolio: PROJECTS_PORTFOLIO_SECTION_DEFAULT,
  legalHero: LEGAL_HERO_SECTION_DEFAULT,
  legalDocument: LEGAL_DOCUMENT_SECTION_DEFAULT,
};

export function getDefaultSectionData(type: SectionType): Record<string, unknown> {
  const defaults = SECTION_DEFAULTS[type];
  return defaults ? structuredClone(defaults) : {};
}
