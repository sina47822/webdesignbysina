export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const CANDIDATE_DIRS: string[][] = [
  ["root",   "content", "blog"],
  ["src",    "content", "blog"],
  ["public", "content", "blog"],
  ["app",    "content", "blog"],
];

async function exists(p: string): Promise<boolean> {
  try { await fs.stat(p); return true; } catch { return false; }
}
async function firstExistingDir(): Promise<{ dir: string; label: string } | null> {
  for (const parts of CANDIDATE_DIRS) {
    const dir = path.join(process.cwd(), ...parts);
    if (await exists(dir)) return { dir, label: parts.join("/") };
  }
  return null;
}
async function safeReaddir(dir: string): Promise<string[]> {
  try { return (await fs.readdir(dir)).map(String); } catch { return []; }
}
async function safeReadFile(p: string): Promise<string | null> {
  try { return await fs.readFile(p, "utf8"); } catch { return null; }
}

type Kind = "json" | "mdx" | "html";

type Card = {
  slug: string;
  draft?: boolean;
  title?: string;
  description?: string;
  cover?: string | null;
  tags?: string[];
  date?: string;
  __kind__?: Kind;
};

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

function tryParseJSON<T>(raw: string): T | null {
  try { return JSON.parse(raw) as T; } catch { return null; }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  const found = await firstExistingDir();
  if (!found) {
    return NextResponse.json(
      debug ? { _debug: { dir: null, reason: "no content dir" }, items: [] } : [],
    );
  }

  const CONTENT_DIR = found.dir;
  const files = await safeReaddir(CONTENT_DIR);

  // طبقه‌بندی فایل‌ها
  const jsonSlugs = new Set(
    files
      .filter(n => n.toLowerCase().endsWith(".json") && !n.toLowerCase().endsWith(".meta.json"))
      .map(n => n.slice(0, -".json".length)),
  );
  const mdxSlugs  = new Set(files.filter(n => n.toLowerCase().endsWith(".mdx" )).map(n => n.slice(0, -".mdx".length )));
  const htmlSlugs = new Set(files.filter(n => n.toLowerCase().endsWith(".html")).map(n => n.slice(0, -".html".length)));

  // انتخاب قطعی برای هر اسلاگ (JSON > MDX > HTML)
  const all = new Set<string>([...jsonSlugs, ...mdxSlugs, ...htmlSlugs]);
  const pick: Record<string, Kind> = {};
  for (const slug of all) {
    if (jsonSlugs.has(slug)) pick[slug] = "json";
    else if (mdxSlugs.has(slug)) pick[slug] = "mdx";
    else pick[slug] = "html";
  }

  const items: Card[] = [];

  for (const [slug, kind] of Object.entries(pick)) {
    try {
      if (kind === "json") {
        const raw = await safeReadFile(path.join(CONTENT_DIR, `${slug}.json`));
        if (!raw) { items.push({ slug, __kind__: debug ? kind : undefined }); continue; }

        const doc = tryParseJSON<RawDoc>(raw);
        if (!doc) { items.push({ slug, __kind__: debug ? kind : undefined }); continue; }

        const m = doc.meta ?? {};
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
        const d = data as Record<string, unknown>;

        items.push({
          slug,
          draft: Boolean(d?.draft),
          title: typeof d?.title === "string" ? (d.title as string) : slug,
          description: typeof d?.description === "string" ? (d.description as string) : "",
          cover: (typeof d?.cover === "string" || d?.cover === null) ? (d.cover as string | null) : null,
          tags: Array.isArray(d?.tags) ? (d.tags as string[]) : [],
          date: typeof d?.date === "string" ? (d.date as string) : undefined,
          __kind__: debug ? kind : undefined,
        });
      } else {
        const metaRaw = await safeReadFile(path.join(CONTENT_DIR, `${slug}.meta.json`));
        const meta = metaRaw ? tryParseJSON<RawMeta>(metaRaw) ?? {} : {};
        items.push({
          slug,
          draft: !!meta.draft,
          title: meta.title ?? slug,
          description: meta.description ?? "",
          cover: meta.cover ?? null,
          tags: Array.isArray(meta.tags) ? meta.tags : [],
          date: meta.date ?? undefined,
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
