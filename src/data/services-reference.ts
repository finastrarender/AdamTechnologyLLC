import type { z } from "zod";
import type { servicesGridDataSchema } from "@/schemas/sections";

export type ServicesGridReferenceData = z.infer<typeof servicesGridDataSchema>;

export const DEFAULT_SERVICES_GRID: ServicesGridReferenceData = {
  cybersecurity: {
    title: "Cybersecurity",
    description:
      "Comprehensive threat detection and mitigation strategies designed to protect mission-critical enterprise assets and ensure regulatory compliance.",
    icon: "shield",
    image: "/services/cybersecurity-visual.svg",
    features: [
      "Zero Trust Architecture",
      "24/7 SIEM/SOC Monitoring",
      "Vulnerability Management",
    ],
    tags: ["SPLUNK", "PALO ALTO", "CROWDSTRIKE"],
    tagsLabel: "Tech Stack",
    ctaLabel: "Request Technical Brief",
    ctaHref: "/contact",
  },
  cloud: {
    title: "Cloud Solutions",
    description:
      "Scalable cloud orchestration and hybrid-cloud management to optimize performance and reduce operational overhead.",
    icon: "cloud",
    tags: ["Azure", "AWS", "GCP"],
    ctaLabel: "Request Technical Brief",
    ctaHref: "/contact",
  },
  data: {
    title: "Data Services",
    description:
      "Unlocking the power of enterprise data through advanced analytics, AI-driven insights, and robust governance frameworks.",
    icon: "database",
    tags: ["Snowflake", "Tableau", "Databricks"],
    ctaLabel: "Request Technical Brief",
    ctaHref: "/contact",
  },
  blockchain: {
    title: "Blockchain",
    description:
      "Decentralized ledger technology for supply chain transparency, secure identity management, and smart contract automation.",
    icon: "blockchain",
    image: "/services/blockchain-visual.svg",
    ctaLabel: "Request Technical Brief",
    ctaHref: "/contact",
  },
  software: {
    title: "Software Development",
    description:
      "Custom-built enterprise software that bridges the gap between complex legacy systems and modern user experiences.",
    icon: "code",
    featureGroups: [
      {
        label: "PROCESS",
        items: [
          "Agile Methodologies",
          "DevOps Integration",
          "Microservices Architecture",
        ],
      },
      {
        label: "STACK",
        items: [".NET / Java Core", "React / Next.js", "Docker / Kubernetes"],
      },
    ],
    ctaLabel: "Request Technical Brief",
    ctaHref: "/contact",
  },
};

export function mergeServicesGridContent(
  content: Partial<ServicesGridReferenceData> | Record<string, unknown> | undefined,
): ServicesGridReferenceData {
  if (!content || typeof content !== "object") {
    return DEFAULT_SERVICES_GRID;
  }

  const keys = ["cybersecurity", "cloud", "data", "blockchain", "software"] as const;

  return keys.reduce((acc, key) => {
    const fallback = DEFAULT_SERVICES_GRID[key];
    const incoming = (content as ServicesGridReferenceData)[key];
    if (!incoming || typeof incoming !== "object") {
      acc[key] = fallback;
      return acc;
    }
    acc[key] = {
      ...fallback,
      ...incoming,
      features: incoming.features?.length ? incoming.features : fallback.features,
      tags: incoming.tags?.length ? incoming.tags : fallback.tags,
      featureGroups: incoming.featureGroups?.length
        ? incoming.featureGroups
        : fallback.featureGroups,
    };
    return acc;
  }, {} as ServicesGridReferenceData);
}
