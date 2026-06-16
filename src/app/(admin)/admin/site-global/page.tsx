import { auth } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteGlobalEditClient from "@/components/admin/SiteGlobalEditClient";

export const metadata: Metadata = {
  title: "Site global",
};

export default async function AdminSiteGlobalPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return <SiteGlobalEditClient />;
}
