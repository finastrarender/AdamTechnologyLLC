/**
 * Static page content when Mongo has no row yet (before `pnpm seed`)
 * or when a slug is missing. Keeps the marketing site usable on first run.
 */
import { DEFAULT_SERVICES_GRID } from "@/data/services-reference";
import {
  ABOUT_ADVANTAGE_SECTION_DEFAULT,
  ABOUT_HERO_SECTION_DEFAULT,
  ABOUT_VALUES_SECTION_DEFAULT,
  ABOUT_VISION_MISSION_SECTION_DEFAULT,
  CONTACT_INQUIRY_SECTION_DEFAULT,
  CTA_SECTION_DEFAULT,
  HERO_SECTION_DEFAULT,
  INTRO_SECTION_DEFAULT,
  LEGAL_DOCUMENT_SECTION_DEFAULT,
  LEGAL_HERO_SECTION_DEFAULT,
  PRIVACY_DOCUMENT_SECTION_DEFAULT,
  PRIVACY_HERO_SECTION_DEFAULT,
  PROJECTS_CAPABILITIES_SECTION_DEFAULT,
  PROJECTS_HERO_SECTION_DEFAULT,
  PROJECTS_PORTFOLIO_SECTION_DEFAULT,
  SERVICES_HERO_SECTION_DEFAULT,
  SERVICES_SECTION_DEFAULT,
  WHY_CHOOSE_SECTION_DEFAULT,
} from "@/data/page-section-defaults";
import type { PublicPageView } from "@/lib/content/pages";
import type { PageSection } from "@/types/section";

function sid(slug: string, type: string, order: number): string {
  return `fb-${slug}-${type}-${order}`;
}

const servicesGridData = DEFAULT_SERVICES_GRID;

const servicesAccordionData = {
  cards: [
    {
      title: "Management & Strategic Consultancy",
      description:
        "End-to-end advisory for market entry, business growth, operational excellence, and long-term organizational strategy.",
      iconImage: "/home/headquarters.png",
      category: "management",
      points: [],
    },
    {
      title: "Research & Innovation",
      description:
        "Our state-of-the-art AI labs and incubation facilities support startups and established firms in developing breakthrough technologies.",
      iconImage: "/home/hero-bg.jpg",
      category: "research",
      points: [
        "AI & Machine Learning Research",
        "Product Incubation & Prototyping",
        "Market Intelligence Reports",
      ],
    },
    {
      title: "Membership Organizations",
      description:
        "Exclusive membership networks that connect founders, enterprises, and investors through high-impact events and collaborations.",
      iconImage: "/home/headquarters.png",
      category: "membership",
      points: [],
    },
    {
      title: "Manpower & Placement",
      description:
        "Talent acquisition and placement support aligned to strategic workforce planning and specialized industry requirements.",
      iconImage: "/home/headquarters.png",
      category: "manpower",
      points: [],
    },
    {
      title: "Education & Training",
      description:
        "Professional learning pathways, executive programs, and hands-on workshops for business and technology leaders.",
      iconImage: "/home/headquarters.png",
      category: "education",
      points: [],
    },
  ],
};

