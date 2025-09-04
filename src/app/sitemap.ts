// app/sitemap.ts
import type { MetadataRoute } from "next";

// اگر روت‌های داینامیک داری، از دیتابیس/API بخون
async function getDynamicRoutes() {
  // نمونه‌ی فرضی
  return [
    { url: "/services/SEO", lastModified: "2025-08-01" },
    { url: "/services/supports", lastModified: "2025-08-01" },
    { url: "/services/aparat-dl", lastModified: "2025-08-01" },
    { url: "/services/ip-checker", lastModified: "2025-08-01" },
    { url: "/services/webbuilder", lastModified: "2025-08-01" },
    { url: "/services/feature-design", lastModified: "2025-08-01" },

    { url: "/blog/nextjs-seo-checklist", lastModified: "2025-07-15" },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = "https://www.webdesignwithsina.ir";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const dynamic = (await getDynamicRoutes()).map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: r.lastModified ? new Date(r.lastModified) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamic];
}