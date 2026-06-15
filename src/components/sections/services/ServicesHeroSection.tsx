import type { z } from "zod";
import type { serviceHeroDataSchema } from "@/schemas/sections";

type ServicesHeroContent = z.infer<typeof serviceHeroDataSchema>;

const DEFAULT_EYEBROW = "STRATEGIC TECHNOLOGY PARTNER";
const DEFAULT_TITLE = "Our Services";
const DEFAULT_DESCRIPTION =
  "We provide high-stakes enterprise technology excellence, architecting resilient infrastructures and innovative software solutions that drive global digital transformation.";

function resolveTitle(title: ServicesHeroContent["title"]): string {
  if (Array.isArray(title)) {
    return title.join(" ");
  }
  return title;
}

export default function ServicesHeroSection({ content }: { content: ServicesHeroContent }) {
  const eyebrow =
    typeof content.eyebrow === "string" && content.eyebrow.trim() !== ""
      ? content.eyebrow
      : DEFAULT_EYEBROW;
  const title = content.title ? resolveTitle(content.title) : DEFAULT_TITLE;
  const description = content.description?.trim() ? content.description : DEFAULT_DESCRIPTION;
  const backgroundImage =
    typeof content.backgroundImage === "string" && content.backgroundImage.trim() !== ""
      ? content.backgroundImage
      : undefined;

  return (
    <section
      className="services-hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="services-hero__overlay" aria-hidden="true" />
      <div className="section-shell services-hero__content">
        <p className="services-hero__eyebrow">{eyebrow}</p>
        <h1 className="services-hero__title">{title}</h1>
        <p className="services-hero__description">{description}</p>
      </div>
    </section>
  );
}