const incubationData = {
  badge: "ONE WORLD BUSINESS SCHOOL & INCUBATION CENTRE FZE",
  title: "Turn Your Vision into a Market-Leading Enterprise",
  description:
    "The ultimate ecosystem for founders. We provide the capital, mentorship, and global network required to scale your startup from concept to exit.",
  heroTitleLines: ["Turn Your Vision into a", "Market-Leading Enterprise"],
  heroDescription:
    "The ultimate ecosystem for founders. We provide the capital, mentorship, and global network required to scale your startup from concept to exit.",
  primaryAction: { label: "Start Your Journey", href: "/contact" },
  secondaryAction: { label: "View Portfolio", href: "/about" },
  roadmapTitle: "The Incubation Roadmap",
  roadmapSubtitle: "A structured transition from idea to global scale.",
  steps: [
    {
      number: 1,
      title: "Idea Validation",
      description:
        "When your ideas seem crazy, analyze market gaps, and write your unique value proposition with clarity.",
    },
    {
      number: 2,
      title: "MVP Development",
      description:
        "Build the first viable product in under 90 days with low-cost development and user-centric features.",
    },
    {
      number: 3,
      title: "Market Growth",
      description:
        "Go-to-market strategies that actually work. We connect you with first customers and help refine product-market fit.",
    },
  ],
  roadmapItems: [
    {
      title: "Idea Validation",
      description:
        "When your ideas seem crazy, analyze market gaps, and write your unique value proposition with clarity.",
      points: ["Market Research Support", "SWOT Feasibility Audit"],
      image: "/home/headquarters.png",
    },
    {
      title: "MVP Development",
      description:
        "Build the first viable product in under 90 days with low-cost development and user-centric features.",
      points: ["UI/UX Prototyping", "Packaging Resources"],
      image: "/home/hero-bg.jpg",
    },
    {
      title: "Market Growth",
      description:
        "Go-to-market strategies that actually work. We connect you with first customers and help refine product-market fit.",
      points: ["Sales Mentorship Programs", "Capital & Partner Network"],
      image: "/home/headquarters.png",
    },
  ],
  portfolioTitle: "Portfolio Highlights",
  portfolioDescription:
    "See how we've helped disruptive startups navigate the complexities of international business growth.",
  portfolioAction: { label: "View all stories ->", href: "/about" },
  portfolioCards: [
    {
      category: "FINTECH",
      title: "NexGen Payments",
      description:
        "Scaled from a local gateway to a cross-border payment powerhouse within 18 months.",
      metrics: [
        { value: "300%", label: "Growth" },
        { value: "$12M", label: "Series A" },
      ],
      image: "/home/hero-bg.jpg",
    },
    {
      category: "SUSTAINABILITY",
      title: "GreenTrace AI",
      description:
        "Using AI to optimize supply chains and reduce carbon footprints in agriculture.",
      metrics: [
        { value: "50+", label: "Partners" },
        { value: "2.4k", label: "Tons CO2 Saved" },
      ],
      image: "/home/headquarters.png",
    },
  ],
  applicationTitle: "Ready to Build Your Legacy?",
  applicationDescription:
    "We are looking for bold founders solving hard problems. Our next cohort application window is now open. Apply today and get access to the ecosystem you need to win.",
  applicationFields: [
    { label: "Full Name", placeholder: "Jane Doe" },
    { label: "Startup Name", placeholder: "Acme Inc." },
    { label: "Email Address", placeholder: "jane@startup.com" },
    {
      label: "Pitch Deck URL",
      placeholder: "https://dropbox.com/your-pitch-deck",
    },
  ],
  applicationSubmitLabel: "Submit Application",
  applicationNote:
    "Our team typically responds within 5-7 business days for initial screening.",
  image: "/home/headquarters.png",
  stat: {
    value: "250+",
    label: "Companies launched",
  },
};

const homeIncubationHighlightData = {
  title: "From Idea to Global Scale",
  description:
    "Our Incubation Centre provides more than just desk space. We offer a structured ecosystem designed to accelerate high-growth potential startups.",
  steps: [
    {
      number: 1,
      title: "Ideation & Validation",
      description: "Testing your core assumptions in the real market.",
    },
    {
      number: 2,
      title: "Product Development",
      description: "Building MVPs with expert technical mentorship.",
    },
    {
      number: 3,
      title: "Market Scaling",
      description: "Venture capital access and global expansion strategies.",
    },
  ],
  image: "/home/incubation.jpg",
  stat: {
    value: "50+",
    label: "Startups Accelerated",
  },
};

const globalStandardsData = {
  eyebrow: "OUR CAPABILITIES",
  title: "CORE PILLARS",
  description:
    "Modular solutions designed to scale with the complexity of your operational demands.",
  pillars: [
    {
      icon: "security",
      title: "CYBER SECURITY",
      description:
        "Defensive architecture and threat intelligence systems built to withstand the most sophisticated breaches.",
    },
    {
      icon: "online",
      title: "DATA & CLOUD",
      description:
        "High-performance cloud migration and sovereign data warehousing for sensitive enterprise assets.",
    },
    {
      icon: "innovation",
      title: "SOFTWARE & DEV",
      description:
        "Custom enterprise software engineered with a security-first methodology and technical excellence.",
    },
    {
      icon: "corporate",
      title: "CONSULTING",
      description:
        "Strategic advisory and specialized workforce training to foster a culture of technological resilience.",
    },
  ],
};

const investmentData = {
  id: "investment",
  heading: ["Why Partners Choose", "One World Capital"],
  items: [
    {
      icon: "âœ“",
      title: "Global Expertise",
      description:
        "Navigating international markets with deep-rooted regulatory and cultural knowledge.",
    },
    {
      icon: "âœ“",
      title: "Strategic Advisory",
      description:
        "Outcome-focused guidance that prioritizes sustainable growth and long-term value.",
    },
    {
      icon: "âœ“",
      title: "Risk Management",
      description:
        "Rigorous due diligence and proprietary risk assessment frameworks for every venture.",
    },
  ],
  quoteText:
    '"One World Capital provides the vision and the vehicle for international expansion that few others can match."',
  quoteAuthor: "Strategic Portfolio Insight",
  quoteRole: "Global Division",
};

const clientLogosData = {
  eyebrow: "LICENSED BY DUBAI DEPARTMENT OF ECONOMY & TOURISM",
  logos: ["FINBANK", "MEDITECH", "DXB_GOV", "SECURE_AE", "ENERGY_CORE", "FINBANK"],
};

