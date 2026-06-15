import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { getFallbackPageView } from "@/data/fallback-pages";
import { DEFAULT_SERVICES_GRID, mergeServicesGridContent } from "@/data/services-reference";
import { cacheTags } from "@/lib/cache-tags";
import { connectMongo } from "@/lib/mongoose";
import Page from "@/models/Page";
import type { PageSection } from "@/types/section";

export type PublicPageView = {
  slug: string;
  title: string;
  status: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
  effectiveSections: PageSection[];
  isPreview: boolean;
};

function toPlainSections(sections: unknown): PageSection[] {
  if (!Array.isArray(sections)) return [];
  return sections as PageSection[];
}

function pageToPublicView(
  page: {
    slug: string;
    title: string;
    status: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    ogImage?: string | null;
    canonicalPath?: string | null;
    publishedSections?: unknown;
    sections?: unknown;
  },
  opts: { published: boolean; isPreview: boolean },
): PublicPageView {
  const source =
    opts.published && Array.isArray(page.publishedSections) && page.publishedSections.length
      ? page.publishedSections
      : page.sections;

  let effectiveSections = toPlainSections(source);
  if (page.slug === "home") {
    const fallback = getFallbackPageView("home");
    effectiveSections = effectiveSections.filter((s) => String(s.type) !== "clientLogos");

    const desiredTypes = ["whyChoose"];
    for (const t of desiredTypes) {
      if (effectiveSections.some((s) => String(s.type) === t)) continue;
      const fallbackSection = fallback?.effectiveSections?.find((s) => String(s.type) === t);
      if (fallbackSection) effectiveSections = [...effectiveSections, fallbackSection];
    }

    const desiredOrder: Record<string, number> = {
      hero: 0,
      intro: 1,
      services: 2,
      whyChoose: 3,
      cta: 4,
    };

    effectiveSections = effectiveSections
      .map((s) => {
        const t = String(s.type);
        if (t === "services") {
          const data = s.data as Record<string, unknown>;
          const fallbackServices = fallback?.effectiveSections?.find(
            (section) => String(section.type) === "services",
          );
          if (
            fallbackServices &&
            (data.title === "CORE PILLARS" || data.eyebrow === "OUR CAPABILITIES")
          ) {
            return { ...s, data: fallbackServices.data };
          }
        }
        if (desiredOrder[t] === undefined) return s;
        if (s.order === desiredOrder[t]) return s;
        return { ...s, order: desiredOrder[t] };
      })
      .sort((a, b) => a.order - b.order);
  }

  if (page.slug === "services") {
    const fallback = getFallbackPageView("services");
    const fallbackHero = fallback?.effectiveSections?.find((s) => String(s.type) === "servicesHero");
    const fallbackGrid = fallback?.effectiveSections?.find((s) => String(s.type) === "servicesGrid");

    effectiveSections = effectiveSections
      .filter((s) => String(s.type) !== "servicesCTA")
      .map((s) => {
        const type = String(s.type);
        if (type === "servicesHero" && fallbackHero) {
          const data = s.data as Record<string, unknown>;
          const hasReferenceEyebrow =
            typeof data.eyebrow === "string" &&
            data.eyebrow.trim().toUpperCase() === "STRATEGIC TECHNOLOGY PARTNER";
          if (!hasReferenceEyebrow) {
            return { ...s, data: fallbackHero.data };
          }
        }
        if (type === "servicesGrid") {
          const data = s.data as Record<string, unknown>;
          if (!data.cybersecurity || Array.isArray(data.cards)) {
            const merged = mergeServicesGridContent(
              (fallbackGrid?.data as Record<string, unknown> | undefined) ?? DEFAULT_SERVICES_GRID,
            );
            return { ...s, data: merged };
          }
          return { ...s, data: mergeServicesGridContent(data) };
        }
        return s;
      })
      .sort((a, b) => a.order - b.order);
  }

  return {
    slug: page.slug,
    title: page.title,
    status: page.status,
    seoTitle: page.seoTitle ?? undefined,
    seoDescription: page.seoDescription ?? undefined,
    ogImage: page.ogImage ?? undefined,
    canonicalPath: page.canonicalPath ?? undefined,
    effectiveSections,
    isPreview: opts.isPreview,
  };
}

async function fetchPublishedPage(slug: string): Promise<PublicPageView | null> {
  await connectMongo();
  const page = await Page.findOne({ slug }).lean();
  if (!page) return null;

  const isDev = process.env.NODE_ENV === "development";

  if (page.status !== "published") {
    if (!isDev) return null;
    return pageToPublicView(page, { published: false, isPreview: true });
  }

  return pageToPublicView(page, { published: true, isPreview: false });
}

async function getBootFallbackPage(slug: string) {
  await connectMongo();
  const pageCount = await Page.countDocuments();
  if (pageCount > 0) {
    return null;
  }
  return getFallbackPageView(slug);
}

const getPublishedPageProduction = (slug: string) =>
  unstable_cache(() => fetchPublishedPage(slug), ["published-page", slug], {
    tags: [cacheTags.page(slug)],
  });

/** Production: cached. Development: always fresh DB read (avoids sticky `null` after `pnpm seed`). */
export async function getPublishedPageCached(slug: string): Promise<PublicPageView | null> {
  if (process.env.NODE_ENV === "development") {
    return fetchPublishedPage(slug);
  }
  return getPublishedPageProduction(slug)();
}

/** Preview / draft: bypass cache; only call when draftMode is enabled (or admin). */
export async function getPageDraftView(slug: string): Promise<PublicPageView | null> {
  await connectMongo();
  const page = await Page.findOne({ slug }).lean();
  if (!page) return null;
  return pageToPublicView(page, { published: false, isPreview: true });
}

export async function resolvePageForRequest(slug: string): Promise<PublicPageView | null> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const d = await getPageDraftView(slug);
    if (d) return d;
    return getFallbackPageView(slug) ?? getBootFallbackPage(slug);
  }

  const live = await getPublishedPageCached(slug);
  if (live) return live;
  return getFallbackPageView(slug) ?? getBootFallbackPage(slug);
}
