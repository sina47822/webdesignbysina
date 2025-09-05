// app/sitemap.ts
import { getAllPostsMeta } from "@/lib/blog-fs";
import type { MetadataRoute } from "next";

// اگر روت‌های داینامیک داری، از دیتابیس/API بخون

// شبیه‌سازی دیتای real برای blog (می‌تونی از DB/CMS/فایل هم بگیری)
// async function getBlogPosts() {
//   // فقط نمونه — این را از دیتابیس/فایل‌ها واقعاً بخوان
//   return [
//     { slug: "nextjs-seo-checklist", lastModified: "2025-07-15" },
//     { slug: "django-nextjs-integration", lastModified: "2025-08-03" },
//     { slug: "core-web-vitals-2025", lastModified: "2025-08-20" },
//   ];
// }

// سرویس‌ها — بهتره اسلاگ‌ها lowercase و kebab-case باشن
async function getServiceRoutes() {
  return [
    { url: "/services/seo", lastModified: "2025-08-01" },
    { url: "/services/supports", lastModified: "2025-08-01" },
    { url: "/services/aparat-dl", lastModified: "2025-08-01" },
    { url: "/services/ip-checker", lastModified: "2025-08-01" },
    { url: "/services/webbuilder", lastModified: "2025-08-01" },
    { url: "/services/feature-design", lastModified: "2025-08-01" },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = "https://www.webdesignwithsina.ir";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/portfolios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  // داینامیک سرویس‌ها
  const services = (await getServiceRoutes()).map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: r.lastModified ? new Date(r.lastModified) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

    // داینامیک بلاگ از فایل‌سیستم
  // const posts = await getAllPostsMeta();
  // const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
  //   url: `${SITE_URL}/blog/${p.slug}`,
  //   lastModified: p.lastModified, // ← تاریخ واقعی از fs.stat
  //   changeFrequency: "weekly",
  //   priority: 0.7,
  // }));

    // داینامیک بلاگ‌ها
  // const postsData = await getBlogPosts();
  // const posts = postsData.map((p) => ({
  //   url: `${SITE_URL}/blog/${p.slug}`,
  //   lastModified: p.lastModified ? new Date(p.lastModified) : new Date(),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));

  return [...staticRoutes,  ...services];
}