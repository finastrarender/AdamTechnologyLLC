import { connectMongo } from "@/lib/mongoose";
import SiteGlobal from "@/models/SiteGlobal";

async function fetchSiteGlobal() {
  await connectMongo();
  return SiteGlobal.findOne({ key: "default" }).lean();
}

/** Fresh read for layout/header (single small document). */
export function getSiteGlobalCached() {
  return fetchSiteGlobal();
}

/** Uncached read (admin, seed checks) */
export async function getSiteGlobalRaw() {
  return fetchSiteGlobal();
}
