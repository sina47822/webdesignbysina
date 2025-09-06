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

async function exists(p: string): Promise<boolean> { try { await fs.stat(p); return true; } catch { return false; } }
async function firstExistingDir(): Promise<string | null> {
  for (const parts of CANDIDATE_DIRS) {
    const dir = path.join(process.cwd(), ...parts);
    if (await exists(dir)) return dir;
  }
  return null;
}

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

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> } // 👈 در روت داینامیک جدید، params یک Promise است
) {
  const dir = await firstExistingDir();
  if (!dir) return NextResponse.json({ message: "No content dir" }, { status: 404 });

  const { slug } = await ctx.params; // 👈 حتماً await کنید

  const jsonPath = path.join(dir, `${slug}.json`);
  const mdxPath  = path.join(dir, `${slug}.mdx`);
  const htmlPath = path.join(dir, `${slug}.html`);
  const metaPath = path.join(dir, `${slug}.meta.json`);

  // 1) JSON
  if (await exists(jsonPath)) {
    const raw = await fs.readFile(jsonPath, "utf8");
    const doc = tryParseJSON<RawDoc>(raw);
    if (!doc) {
      return NextResponse.json({ message: "Bad JSON" }, { status: 500 });
    }
    const meta = (doc.meta ?? {}) as RawMeta;
    const sections = Array.isArray(doc.sections) ? doc.sections : [];
    if (meta?.draft) return NextResponse.json({ message: "Draft" }, { status: 403 });

    // اطمینان از وجود slug
    if (!meta.slug) meta.slug = slug;

    return NextResponse.json({ meta, sections, format: "json" });
  }

  // 2) MDX
  if (await exists(mdxPath)) {
    const raw = await fs.readFile(mdxPath, "utf8");
    const { data, content } = matter(raw);
    const d = data as Record<string, unknown>;

    const meta: RawMeta = {
      title: typeof d.title === "string" ? (d.title as string) : slug,
      description: typeof d.description === "string" ? (d.description as string) : "",
      slug,
      date: typeof d.date === "string" ? (d.date as string) : new Date().toISOString(),
      lastModified: typeof d.lastModified === "string"
        ? (d.lastModified as string)
        : (typeof d.date === "string" ? (d.date as string) : new Date().toISOString()),
      cover: (typeof d.cover === "string" || d.cover === null) ? (d.cover as string | null) : null,
      tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
      draft: Boolean(d.draft),
      canonical: typeof d.canonical === "string" ? (d.canonical as string) : null,
    };
    if (meta.draft) return NextResponse.json({ message: "Draft" }, { status: 403 });

    return NextResponse.json({ meta, format: "mdx", content });
  }

  // 3) HTML (+ meta.json اختیاری)
  if (await exists(htmlPath)) {
    const html = await fs.readFile(htmlPath, "utf8");
    let meta: RawMeta = {};
    if (await exists(metaPath)) {
      const metaRaw = await fs.readFile(metaPath, "utf8");
      meta = tryParseJSON<RawMeta>(metaRaw) ?? {};
    }
    const m: Required<Pick<RawMeta, "title" | "description" | "slug" | "date" | "lastModified" | "cover" | "tags" | "draft" | "canonical">> = {
      title: meta.title ?? slug,
      description: meta.description ?? "",
      slug,
      date: meta.date ?? new Date().toISOString(),
      lastModified: meta.lastModified ?? meta.date ?? new Date().toISOString(),
      cover: meta.cover ?? null,
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      draft: Boolean(meta.draft),
      canonical: meta.canonical ?? null,
    };
    if (m.draft) return NextResponse.json({ message: "Draft" }, { status: 403 });
    return NextResponse.json({ meta: m, format: "html", content: html });
  }

  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}
