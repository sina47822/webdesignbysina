// lib/blog-fs.ts  ← جایگزین کن
export type PostCardMeta = {
  [x: string]: any;
  slug: string;
  title: string;
  description: string;
  cover?: string | null;
  tags?: string[];
  date: string;   // تاریخ انتشار
  mtime: string;  // آخرین ویرایش/modified
};

const REVALIDATE_SEC = 60;

function getBaseUrl() {
  // تولید: از دامنه‌ت استفاده کن (env)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Vercel بدون پروتکل
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // لوکال
  return "http://localhost:3000";
}

export async function getAllPostsMeta(): Promise<PostCardMeta[]> {
  const base = getBaseUrl();

  // 1) لیست اسلاگ‌ها (و درفت‌ها) از API
  const listRes = await fetch(`${base}/api/content/blog`, {
    next: { revalidate: REVALIDATE_SEC },
  });
  if (!listRes.ok) return [];
  const list: { slug: string; draft?: boolean }[] = await listRes.json();

  const slugs = list.filter(i => !i.draft).map(i => i.slug);

  // 2) برای هر اسلاگ، جزئیات را از /api/content/blog/[slug] بگیر
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const r = await fetch(`${base}/api/content/blog/${slug}`, {
        next: { revalidate: REVALIDATE_SEC },
      });
      if (!r.ok) return null;
      const data = await r.json();
      // در پاسخ‌های ما، JSON جدید => { meta, sections, format: "json" }
      // MDX/HTML قدیمی => { meta, format, content }
      const m = data.meta ?? data;

      const item: PostCardMeta = {
        slug: m.slug ?? slug,
        title: m.title ?? slug,
        description: m.description ?? "",
        cover: m.cover ?? null,
        tags: m.tags ?? [],
        date: m.date ?? new Date().toISOString(),
        mtime: m.lastModified ?? m.date ?? new Date().toISOString(),
      };
      return item;
    })
  );

  return posts.filter(Boolean) as PostCardMeta[];
}
