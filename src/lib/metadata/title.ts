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

export function coerceSeoTitleString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.absolute === "string") return record.absolute;
    if (typeof record.default === "string") return record.default;
  }
  return "";
}

export function stripTrailingBrandFromSeoTitle(
  title: unknown,
  brandName = "Adam Technology L.L.C.",
): string {
  return stripTrailingBrand(coerceSeoTitleString(title), brandName);
}

export function resolveMetadataTitle(
  seoTitle: string | undefined,
  pageTitle: string,
  siteDefaultTitle = "Adam Technology L.L.C.",
): Metadata["title"] {
  const brandName = siteDefaultTitle.trim() || "Adam Technology L.L.C.";
  const raw = (
    coerceSeoTitleString(seoTitle).trim() ||
    pageTitle.trim() ||
    brandName
  ).trim();
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

/** Full browser tab title as shown on the public site (page + brand). */
export function formatFullSeoTitle(
  seoTitle: string | undefined,
  pageTitle: string,
  siteDefaultTitle = "Adam Technology L.L.C.",
): string {
  const brandName = siteDefaultTitle.trim() || "Adam Technology L.L.C.";
  const resolved = resolveMetadataTitle(seoTitle, pageTitle, brandName);

  if (resolved && typeof resolved === "object" && "absolute" in resolved) {
    return String(resolved.absolute);
  }

  const pagePart = String(resolved).trim();
  return `${pagePart} | ${brandName}`;
}
