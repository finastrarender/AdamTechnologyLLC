import type { z } from "zod";
import type { servicesGridCardReferenceSchema, servicesGridDataSchema } from "@/schemas/sections";
import { DEFAULT_SERVICES_GRID, mergeServicesGridContent } from "@/data/services-reference";
import { ServicesGridIcon } from "@/components/services/ServicesGridIcon";
import {
  resolveServicesGridIcon,
  type ServicesGridIconKind,
} from "@/components/services/services-grid-icon-utils";

type ServicesGridContent = z.infer<typeof servicesGridDataSchema>;
type ServiceCard = z.infer<typeof servicesGridCardReferenceSchema>;

function ServiceCardHeader({ icon, title }: { icon: ServicesGridIconKind; title: string }) {
  return (
    <div className="services-grid-card__header">
      <span className="services-grid-card__icon-wrap" aria-hidden="true">
        <ServicesGridIcon kind={icon} />
      </span>
      <h3 className="services-grid-card__title">{title}</h3>
    </div>
  );
}

function TechStackTags({ tags, label }: { tags: string[]; label?: string }) {
  if (!tags.length) return null;

  return (
    <div className="services-grid-card__stack">
      {label ? <p className="services-grid-card__label">{label}</p> : null}
      <div className="services-grid-card__tags" aria-label={label ?? "Tags"}>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function FeatureList({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="services-grid-card__feature-group">
      <p className="services-grid-card__label">{label}</p>
      <ul className="services-grid-card__features">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function RequestBriefButton({
  href,
  label,
  highlighted = false,
  fullWidth = false,
}: {
  href: string;
  label: string;
  highlighted?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <a
      href={href}
      className={`services-grid-card__cta${highlighted ? " services-grid-card__cta--primary" : ""}${fullWidth ? " services-grid-card__cta--full" : ""}`}
    >
      {label}
    </a>
  );
}

function FeaturedCyberCard({ card }: { card: ServiceCard }) {
  const icon = resolveServicesGridIcon(card.icon);
  const image = card.image?.trim() || DEFAULT_SERVICES_GRID.cybersecurity.image!;

  return (
    <article id="cybersecurity" className="services-grid-card services-grid-card--cyber">
      <div className="services-grid-card__body services-grid-card__body--split">
        <div className="services-grid-card__main">
          <ServiceCardHeader icon={icon} title={card.title} />
          <p className="services-grid-card__description">{card.description}</p>
          <div className="services-grid-card__details">
            <div className="services-grid-card__details-primary">
              <FeatureList label="Key Features" items={card.features ?? []} />
              <RequestBriefButton
                href={card.ctaHref ?? "/contact"}
                label={card.ctaLabel ?? "Request Technical Brief"}
              />
            </div>
            <TechStackTags tags={card.tags ?? []} label={card.tagsLabel ?? "Tech Stack"} />
          </div>
        </div>
        <div className="services-grid-card__media">
          <img src={image} alt="" width={400} height={400} decoding="async" />
        </div>
      </div>
    </article>
  );
}

function StandardCard({
  card,
  modifier,
  anchorId,
  showTagsOnly = false,
}: {
  card: ServiceCard;
  modifier: string;
  anchorId: string;
  showTagsOnly?: boolean;
}) {
  const icon = resolveServicesGridIcon(card.icon);

  return (
    <article id={anchorId} className={`services-grid-card services-grid-card--${modifier}`}>
      <ServiceCardHeader icon={icon} title={card.title} />
      <p className="services-grid-card__description">{card.description}</p>
      {showTagsOnly ? (
        <TechStackTags tags={card.tags ?? []} />
      ) : null}
      <RequestBriefButton
        href={card.ctaHref ?? "/contact"}
        label={card.ctaLabel ?? "Request Technical Brief"}
        fullWidth
      />
    </article>
  );
}

function BlockchainCard({ card }: { card: ServiceCard }) {
  const icon = resolveServicesGridIcon(card.icon);
  const image = card.image?.trim() || DEFAULT_SERVICES_GRID.blockchain.image!;

  return (
    <article id="blockchain" className="services-grid-card services-grid-card--blockchain">
      <ServiceCardHeader icon={icon} title={card.title} />
      <p className="services-grid-card__description">{card.description}</p>
      <div className="services-grid-card__media services-grid-card__media--inline">
        <img src={image} alt="" width={560} height={200} decoding="async" />
      </div>
      <RequestBriefButton
        href={card.ctaHref ?? "/contact"}
        label={card.ctaLabel ?? "Request Technical Brief"}
        fullWidth
      />
    </article>
  );
}

function SoftwareCard({ card }: { card: ServiceCard }) {
  const icon = resolveServicesGridIcon(card.icon);
  const groups = card.featureGroups ?? DEFAULT_SERVICES_GRID.software.featureGroups ?? [];

  return (
    <article id="software" className="services-grid-card services-grid-card--software">
      <ServiceCardHeader icon={icon} title={card.title} />
      <p className="services-grid-card__description">{card.description}</p>
      <div className="services-grid-card__columns">
        {groups.map((group) => (
          <FeatureList key={group.label} label={group.label} items={group.items} />
        ))}
      </div>
      <RequestBriefButton
        href={card.ctaHref ?? "/contact"}
        label={card.ctaLabel ?? "Request Technical Brief"}
        fullWidth
      />
    </article>
  );
}

export default function ServicesGridSection({ content }: { content: ServicesGridContent }) {
  const data = mergeServicesGridContent(content);

  return (
    <section className="services-grid-section">
      <div className="section-shell services-grid-section__shell">
        <div className="services-grid-section__cards">
          <FeaturedCyberCard card={data.cybersecurity} />

          <div className="services-grid-row services-grid-row--middle">
            <StandardCard card={data.cloud} modifier="cloud" anchorId="cloud" showTagsOnly />
            <StandardCard card={data.data} modifier="data" anchorId="data" showTagsOnly />
          </div>

          <div className="services-grid-row services-grid-row--bottom">
            <BlockchainCard card={data.blockchain} />
            <SoftwareCard card={data.software} />
          </div>
        </div>
      </div>
    </section>
  );
}
