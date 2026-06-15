import Link from "next/link";
import {
  defaultFooterCompanyColumn,
  defaultFooterMeta,
  defaultFooterServicesColumn,
  type FooterLinkColumn,
  type FooterMetaLink,
} from "@/data/site-defaults";
import { FooterSocialIcon } from "@/components/layout/FooterSocialIcon";
import HashLink from "@/components/layout/HashLink";

type FooterLink = { label: string; href: string };
type FooterColumn =
  | { title: string; links: FooterLink[] }
  | { title: string; contact: Array<{ type: "location" | "phone" | "mail"; value: string }> };

function normalizeSocialLink(item: string | FooterMetaLink): FooterMetaLink {
  if (typeof item === "string") {
    return { icon: "globe", label: item, href: "/contact" };
  }

  return {
    icon: item.icon || "globe",
    label: item.label || "",
    href: item.href || "/contact",
  };
}

function normalizeLegalLink(item: string | FooterMetaLink): FooterMetaLink {
  if (typeof item === "string") {
    return { label: item, href: "/contact" };
  }

  return {
    label: item.label || "",
    href: item.href || "/contact",
  };
}

function isLinkColumn(column: FooterColumn): column is FooterLinkColumn {
  return "links" in column;
}

function resolveLinkColumn(
  columns: FooterColumn[],
  title: string,
  fallback: FooterLinkColumn,
): FooterLinkColumn {
  const match = columns.find(
    (column) => isLinkColumn(column) && column.title.trim().toLowerCase() === title.toLowerCase(),
  );

  if (match && isLinkColumn(match) && match.links.some((link) => link.label.trim())) {
    return match;
  }

  return fallback;
}

function formatOfficeAddress(address: string) {
  const normalized = address.replace(/\s*,\s*Office 103,\s*/i, ", Office 103,\n");
  return normalized.split("\n").map((line) => line.trim()).filter(Boolean);
}

export default function SiteFooter({
  columns,
  meta,
  logoSrc,
  footerLogoLightFilter = true,
}: {
  columns: FooterColumn[];
  meta: {
    brand: string;
    description: string;
    officeAddress?: string;
    social: Array<string | FooterMetaLink>;
    copyright: string;
    legal: Array<string | FooterMetaLink>;
  };
  logoSrc?: string;
  footerLogoLightFilter?: boolean;
}) {
  const brand = meta.brand?.trim() || defaultFooterMeta.brand;
  const description = meta.description?.trim() || defaultFooterMeta.description;
  const officeAddress = meta.officeAddress?.trim() || defaultFooterMeta.officeAddress;
  const copyright = meta.copyright?.trim() || defaultFooterMeta.copyright;
  const servicesColumn = resolveLinkColumn(columns, "Services", defaultFooterServicesColumn);
  const companyColumn = resolveLinkColumn(columns, "Company", defaultFooterCompanyColumn);
  const officeLines = formatOfficeAddress(officeAddress);

  const socialLinks =
    meta.social?.length > 0
      ? meta.social.map(normalizeSocialLink).filter((item) => item.href.trim())
      : defaultFooterMeta.social;

  const legalLinks =
    meta.legal?.length > 0
      ? meta.legal.map(normalizeLegalLink).filter((item) => item.label.trim())
      : defaultFooterMeta.legal;

  return (
    <footer className="site-footer">
      <div className="section-shell">
        <div className="site-footer__top">
          <div className="site-footer__company">
            {logoSrc?.trim() ? (
              <Link className="site-footer__brand-link" href="/" aria-label={`${brand} home`}>
                <img
                  className={`site-footer__logo${footerLogoLightFilter ? " site-footer__logo--light-filter" : ""}`}
                  src={logoSrc}
                  alt={brand}
                  width={220}
                  height={44}
                  decoding="async"
                />
              </Link>
            ) : (
              <p className="site-footer__brand">{brand}</p>
            )}
            <p className="site-footer__description">{description}</p>
          </div>

          <nav className="site-footer__column" aria-label={servicesColumn.title}>
            <h2>{servicesColumn.title}</h2>
            {servicesColumn.links.map((item) => (
              <HashLink key={`${item.label}-${item.href}`} href={item.href}>
                {item.label}
              </HashLink>
            ))}
          </nav>

          <nav className="site-footer__column" aria-label={companyColumn.title}>
            <h2>{companyColumn.title}</h2>
            {companyColumn.links.map((item) => (
              <HashLink key={`${item.label}-${item.href}`} href={item.href}>
                {item.label}
              </HashLink>
            ))}
          </nav>

          <div className="site-footer__column site-footer__office">
            <h2>Office</h2>
            <p>
              {officeLines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < officeLines.length - 1 ? (
                    <>
                      ,
                      <br />
                    </>
                  ) : null}
                </span>
              ))}
            </p>
            <div className="site-footer__social" aria-label="Social links">
              {socialLinks.map((link) => {
                const isExternalHttp = link.href.startsWith("http");

                return (
                  <Link
                    key={`${link.icon}-${link.href}`}
                    href={link.href}
                    aria-label={link.label || link.icon || "Social link"}
                    {...(isExternalHttp
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    <FooterSocialIcon kind={link.icon} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">{copyright}</p>
          <nav className="site-footer__legal" aria-label="Footer legal">
            {legalLinks.map((item) => (
              <HashLink key={`${item.label}-${item.href}`} href={item.href}>
                {item.label}
              </HashLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
