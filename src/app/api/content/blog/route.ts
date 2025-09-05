// src/app/api/content/blog/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const CANDIDATE_DIRS = [
  ["root",   "content", "blog"],
  ["src",    "content", "blog"],
  ["public", "content", "blog"],
  ["app",    "content", "blog"],
];

async function exists(p: string) { try { await fs.stat(p); return true; } catch { return false; } }
async function firstExistingDir(): Promise<{ dir: string, label: string } | null> {
  for (const parts of CANDIDATE_DIRS) {
    const dir = path.join(process.cwd(), ...parts);
    if (await exists(dir)) return { dir, label: parts.join("/") };
  }
  return null;
}
async function safeReaddir(dir: string) { try { return await fs.readdir(dir); } catch { return []; } }
async function safeReadFile(p: string) { try { return await fs.readFile(p, "utf8"); } catch { return null; } }

type Kind = "json" | "mdx" | "html";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  const found = await firstExistingDir();
  if (!found) return NextResponse.json(debug ? { _debug: { dir: null, reason: "no content dir" }, items: [] } : []);

  const CONTENT_DIR = found.dir;
  const files = (await safeReaddir(CONTENT_DIR)).map(String);

  // طبقه‌بندی فایل‌ها
  const jsonSlugs = new Set(
    files
      .filter(n => n.toLowerCase().endsWith(".json") && !n.toLowerCase().endsWith(".meta.json"))
      .map(n => n.slice(0, -".json".length))
  );
  const mdxSlugs  = new Set(files.filter(n => n.toLowerCase().endsWith(".mdx")).map(n => n.slice(0, -".mdx".length)));
  const htmlSlugs = new Set(files.filter(n => n.toLowerCase().endsWith(".html")).map(n => n.slice(0, -".html".length)));

  // انتخاب قطعی برای هر اسلاگ (JSON > MDX > HTML)
  const all = new Set<string>([...jsonSlugs, ...mdxSlugs, ...htmlSlugs]);
  const pick: Record<string, Kind> = {};
  for (const slug of all) {
    if (jsonSlugs.has(slug)) pick[slug] = "json";
    else if (mdxSlugs.has(slug)) pick[slug] = "mdx";
    else pick[slug] = "html";
  }

  const items: Array<{
    slug: string;
    draft?: boolean;
    title?: string;
    description?: string;
    cover?: string | null;
    tags?: string[];
    date?: string;
    __kind__?: Kind;
  }> = [];

  for (const [slug, kind] of Object.entries(pick)) {
    try {
      if (kind === "json") {
        const raw = await safeReadFile(path.join(CONTENT_DIR, `${slug}.json`));
        if (!raw) { items.push({ slug, __kind__: debug ? kind : undefined }); continue; }
        let doc: any;
        try { doc = JSON.parse(raw); } catch { items.push({ slug, __kind__: debug ? kind : undefined }); continue; }
        const m = doc?.meta ?? doc ?? {};
        items.push({
          slug,
          draft: !!m.draft,
          title: m.title ?? slug,
          description: m.description ?? "",
          cover: m.cover ?? null,
          tags: Array.isArray(m.tags) ? m.tags : [],
          date: m.date ?? undefined,
          __kind__: debug ? kind : undefined,
        });
      } else if (kind === "mdx") {
        const raw = await safeReadFile(path.join(CONTENT_DIR, `${slug}.mdx`));
        if (!raw) { items.push({ slug, __kind__: debug ? kind : undefined }); continue; }
        const { data } = matter(raw);
        items.push({
          slug,
          draft: !!data?.draft,
          title: data?.title ?? slug,
          description: data?.description ?? "",
          cover: data?.cover ?? null,
          tags: Array.isArray(data?.tags) ? data.tags : [],
          date: data?.date ?? undefined,
          __kind__: debug ? kind : undefined,
        });
      } else {
        const metaRaw = await safeReadFile(path.join(CONTENT_DIR, `${slug}.meta.json`));
        let meta: any = {};
        try { if (metaRaw) meta = JSON.parse(metaRaw); } catch {}
        items.push({
          slug,
          draft: !!meta?.draft,
          title: meta?.title ?? slug,
          description: meta?.description ?? "",
          cover: meta?.cover ?? null,
          tags: Array.isArray(meta?.tags) ? meta.tags : [],
          date: meta?.date ?? undefined,
          __kind__: debug ? kind : undefined,
        });
      }
    } catch {
      items.push({ slug, __kind__: debug ? kind : undefined });
    }
  }

  // خروجی
  if (debug) {
    return NextResponse.json({
      _debug: {
        dir: found.label,
        absolute: CONTENT_DIR,
        files,
        picked: pick,
      },
      items,
    });
  }
  return NextResponse.json(items);
}
