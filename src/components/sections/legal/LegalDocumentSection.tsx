import type { z } from "zod";
import type { legalDocumentDataSchema } from "@/schemas/sections";
import { DEFAULT_LEGAL_DOCUMENT_SECTIONS } from "@/data/terms-reference";

type LegalDocumentContent = z.infer<typeof legalDocumentDataSchema>;

export default function LegalDocumentSection({ content }: { content: LegalDocumentContent }) {
  const sections =
    Array.isArray(content.sections) && content.sections.length > 0
      ? content.sections
      : DEFAULT_LEGAL_DOCUMENT_SECTIONS;

  return (
    <section className="legal-document">
      <div className="legal-document__shell">
        {sections.map((item, index) => (
          <article key={`${item.title}-${index}`} className="legal-document__section">
            <h2 className="legal-document__heading">{item.title}</h2>
            {item.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${paragraphIndex}-${paragraph.slice(0, 24)}`} className="legal-document__paragraph">
                {paragraph}
              </p>
            ))}
            {item.introBeforeBullets ? (
              <p className="legal-document__paragraph">{item.introBeforeBullets}</p>
            ) : null}
            {item.bullets && item.bullets.length > 0 ? (
              <ul className="legal-document__list">
                {item.bullets.map((bullet, bulletIndex) => (
                  <li key={`${bulletIndex}-${bullet.slice(0, 24)}`}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {item.outroAfterBullets ? (
              <p className="legal-document__paragraph">{item.outroAfterBullets}</p>
            ) : null}
            {item.contact ? (
              <div className="legal-document__contact">
                <p className="legal-document__contact-name">{item.contact.companyName}</p>
                <p className="legal-document__paragraph">{item.contact.email}</p>
                <p className="legal-document__paragraph">{item.contact.phone}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
