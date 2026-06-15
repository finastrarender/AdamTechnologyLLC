import type { z } from "zod";
import type { introDataSchema } from "@/schemas/sections";
import { INTRO_SECTION_DEFAULT } from "@/data/page-section-defaults";

type IntroContent = z.infer<typeof introDataSchema>;

export default function IntroSection({
  content,
  anchorId,
}: {
  content: IntroContent;
  anchorId?: string;
}) {
  const imageSrc =
    typeof content.image === "string" && content.image.trim() !== ""
      ? content.image
      : INTRO_SECTION_DEFAULT.image;

  const titleLines =
    Array.isArray(content.title) && content.title.length > 0
      ? content.title
      : INTRO_SECTION_DEFAULT.title;

  const description = content.description?.trim() || INTRO_SECTION_DEFAULT.description;
  const more = content.more?.trim() || INTRO_SECTION_DEFAULT.more;
  const href = content.href?.trim() || INTRO_SECTION_DEFAULT.href;
  const buttonLabel =
    content.buttonLabel?.trim() || INTRO_SECTION_DEFAULT.buttonLabel;

  return (
    <section className="intro-section" id={anchorId ?? undefined}>
      <div className="intro-section__content">
        <div className="intro-section__media">
          <div className="intro-section__media-frame">
            <div className="intro-section__image-frame">
              <img
                src={imageSrc}
                alt="Dubai enterprise architecture"
                width={1200}
                height={800}
                decoding="async"
                className="intro-section__image"
              />
            </div>
          </div>
        </div>
        <div className="intro-section__copy">
          <h2 className="intro-section__title">
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="intro-section__description">{description}</p>
          {more ? <p className="intro-section__description">{more}</p> : null}
          <a className="intro-section__button" href={href}>
            {buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
