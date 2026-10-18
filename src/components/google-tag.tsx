import Script from "next/script";

/**
 * Google tag (gtag.js) — GA4 measurement ID via NEXT_PUBLIC_GA_MEASUREMENT_ID
 *
 * 1. Create a GA4 property → copy Measurement ID (G-XXXXXXXX)
 * 2. Add to `.env.local`: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
 * 3. Restart `npm run dev`
 *
 * Events: page views fire automatically via gtag('config').
 * Custom events: window.gtag('event', 'generate_lead', { ... })
 */
export function GoogleTag() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
