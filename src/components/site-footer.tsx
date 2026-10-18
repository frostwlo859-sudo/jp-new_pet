import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { navItems } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-[#e8ece9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div>
          <BrandLockup href="/" tone="dark" size="md" />
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#b7c0b9]">
            Blue Heelers only — loyal, driven Australian Cattle Dogs looking for
            serious homes that can keep up.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.08em] text-[#c5cec7] transition-colors duration-150 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-sm text-[#8f9a92] md:flex-row md:items-center md:justify-between md:px-8">
          <p>Blue Heeler for Adoption — not a general pet shop.</p>
          <p>© {new Date().getFullYear()} Blue Heeler for Adoption</p>
        </div>
      </div>
    </footer>
  );
}
