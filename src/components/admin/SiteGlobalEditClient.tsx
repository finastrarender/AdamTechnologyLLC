"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FooterSocialIconPicker from "@/components/admin/FooterSocialIconPicker";
import {
  defaultFooterColumns,
  defaultFooterMeta,
  defaultFooterCompanyColumn,
  defaultFooterServicesColumn,
  defaultHeaderMeta,
  resolveHeaderMeta,
  type FooterLinkColumn,
} from "@/data/site-defaults";
import { coerceSeoTitleString, stripTrailingBrandFromSeoTitle } from "@/lib/metadata/title";

type NavItem = { label: string; href: string };
type PageSummary = { slug: string; title: string };
type FooterLink = { label: string; href: string };
type FooterMetaLink = { label: string; href: string; icon?: string };
type FooterContactColumn = { title: string; contact: Array<{ type: "location" | "phone" | "mail"; value: string }> };
type FooterColumn = FooterLinkColumn | FooterContactColumn;

function formatMetaLinks(items: Array<string | FooterMetaLink>, fallbackHref: string) {
  return items
    .map((item) => {
      if (typeof item === "string") {
        return `${item}|${fallbackHref}`;
      }
      return `${item.label}|${item.href || fallbackHref}`;
    })
    .join("\n");
}

function toEditableSocialLinks(items: Array<string | FooterMetaLink>): FooterMetaLink[] {
  const normalized = items
    .map((item) => {
      if (typeof item === "string") {
        return { icon: "globe", label: item, href: "/contact" };
      }
      return {
        icon: item.icon || "globe",
        label: item.label || "",
        href: item.href || "/contact",
      };
    })
    .filter((item) => item.label || item.href || item.icon);

  return normalized.length > 0
    ? normalized
    : (defaultFooterMeta.social as FooterMetaLink[]);
}

function parseLegalMetaLinks(input: string): FooterMetaLink[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length >= 2) {
        return { label: parts[0], href: parts[1] || "/contact" };
      }
      return { label: parts[0], href: "/contact" };
    })
    .filter((item) => item.label);
}

function isLinkColumn(column: FooterColumn): column is FooterLinkColumn {
  return "links" in column;
}

function normalizeLoadedFooterColumns(columns: FooterColumn[]): FooterLinkColumn[] {
  const linkColumns = columns.filter(isLinkColumn);

  const resolve = (title: string, fallback: FooterLinkColumn) => {
    const match = linkColumns.find(
      (column) => column.title.trim().toLowerCase() === title.toLowerCase(),
    );
    if (match && match.links.some((link) => link.label.trim())) {
      return match;
    }
    return structuredClone(fallback);
  };

  if (linkColumns.length === 0) {
    return structuredClone(defaultFooterColumns);
  }

  return [resolve("Services", defaultFooterServicesColumn), resolve("Company", defaultFooterCompanyColumn)];
}

