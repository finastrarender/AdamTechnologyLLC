import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ContactInquiriesClient from "@/components/admin/ContactInquiriesClient";

export default async function AdminContactInquiriesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return <ContactInquiriesClient />;
}
