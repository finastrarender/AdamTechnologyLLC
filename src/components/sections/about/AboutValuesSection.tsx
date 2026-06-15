import type { z } from "zod";
import type { aboutValuesDataSchema } from "@/schemas/sections";
import { Lightbulb } from "lucide-react";
import { resolveAboutPageIcon } from "@/components/sections/about/about-page-icons";

type AboutValuesContent = z.infer<typeof aboutValuesDataSchema>;

const DEFAULT_ITEMS = [
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
];

const DEFAULT_DESCRIPTION =
  "The foundational principles that guide every interaction and project delivery at Adam Technology.";

function ValueCardIcon({ name }: { name?: string }) {
  const Icon = resolveAboutPageIcon(name, Lightbulb);

  return <Icon className="about-values-card__icon-svg" aria-hidden="true" strokeWidth={1.75} />;
}

export default function AboutValuesSection({ content }: { content: AboutValuesContent }) {
  const items = content.items?.length ? content.items : DEFAULT_ITEMS;
  const description = content.description?.trim() || DEFAULT_DESCRIPTION;

  return (
    <section className="about-values about-values--reference">
      <div className="section-shell">
        <header className="about-values__header">
          <h2 className="about-values__title">{content.title || "Our Core Values"}</h2>
          <p className="about-values__description">{description}</p>
        </header>

        <div className="about-values__grid">
          {items.map((item) => (
            <article key={item.title} className="about-values-card">
              <span className="about-values-card__icon" aria-hidden="true">
                <ValueCardIcon name={item.icon} />
              </span>
              <h3 className="about-values-card__title">{item.title}</h3>
              <p className="about-values-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
