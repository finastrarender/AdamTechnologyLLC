import { auth } from "@/auth";
import PageEditClient from "@/components/admin/PageEditClient";
import { connectMongo } from "@/lib/mongoose";
import { formatFullSeoTitle } from "@/lib/metadata/title";
import Page from "@/models/Page";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

function formatPageLabel(slug: string, title?: string | null) {
  const trimmed = title?.trim();
  if (trimmed) return trimmed;
  if (slug === "home") return "Home";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    await connectMongo();
    const page = await Page.findOne({ slug }).lean();
    const pageLabel = formatPageLabel(slug, page?.title);

    return {
      title: { absolute: formatFullSeoTitle(page?.seoTitle ?? undefined, pageLabel) },
    };
  } catch {
    return {
      title: { absolute: formatFullSeoTitle(undefined, formatPageLabel(slug)) },
    };
  }
}

export default async function AdminPageEditorPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  const { slug } = await params;
  return <PageEditClient slug={slug} />;
}
