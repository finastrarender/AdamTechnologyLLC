import type { z } from "zod";
import type { introDataSchema } from "@/schemas/sections";

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
      : "/home/headquarters.png";

  const titleLines =
    Array.isArray(content.title) && content.title.length > 0
      ? content.title
      : ["THE ARCHITECT OF", "ENTERPRISE", "TRUST"];

  const description =
    typeof content.description === "string" && content.description.trim() !== ""
      ? content.description
      : "Headquartered in Dubai, Adam Technology L.L.C. stands at the intersection of security and innovation. We provide the sovereign digital foundations that global enterprises rely on.";

  const more =
    typeof content.more === "string" && content.more.trim() !== ""
      ? content.more
      : 'Our approach is rooted in "Cyber-Industrialism"—treating every software deployment and security protocol as a critical infrastructure project that requires absolute precision and zero-fail resilience.';

  const expcount =
    typeof content.expcount === "number" && Number.isFinite(content.expcount) ? content.expcount : 10;

  return (
    <section className="intro-section" id={anchorId ?? undefined}>
      <div className="intro-section__content">
        <div className="intro-section__media">
          <div className="intro-section__media-frame">
            <div className="intro-section__image-frame">
              <img
                src={imageSrc}
                alt="Architectural interior wireframe"
                width={1200}
                height={800}
                decoding="async"
                className="intro-section__image"
              />
            </div>
            <div className="intro-section__metric-card">
              <strong className="intro-section__metric-value">{expcount}+</strong>
              <span className="intro-section__metric-label">YEARS EXPERTISE</span>
            </div>
          </div>
        </div>
        <div className="intro-section__copy">
          <h2 className="intro-section__title">
            {titleLines.slice(0, 3).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="intro-section__description">{description}</p>
          <p className="intro-section__description">{more}</p>
          <div className="intro-section__meta">
            <article className="intro-section__meta-item">
              <h3>LICENSED</h3>
              <p>Dubai Economy & Tourism</p>
            </article>
            <article className="intro-section__meta-item">
              <h3>SECURITY</h3>
              <p>ISO/IEC 27001 Standard</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
