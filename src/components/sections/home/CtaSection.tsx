import type { z } from "zod";
import type { ctaDataSchema } from "@/schemas/sections";
import { CTA_SECTION_DEFAULT } from "@/data/page-section-defaults";

type CtaContent = z.infer<typeof ctaDataSchema>;

export default function CtaSection({
  content,
  anchorId = "contact",
}: {
  content: CtaContent;
  anchorId?: string;
}) {
  const title = content.title?.trim() || CTA_SECTION_DEFAULT.title;
  const description = content.description?.trim() || CTA_SECTION_DEFAULT.description;
  const actionLabel = content.action?.label?.trim() || CTA_SECTION_DEFAULT.action.label;
  const actionHref = content.action?.href?.trim() || CTA_SECTION_DEFAULT.action.href;

  return (
    <section className="cta-section" id={anchorId}>
      <div className="cta-section__inner section-shell">
        <div className="cta-section__card">
          <h2 className="cta-section__title">{title}</h2>
          <p className="cta-section__description">{description}</p>
          <a className="cta-section__button" href={actionHref}>
            {actionLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
