"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TawkChat } from "@/components/tawk-chat";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-full bg-canvas">{children}</div>;
  }

  return (
    <>
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
      <TawkChat />
    </>
  );
}
