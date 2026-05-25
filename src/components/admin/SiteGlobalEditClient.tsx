"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageUploadField from "@/components/admin/ImageUploadField";

type NavItem = { label: string; href: string };
type PageSummary = { slug: string; title: string };
type FooterLink = { label: string; href: string };
type ContactRow = { type: "location" | "phone" | "mail"; value: string };
type FooterMetaLink = { label: string; href: string; icon?: string };
type FooterLinkColumn = { title: string; links: FooterLink[] };
type FooterContactColumn = { title: string; contact: ContactRow[] };
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

  return normalized.length > 0 ? normalized : [{ icon: "globe", label: "", href: "/contact" }];
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

function emptyLinkColumn(): FooterLinkColumn {
  return { title: "", links: [{ label: "", href: "" }] };
}

function emptyContactColumn(): FooterContactColumn {
  return { title: "", contact: [{ type: "location", value: "" }] };
}

function getPageHref(page: PageSummary) {
  return page.slug === "home" ? "/" : `/${page.slug}`;
}

export default function SiteGlobalEditClient() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [logoSrc, setLogoSrc] = useState("");
  const [footerColumns, setFooterColumns] = useState<FooterColumn[]>([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [copyright, setCopyright] = useState("");
  const [seoDefaultTitle, setSeoDefaultTitle] = useState("Adam Technology L.L.C.");
  const [seoDefaultDescription, setSeoDefaultDescription] = useState(
    "Adam Technology L.L.C. delivers enterprise-grade cybersecurity, cloud & data infrastructure, and custom software engineering from Dubai, UAE.",
  );
  const [socialLinks, setSocialLinks] = useState<FooterMetaLink[]>([
    { icon: "globe", label: "", href: "/contact" },
  ]);
  const [legalLinks, setLegalLinks] = useState("");
  const [clientLogosFlag, setClientLogosFlag] = useState(true);

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
        setLogoSrc(d.logoSrc ?? "/home/logo.png");
        setFooterColumns((d.footerColumns ?? []) as FooterColumn[]);
        setBrand(d.footerMeta?.brand ?? "");
        setDescription(d.footerMeta?.description ?? "");
        setCopyright(d.footerMeta?.copyright ?? "");
        setSocialLinks(
          toEditableSocialLinks((d.footerMeta?.social ?? []) as Array<string | FooterMetaLink>),
        );
        setLegalLinks(formatMetaLinks((d.footerMeta?.legal ?? []) as Array<string | FooterMetaLink>, "/contact"));
        setClientLogosFlag(d.featureFlags?.clientLogos !== false);
        setSeoDefaultTitle(d.seoDefaults?.defaultTitle ?? "Adam Technology L.L.C.");
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
      next[index] = { ...next[index], title } as FooterColumn;
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
      if (!column || !isLinkColumn(column)) return prev;
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
      if (!column || !isLinkColumn(column)) return prev;
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
      if (!column || !isLinkColumn(column)) return prev;
      const links = column.links.filter((_, index) => index !== linkIndex);
      next[columnIndex] = {
        ...column,
        links: links.length > 0 ? links : [{ label: "", href: "" }],
      };
      return next;
    });
  }

  function updateFooterContact(
    columnIndex: number,
    rowIndex: number,
    field: keyof ContactRow,
    value: string,
  ) {
    setFooterColumns((prev) => {
      const next = [...prev];
      const column = next[columnIndex];
      if (!column || isLinkColumn(column)) return prev;
      const contact = [...column.contact];
      contact[rowIndex] = {
        ...contact[rowIndex],
        [field]: value,
      } as ContactRow;
      next[columnIndex] = { ...column, contact };
      return next;
    });
  }

  function addFooterContactRow(columnIndex: number) {
    setFooterColumns((prev) => {
      const next = [...prev];
      const column = next[columnIndex];
      if (!column || isLinkColumn(column)) return prev;
      next[columnIndex] = {
        ...column,
        contact: [...column.contact, { type: "location", value: "" }],
      };
      return next;
    });
  }

  function removeFooterContactRow(columnIndex: number, rowIndex: number) {
    setFooterColumns((prev) => {
      const next = [...prev];
      const column = next[columnIndex];
      if (!column || isLinkColumn(column)) return prev;
      const contact = column.contact.filter((_, index) => index !== rowIndex);
      next[columnIndex] = {
        ...column,
        contact: contact.length > 0 ? contact : [{ type: "location", value: "" }],
      };
      return next;
    });
  }

  function addFooterColumn(kind: "links" | "contact") {
    setFooterColumns((prev) => [
      ...prev,
      kind === "links" ? emptyLinkColumn() : emptyContactColumn(),
    ]);
  }

  function removeFooterColumn(index: number) {
    setFooterColumns((prev) => prev.filter((_, columnIndex) => columnIndex !== index));
  }

  function updateSocialLink(index: number, field: keyof FooterMetaLink, value: string) {
    setSocialLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addSocialLink() {
    setSocialLinks((prev) => [...prev, { icon: "globe", label: "", href: "/contact" }]);
  }

  function removeSocialLink(index: number) {
    setSocialLinks((prev) => {
      const next = prev.filter((_, itemIndex) => itemIndex !== index);
      return next.length > 0 ? next : [{ icon: "globe", label: "", href: "/contact" }];
    });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const body = {
      navItems,
      logoSrc,
      footerColumns: [],
      footerMeta: {
        brand,
        description: "",
        social: [],
        copyright,
        legal: parseLegalMetaLinks(legalLinks),
      },
      seoDefaults: {
        defaultTitle: seoDefaultTitle || undefined,
        defaultDescription: seoDefaultDescription || undefined,
      },
      featureFlags: { clientLogos: clientLogosFlag },
    };
    try {
      const res = await fetch("/api/v1/admin/site-global", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Save failed");
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
          <h2>Logo</h2>
          <ImageUploadField
            label="Logo URL"
            value={logoSrc}
            onChange={setLogoSrc}
            folder="site-global/logo"
          />
          <h2>Footer meta</h2>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Footer style is fixed to match the approved design. Edit brand, copyright, and legal
            links only.
          </p>
          <label>
            Brand
            <input value={brand} onChange={(e) => setBrand(e.target.value)} />
          </label>
          <label>
            Copyright
            <input value={copyright} onChange={(e) => setCopyright(e.target.value)} />
          </label>
          <label>
            Legal links (one per line: label|href)
            <textarea
              rows={4}
              value={legalLinks}
              onChange={(e) => setLegalLinks(e.target.value)}
              placeholder={"Privacy Policy|/privacy\nTerms of Service|/terms\nSystem Status|/status\nContact|/contact"}
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
            <input value={seoDefaultTitle} onChange={(e) => setSeoDefaultTitle(e.target.value)} />
          </label>
          <label>
            Default SEO description
            <textarea
              rows={3}
              value={seoDefaultDescription}
              onChange={(e) => setSeoDefaultDescription(e.target.value)}
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
