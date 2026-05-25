"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import HeroSectionForm from "@/components/admin/HeroSectionForm";
import ImageUploadField from "@/components/admin/ImageUploadField";
import {
  AboutAdvantageSectionForm,
  AboutCtaSectionForm,
  AboutHeroSectionForm,
  AboutFrameworkSectionForm,
  AboutIntroSectionForm,
  AboutValuesSectionForm,
  AboutVisionMissionSectionForm,
  ClientLogosSectionForm,
  ContactSectionForm,
  CoursesCatalogSectionForm,
  ContactHeroSectionForm,
  ContactInquirySectionForm,
  CtaSectionForm,
  GlobalStandardsSectionForm,
  HomeIncubationHighlightSectionForm,
  IncubationSectionForm,
  IntroSectionForm,
  IndustriesCtaSectionForm,
  IndustriesGridSectionForm,
  IndustriesHeroSectionForm,
  InvestmentSectionForm,
  ServicesSectionForm,
  ServicesAccordionSectionForm,
  ServicesGridSectionForm,
  ServicesCtaSectionForm,
  ResearchHubSectionForm,
  WhyChooseSectionForm,
  ServicesHeroSectionForm,
} from "@/components/admin/SectionForms";
import { type SectionType } from "@/types/section";

type SectionRow = { id: string; type: string; order: number; data: Record<string, unknown> };
type SectionSaveState = {
  sectionId: string;
  message: string;
  tone: "success" | "error";
} | null;

const PAGE_SECTION_TYPES: Record<string, SectionType[]> = {
  home: ["hero", "intro", "services", "whyChoose", "clientLogos", "cta"],
  services: ["servicesHero", "servicesGrid", "servicesCTA"],
  about: ["aboutHero", "aboutOverview", "aboutVisionMission", "aboutFramework", "aboutAdvantage", "aboutValues", "aboutCTA"],
  contact: ["contactInquiry"],
};

