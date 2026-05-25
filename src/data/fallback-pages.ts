/**
 * Static page content when Mongo has no row yet (before `pnpm seed`)
 * or when a slug is missing. Keeps the marketing site usable on first run.
 */
import type { PublicPageView } from "@/lib/content/pages";
import type { PageSection } from "@/types/section";

function sid(slug: string, type: string, order: number): string {
  return `fb-${slug}-${type}-${order}`;
}

const heroData = {
  badge: "ENTERPRISE GRADE INTELLIGENCE",
  title: ["POWERING", "SECURE", "AND", "FUTURE", "TECHNOLOGY"],
  description:
    "Adam Technology L.L.C. delivers high-precision digital infrastructure for the modern era. We architect, secure, and scale enterprise systems with industrial-grade resilience.",
  primaryAction: { label: "EXPLORE SERVICES", href: "/services" },
  secondaryAction: { label: "BOOK FREE ADVICE", href: "/contact" },
  backgroundImage: "/home/hero-bg.jpg",
};

const introData = {
  eyebrow: "About Us",
  title: ["Diverse UAE Free Zone", "Strategic Operations"],
  description:
    "One World Trade Centre FZE operates at the intersection of global trade and innovation. We provide seamless corporate solutions from our professional headquarters, leveraging the unique economic advantages of the UAE to scale international businesses.",
  highlights: [
    "Expertise in multi-jurisdictional licensing",
    "Direct access to global trade corridors",
    "High-tier corporate governance and advisory",
  ],
  image: "/home/headquarters.png",
};

