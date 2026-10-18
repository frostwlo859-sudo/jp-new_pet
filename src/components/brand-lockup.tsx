import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { site } from "@/lib/nav";

type BrandLockupProps = {
  href?: string;
  onNavigate?: () => void;
  /** dark = footer on ink background */
  tone?: "light" | "dark";
  /** sm = header, md = footer */
  size?: "sm" | "md";
};

export function BrandLockup({
  href = "/",
  onNavigate,
  tone = "light",
  size = "sm",
}: BrandLockupProps) {
  const px = size === "md" ? 64 : 48;
  const titleColor = tone === "dark" ? "text-[#e8ece9]" : "text-ink";
  const ring =
    tone === "dark" ? "ring-1 ring-white/25 bg-white" : "ring-1 ring-line bg-paper";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="inline-flex shrink-0 items-center gap-2.5 md:gap-3"
    >
      {/* Fixed box so the mark never collapses */}
      <span
        className={`relative inline-block shrink-0 overflow-hidden rounded-sm ${ring}`}
        style={{ width: px, height: px, minWidth: px, minHeight: px }}
      >
        <Image
          src={images.logoMark.src}
          alt={images.logoMark.alt}
          width={px}
          height={px}
          className="block h-full w-full object-cover"
          style={{ width: px, height: px }}
          priority
          unoptimized
        />
      </span>
      <span className="leading-tight">
        <span
          className={`display block font-bold tracking-[0.1em] ${
            size === "md" ? "text-2xl tracking-[0.14em]" : "text-[1.05rem] md:text-xl"
          } ${titleColor}`}
        >
          {site.name}
        </span>
        <span
          className={`text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate ${
            size === "sm" ? "hidden sm:block" : "block"
          }`}
        >
          For adoption
        </span>
      </span>
    </Link>
  );
}
