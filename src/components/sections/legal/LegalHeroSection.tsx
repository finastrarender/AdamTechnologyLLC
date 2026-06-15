import type { z } from "zod";
import type { legalHeroDataSchema } from "@/schemas/sections";
import { DEFAULT_LEGAL_HERO } from "@/data/terms-reference";

type LegalHeroContent = z.infer<typeof legalHeroDataSchema>;

export default function LegalHeroSection({ content }: { content: LegalHeroContent }) {
  const title =
    typeof content.title === "string" && content.title.trim() !== ""
      ? content.title.trim()
      : DEFAULT_LEGAL_HERO.title;

  return (
    <section className="legal-hero">
      <div className="legal-hero__shell">
        <h1 className="legal-hero__title">{title}</h1>
      </div>
    </section>
  );
}
