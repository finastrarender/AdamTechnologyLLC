import type { z } from "zod";
import type { globalStandardsDataSchema } from "@/schemas/sections";
import SimpleIcon from "../SimpleIcon";

type GlobalStandardsContent = z.infer<typeof globalStandardsDataSchema>;

export default function GlobalStandardsSection({ content }: { content: GlobalStandardsContent }) {
  const eyebrow =
    typeof content.eyebrow === "string" && content.eyebrow.trim() !== ""
      ? content.eyebrow
      : "OUR CAPABILITIES";

  return (
    <section className="global-standards-section">
      <div className="global-standards-section__header">
        <div className="global-standards-section__header-main">
          <p className="global-standards-section__eyebrow">{eyebrow}</p>
          <h2 className="global-standards-section__title">{content.title}</h2>
        </div>
        <p className="global-standards-section__description">{content.description}</p>
      </div>

      <div className="global-standards-section__grid">
        {content.pillars.map((pillar, i) => (
          <article key={i} className="global-standards-card">
            <span className="global-standards-card__icon" aria-hidden="true">
              <SimpleIcon
                name={(pillar.icon as string) || "spark"}
                className="global-standards-card__icon-svg"
              />
            </span>
            <h3 className="global-standards-card__title">{pillar.title}</h3>
            <p className="global-standards-card__description">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
