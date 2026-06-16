import type { Metadata } from "next";

const BRAND_SUFFIX_VARIANTS = [
  "Adam Technology L.L.C.",
  "Adam Technology LLC",
  "Adam Technology",
];

function stripTrailingBrand(title: string, brandName: string): string {
  const variants = new Set(
    [brandName, ...BRAND_SUFFIX_VARIANTS]
      .map((value) => value.trim())
      .filter(Boolean),
  );

  let result = title.trim();
  for (const brand of variants) {
    const suffix = ` | ${brand}`;
    if (result.toLowerCase().endsWith(suffix.toLowerCase())) {
      result = result.slice(0, -suffix.length).trim();
      break;
    }
  }

  return result;
}

export function resolveMetadataTitle(
  seoTitle: string | undefined,
  pageTitle: string,
  siteDefaultTitle = "Adam Technology L.L.C.",
): Metadata["title"] {
  const brandName = siteDefaultTitle.trim() || "Adam Technology L.L.C.";
  const raw = (seoTitle?.trim() || pageTitle.trim() || brandName).trim();
  const pagePart = stripTrailingBrand(raw, brandName);

  const isBrandOnlyTitle =
    pagePart.length === 0 ||
    pagePart.toLowerCase() === brandName.toLowerCase() ||
    raw.toLowerCase() === brandName.toLowerCase();

  if (isBrandOnlyTitle) {
    return { absolute: brandName };
  }

  // Root layout template adds " | Adam Technology L.L.C." once.
  return pagePart;
}
