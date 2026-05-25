import type { z } from "zod";
import type { ctaDataSchema } from "@/schemas/sections";

type CtaContent = z.infer<typeof ctaDataSchema>;

export default function CtaSection({
  content,
  anchorId = "contact",
}: {
  content: CtaContent;
  anchorId?: string;
}) {
  return (
    <section className="cta-section" id={anchorId}>
      <div className="cta-section__inner section-shell">
        <div className="cta-section__card">
          <h2 className="cta-section__title">
            <span>SYSTEM</span>
            <span>DEPLOYMENT</span>
            <span>STARTS HERE</span>
          </h2>
          <p className="cta-section__description">
            Secure your digital future with the UAE&apos;s premier technical architectural firm.
          </p>
          <a className="cta-section__button" href={content.action.href}>
            BOOK CONSULTATION
          </a>
        </div>
      </div>
    </section>
  );
}
