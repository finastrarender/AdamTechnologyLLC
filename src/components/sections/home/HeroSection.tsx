import type { z } from "zod";
import type { heroDataSchema } from "@/schemas/sections";

type HeroContent = z.infer<typeof heroDataSchema>;

export default function HeroSection({
  content,
  anchorId,
}: {
  content: HeroContent;
  anchorId?: string;
}) {
  const heroBackgroundImage =
    typeof content.backgroundImage === "string" && content.backgroundImage.trim() !== ""
      ? content.backgroundImage
      : "/home/hero-bg.jpg";

  const badge =
    typeof content.badge === "string" && content.badge.trim() !== ""
      ? content.badge
      : "ENTERPRISE GRADE INTELLIGENCE";
  const titleLines =
    Array.isArray(content.title) && content.title.length > 0
      ? content.title
      : ["POWERING", "SECURE", "AND", "FUTURE", "TECHNOLOGY"];
  const description =
    typeof content.description === "string" && content.description.trim() !== ""
      ? content.description
      : "Adam Technology L.L.C. delivers high-precision digital infrastructure for the modern era. We architect, secure, and scale enterprise systems with industrial-grade resilience.";
  const primaryLabel = content.primaryAction?.label?.trim() || "EXPLORE SERVICES";
  const secondaryLabel = content.secondaryAction?.label?.trim() || "BOOK FREE ADVICE";

  return (
    <section className="hero-section" id={anchorId ?? undefined}>
      <div className="hero-section__background" aria-hidden="true">
        <img
          className="hero-section__background-image"
          src={heroBackgroundImage}
          alt=""
          width={1600}
          height={900}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero-section__gradient" aria-hidden="true" />
      <div className="hero-section__overlay" aria-hidden="true" />

      <div className="hero-section__content section-shell">
        <div className="hero-section__copy">
          <p className="hero-section__eyebrow">{badge}</p>
          <h1 className="hero-section__title">
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-section__description">{description}</p>
          <div className="hero-section__actions">
            <a className="button hero-section__button hero-section__button--primary" href={content.primaryAction.href}>
              {primaryLabel}
            </a>
            <a className="button hero-section__button hero-section__button--secondary" href={content.secondaryAction.href}>
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