function defaultSectionData(type: SectionType): Record<string, unknown> {
  switch (type) {
    case "hero":
      return {
        badge: "ENTERPRISE GRADE INTELLIGENCE",
        title: ["POWERING", "SECURE", "AND", "FUTURE", "TECHNOLOGY"],
        description:
          "Adam Technology L.L.C. delivers high-precision digital infrastructure for the modern era. We architect, secure, and scale enterprise systems with industrial-grade resilience.",
        primaryAction: { label: "EXPLORE SERVICES", href: "/services" },
        secondaryAction: { label: "BOOK FREE ADVICE", href: "/contact" },
        backgroundImage: "/home/hero-bg.jpg",
      };
    case "intro":
      return {
        eyebrow: "About Us",
        title: ["THE ARCHITECT OF", "ENTERPRISE", "TRUST"],
        description:
          "Headquartered in Dubai, Adam Technology L.L.C. stands at the intersection of security and innovation. We provide the sovereign digital foundations that global enterprises rely on.",
        more:
          'Our approach is rooted in "Cyber-Industrialism"—treating every software deployment and security protocol as a critical infrastructure project that requires absolute precision and zero-fail resilience.',
        highlights: [],
        image: "/home/headquarters.png",
        href: "/about",
        expcount: 10,
      };
    case "services":
      return {
        eyebrow: "OUR CAPABILITIES",
        title: "CORE PILLARS",
        description:
          "Modular solutions designed to scale with the complexity of your operational demands.",
        backgroundImage: "",
        cards: [
          {
            icon: "security",
            title: "CYBER SECURITY",
            description:
              "Defensive architecture and threat intelligence systems built to withstand the most sophisticated breaches.",
          },
          {
            icon: "online",
            title: "DATA & CLOUD",
            description:
              "High-performance cloud migration and sovereign data warehousing for sensitive enterprise assets.",
          },
          {
            icon: "innovation",
            title: "SOFTWARE & DEV",
            description:
              "Custom enterprise software engineered with a security-first methodology and technical excellence.",
          },
          {
            icon: "corporate",
            title: "CONSULTING",
            description:
              "Strategic advisory and specialized workforce training to foster a culture of technological resilience.",
          },
        ],
      };
    case "whyChoose":
      return {
        title: "",
        subheading: "",
        items: [
          {
            icon: "ShieldCheck",
            title: "END-TO-END SECURITY",
            description:
              "We don't just 'treat' security; we build it into the DNA of every solution. From physical server security to encrypted application layers, your data remains impenetrable.",
            tags: ["ENCRYPTION", "ZERO TRUST", "SOVEREIGN CONTROL"],
          },
          {
            icon: "Sparkles",
            title: "FUTURE-READY TECH",
            description:
              "Anticipating the next decade of digital evolution. Our stacks are built for modularity, ensuring you can integrate AI, Blockchain, and Quantum protocols seamlessly.",
            tags: ["AI-DRIVEN", "EDGE READY", "SCALABLE MESH"],
          },
        ],
      };
    case "clientLogos":
      return {
        eyebrow: "TRUSTED BY INSTITUTIONAL LEADERS",
        logos: ["GLOBAL BANK", "TECH LOGISTICS", "DUBAI URBAN", "GOV SECTOR", "CORE ENERGY"],
      };
    case "cta":
      return {
        title: "SYSTEM DEPLOYMENT STARTS HERE",
        description: "Secure your digital future with the UAE's premier technical architectural firm.",
        action: { label: "BOOK CONSULTATION", href: "/contact" },
      };
    case "servicesHero":
      return {
        title: ["SYSTEM", "ARCHITECTURE"],
        description:
          "Enterprise-grade infrastructure, elite cybersecurity protocols, and bespoke software orchestration.",
      };
    case "servicesGrid":
      return {
        title: "SERVICES",
        description: "Explore our core service lines.",
        filters: ["ALL"],
        cards: [
          {
            category: "CYBERSECURITY",
            title: "CYBERSECURITY",
            description: "Threat protection, hardening, and security operations.",
            features: ["ZERO TRUST", "SOC OPS", "THREAT INTEL"],
            cta: "INQUIRE",
            icon: "security",
          },
        ],
      };
    case "servicesCTA":
      return {
        title: "SECURE YOUR STACK",
        description: "Get a tailored plan for your organization.",
        primaryAction: { label: "INQUIRE", href: "/contact" },
        secondaryAction: { label: "ABOUT US", href: "/about" },
      };
    case "aboutHero":
      return {
        titleAccent: "COMPLIANCE AND",
        titleMain: "CERTIFICATIONS",
        description:
          "Adam Technology L.L.C. operates under strict regulatory frameworks and security standards.",
        image: "/home/headquarters.png",
        stats: [
          { value: "ISO", label: "SECURITY" },
          { value: "NIST", label: "FRAMEWORK" },
        ],
      };
    case "aboutVisionMission":
      return {
        items: [
          {
            title: "VISION",
            description: "Build resilient infrastructure for a secure digital future.",
            accentColor: "#4ad9ff",
          },
          {
            title: "MISSION",
            description: "Deliver security-first engineering with measurable outcomes.",
            accentColor: "#41ef54",
          },
        ],
      };
    case "aboutFramework":
      return {
        title: "SECURITY FRAMEWORK",
        description: "A practical approach to governance, resilience, and delivery.",
        pillars: [{ letter: "A", title: "ASSESS", description: "Audit, map, and baseline risk." }],
      };
    case "aboutAdvantage":
      return {
        eyebrow: "WHY US",
        title: ["SECURITY", "BY DESIGN"],
        description: "We ship with operational discipline and measurable controls.",
        points: ["Risk-led planning", "Secure delivery pipelines", "Continuous monitoring"],
        image: "/home/headquarters.png",
      };
    case "aboutValues":
      return {
        title: "COMPLIANCE AND\nCERTIFICATIONS",
        description:
          "ADAM TECHNOLOGY L.L.C. operates under strict regulatory frameworks, ensuring global compliance and institutional security standards.",
        region: "DUBAI, UNITED ARAB EMIRATES",
        items: [
          { title: "DUBAI\nLICENSED", description: "Fully registered and regulated by Dubai authorities.", icon: "Award" },
          { title: "ISO\nCERTIFIED", description: "Aligned to ISO 27001 security management standards.", icon: "ShieldCheck" },
          { title: "NIST\nFRAMEWORK", description: "Mapped to NIST for enterprise-grade risk controls.", icon: "Shield" },
        ],
      };
    case "aboutCTA":
      return {
        title: ["READY TO SECURE", "YOUR STACK?"],
        description: "Talk to our team about your security and infrastructure goals.",
        primaryAction: { label: "INQUIRE", href: "/contact" },
        secondaryAction: { label: "VIEW SERVICES", href: "/services" },
      };
    case "contactInquiry":
      return {
        formTitle: "Initialize Inquiry",
        formDescription: "Complete the transmission parameters below.",
        submitLabel: "Send Message",
        inquiryOptions: ["Cybersecurity", "Cloud & Data", "Software Engineering", "Consulting"],
        officeHeading: "Global Operations",
        officeItems: [
          { title: "Dubai HQ", lines: ["Business Bay, Dubai, UAE"], icon: "location" },
          { title: "Secure Channel", lines: ["ops@adamtech.ae"], icon: "mail" },
        ],
        formFields: {
          fullNameLabel: "Identifier / Name",
          companyLabel: "Organization / Company",
          workEmailLabel: "Secure Email Endpoint",
          interestLabel: "Operation Type / Service",
          interestPlaceholder: "Select infrastructure module",
          messageLabel: "Message Payload",
          messagePlaceholder: "Transmit your requirements...",
          disclaimerText: "SYSTEM STATUS: READY FOR TRANSMISSION",
          successMessage: "Thank you — our consultants will be in touch shortly.",
          errorMessage: "Network error",
        },
        mapImage: "/home/hero-bg.jpg",
        mapLabelTitle: "",
        mapLabelSubtitle: "",
      };
    default:
      return {};
  }
}