const servicesData = {
  eyebrow: "OUR CAPABILITIES",
  title: "CORE PILLARS",
  description:
    "Modular solutions designed to scale with the complexity of your operational demands.",
  backgroundImage: "",
  cards: [
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

const servicesHeroData = {
  title: ["SYSTEM", "ARCHITECTURE"],
  description:
    "Enterprise-grade technological dominance through modular infrastructure, elite cybersecurity protocols, and bespoke software orchestration.",
  backgroundImage: "/home/hero-bg.jpg",
};

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

const servicesGridData = {
  title: "",
  description: "",
  filters: ["ALL"],
  cards: [
    {
      category: "THREAT INTEL",
      title: "CYBERSECURITY",
      icon: "security",
      description:
        "Proactive threat neutralization and sovereign data protection. We deploy advanced cryptographic standards and real-time mesh monitoring to secure enterprise perimeters.",
      features: ["THREAT INTEL", "ZERO TRUST", "SOC OPS"],
      cta: "",
    },
    {
      category: "HYBRID MULTI-CLOUD",
      title: "DATA & CLOUD",
      icon: "online",
      description:
        "High-availability cloud orchestration. Scalable neural architectures designed for 99.99% uptime and hyper-efficient data throughput.",
      features: ["HYBRID MULTI-CLOUD", "EDGE COMPUTING"],
      cta: "",
    },
    {
      category: "MODULAR STACKS",
      title: "SOFTWARE & DEV",
      icon: "innovation",
      description:
        "Mission-critical application development. Precision-engineered codebase built for speed, modularity, and future-proof scaling.",
      features: [],
      cta: "",
    },
    {
      category: "EXECUTIVE ENABLEMENT",
      title: "CONSULTING & TRAINING",
      icon: "corporate",
      description:
        "Empowering executive leadership through deep-tech audits and specialized personnel upskilling in emerging tech paradigms.",
      features: [],
      cta: "",
    },
    {
      category: "Technology",
      title: "Technology & Innovation",
      icon: "Monitor",
      description:
        "Driving digital transformation through fintech solutions, blockchain integration, and advanced technology consulting.",
      features: ["Fintech Solutions", "Blockchain Consulting", "Digital Strategy"],
      cta: "Learn More",
    },
    {
      category: "Specialized",
      title: "Specialized Consulting",
      icon: "FlaskConical",
      description:
        "Niche expertise in emerging markets, sustainability-focused investments, and unique cross-border trade facilitation.",
      features: ["ESG Consulting", "Emerging Markets", "Trade Facilitation"],
      cta: "Learn More",
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

const whyChooseData = {
  title: "",
  subheading: "",
  items: [
    {
      icon: "ShieldCheck",
      title: "END-TO-END SECURITY",
      description:
        "We don't just 'treat' security; we build it into the DNA of every solution. From physical server security to encrypted application layers, your data remains impenetrable.",
      tags: ["ENCRYPTION", "ZERO TRUST", "SOVEREIGN CONTROL"],
    },
    {
      icon: "Sparkles",
      title: "FUTURE-READY TECH",
      description:
        "Anticipating the next decade of digital evolution. Our stacks are built for modularity, ensuring you can integrate AI, Blockchain, and Quantum protocols seamlessly.",
      tags: ["AI-DRIVEN", "EDGE READY", "SCALABLE MESH"],
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
  eyebrow: "TRUSTED BY INSTITUTIONAL LEADERS",
  logos: ["GLOBAL BANK", "TECH LOGISTICS", "DUBAI URBAN", "GOV SECTOR", "CORE ENERGY"],
};

const ctaData = {
  title: "SYSTEM DEPLOYMENT STARTS HERE",
  description:
    "Secure your digital future with the UAE's premier technical architectural firm.",
  action: { label: "BOOK CONSULTATION", href: "/contact" },
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

const aboutHeroData = {
  titleAccent: "THE DIGITAL",
  titleMain: "ARCHITECT",
  description:
    "Engineering high-precision digital ecosystems for global enterprises. We bridge the gap between industrial reliability and neural-speed innovation.",
  image: "/home/headquarters.png",
  stats: [
    { value: "24+", label: "GLOBAL NETWORKS" },
    { value: "99.9%", label: "UPTIME GUARANTEE" },
  ],
};

const aboutVisionMissionData = {
  items: [
    {
      title: "MISSION",
      description:
        "To design and deploy bulletproof infrastructure that empowers the next generation of sovereign enterprise data. We don't just host; we architect resilience.",
      icon: "Zap",
      accentColor: "#111927",
    },
    {
      title: "OBJECTIVE",
      description:
        "Securing the flow of global digital assets through hardware-first intelligence and cryptographical precision.",
      icon: "Eye",
      accentColor: "#34d8ff",
    },
  ],
  vision: {
    title: "VISION 2030",
    quote:
      '"A world where data is as structural and reliable as steel. We envision the total convergence of industrial engineering and digital protocol."',
    badge: "PROTOCOL ACTIVE",
  },
};

const aboutValuesData = {
  title: "COMPLIANCE AND CERTIFICATIONS",
  description:
    "ADAM TECHNOLOGY L.L.C. operates under strict regulatory frameworks, ensuring global compliance and institutional security standards.",
  region: "DUBAI, UNITED ARAB EMIRATES",
  items: [
    {
      title: "DUBAI LICENSED",
      description:
        "Fully registered and regulated by Dubai authorities for technology infrastructure and specialized digital services.",
      icon: "Award",
    },
    {
      title: "ISO CERTIFIED",
      description:
        "Adhering to ISO 27001 standards for information security management and data protection protocols.",
      icon: "ShieldCheck",
    },
    {
      title: "NIST FRAMEWORK",
      description:
        "Implementing NIST cybersecurity framework to provide enterprise-grade threat detection and mitigation.",
      icon: "Shield",
    },
  ],
  reach: {
    title: "GLOBAL REACH",
    image: "/home/hero-bg.jpg",
    metrics: [
      { value: "0.4MS", label: "LOCAL LATENCY" },
      { value: "500PB", label: "DATA MANAGED" },
      { value: "128-BIT", label: "ENCRYPTION STANDARD" },
      { value: "24/7", label: "THREAT MONITORING" },
    ],
  },
};
const contactInquiryData = {
  formTitle: "Initialize Inquiry",
  formDescription: "Complete the transmission parameters below.",
  submitLabel: "Send Message",
  inquiryOptions: [
    "Cybersecurity",
    "Cloud & Data",
    "Software Engineering",
    "Consulting",
    "Managed Services",
  ],
  officeHeading: "Global Operations",
  officeItems: [
    {
      title: "Dubai HQ",
      lines: [
        "Business Bay, Citadel Tower Unit 1402",
        "Dubai, UAE",
      ],
      icon: "location",
    },
    {
      title: "Hotline",
      lines: ["+971 4 555 0192"],
      icon: "phone",
    },
    {
      title: "Secure Channel",
      lines: ["ops@adamtech.ae"],
      icon: "mail",
    },
  ],
  departmentContacts: [
    {
      title: "School",
      subtitle: "Admissions & Academic Affairs",
      email: "admissions@oneworld.edu",
    },
    {
      title: "Incubator",
      subtitle: "Startups & Mentorship",
      email: "startup@oneworld.edu",
    },
    {
      title: "Advisory",
      subtitle: "Consulting & Corporate",
      email: "advisory@oneworld.edu",
    },
  ],
  mapImage: "",
  mapLabelTitle: "",
  mapLabelSubtitle: "",
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
      { type: "hero", order: 0, data: heroData },
      { type: "intro", order: 1, data: introData },
      { type: "services", order: 2, data: servicesData },
      { type: "whyChoose", order: 3, data: whyChooseData },
      { type: "clientLogos", order: 4, data: clientLogosData },
      { type: "cta", order: 5, data: ctaData },
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
      { type: "aboutHero", order: 0, data: aboutHeroData },
      { type: "aboutVisionMission", order: 1, data: aboutVisionMissionData },
      { type: "aboutValues", order: 2, data: aboutValuesData },
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
      { type: "servicesHero", order: 0, data: servicesHeroData },
      { type: "servicesGrid", order: 1, data: servicesGridData },
      { type: "servicesCTA", order: 2, data: servicesCtaData },
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
      { type: "contactInquiry", order: 0, data: contactInquiryData },
    ]),
    isPreview: false,
  },
};

export function getFallbackPageView(slug: string): PublicPageView | null {
  return FALLBACK_BY_SLUG[slug] ?? null;
}



