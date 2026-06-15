import AdminProviders from "@/components/admin/AdminProviders";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin | Adam Technology L.L.C.",
    template: "%s | Admin | Adam Technology L.L.C.",
  },
};

export default async function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return <AdminProviders session={session}>{children}</AdminProviders>;
}
