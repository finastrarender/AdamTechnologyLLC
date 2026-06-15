import type { z } from "zod";
import { ShieldCheck } from "lucide-react";
import type { aboutAdvantageDataSchema } from "@/schemas/sections";
import { resolveAboutPageIcon } from "@/components/sections/about/about-page-icons";

type AboutAdvantageContent = z.infer<typeof aboutAdvantageDataSchema>;

const DEFAULT_ITEMS = [
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
];

function resolveItems(content: AboutAdvantageContent) {
  if (Array.isArray(content.items) && content.items.length > 0) {
    return content.items;
  }

  const legacy = content as unknown as {
    points?: string[];
    title?: string | string[];
  };

  if (Array.isArray(legacy.points) && legacy.points.length > 0) {
    return legacy.points.map((point, index) => ({
      title: `Advantage ${index + 1}`,
      description: point,
      icon: "shieldCheck",
    }));
  }

  return DEFAULT_ITEMS;
}

function AdvantageCardIcon({ name }: { name?: string }) {
  const Icon = resolveAboutPageIcon(name, ShieldCheck);

  return <Icon className="about-advantage-card__icon-svg" aria-hidden="true" strokeWidth={1.75} />;
}

export default function AboutAdvantageSection({ content }: { content: AboutAdvantageContent }) {
  const items = resolveItems(content);
  const title =
    typeof content.title === "string"
      ? content.title
      : Array.isArray(content.title)
        ? content.title.join(" ")
        : "Why Choose Adam Technology?";

  return (
    <section className="about-advantage about-advantage--reference">
      <div className="section-shell">
        <header className="about-advantage__header">
          <h2 className="about-advantage__title">{title}</h2>
          <p className="about-advantage__description">
            {content.description ||
              "Combining technical depth with local market insight to deliver superior results."}
          </p>
        </header>

        <div className="about-advantage__grid">
          {items.map((item) => (
            <article key={item.title} className="about-advantage-card">
              <span className="about-advantage-card__icon" aria-hidden="true">
                <AdvantageCardIcon name={item.icon} />
              </span>
              <h3 className="about-advantage-card__title">{item.title}</h3>
              <p className="about-advantage-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