const servicesCtaData = {
  title: "ALL SYSTEMS OPERATIONAL // DUBAI HUB",
  description: "",
  primaryAction: { label: "DOWNLOAD CAPABILITY STATEMENT", href: "/contact" },
  secondaryAction: { label: "", href: "/contact" },
};

const coursesCatalogData = {
  title: "Master the Future of Business",
  description:
    "Professional training programs designed to bridge the gap between academic knowledge and industry excellence.",
  categories: ["Business Management", "Entrepreneurship", "Digital Marketing", "Data Analytics"],
  levels: ["All Levels", "Beginner", "Intermediate", "Advanced"],
  durations: ["Any Duration", "4-8 Weeks", "8-12 Weeks", "12+ Weeks"],
  courses: [
    {
      badge: "Advanced",
      category: "Business Management",
      level: "Advanced",
      title: "Executive Leadership & Strategic Management",
      description:
        "Master the complete life of modern corporate leadership and learn to drive organizational growth through strategy.",
      skills: ["Leadership", "Policy", "Conflict Resolution", "MBA"],
      weeks: "12 Weeks",
      image: "/home/headquarters.png",
    },
    {
      badge: "Intermediate",
      category: "Entrepreneurship",
      level: "Intermediate",
      title: "The Startup Catalyst: From Idea to Exit",
      description:
        "A comprehensive guide for entrepreneurs to validate business models, secure funding, and scale operations.",
      skills: ["Pitching", "Venture Capital", "MVP Dev"],
      weeks: "8 Weeks",
      image: "/home/hero-bg.jpg",
    },
    {
      badge: "Professional",
      category: "Data Analytics",
      level: "Advanced",
      title: "Certified Business Data Analyst",
      description:
        "Bridge the gap between raw data and business insights. Learn tools like SQL, Python, and Tableau for decision-making.",
      skills: ["Data Viz", "Predictive Modeling", "BI Tools"],
      weeks: "16 Weeks",
      image: "/home/headquarters.svg",
    },
    {
      badge: "Beginner",
      category: "Digital Marketing",
      level: "Beginner",
      title: "Global Marketing & Brand Identity",
      description:
        "Learn how to create compelling brand stories and execute multi-channel marketing campaigns across diverse markets.",
      skills: ["Branding", "Social Media", "Analytics"],
      weeks: "6 Weeks",
      image: "/home/headquarters.png",
    },
  ],
};

const researchHubData = {
  heroBadge: "ADVANCED RESEARCH DIVISION",
  heroTitleLines: ["Architecting the", "Future", "of Global Industry."],
  heroDescription:
    "One World Business School and Incubation Centre FZE operates at the intersection of academic rigor and industrial application, driving breakthroughs in autonomous systems and sustainable frameworks.",
  heroPrimaryAction: { label: "Explore Lab Journals", href: "/contact" },
  heroSecondaryAction: { label: "Submit Proposal", href: "/contact" },
  heroImage: "/home/hero-bg.jpg",
  overviewTitle: "Pushing Boundaries Through Interdisciplinary Inquiry",
  overviewDescription:
    "Our research philosophy centers on the integration of theoretical frameworks with real-world technical implementation. We provide the infrastructure for scholars and entrepreneurs to test hypotheses in simulated and physical environments.",
  overviewPoints: [
    "Global Intellectual Property Development",
    "Incubation-Integrated Research Cycles",
    "Cross-Border Academic Partnerships",
  ],
  overviewImage: "/home/headquarters.png",
  pillarsTitle: "Core Research Pillars",
  pillars: [
    {
      icon: "innovation",
      title: "AI & Robotics",
      description:
        "Developing autonomous algorithms and kinetic hardware interfaces for industrial optimization and logistics.",
      project: "ONGOING PROJECT: PROJECT SENTINEL",
    },
    {
      icon: "vision",
      title: "AR/VR Simulation",
      description:
        "Immersive environments for complex business strategy visualization and high-risk technical training.",
      project: "ONGOING PROJECT: META-CAMPUS 2.0",
    },
    {
      icon: "compliance",
      title: "Environmental Studies",
      description:
        "Carbon sequestration models and sustainable supply chain ethics in the evolving global landscape.",
      project: "ONGOING PROJECT: ECO-SUPPLY GRAPH",
    },
  ],
  metrics: [
    { value: "124+", label: "WHITE PAPERS" },
    { value: "42", label: "PATENTS FILED" },
    { value: "15", label: "GLOBAL LABS" },
    { value: "$12M", label: "GRANT FUNDING" },
  ],
  simulationTitle: "Real-Time Impact Simulation",
  simulationDescription:
    "We leverage proprietary data models to predict the economic impact of emerging technologies. Our current research focus is on the acceleration of robotic automation in mid-market manufacturing sectors.",
  accuracyLabel: "MODEL ACCURACY",
  accuracyValue: "98.2%",
  velocityLabel: "DEPLOYMENT VELOCITY",
  velocityValue: "74.5%",
  simulationImage: "/home/hero-bg.jpg",
};