export default function SiteGlobalEditClient() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [logoSrc, setLogoSrc] = useState("");
  const [inquireLabel, setInquireLabel] = useState(defaultHeaderMeta.inquireLabel);
  const [inquireHref, setInquireHref] = useState(defaultHeaderMeta.inquireHref);
  const [footerColumns, setFooterColumns] = useState<FooterLinkColumn[]>(defaultFooterColumns);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState(defaultFooterMeta.description);
  const [officeAddress, setOfficeAddress] = useState(defaultFooterMeta.officeAddress);
  const [officeTitle, setOfficeTitle] = useState(defaultFooterMeta.officeTitle);
  const [copyright, setCopyright] = useState(defaultFooterMeta.copyright);
  const [seoDefaultTitle, setSeoDefaultTitle] = useState("Adam Technology L.L.C.");
  const [seoDefaultDescription, setSeoDefaultDescription] = useState(
    "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
  );
  const [socialLinks, setSocialLinks] = useState<FooterMetaLink[]>(
    defaultFooterMeta.social as FooterMetaLink[],
  );
  const [legalLinks, setLegalLinks] = useState("");
  const [clientLogosFlag, setClientLogosFlag] = useState(true);
  const [footerLogoLightFilter, setFooterLogoLightFilter] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/v1/admin/site-global");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message ?? "Load failed");
        const pagesRes = await fetch("/api/v1/admin/pages");
        const pagesJson = await pagesRes.json();
        if (!pagesRes.ok) throw new Error(pagesJson?.error?.message ?? "Failed to load pages");
        const d = json.data;
        if (cancelled) return;
        setNavItems(d.navItems ?? []);
        setPages((pagesJson.data ?? []) as PageSummary[]);
        setLogoSrc(d.logoSrc ?? "");
        setInquireLabel(
          resolveHeaderMeta(d.headerMeta as Partial<typeof defaultHeaderMeta> | undefined).inquireLabel,
        );
        setInquireHref(
          resolveHeaderMeta(d.headerMeta as Partial<typeof defaultHeaderMeta> | undefined).inquireHref,
        );
        setFooterColumns(normalizeLoadedFooterColumns((d.footerColumns ?? []) as FooterColumn[]));
        setBrand(d.footerMeta?.brand ?? defaultFooterMeta.brand);
        setDescription(d.footerMeta?.description ?? defaultFooterMeta.description);
        setOfficeAddress(d.footerMeta?.officeAddress ?? defaultFooterMeta.officeAddress);
        setOfficeTitle(d.footerMeta?.officeTitle ?? defaultFooterMeta.officeTitle);
        setCopyright(d.footerMeta?.copyright ?? defaultFooterMeta.copyright);
        setSocialLinks(
          toEditableSocialLinks((d.footerMeta?.social ?? []) as Array<string | FooterMetaLink>),
        );
        setLegalLinks(formatMetaLinks((d.footerMeta?.legal ?? []) as Array<string | FooterMetaLink>, "/contact"));
        setClientLogosFlag(d.featureFlags?.clientLogos !== false);
        setFooterLogoLightFilter(d.featureFlags?.footerLogoLightFilter !== false);
        setSeoDefaultTitle(
          stripTrailingBrandFromSeoTitle(
            coerceSeoTitleString(d.seoDefaults?.defaultTitle ?? "Adam Technology L.L.C."),
          ),
        );
        setSeoDefaultDescription(
          d.seoDefaults?.defaultDescription ??
            "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
        );
      } catch (e) {
        if (!cancelled) setMessage(e instanceof Error ? e.message : "Load error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateNav(i: number, field: keyof NavItem, value: string) {
    setNavItems((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  }

  function addNavItem() {
    setNavItems((prev) => [...prev, { label: "", href: "" }]);
  }

  function removeNavItem(index: number) {
    setNavItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  }

  function updateFooterColumnTitle(index: number, title: string) {
    setFooterColumns((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], title };
      return next;
    });
  }

  function updateFooterLink(
    columnIndex: number,
    linkIndex: number,
    field: keyof FooterLink,
    value: string,
  ) {
    setFooterColumns((prev) => {
      const next = [...prev];
      const column = next[columnIndex];
      if (!column) return prev;
      const links = [...column.links];
      links[linkIndex] = { ...links[linkIndex], [field]: value };
      next[columnIndex] = { ...column, links };
      return next;
    });
  }

  function addFooterLink(columnIndex: number) {
    setFooterColumns((prev) => {
      const next = [...prev];
      const column = next[columnIndex];
      if (!column) return prev;
      next[columnIndex] = {
        ...column,
        links: [...column.links, { label: "", href: "" }],
      };
      return next;
    });
  }

  function removeFooterLink(columnIndex: number, linkIndex: number) {
    setFooterColumns((prev) => {
      const next = [...prev];
      const column = next[columnIndex];
      if (!column) return prev;
      const links = column.links.filter((_, index) => index !== linkIndex);
      next[columnIndex] = {
        ...column,
        links: links.length > 0 ? links : [{ label: "", href: "" }],
      };
      return next;
    });
  }

  function updateSocialLink(index: number, field: keyof FooterMetaLink, value: string) {
    setSocialLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addSocialLink() {
    setSocialLinks((prev) => [...prev, { icon: "globe", label: "", href: "" }]);
  }

  function removeSocialLink(index: number) {
    setSocialLinks((prev) => {
      const next = prev.filter((_, itemIndex) => itemIndex !== index);
      return next.length > 0 ? next : (defaultFooterMeta.social as FooterMetaLink[]);
    });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const body = {
      navItems,
      logoSrc,
      headerMeta: {
        inquireLabel: inquireLabel.trim(),
        inquireHref: inquireHref.trim(),
      },
      footerColumns,
      footerMeta: {
        brand,
        description,
        officeAddress,
        officeTitle,
        social: socialLinks
          .map((item) => ({
            icon: item.icon || "globe",
            label: item.label.trim(),
            href: item.href.trim(),
          }))
          .filter((item) => item.href),
        copyright,
        legal: parseLegalMetaLinks(legalLinks),
      },
      seoDefaults: {
        defaultTitle: stripTrailingBrandFromSeoTitle(seoDefaultTitle) || undefined,
        defaultDescription: seoDefaultDescription || undefined,
      },
      featureFlags: {
        clientLogos: clientLogosFlag,
        footerLogoLightFilter,
      },
    };
    try {
      const res = await fetch("/api/v1/admin/site-global", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Save failed");
      const savedHeader = json.data?.headerMeta as Partial<typeof defaultHeaderMeta> | undefined;
      if (savedHeader) {
        setInquireLabel(savedHeader.inquireLabel ?? defaultHeaderMeta.inquireLabel);
        setInquireHref(savedHeader.inquireHref ?? defaultHeaderMeta.inquireHref);
      }
      setMessage("Saved.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="admin-muted">Loading…</p>;

  return (
    <div className="admin-shell">
      <nav className="admin-nav">
        <Link href="/admin">← Dashboard</Link>
      </nav>
      <div className="admin-card">
        <h1 style={{ marginTop: 0 }}>Site global</h1>
        <p className="admin-muted">Navigation, footer, logo, and feature flags.</p>
        <form className="admin-form" onSubmit={onSave}>
          <h2>Navigation</h2>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Changing a navbar label only changes the text. To change the actual route, edit the
            page slug in <strong>Admin &gt; Pages</strong>.
          </p>
          {navItems.map((item, i) => (
            <div key={i} style={{ display: "grid", gap: 8, marginBottom: 12 }}>
              <select
                value={pages.some((page) => (page.slug === "home" ? "/" : `/${page.slug}`) === item.href) ? item.href : ""}
                onChange={(e) => {
                  if (!e.target.value) return;
                  updateNav(i, "href", e.target.value);
                }}
              >
                <option value="">Select an existing page route</option>
                {pages.map((page) => {
                  const href = page.slug === "home" ? "/" : `/${page.slug}`;
                  return (
                    <option key={page.slug} value={href}>
                      {page.title} ({href})
                    </option>
                  );
                })}
              </select>
              <div style={{ display: "flex", gap: 8 }}>
              <input
                value={item.label}
                onChange={(e) => updateNav(i, "label", e.target.value)}
                placeholder="Label"
              />
              <input
                value={item.href}
                onChange={(e) => updateNav(i, "href", e.target.value)}
                placeholder="Href"
              />
              </div>
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => removeNavItem(i)}
              >
                Remove nav item
              </button>
              <p className="admin-muted" style={{ margin: 0 }}>
                Current link: <strong>{item.href || "(empty)"}</strong>
              </p>
            </div>
          ))}
          <button
            type="button"
            className="admin-button-secondary"
            onClick={addNavItem}
          >
            Add nav item
          </button>

          <h2>Header inquire button</h2>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Primary call-to-action shown in the site header on desktop and mobile.
          </p>
          <label>
            Button label
            <input
              value={inquireLabel}
              onChange={(e) => setInquireLabel(e.target.value)}
              placeholder={defaultHeaderMeta.inquireLabel}
            />
          </label>
          <label>
            Button link
            <input
              value={inquireHref}
              onChange={(e) => setInquireHref(e.target.value)}
              placeholder={defaultHeaderMeta.inquireHref}
            />
          </label>
          <p className="admin-muted" style={{ marginTop: 8 }}>
            Use a page path such as <strong>/contact</strong> or an external URL. Leave the label
            empty to hide the button.
          </p>

          <h2>Site logo</h2>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Shown in the site header and footer. Upload a PNG, SVG, or WebP with a transparent
            background for best results.
          </p>
          <ImageUploadField
            label="Logo image"
            value={logoSrc}
            onChange={setLogoSrc}
            folder="site-global/logo"
            placeholder="/site-global/logo/adam-technology-logo.svg"
          />
          <label>
            Logo alt text
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Adam Technology"
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <input
              type="checkbox"
              checked={footerLogoLightFilter}
              onChange={(e) => setFooterLogoLightFilter(e.target.checked)}
            />
            Lighten footer logo on dark background
          </label>
          <p className="admin-muted" style={{ marginTop: 8 }}>
            Applies a white filter to the logo in the footer only. Turn off if you upload a
            light-colored logo designed for the navy footer.
          </p>
          <h2>Footer</h2>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Matches the approved site footer: company tagline, Services and Company columns, office
            address, social icons, copyright, and legal links.
          </p>

          <label>
            Company tagline
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={defaultFooterMeta.description}
            />
          </label>

          {footerColumns.map((column, columnIndex) => (
            <div
              key={`footer-column-${column.title}-${columnIndex}`}
              className="admin-section-group"
              style={{ marginTop: 16 }}
            >
              <h4>{columnIndex === 0 ? "Services column" : "Company column"}</h4>
              <label>
                Column title
                <input
                  value={column.title}
                  onChange={(e) => updateFooterColumnTitle(columnIndex, e.target.value)}
                  placeholder={columnIndex === 0 ? "Services" : "Company"}
                />
              </label>
              {column.links.map((link, linkIndex) => (
                <div
                  key={`footer-link-${columnIndex}-${linkIndex}`}
                  style={{
                    display: "grid",
                    gap: 8,
                    marginBottom: 12,
                    padding: 12,
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  <input
                    value={link.label}
                    onChange={(e) => updateFooterLink(columnIndex, linkIndex, "label", e.target.value)}
                    placeholder="Link label"
                  />
                  <input
                    value={link.href}
                    onChange={(e) => updateFooterLink(columnIndex, linkIndex, "href", e.target.value)}
                    placeholder="/services"
                  />
                  <button
                    type="button"
                    className="admin-button-secondary"
                    onClick={() => removeFooterLink(columnIndex, linkIndex)}
                    disabled={column.links.length === 1}
                  >
                    Remove link
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => addFooterLink(columnIndex)}
              >
                Add link
              </button>
            </div>
          ))}

          <div className="admin-section-group" style={{ marginTop: 16 }}>
            <h4>Office column</h4>
            <p className="admin-muted" style={{ marginTop: 0 }}>
              Shown in the fourth footer column with the office address and social icons.
            </p>

            <label>
              Column title
              <input
                value={officeTitle}
                onChange={(e) => setOfficeTitle(e.target.value)}
                placeholder={defaultFooterMeta.officeTitle}
              />
            </label>

            <label>
              Office address
              <textarea
                rows={4}
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                placeholder={defaultFooterMeta.officeAddress}
              />
            </label>
            <p className="admin-muted" style={{ marginTop: 8 }}>
              Use a comma before &quot;Office 103&quot; to break the address onto two lines in the footer.
            </p>

            <h4 style={{ marginTop: 20 }}>Office social links</h4>
            <p className="admin-muted" style={{ marginTop: 0 }}>
              Circular icons shown under the office address. Use Website and Instagram to match the
              reference design.
            </p>
            {socialLinks.map((link, index) => (
              <div
                key={`social-${index}`}
                style={{
                  marginBottom: 16,
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                }}
              >
                <label>
                  Icon
                  <FooterSocialIconPicker
                    value={link.icon}
                    onChange={(value) => updateSocialLink(index, "icon", value)}
                  />
                </label>
                <label>
                  Accessible label
                  <input
                    value={link.label}
                    onChange={(e) => updateSocialLink(index, "label", e.target.value)}
                    placeholder="Website"
                  />
                </label>
                <label>
                  Link URL
                  <input
                    value={link.href}
                    onChange={(e) => updateSocialLink(index, "href", e.target.value)}
                    placeholder="https://www.adamtechnology.ae"
                  />
                </label>
                <button
                  type="button"
                  className="admin-button-secondary"
                  onClick={() => removeSocialLink(index)}
                  disabled={socialLinks.length === 1}
                >
                  Remove social link
                </button>
              </div>
            ))}
            <button type="button" className="admin-button-secondary" onClick={addSocialLink}>
              Add social link
            </button>
          </div>

          <label>
            Copyright
            <input value={copyright} onChange={(e) => setCopyright(e.target.value)} />
          </label>
          <label>
            Legal links (one per line: label|href)
            <textarea
              rows={3}
              value={legalLinks}
              onChange={(e) => setLegalLinks(e.target.value)}
              placeholder={"Privacy Policy|/privacy\nTerms and conditions|/terms"}
            />
          </label>

          <h2>Feature flags</h2>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={clientLogosFlag}
              onChange={(e) => setClientLogosFlag(e.target.checked)}
            />
            Show client logos section (when present on a page)
          </label>

          <h2>SEO defaults</h2>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Used when a page SEO title/description is empty.
          </p>
          <label>
            Default SEO title
            <input
              value={seoDefaultTitle}
              onChange={(e) => setSeoDefaultTitle(e.target.value)}
              placeholder="Adam Technology L.L.C."
            />
            <span className="admin-muted" style={{ display: "block", marginTop: "0.35rem" }}>
              Use the site/brand name only for the home page default. Other pages append this brand
              via the layout template once.
            </span>
          </label>
          <label>
            Default SEO description
            <textarea
              rows={3}
              value={seoDefaultDescription}
              onChange={(e) => setSeoDefaultDescription(e.target.value)}
              placeholder="Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE."
            />
          </label>
          <button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          {message ? <p className={message === "Saved." ? "contact-form__ok" : "contact-form__err"}>{message}</p> : null}
        </form>
      </div>
    </div>
  );
}
