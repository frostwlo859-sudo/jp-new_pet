"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "@/components/brand-lockup";
import { navItems } from "@/lib/nav";

const primary = navItems.slice(0, 5);
const secondary = navItems.slice(5);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-5 md:h-16 md:gap-6 md:px-8">
        <BrandLockup onNavigate={() => setOpen(false)} />

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/available"
            className="btn btn-primary !min-h-9 !px-3 !text-sm"
          >
            Adopt a Heeler
          </Link>
          <button
            type="button"
            className="nav-link"
            aria-expanded={open}
            aria-controls="more-nav"
            onClick={() => setOpen((v) => !v)}
          >
            More
          </button>
        </nav>

        <button
          type="button"
          className="btn btn-ghost ml-auto !min-h-9 !px-3 lg:hidden"
          aria-expanded={open}
          aria-controls="more-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="more-nav"
          className="border-t border-line/70 bg-canvas px-5 py-4 md:px-8"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            <div className="flex flex-col gap-3 lg:hidden">
              {primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link py-1"
                  data-active={isActive(item.href)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {secondary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link py-1"
                data-active={isActive(item.href)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
