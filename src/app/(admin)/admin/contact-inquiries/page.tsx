import { auth } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ContactInquiriesClient from "@/components/admin/ContactInquiriesClient";

export const metadata: Metadata = {
  title: "Contact inquiries",
};

export default async function AdminContactInquiriesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return <ContactInquiriesClient />;
}
