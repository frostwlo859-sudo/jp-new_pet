import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  image: { src: string; alt: string };
};

export function PageHero({ eyebrow, title, lead, image }: PageHeroProps) {
  return (
    <section className="relative min-h-[58vh] overflow-hidden bg-ink text-[#f2f5f3]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-scrim)" }}
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9d4cc]">
          {eyebrow}
        </p>
        <h1 className="display mt-3 max-w-4xl text-5xl font-bold uppercase leading-[0.92] tracking-[0.04em] md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#d5ddd7] md:text-xl">
          {lead}
        </p>
      </div>
    </section>
  );
}
