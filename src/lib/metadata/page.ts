import type { Metadata } from "next";
import { getSiteGlobalCached } from "@/lib/content/site-global";
import { resolvePageForRequest } from "@/lib/content/pages";
import { resolveMetadataTitle } from "@/lib/metadata/title";

type SeoDefaults = { defaultTitle?: string; defaultDescription?: string };

export async function buildPageMetadata(slug: string): Promise<Metadata> {
  const [page, global] = await Promise.all([resolvePageForRequest(slug), getSiteGlobalCached()]);
  if (!page) {
    return { title: "Not found" };
  }
  const d = (global?.seoDefaults as SeoDefaults | undefined) ?? {};
  const siteDefaultTitle = d.defaultTitle?.trim() || "Adam Technology L.L.C.";

  return {
    title: resolveMetadataTitle(page.seoTitle, page.title, siteDefaultTitle),
    description: page.seoDescription || d.defaultDescription,
    alternates: page.canonicalPath
      ? { canonical: page.canonicalPath }
      : undefined,
    openGraph: page.ogImage
      ? {
          images: [{ url: page.ogImage }],
        }
      : undefined,
  };
}
