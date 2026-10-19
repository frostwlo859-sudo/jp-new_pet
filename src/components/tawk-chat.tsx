"use client";

import Script from "next/script";

const TAWK_PROPERTY_ID = "6ad63c069e3fcb34c83e8848";
const TAWK_WIDGET_ID = "1k5adkuo9";

export function TawkChat() {
  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      src={`https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
      crossOrigin="*"
    />
  );
}
