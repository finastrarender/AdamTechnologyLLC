import type { z } from "zod";
import type {
  projectsCapabilitiesDataSchema,
  projectsHeroDataSchema,
  projectsPortfolioDataSchema,
} from "@/schemas/sections";

export type ProjectsHeroData = z.infer<typeof projectsHeroDataSchema>;
export type ProjectsCapabilitiesData = z.infer<typeof projectsCapabilitiesDataSchema>;
export type ProjectsPortfolioData = z.infer<typeof projectsPortfolioDataSchema>;

export const DEFAULT_PROJECTS_HERO: ProjectsHeroData = {
  titleLines: ["Future-Ready", "Solutions"],
  description:
    "Architecting the next generation of digital infrastructure through high-security network systems and transparent blockchain ecosystems. We turn complex requirements into enterprise-grade reality.",
  action: { label: "DISCUSS YOUR PROJECT", href: "/contact" },
  backgroundImage:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
};

export const DEFAULT_PROJECTS_CAPABILITIES: ProjectsCapabilitiesData = {
  title: "Our Core Capabilities",
  items: [
    {
      icon: "network",
      title: "Network Infrastructure",
      description:
        "High-performance wired and wireless systems designed for zero-latency enterprise operations.",
    },
    {
      icon: "blockchain",
      title: "Blockchain Integration",
      description:
        "Decentralized ledgers for supply chain transparency and secure financial transactions.",
    },
    {
      icon: "security",
      title: "Cybersecurity Solutions",
      description:
        "Proactive threat detection and end-to-end encryption protocols for sensitive data protection.",
    },
    {
      icon: "cloud",
      title: "Cloud Architecture",
      description:
        "Scalable multi-cloud environments optimized for redundancy and global performance.",
    },
    {
      icon: "automation",
      title: "Enterprise Automation",
      description:
        "AI-driven workflow optimisations that reduce operational overhead and human error.",
    },
    {
      icon: "consulting",
      title: "Digital Consulting",
      description:
        "Strategic roadmaps for modernising legacy systems and adopting emerging tech stacks.",
    },
  ],
};

export const DEFAULT_PROJECTS_PORTFOLIO: ProjectsPortfolioData = {
  items: [
    {
      badge: "Cybersecurity",
      title: "Fortress AI: Global Bank Defense",
      image: "/home/hero-bg.svg",
      challenge:
        "A Tier-1 financial institution faced escalating DDoS attacks and sophisticated phishing attempts targeting its global transaction network during peak trading hours.",
      solution:
        "Implemented an AI-driven threat detection layer with zero-trust architecture, real-time behavioral analytics, and automated incident response protocols.",
      metrics: [
        { value: "Zero", label: "Breaches Since Launch" },
        { value: "40%", label: "Latency Reduction" },
      ],
    },
    {
      badge: "Cloud Infrastructure",
      title: "Nebula Migration: Scalable Retail Core",
      image: "/home/headquarters.svg",
      reverse: true,
      challenge:
        "A multi-national retail chain struggled with legacy server downtime during peak shopping seasons, causing revenue loss and degraded customer experiences.",
      solution:
        "Complete migration to a multi-cloud hybrid environment with automated scaling, containerized microservices, and geo-redundant failover architecture.",
      metrics: [
        { value: "99.9%", label: "Uptime Achieved" },
        { value: "3X", label: "Capacity Elasticity" },
      ],
    },
    {
      badge: "Blockchain",
      title: "EtherChain: Transparent Logistics",
      image: "/services/blockchain-visual.svg",
      challenge:
        "A global logistics provider faced transparency issues and manual verification delays across its international supply chain network.",
      solution:
        "Deployed a private blockchain ledger for immutable cargo tracking and automated smart contracts for customs clearance and payment verification.",
      metrics: [
        { value: "100%", label: "Ledger Integrity" },
        { value: "~5 Days", label: "Audit Time Reduction" },
      ],
    },
  ],
};
