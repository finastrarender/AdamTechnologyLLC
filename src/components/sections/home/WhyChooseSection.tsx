import type { z } from "zod";
import type { whyChooseDataSchema } from "@/schemas/sections";
import { WHY_CHOOSE_SECTION_DEFAULT } from "@/data/page-section-defaults";
import {
  Cloud,
  Database,
  Link as LinkIcon,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type WhyContent = z.infer<typeof whyChooseDataSchema>;

const WHY_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  shieldCheck: ShieldCheck,
  shield: ShieldCheck,
  Rocket,
  rocket: Rocket,
  Sparkles,
  sparkles: Sparkles,
};

export default function WhyChooseSection({ content }: { content: WhyContent }) {
  const title = content.title?.trim() || WHY_CHOOSE_SECTION_DEFAULT.title;
  const subheading = content.subheading?.trim() || WHY_CHOOSE_SECTION_DEFAULT.subheading;
  const items =
    Array.isArray(content.items) && content.items.length > 0
      ? content.items
      : WHY_CHOOSE_SECTION_DEFAULT.items;

  return (
    <section className="why-section">
      <div className="why-section__inner section-shell">
        <div className="why-section__copy">
          <h2 className="why-section__title">{title}</h2>
          {subheading ? <p>{subheading}</p> : null}

          <div className="why-section__points">
            {items.map((item, index) => {
              const Icon = WHY_ICONS[item.icon] ?? (index === 0 ? ShieldCheck : Rocket);
              return (
                <article key={`${item.title}-${index}`}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="ecosystem-orbit" aria-label="Technology ecosystem diagram">
          <div className="ecosystem-orbit__ring" />
          <div className="ecosystem-orbit__core">
            <Settings aria-hidden="true" />
          </div>
          <span className="ecosystem-orbit__node ecosystem-orbit__node--cloud">
            <Cloud aria-hidden="true" /> Cloud
          </span>
          <span className="ecosystem-orbit__node ecosystem-orbit__node--data">
            <Database aria-hidden="true" /> Data
          </span>
          <span className="ecosystem-orbit__node ecosystem-orbit__node--web">
            <LinkIcon aria-hidden="true" /> Web3
          </span>
          <span className="ecosystem-orbit__node ecosystem-orbit__node--cyber">
            <ShieldCheck aria-hidden="true" /> Cyber
          </span>
        </div>
      </div>
    </section>
  );
}