function sections(slug: string, list: { type: PageSection["type"]; order: number; data: Record<string, unknown> }[]): PageSection[] {
  return list.map((s) => ({
    id: sid(slug, s.type, s.order),
    type: s.type,
    order: s.order,
    data: s.data,
  }));
}

const FALLBACK_BY_SLUG: Record<string, PublicPageView> = {
  home: {
    slug: "home",
    title: "Home",
    status: "published",
    seoTitle: "Adam Technology L.L.C.",
    seoDescription:
      "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
    effectiveSections: sections("home", [
      { type: "hero", order: 0, data: HERO_SECTION_DEFAULT },
      { type: "intro", order: 1, data: INTRO_SECTION_DEFAULT },
      { type: "services", order: 2, data: SERVICES_SECTION_DEFAULT },
      { type: "whyChoose", order: 3, data: WHY_CHOOSE_SECTION_DEFAULT },
      { type: "cta", order: 4, data: CTA_SECTION_DEFAULT },
    ]),
    isPreview: false,
  },
  about: {
    slug: "about",
    title: "About Us",
    status: "published",
    seoTitle: "About Us | Adam Technology L.L.C.",
    seoDescription:
      "Learn about Adam Technology L.L.C. and our security-first approach to building and operating modern digital infrastructure.",
    effectiveSections: sections("about", [
      { type: "aboutHero", order: 0, data: ABOUT_HERO_SECTION_DEFAULT },
      { type: "aboutVisionMission", order: 1, data: ABOUT_VISION_MISSION_SECTION_DEFAULT },
      { type: "aboutValues", order: 2, data: ABOUT_VALUES_SECTION_DEFAULT },
      { type: "aboutAdvantage", order: 3, data: ABOUT_ADVANTAGE_SECTION_DEFAULT },
    ]),
    isPreview: false,
  },
  services: {
    slug: "services",
    title: "Services",
    status: "published",
    seoTitle: "Services | Adam Technology L.L.C.",
    seoDescription: "Explore our cybersecurity, cloud & data, and software engineering services.",
    effectiveSections: sections("services", [
      { type: "servicesHero", order: 0, data: SERVICES_HERO_SECTION_DEFAULT },
      { type: "servicesGrid", order: 1, data: servicesGridData },
    ]),
    isPreview: false,
  },
  contact: {
    slug: "contact",
    title: "Contact",
    status: "published",
    seoTitle: "Contact | Adam Technology L.L.C.",
    seoDescription: "Contact Adam Technology L.L.C. for secure, enterprise-grade cybersecurity and infrastructure support.",
    effectiveSections: sections("contact", [
      { type: "contactInquiry", order: 0, data: CONTACT_INQUIRY_SECTION_DEFAULT },
    ]),
    isPreview: false,
  },
  project: {
    slug: "project",
    title: "Projects",
    status: "published",
    seoTitle: "Projects | Adam Technology L.L.C.",
    seoDescription:
      "Explore Adam Technology case studies in cybersecurity, cloud infrastructure, and blockchain solutions for global enterprises.",
    effectiveSections: sections("project", [
      { type: "projectsHero", order: 0, data: PROJECTS_HERO_SECTION_DEFAULT },
      { type: "projectsCapabilities", order: 1, data: PROJECTS_CAPABILITIES_SECTION_DEFAULT },
      { type: "projectsPortfolio", order: 2, data: PROJECTS_PORTFOLIO_SECTION_DEFAULT },
    ]),
    isPreview: false,
  },
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    status: "published",
    seoTitle: "Terms & Conditions | Adam Technology L.L.C.",
    seoDescription:
      "Read the Terms of Use governing access to and use of the Adam Technology website.",
    effectiveSections: sections("terms", [
      { type: "legalHero", order: 0, data: LEGAL_HERO_SECTION_DEFAULT },
      { type: "legalDocument", order: 1, data: LEGAL_DOCUMENT_SECTION_DEFAULT },
    ]),
    isPreview: false,
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    status: "published",
    seoTitle: "Privacy Policy | Adam Technology L.L.C.",
    seoDescription:
      "Read how Adam Technology collects, uses, and protects personal data across our website and services.",
    effectiveSections: sections("privacy", [
      { type: "legalHero", order: 0, data: PRIVACY_HERO_SECTION_DEFAULT },
      { type: "legalDocument", order: 1, data: PRIVACY_DOCUMENT_SECTION_DEFAULT },
    ]),
    isPreview: false,
  },
};

export function getFallbackPageView(slug: string): PublicPageView | null {
  return FALLBACK_BY_SLUG[slug] ?? null;
}



