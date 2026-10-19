"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/dogs", label: "Dogs" },
  { href: "/admin/adoptions", label: "Adoptions" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin/login")) {
    return null;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <nav className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
        <ul className="flex flex-wrap gap-1">
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex min-h-9 items-center px-3 text-sm font-semibold uppercase tracking-[0.1em] ${
                    active
                      ? "bg-ink text-[#e8ece9]"
                      : "text-ink-soft hover:bg-canvas hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="btn btn-ghost !min-h-9 !px-3 !text-sm"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
