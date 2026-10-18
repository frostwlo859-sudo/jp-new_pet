import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { GoogleTag } from "@/components/google-tag";
import { SiteChrome } from "@/components/site-chrome";
import { site } from "@/lib/nav";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Working Breed Kennel`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="site-shell min-h-full">
        <GoogleTag />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