function normalizeSlugForPath(value: string | undefined | null) {
  return String(value ?? "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

function slugPathSegment(value: string | undefined | null) {
  return encodeURIComponent(normalizeSlugForPath(value));
}

function idPathSegment(value: string | undefined | null) {
  return encodeURIComponent(String(value ?? "").trim());
}

function normalizeSectionType(value: string) {
  const trimmed = String(value).trim();
  if (trimmed === "aboutIntro") return "aboutOverview";
  if (trimmed === "industrieshero") return "industriesHero";
  if (trimmed === "industriesgrid") return "industriesGrid";
  if (trimmed === "industriescta") return "industriesCta";
  if (trimmed === "servicesgrid") return "servicesGrid";
  if (trimmed === "servicesaccordion") return "servicesAccordion";
  if (trimmed === "servicescta") return "servicesCTA";
  return trimmed;
}

export default function PageEditClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<{
    slug: string;
    title: string;
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    canonicalPath?: string;
    status: string;
    sections: SectionRow[];
  } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [sectionSaveState, setSectionSaveState] = useState<SectionSaveState>(null);
  const [publishing, setPublishing] = useState(false);
  const [newSectionType, setNewSectionType] = useState<SectionType>("hero");

  async function parseJsonResponse(res: Response) {
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return res.json();
    }
    const text = await res.text();
    return {
      error: {
        message: `HTTP ${res.status}: ${text.slice(0, 140) || "Non-JSON response"}`,
      },
    };
  }

  const reload = useCallback(async () => {
    const res = await fetch(`/api/v1/admin/pages/${slugPathSegment(slug)}`);
    const json = await parseJsonResponse(res);
    if (!res.ok) throw new Error(json?.error?.message ?? "Load failed");
    setPage(json.data);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await reload();
      } catch (e) {
        if (!cancelled) setMessage(e instanceof Error ? e.message : "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  useEffect(() => {
    const current = page?.slug ?? slug;
    const allowed = PAGE_SECTION_TYPES[current] ?? [];
    if (allowed.length > 0) {
      setNewSectionType((prev) => (allowed.includes(prev) ? prev : allowed[0]));
    }
  }, [page?.slug, slug]);

  async function saveMeta(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!page) return;
    setSectionSaveState(null);
    const fd = new FormData(e.currentTarget);
    const nextSlug = normalizeSlugForPath(String(fd.get("slug") ?? ""));
    const res = await fetch(`/api/v1/admin/pages/${slugPathSegment(slug)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: nextSlug,
        title: fd.get("title"),
        seoTitle: fd.get("seoTitle") || undefined,
        seoDescription: fd.get("seoDescription") || undefined,
        ogImage: fd.get("ogImage") || undefined,
        canonicalPath: fd.get("canonicalPath") || undefined,
      }),
    });
    const json = await parseJsonResponse(res);
    if (!res.ok) {
      setMessage(json?.error?.message ?? "Save failed");
      return;
    }
    setPage(json.data);
    setMessage("Meta saved.");
    if (json.data.slug && json.data.slug !== slug) {
      router.replace(`/admin/pages/${json.data.slug}`);
    }
  }

  async function saveSection(section: SectionRow, data: Record<string, unknown>) {
    const targetSlug = normalizeSlugForPath(page?.slug ?? slug);
    const patchSection = async (sectionId: string) =>
      fetch(`/api/v1/admin/pages/${slugPathSegment(targetSlug)}/sections/${idPathSegment(sectionId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, type: section.type, order: section.order }),
      });

    let res = await patchSection(section.id);
    let json = await parseJsonResponse(res);

    if (!res.ok && res.status === 404) {
      await reload();
      const latestRes = await fetch(`/api/v1/admin/pages/${slugPathSegment(targetSlug)}`);
      const latestJson = await parseJsonResponse(latestRes);
      const latestPage = latestJson?.data as { sections?: SectionRow[] } | undefined;
      const targetType = normalizeSectionType(section.type);
      const replacement = latestPage?.sections?.find(
        (s) =>
          normalizeSectionType(s.type) === targetType &&
          (s.order === section.order || s.id === section.id),
      );
      if (replacement) {
        res = await patchSection(replacement.id);
        json = await parseJsonResponse(res);
      }
    }

    if (!res.ok) {
      setSectionSaveState({
        sectionId: section.id,
        message:
          json?.error?.message ??
          "Section save failed. Refresh this page once and try again.",
        tone: "error",
      });
      return;
    }
    setPage(json.data.page);
    setMessage(null);
    setSectionSaveState({
      sectionId: section.id,
      message: `Section ${section.type} saved.`,
      tone: "success",
    });
  }

  async function publish() {
    setPublishing(true);
    setMessage(null);
    setSectionSaveState(null);
    try {
      const targetSlug = normalizeSlugForPath(page?.slug ?? slug);
      const res = await fetch(`/api/v1/admin/pages/${slugPathSegment(targetSlug)}/publish`, {
        method: "POST",
      });
      const json = await parseJsonResponse(res);
      if (!res.ok) throw new Error(json?.error?.message ?? "Publish failed");
      setPage(json.data);
      setMessage("Published.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Publish error");
    } finally {
      setPublishing(false);
    }
  }

  if (loading) return <p className="admin-muted">Loading…</p>;
  if (!page) return <p className="contact-form__err">Page not found</p>;

  const currentSlug = page.slug;
  const currentSlugSegment = slugPathSegment(currentSlug);
  const sorted = [...page.sections].sort((a, b) => a.order - b.order);
  const allowedSectionTypes = PAGE_SECTION_TYPES[currentSlug] ?? [];

  async function addSection() {
    const targetSlug = normalizeSlugForPath(page?.slug ?? slug);
    setMessage(null);
    setSectionSaveState(null);
    try {
      const res = await fetch(`/api/v1/admin/pages/${slugPathSegment(targetSlug)}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newSectionType,
          data: defaultSectionData(newSectionType),
        }),
      });
      const json = await parseJsonResponse(res);
      if (!res.ok) throw new Error(json?.error?.message ?? "Add section failed");
      setPage(json.data.page);
      setMessage(`Added section ${newSectionType}.`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Add section error");
    }
  }

  async function deleteSection(sectionId: string) {
    const targetSlug = normalizeSlugForPath(page?.slug ?? slug);
    setMessage(null);
    setSectionSaveState(null);
    try {
      const res = await fetch(
        `/api/v1/admin/pages/${slugPathSegment(targetSlug)}/sections/${idPathSegment(sectionId)}`,
        { method: "DELETE" },
      );
      const json = await parseJsonResponse(res);
      if (!res.ok) throw new Error(json?.error?.message ?? "Delete failed");
      setPage(json.data.page);
      setMessage("Section removed.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Delete error");
    }
  }

  async function swapOrder(a: SectionRow, b: SectionRow) {
    const targetSlug = normalizeSlugForPath(page?.slug ?? slug);
    setMessage(null);
    setSectionSaveState(null);
    try {
      const patch = async (id: string, order: number, type: string) =>
        fetch(
          `/api/v1/admin/pages/${slugPathSegment(targetSlug)}/sections/${idPathSegment(id)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order, type }),
          },
        );
      const res1 = await patch(a.id, b.order, a.type);
      const j1 = await parseJsonResponse(res1);
      if (!res1.ok) throw new Error(j1?.error?.message ?? "Reorder failed");
      const res2 = await patch(b.id, a.order, b.type);
      const j2 = await parseJsonResponse(res2);
      if (!res2.ok) throw new Error(j2?.error?.message ?? "Reorder failed");
      setPage(j2.data.page);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Reorder error");
    }
  }

  return (
    <div className="admin-shell">
      <nav className="admin-nav">
        <Link href="/admin">← Dashboard</Link>
        <div style={{ display: "flex", gap: 8 }}>
          <a
            href={`/api/v1/admin/pages/${currentSlugSegment}/preview`}
            target="_blank"
            rel="noreferrer"
            className="admin-button-secondary"
          >
            Preview draft
          </a>
          <button type="button" onClick={() => publish()} disabled={publishing}>
            {publishing ? "Publishing…" : "Publish draft to live"}
          </button>
        </div>
      </nav>
      <div className="admin-card">
        <h1 style={{ marginTop: 0 }}>Edit page: {currentSlug}</h1>
        <p className="admin-muted">
          Status: <strong>{page.status}</strong>. Editing <strong>draft</strong> sections; visitors see
          published content until you publish.
        </p>
        {message ? <p className="contact-form__ok">{message}</p> : null}

        <form className="admin-form" onSubmit={saveMeta}>
          <h2>Page & SEO</h2>
          <label>
            Title
            <input name="title" key={page.title} defaultValue={page.title} required />
          </label>
          <label>
            SEO title
            <input name="seoTitle" key={page.seoTitle} defaultValue={page.seoTitle ?? ""} />
          </label>
          <label>
            SEO description
            <textarea
              name="seoDescription"
              key={page.seoDescription}
              defaultValue={page.seoDescription ?? ""}
              rows={3}
            />
          </label>
          <label>
            Slug (page url)
            <input
              name="slug"
              key={page.slug}
              defaultValue={page.slug}
              required
              disabled={page.slug === "home"}
              placeholder="about-us"
            />
          </label>
          {page.slug === "home" ? (
            <p className="admin-muted" style={{ margin: 0 }}>
              Home stays on the root route `/`.
            </p>
          ) : null}
          <ImageUploadField
            label="Open Graph image URL"
            name="ogImage"
            value={page.ogImage ?? ""}
            onChange={(value) =>
              setPage((current) => (current ? { ...current, ogImage: value } : current))
            }
            folder={`pages/${page.slug}/seo`}
          />
          <label>
            Canonical path
            <input
              name="canonicalPath"
              value={page.canonicalPath ?? ""}
              onChange={(e) =>
                setPage((current) =>
                  current ? { ...current, canonicalPath: e.target.value } : current,
                )
              }
              placeholder="https://example.com/about"
            />
          </label>
          <button type="submit">Save meta</button>
        </form>

        <h2>Sections (draft)</h2>
        {allowedSectionTypes.length > 0 ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value as SectionType)}
            >
              {allowedSectionTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button type="button" className="admin-button-secondary" onClick={addSection}>
              Add section
            </button>
          </div>
        ) : null}
        {sorted.map((section) => (
          <div key={section.id} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => deleteSection(section.id)}
              >
                Remove
              </button>
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => {
                  const idx = sorted.findIndex((s) => s.id === section.id);
                  if (idx > 0) swapOrder(sorted[idx], sorted[idx - 1]);
                }}
              >
                Move up
              </button>
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => {
                  const idx = sorted.findIndex((s) => s.id === section.id);
                  if (idx >= 0 && idx < sorted.length - 1) swapOrder(sorted[idx], sorted[idx + 1]);
                }}
              >
                Move down
              </button>
            </div>
            <SectionEditor
              section={section}
              onSave={(data) => saveSection(section, data)}
              previewHref={`/api/v1/admin/pages/${currentSlugSegment}/preview`}
              saveMessage={sectionSaveState?.sectionId === section.id ? sectionSaveState.message : null}
              saveMessageTone={sectionSaveState?.sectionId === section.id ? sectionSaveState.tone : "success"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: {
  section: SectionRow;
  onSave: (data: Record<string, unknown>) => void;
  previewHref: string;
  saveMessage?: string | null;
  saveMessageTone?: "success" | "error";
}) {
  const normalizedType =
    String(section.type).trim() === "industrieshero"
      ? "industriesHero"
      : String(section.type).trim() === "industriesgrid"
        ? "industriesGrid"
        : String(section.type).trim() === "industriescta"
          ? "industriesCta"
        : String(section.type).trim() === "servicesgrid"
            ? "servicesGrid"
          : String(section.type).trim() === "servicesaccordion"
            ? "servicesAccordion"
          : String(section.type).trim() === "servicescta"
            ? "servicesCTA"
      : String(section.type).trim();

  switch (normalizedType) {
    case "hero":
      return (
        <HeroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "intro":
      return (
        <IntroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "services":
      return (
        <ServicesSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "servicesGrid":
      return (
        <ServicesGridSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "servicesCTA":
      return (
        <ServicesCtaSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "whyChoose":
      return (
        <WhyChooseSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "investment":
      return (
        <InvestmentSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "incubation":
      return (
        <IncubationSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "homeIncubationHighlight":
      return (
        <HomeIncubationHighlightSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "globalStandards":
      return (
        <GlobalStandardsSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "clientLogos":
      return (
        <ClientLogosSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "cta":
      return (
        <CtaSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "contact":
      return (
        <ContactSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "contactHero":
      return (
        <ContactHeroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "contactInquiry":
      return (
        <ContactInquirySectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutHero":
      return (
        <AboutHeroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutOverview":
      return (
        <AboutIntroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "coursesCatalog":
      return (
        <CoursesCatalogSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "servicesAccordion":
      return (
        <ServicesAccordionSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutIntro":
      return (
        <AboutIntroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutVisionMission":
      return (
        <AboutVisionMissionSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutFramework":
      return (
        <AboutFrameworkSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutAdvantage":
      return (
        <AboutAdvantageSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutValues":
      return (
        <AboutValuesSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "aboutCTA":
      return (
        <AboutCtaSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "servicesHero":
      return (
        <ServicesHeroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "industriesHero":
      return (
        <IndustriesHeroSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "industriesGrid":
      return (
        <IndustriesGridSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "industriesCta":
      return (
        <IndustriesCtaSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    case "researchHub":
      return (
        <ResearchHubSectionForm
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
    default:
      return (
        <JsonSectionEditor
          section={section}
          onSave={onSave}
          previewHref={previewHref}
          saveMessage={saveMessage}
          saveMessageTone={saveMessageTone}
        />
      );
  }
}

function JsonSectionEditor({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: {
  section: SectionRow;
  onSave: (data: Record<string, unknown>) => void;
  previewHref: string;
  saveMessage?: string | null;
  saveMessageTone?: "success" | "error";
}) {
  const [text, setText] = useState(JSON.stringify(section.data, null, 2));

  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #e2e8f0" }}>
      <h3>
        {section.type}{" "}
        <span className="admin-muted" style={{ fontWeight: 400 }}>
          (order {section.order}, id {section.id})
        </span>
      </h3>
      <label>
        Section data (JSON)
        <textarea rows={10} value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <div style={{ display: "grid", gap: 12 }}>
        <button
          type="button"
          onClick={() => {
            try {
              onSave(JSON.parse(text));
            } catch {
              // Unknown section types keep a JSON fallback editor.
            }
          }}
        >
          Save section
        </button>
        <div style={{ display: "grid", gap: 8 }}>
          <a href={previewHref} target="_blank" rel="noreferrer" className="admin-button-secondary">
            Preview draft
          </a>
          {saveMessage ? (
            <p className={saveMessageTone === "error" ? "contact-form__err" : "contact-form__ok"} style={{ margin: 0 }}>
              {saveMessage}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
