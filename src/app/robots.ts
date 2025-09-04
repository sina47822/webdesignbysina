// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = "https://www.webdesignwithsina.ir";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/private", "/draft/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}