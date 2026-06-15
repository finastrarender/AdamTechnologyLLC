import type { z } from "zod";
import type { aboutVisionMissionDataSchema } from "@/schemas/sections";

type AboutVisionMissionContent = z.infer<typeof aboutVisionMissionDataSchema>;

const DEFAULT_OVERVIEW = {
  title: "COMPANY OVERVIEW",
  description:
    "Adam Technology LLC is a premier IT and cybersecurity solutions provider headquartered in Dubai, UAE. Licensed by the Department of Economy and Tourism, the company specializes in protecting digital assets and modernizing the technology infrastructure of modern enterprises.",
  subDescription:
    "The firm bridges the gap between complex emerging technologies—such as Blockchain and the Metaverse—and practical, secure enterprise operations.",
  image: "/about/company-buildings.jpg",
};

function resolveOverviewCopy(overview: {
  description?: string;
  subDescription?: string;
}) {
  const subDescription = overview.subDescription?.trim() ?? "";
  if (subDescription) {
    return {
      description: overview.description ?? DEFAULT_OVERVIEW.description,
      subDescription,
    };
  }

  const description = overview.description ?? DEFAULT_OVERVIEW.description;
  const splitMarker = "The firm bridges";
  const splitIndex = description.indexOf(splitMarker);
  if (splitIndex === -1) {
    return { description, subDescription: DEFAULT_OVERVIEW.subDescription };
  }

  return {
    description: description.slice(0, splitIndex).trim(),
    subDescription: description.slice(splitIndex).trim(),
  };
}

function highlightMissionCopy(copy: string) {
  const needle = "bulletproof infrastructure";
  const idx = copy.toLowerCase().indexOf(needle);
  if (idx === -1) return copy;
  return (
    <>
      {copy.slice(0, idx)}
      <span className="about-panel__accent">{copy.slice(idx, idx + needle.length)}</span>
      {copy.slice(idx + needle.length)}
    </>
  );
}

export default function AboutVisionMissionSection({
  content,
}: {
  content: AboutVisionMissionContent;
}) {
  const legacyCards = (
    content as unknown as { cards?: Array<Record<string, unknown>> }
  ).cards;
  const items =
    Array.isArray(content?.items) && content.items.length > 0
      ? content.items
      : Array.isArray(legacyCards)
        ? legacyCards.map((card) => ({
            title: String(card.title ?? ""),
            description: String(card.description ?? ""),
            icon: String(card.icon ?? ""),
            accentColor: String(card.accentColor ?? "#0b3d91"),
          }))
        : [];

  const extended = content as unknown as {
    overview?: {
      title?: string;
      description?: string;
      subDescription?: string;
      image?: string;
    };
  };
  const overview = {
    ...DEFAULT_OVERVIEW,
    ...extended.overview,
  };
  const overviewCopy = resolveOverviewCopy(overview);

  const mission = items[0] ?? {
    title: "MISSION",
    description:
      "To design and deploy bulletproof infrastructure that empowers the next generation of sovereign enterprise data. We don't just host; we architect resilience.",
  };
  const objective = items[1] ?? {
    title: "VISION",
    description:
      "Securing the flow of global digital assets through hardware-first intelligence and cryptographical precision.",
  };

  return (
    <section className="about-panels">
      <div className="section-shell">
        <div className="about-company">
          <div className="about-company__image-frame">
            <img
              className="about-company__image"
              src={overview.image || DEFAULT_OVERVIEW.image}
              alt=""
              width={560}
              height={390}
              decoding="async"
            />
          </div>
          <div className="about-company__copy">
            <h2 className="about-company__title">{overview.title}</h2>
            <p className="about-company__description">{overviewCopy.description}</p>
            {overviewCopy.subDescription ? (
              <p className="about-company__description about-company__description--secondary">
                {overviewCopy.subDescription}
              </p>
            ) : null}
          </div>
        </div>

        <div className="about-panels__top">
          <article className="about-panel about-panel--mission">
            <h2 className="about-panel__title">{mission.title}</h2>
            <p className="about-panel__description">{highlightMissionCopy(mission.description)}</p>
          </article>
          <article className="about-panel about-panel--objective">
            <h2 className="about-panel__title">{objective.title}</h2>
            <p className="about-panel__description">{objective.description}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
