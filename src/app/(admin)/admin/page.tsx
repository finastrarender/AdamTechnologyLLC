import Link from "next/link";
import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import Page from "@/models/Page";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  await connectMongo();
  const pages = await Page.find({}).sort({ slug: 1 }).lean();
  const hasHome = pages.some((page) => page.slug === "home");

  return (
    <div className="admin-shell admin-dashboard">
      <nav className="admin-nav admin-dashboard__nav">
        <strong className="admin-dashboard__brand">Admin</strong>
        <div className="admin-dashboard__nav-links">
          <Link href="/">View site</Link>
          <Link href="/admin/site-global">Site global</Link>
          <Link href="/admin/contact-inquiries">Contact inquiries</Link>
          <LogoutButton />
        </div>
      </nav>
      <div className="admin-card admin-dashboard__card">
        <header className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Content management</h1>
          <p className="admin-muted admin-dashboard__subtitle">
            Signed in as <strong>{session.user.email}</strong>. Edit a page, then publish your
            changes.
          </p>
        </header>

        <section className="admin-dashboard__section">
          <div className="admin-dashboard__section-head">
            <h2>Pages</h2>
            <p className="admin-muted">Choose a page to edit sections and content.</p>
          </div>

          <div className="admin-dashboard__grid">
            {!hasHome ? (
              <Link href="/admin/pages/home" className="admin-dashboard__page-card">
                <span className="admin-dashboard__page-title">Home</span>
                <span className="admin-dashboard__page-meta">/home</span>
                <span className="admin-dashboard__page-link">Edit page</span>
              </Link>
            ) : null}
            {pages.map((page) => (
              <Link
                key={`${page.slug}-card`}
                href={`/admin/pages/${page.slug}`}
                className="admin-dashboard__page-card"
              >
                <span className="admin-dashboard__page-title">{page.title}</span>
                <span className="admin-dashboard__page-meta">/{page.slug}</span>
                <span className="admin-dashboard__page-link">Edit page</span>
              </Link>
            ))}
            {pages.length === 0 ? (
              <p className="admin-muted">No pages found.</p>
            ) : null}
          </div>
        </section>

        <section className="admin-dashboard__section">
          <div className="admin-dashboard__section-head">
            <h2>Contact inquiries</h2>
            <p className="admin-muted">Review and delete submissions from the contact page form.</p>
          </div>
          <Link href="/admin/contact-inquiries" className="admin-dashboard__page-card">
            <span className="admin-dashboard__page-title">Contact inquiries</span>
            <span className="admin-dashboard__page-meta">View submissions</span>
            <span className="admin-dashboard__page-link">Open inbox</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
