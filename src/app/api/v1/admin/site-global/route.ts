import { auth } from "@/auth";
import { jsonData, jsonError } from "@/lib/api-response";
import { revalidateSiteGlobal } from "@/lib/revalidate-content";
import { connectMongo } from "@/lib/mongoose";
import { getSiteGlobalRaw } from "@/lib/content/site-global";
import { defaultHeaderMeta } from "@/data/site-defaults";
import SiteGlobal from "@/models/SiteGlobal";
import { siteGlobalPayloadSchema } from "@/schemas/sections";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return jsonError("unauthorized", "Sign in required", 401);
  }
  await connectMongo();
  const doc = await getSiteGlobalRaw();
  if (!doc) {
    return jsonError("not_found", "Site global not seeded", 404);
  }
  return jsonData(doc);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return jsonError("unauthorized", "Sign in required", 401);
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("bad_request", "Invalid JSON", 400);
  }
  const parsed = siteGlobalPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("validation_error", "Invalid payload", 422, parsed.error.flatten());
  }
  await connectMongo();
  const existing = await SiteGlobal.findOne({ key: "default" }).lean();
  const headerMeta = {
    ...defaultHeaderMeta,
    ...((existing?.headerMeta as Partial<typeof defaultHeaderMeta> | null) ?? {}),
    ...(parsed.data.headerMeta ?? {}),
  };

  const update: Record<string, unknown> = {
    navItems: parsed.data.navItems,
    footerColumns: parsed.data.footerColumns,
    footerMeta: parsed.data.footerMeta,
    logoSrc: parsed.data.logoSrc,
    headerMeta,
    featureFlags: parsed.data.featureFlags ?? {},
  };

  if (parsed.data.seoDefaults !== undefined) {
    update.seoDefaults = parsed.data.seoDefaults;
  }
  if (parsed.data.applyNowModal !== undefined) {
    update.applyNowModal = parsed.data.applyNowModal;
  }

  const doc = await SiteGlobal.findOneAndUpdate(
    { key: "default" },
    { $set: update },
    { new: true, upsert: true, strict: false },
  ).lean();
  revalidateSiteGlobal();
  return jsonData(doc);
}
