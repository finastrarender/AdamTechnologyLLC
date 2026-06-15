import type { z } from "zod";
import type { heroDataSchema } from "@/schemas/sections";
import { HERO_SECTION_DEFAULT } from "@/data/page-section-defaults";

type HeroContent = z.infer<typeof heroDataSchema>;

export default function HeroSection({
  content,
  anchorId,
}: {
  content: HeroContent;
  anchorId?: string;
}) {
  const badge = content.badge?.trim() || HERO_SECTION_DEFAULT.badge;
  const titleLines =
    Array.isArray(content.title) && content.title.length > 0
      ? content.title
      : HERO_SECTION_DEFAULT.title;
  const description = content.description?.trim() || HERO_SECTION_DEFAULT.description;
  const highlights =
    Array.isArray(content.highlights) && content.highlights.length > 0
      ? content.highlights
      : HERO_SECTION_DEFAULT.highlights;
  const primaryLabel =
    content.primaryAction?.label?.trim() || HERO_SECTION_DEFAULT.primaryAction.label;
  const primaryHref =
    content.primaryAction?.href?.trim() || HERO_SECTION_DEFAULT.primaryAction.href;
  const secondaryLabel =
    content.secondaryAction?.label?.trim() || HERO_SECTION_DEFAULT.secondaryAction.label;
  const secondaryHref =
    content.secondaryAction?.href?.trim() || HERO_SECTION_DEFAULT.secondaryAction.href;
  const visualImage =
    content.visualImage?.trim() || HERO_SECTION_DEFAULT.visualImage;

  return (
    <section className="hero-section" id={anchorId ?? undefined}>
      <div className="hero-section__content section-shell">
        <div className="hero-section__copy">
          <p className="hero-section__eyebrow">{badge}</p>
          <h1 className="hero-section__title">
            {titleLines.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className={`hero-section__title-line${index === 1 ? " hero-section__title-line--accent" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-section__description">{description}</p>
          {highlights.length > 0 ? (
            <ul className="hero-section__highlights" aria-label="Key strengths">
              {highlights.map((item) => (
                <li key={item} className="hero-section__highlight">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="hero-section__actions">
            <a
              className="button hero-section__button hero-section__button--primary"
              href={primaryHref}
            >
              {primaryLabel}
            </a>
            {secondaryLabel ? (
              <a
                className="button hero-section__button hero-section__button--secondary"
                href={secondaryHref}
              >
                {secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>

        <div className="hero-section__visual" aria-hidden="true">
          <div className="hero-section__visual-frame">
            <img
              className="hero-section__visual-image"
              src={visualImage}
              alt=""
              width={851}
              height={500}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
