// src/lib/blog-fs.ts
import "server-only";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export type PostCardMeta = {
  lastModified?: string | null;
  slug: string;
  title: string;
  description: string;
  cover?: string | null;
  tags?: string[];
  date: string;   // تاریخ انتشار
  mtime: string;  // آخرین ویرایش/modified
};

type Kind = "json" | "mdx" | "html";

type RawMeta = Partial<{
  title: string;
  description: string;
  slug: string;
  date: string;
  lastModified: string;
  cover: string | null;
  tags: string[];
  draft: boolean;
  canonical: string | null;
}>;

type RawDoc = { meta?: RawMeta; sections?: unknown[] };

const CANDIDATE_DIRS: string[][] = [
  ["root", "content", "blog"],
  ["src", "content", "blog"],
  ["public", "content", "blog"],
  ["app", "content", "blog"],
];

async function exists(p: string): Promise<boolean> {
  try { await fs.stat(p); return true; } catch { return false; }
}

async function firstExistingDir(): Promise<string | null> {
  for (const parts of CANDIDATE_DIRS) {
    const dir = path.join(process.cwd(), ...parts);
    if (await exists(dir)) return dir;
  }
  return null;
}

async function safeReaddir(dir: string): Promise<string[]> {
  try { return (await fs.readdir(dir)).map(String); } catch { return []; }
}

async function safeReadFile(p: string): Promise<string | null> {
  try { return await fs.readFile(p, "utf8"); } catch { return null; }
}

function tryParseJSON<T>(raw: string): T | null {
  try { return JSON.parse(raw) as T; } catch { return null; }
}

async function fileMtimeISO(p: string): Promise<string | null> {
  try {
    const st = await fs.stat(p);
    return new Date(st.mtime).toISOString();
  } catch {
    return null;
  }
}

/** لیست همه‌ی پست‌ها از فایل‌سیستم (بدون fetch) */
export async function getAllPostsMeta(): Promise<PostCardMeta[]> {
  const CONTENT_DIR = await firstExistingDir();
  if (!CONTENT_DIR) return [];

  const files = await safeReaddir(CONTENT_DIR);

  // کشف اسلاگ‌ها
  const jsonSlugs = new Set(
    files.filter(n => n.toLowerCase().endsWith(".json") && !n.toLowerCase().endsWith(".meta.json"))
         .map(n => n.slice(0, -".json".length))
  );
  const mdxSlugs  = new Set(files.filter(n => n.toLowerCase().endsWith(".mdx"))
                                .map(n => n.slice(0, -".mdx".length)));
  const htmlSlugs = new Set(files.filter(n => n.toLowerCase().endsWith(".html"))
                                 .map(n => n.slice(0, -".html".length)));

  // انتخاب قطعی: JSON > MDX > HTML
  const all = new Set<string>([...jsonSlugs, ...mdxSlugs, ...htmlSlugs]);
  const pick: Record<string, Kind> = {};
  for (const slug of all) {
    if (jsonSlugs.has(slug)) pick[slug] = "json";
    else if (mdxSlugs.has(slug)) pick[slug] = "mdx";
    else pick[slug] = "html";
  }

  const items: PostCardMeta[] = [];

  for (const [slug, kind] of Object.entries(pick)) {
    try {
      if (kind === "json") {
        const p = path.join(CONTENT_DIR, `${slug}.json`);
        const raw = await safeReadFile(p);
        if (!raw) continue;

        const doc = tryParseJSON<RawDoc>(raw);
        const m = (doc?.meta ?? {}) as RawMeta;

        if (m.draft) continue;

        const mtime = (await fileMtimeISO(p)) ?? new Date().toISOString();

        items.push({
          slug,
          title: m.title ?? slug,
          description: m.description ?? "",
          cover: m.cover ?? null,
          tags: Array.isArray(m.tags) ? m.tags : [],
          date: m.date ?? mtime,
          mtime: m.lastModified ?? mtime,
          lastModified: m.lastModified ?? null,
        });
      } else if (kind === "mdx") {
        const p = path.join(CONTENT_DIR, `${slug}.mdx`);
        const raw = await safeReadFile(p);
        if (!raw) continue;

        const { data } = matter(raw);
        const d = data as Record<string, unknown>;

        const draft = Boolean(d?.draft);
        if (draft) continue;

        const mtime = (await fileMtimeISO(p)) ?? new Date().toISOString();

        items.push({
          slug,
          title: typeof d?.title === "string" ? (d.title as string) : slug,
          description: typeof d?.description === "string" ? (d.description as string) : "",
          cover: (typeof d?.cover === "string" || d?.cover === null) ? (d.cover as string | null) : null,
          tags: Array.isArray(d?.tags) ? (d.tags as string[]) : [],
          date: typeof d?.date === "string" ? (d.date as string) : mtime,
          mtime,
          lastModified: typeof d?.lastModified === "string" ? (d.lastModified as string) : null,
        });
      } else {
        // HTML + meta.json
        const pHtml = path.join(CONTENT_DIR, `${slug}.html`);
        const pMeta = path.join(CONTENT_DIR, `${slug}.meta.json`);
        const metaRaw = await safeReadFile(pMeta);
        const meta = (metaRaw ? tryParseJSON<RawMeta>(metaRaw) : {}) ?? {};

        if (meta.draft) continue;

        const baseForMtime = (await exists(pMeta)) ? pMeta : pHtml;
        const mtime = (await fileMtimeISO(baseForMtime)) ?? new Date().toISOString();

        items.push({
          slug,
          title: meta.title ?? slug,
          description: meta.description ?? "",
          cover: meta.cover ?? null,
          tags: Array.isArray(meta.tags) ? meta.tags : [],
          date: meta.date ?? mtime,
          mtime: meta.lastModified ?? mtime,
          lastModified: meta.lastModified ?? null,
        });
      }
    } catch {
      // اگر فایلی خراب بود، ازش رد می‌شیم
      continue;
    }
  }

  // مرتب‌سازی: جدیدترین تاریخ انتشار اول
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return items;
}
