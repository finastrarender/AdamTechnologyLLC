/**
 * Seed MongoDB with SiteGlobal, Pages, and an admin user.
 * Run: pnpm seed
 * Requires MONGODB_URI in .env or .env.local
 */
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

import User from "../src/models/User";
import SiteGlobal from "../src/models/SiteGlobal";
import Page from "../src/models/Page";
import { DEFAULT_SERVICES_GRID } from "../src/data/services-reference";
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
} from "../src/data/page-section-defaults";
import {
  defaultApplyNowModal,
  defaultFooterColumns,
  defaultFooterMeta,
} from "../src/data/site-defaults";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

function section(type: string, order: number, data: Record<string, unknown>) {
  return { id: nanoid(), type, order, data };
}

const navItems = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/project" },
  { label: "CONTACT US", href: "/contact" },
];
const footerColumns = defaultFooterColumns;
const footerMeta = defaultFooterMeta;

const servicesGridData = DEFAULT_SERVICES_GRID;

const servicesAccordionData = {
  cards: [
    {
      title: "Management & Strategic Consultancy",
      description:
        "Strategic advisory solutions that help businesses achieve sustainable growth, operational efficiency, and competitive market positioning..",
      iconImage: "/home/headquarters.png",
      category: "management",
      points: ["Business Growth & Expansion Strategy","Corporate Advisory Services","Operational Excellence Planning"],
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
        "Professional membership networks designed to connect entrepreneurs, corporates, investors, and industry leaders through collaboration and business engagement.",
      iconImage: "/home/headquarters.png",
      category: "membership",
      points: ["Industry Networking Events","Executive & Professional Communities","Partnership & Collaboration Opportunities"],
    },
    {
      title: "Manpower & Placement",
      description:
        "Comprehensive recruitment and workforce solutions that connect organizations with skilled professionals across multiple industries.",
      iconImage: "/home/headquarters.png",
      category: "manpower",
      points: ["alent Acquisition & Recruitment","Executive Search & Placement","Internship & Career Support Programs"],
    },
    {
      title: "Education & Training",
      description:
        "Professional education and skill development programs focused on leadership, technology, business management, and career advancement.",
      iconImage: "/home/headquarters.png",
      category: "education",
      points: ["Executive & Leadership Training","AI & Technology Programs","Professional Certification Courses"],
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
  image: "/home/incubation.jpg",
  stat: {
    value: "50+",
    label: "Startups Accelerated",
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

const clientLogosData = {
  eyebrow: "TRUSTED BY INSTITUTIONAL LEADERS",
  logos: ["GLOBAL BANK", "TECH LOGISTICS", "DUBAI URBAN", "GOV SECTOR", "CORE ENERGY"],
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
      title: "Executive Leadership & Strategic Management",
      description:
        "Master the complete life of modern corporate leadership and learn to drive organizational growth through strategy.",
      skills: ["Leadership", "Policy", "Conflict Resolution", "MBA"],
      weeks: "12 Weeks",
      image: "/home/headquarters.png",
    },
    {
      badge: "Intermediate",
      title: "The Startup Catalyst: From Idea to Exit",
      description:
        "A comprehensive guide for entrepreneurs to validate business models, secure funding, and scale operations.",
      skills: ["Pitching", "Venture Capital", "MVP Dev"],
      weeks: "8 Weeks",
      image: "/home/hero-bg.jpg",
    },
    {
      badge: "Professional",
      title: "Certified Business Data Analyst",
      description:
        "Bridge the gap between raw data and business insights. Learn tools like SQL, Python, and Tableau for decision-making.",
      skills: ["Data Viz", "Predictive Modeling", "BI Tools"],
      weeks: "16 Weeks",
      image: "/home/headquarters.svg",
    },
    {
      badge: "Beginner",
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

const homeSections = [
  section("hero", 0, HERO_SECTION_DEFAULT),
  section("intro", 1, INTRO_SECTION_DEFAULT),
  section("services", 2, SERVICES_SECTION_DEFAULT),
  section("whyChoose", 3, WHY_CHOOSE_SECTION_DEFAULT),
  section("cta", 4, CTA_SECTION_DEFAULT),
];

const aboutSections = [
  section("aboutHero", 0, ABOUT_HERO_SECTION_DEFAULT),
  section("aboutVisionMission", 1, ABOUT_VISION_MISSION_SECTION_DEFAULT),
  section("aboutValues", 2, ABOUT_VALUES_SECTION_DEFAULT),
  section("aboutAdvantage", 3, ABOUT_ADVANTAGE_SECTION_DEFAULT),
];

const servicesPageSections = [
  section("servicesHero", 0, SERVICES_HERO_SECTION_DEFAULT),
  section("servicesGrid", 1, servicesGridData),
];

const coursesPageSections = [section("coursesCatalog", 0, coursesCatalogData)];
const incubationPageSections = [section("incubation", 0, incubationData)];
const researchPageSections = [section("researchHub", 0, researchHubData)];

const contactPageSections = [
  section("contactInquiry", 0, CONTACT_INQUIRY_SECTION_DEFAULT),
];

const projectPageSections = [
  section("projectsHero", 0, PROJECTS_HERO_SECTION_DEFAULT),
  section("projectsCapabilities", 1, PROJECTS_CAPABILITIES_SECTION_DEFAULT),
  section("projectsPortfolio", 2, PROJECTS_PORTFOLIO_SECTION_DEFAULT),
];

const termsPageSections = [
  section("legalHero", 0, LEGAL_HERO_SECTION_DEFAULT),
  section("legalDocument", 1, LEGAL_DOCUMENT_SECTION_DEFAULT),
];

const privacyPageSections = [
  section("legalHero", 0, PRIVACY_HERO_SECTION_DEFAULT),
  section("legalDocument", 1, PRIVACY_DOCUMENT_SECTION_DEFAULT),
];

async function main() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "AdminChangeMe!", 12);
  await User.findOneAndUpdate(
    { email: "admin@adamtechnology.com" },
    { $set: { email: "admin@adamtechnology.com", passwordHash } },
    { upsert: true },
  );
  console.log("Admin user: admin@adamtechnology.com /", process.env.ADMIN_PASSWORD ?? "AdminChangeMe!");

  await SiteGlobal.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        key: "default",
        navItems,
        footerColumns,
        footerMeta,
        logoSrc: "",
        featureFlags: { clientLogos: true, footerLogoLightFilter: true },
        applyNowModal: defaultApplyNowModal,
        seoDefaults: {
          defaultTitle: "Adam Technology L.L.C.",
          defaultDescription:
            "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
        },
      },
    },
    { upsert: true },
  );
  console.log("SiteGlobal seeded");

const pages = [
    {
      slug: "home",
      title: "Home",
      sections: homeSections,
      seoTitle: "Adam Technology L.L.C.",
      seoDescription:
        "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
    },
    {
      slug: "about",
      title: "About Us",
      sections: aboutSections,
      seoTitle: "About Us | Adam Technology L.L.C.",
      seoDescription: "Learn about Adam Technology L.L.C. and our security-first approach to building and operating modern digital infrastructure.",
    },
    {
      slug: "services",
      title: "Services",
      sections: servicesPageSections,
      seoTitle: "Services | Adam Technology L.L.C.",
      seoDescription: "Explore our cybersecurity, cloud & data, and software engineering services.",
    },
    {
      slug: "contact",
      title: "Contact",
      sections: contactPageSections,
      seoTitle: "Contact | Adam Technology L.L.C.",
      seoDescription: "Reach our advisors for enterprise cybersecurity, cloud & data, and custom software delivery.",
    },
    {
      slug: "project",
      title: "Projects",
      sections: projectPageSections,
      seoTitle: "Projects | Adam Technology L.L.C.",
      seoDescription:
        "Explore Adam Technology case studies in cybersecurity, cloud infrastructure, and blockchain solutions for global enterprises.",
    },
    {
      slug: "terms",
      title: "Terms & Conditions",
      sections: termsPageSections,
      seoTitle: "Terms & Conditions | Adam Technology L.L.C.",
      seoDescription:
        "Read the Terms of Use governing access to and use of the Adam Technology website.",
    },
    {
      slug: "privacy",
      title: "Privacy Policy",
      sections: privacyPageSections,
      seoTitle: "Privacy Policy | Adam Technology L.L.C.",
      seoDescription:
        "Read how Adam Technology collects, uses, and protects personal data across our website and services.",
    },
  ];

  await Page.deleteMany({
    slug: { $nin: ["home", "about", "services", "contact", "project", "terms", "privacy"] },
  });
  console.log("Removed non-core pages from DB");

  for (const p of pages) {
    const published = structuredClone(p.sections);
    await Page.findOneAndUpdate(
      { slug: p.slug },
      {
        $set: {
          slug: p.slug,
          title: p.title,
          status: "published",
          sections: p.sections,
          publishedSections: published,
          publishedAt: new Date(),
          seoTitle: p.seoTitle,
          seoDescription: p.seoDescription,
        },
      },
      { upsert: true },
    );
    console.log("Page seeded:", p.slug);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



