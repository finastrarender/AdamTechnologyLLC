import { auth } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ApplyNowModalEditClient from "@/components/admin/ApplyNowModalEditClient";

export const metadata: Metadata = {
  title: "Apply now modal",
};

export default async function AdminApplyNowPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return <ApplyNowModalEditClient />;
}
