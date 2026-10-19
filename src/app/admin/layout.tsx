import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin-nav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-line bg-ink text-[#e8ece9]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div>
            <p className="display text-xl font-bold tracking-[0.12em]">
              HEELER ADMIN
            </p>
            <p className="text-xs uppercase tracking-[0.14em] text-[#8f9a92]">
              Kennel dashboard
            </p>
          </div>
          <Link
            href="/"
            className="btn btn-ghost-on-dark !min-h-9 !px-3 !text-sm"
          >
            View site
          </Link>
        </div>
      </header>
      <AdminNav />
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">{children}</div>
    </div>
  );
}
