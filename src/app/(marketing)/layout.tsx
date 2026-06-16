import {
  defaultApplyNowModal,
  defaultFooterColumns,
  defaultFooterMeta,
  defaultHeaderMeta,
  defaultLogoSrc,
  defaultNavItems,
} from "@/data/site-defaults";
import { getSiteGlobalCached } from "@/lib/content/site-global";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ApplyNowModal from "@/components/apply/ApplyNowModal";
import ScrollToHash from "@/components/marketing/ScrollToHash";
import "@/styles/reference-unified.css";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getSiteGlobalCached();

  const navItems =
    (global?.navItems as typeof defaultNavItems) ?? defaultNavItems;
  const footerColumns =
    (global?.footerColumns as typeof defaultFooterColumns) ??
    defaultFooterColumns;
  const footerMeta =
    (global?.footerMeta as typeof defaultFooterMeta) ?? defaultFooterMeta;
  const logoSrc = (global?.logoSrc as string | undefined) ?? defaultLogoSrc;
  const headerMeta =
    (global?.headerMeta as typeof defaultHeaderMeta | undefined) ?? defaultHeaderMeta;
  const featureFlags = (global?.featureFlags as Record<string, boolean> | undefined) ?? {};
  const footerLogoLightFilter = featureFlags.footerLogoLightFilter !== false;
  const applyNowModal = {
    ...defaultApplyNowModal,
    ...((global?.applyNowModal as Partial<typeof defaultApplyNowModal> | undefined) ?? {}),
  };
  return (
    <div className="owtc-app">
      <SiteHeader
        navItems={navItems}
        logoSrc={logoSrc}
        brandName={footerMeta.brand || "Adam Technology"}
        inquireLabel={headerMeta.inquireLabel}
        inquireHref={headerMeta.inquireHref}
      />
      <main>{children}</main>
      <ScrollToHash />
      <ApplyNowModal content={applyNowModal} />
      <SiteFooter
        columns={footerColumns}
        meta={footerMeta}
        logoSrc={logoSrc}
        footerLogoLightFilter={footerLogoLightFilter}
      />
    </div>
  );
}
