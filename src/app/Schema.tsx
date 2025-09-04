// app/Schema.tsx
"use client";
import Script from "next/script";

export default function Schema() {
  const SITE_URL = "https://www.webdesignWithsina.ir";

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebDesignWithSina",
    url: SITE_URL,
    logo: `${SITE_URL}/icons/android-chrome-512x512.png`,
    sameAs: [
      "https://www.linkedin.com/company/webdesignWithsina",
      "https://twitter.com/WebDesignWithSina",
      "https://github.com/sina47822/webdesignbysina",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "sina47822@gmail.com",
        telephone: "+98-9192001923",
        areaServed: "IR",
        availableLanguage: ["fa", "en"],
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebDesignWithSina",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
      // صفحه‌های مهم دیگه‌ات را اضافه کن
    ],
  };

  return (
    <>
      <Script id="ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <Script id="ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <Script id="ld-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}