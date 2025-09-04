// app/api/content/blog/[slug]/route.ts
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
async function firstExistingDir() {
  for (const parts of CANDIDATE_DIRS) {
    const dir = path.join(process.cwd(), ...parts);
    if (await exists(dir)) return dir;
  }
  return null;
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const dir = await firstExistingDir();
  if (!dir) return NextResponse.json({ message: "No content dir" }, { status: 404 });

  const { slug } = params;
  const jsonPath = path.join(dir, `${slug}.json`);
  const mdxPath  = path.join(dir, `${slug}.mdx`);
  const htmlPath = path.join(dir, `${slug}.html`);
  const metaPath = path.join(dir, `${slug}.meta.json`);

  // 1) JSON
  if (await exists(jsonPath)) {
    try {
      const raw = await fs.readFile(jsonPath, "utf8");
      const doc = JSON.parse(raw);
      const meta = doc?.meta ?? doc ?? {};
      const sections = doc?.sections ?? [];
      if (meta?.draft) return NextResponse.json({ message: "Draft" }, { status: 403 });
      return NextResponse.json({ meta, sections, format: "json" });
    } catch (e) {
      return NextResponse.json({ message: "Bad JSON", error: String(e) }, { status: 500 });
    }
  }

  // 2) MDX
  if (await exists(mdxPath)) {
    const raw = await fs.readFile(mdxPath, "utf8");
    const { data, content } = matter(raw);
    const meta = {
      title: data?.title ?? slug,
      description: data?.description ?? "",
      slug,
      date: data?.date ?? new Date().toISOString(),
      lastModified: data?.lastModified ?? data?.date ?? new Date().toISOString(),
      cover: data?.cover ?? null,
      tags: Array.isArray(data?.tags) ? data.tags : [],
      draft: !!data?.draft,
      canonical: data?.canonical ?? null,
    };
    if (meta.draft) return NextResponse.json({ message: "Draft" }, { status: 403 });
    return NextResponse.json({ meta, format: "mdx", content });
  }

  // 3) HTML
  if (await exists(htmlPath)) {
    const html = await fs.readFile(htmlPath, "utf8");
    let meta: any = {};
    if (await exists(metaPath)) {
      try { meta = JSON.parse(await fs.readFile(metaPath, "utf8")); } catch {}
    }
    const m = {
      title: meta?.title ?? slug,
      description: meta?.description ?? "",
      slug,
      date: meta?.date ?? new Date().toISOString(),
      lastModified: meta?.lastModified ?? meta?.date ?? new Date().toISOString(),
      cover: meta?.cover ?? null,
      tags: Array.isArray(meta?.tags) ? meta.tags : [],
      draft: !!meta?.draft,
      canonical: meta?.canonical ?? null,
    };
    if (m.draft) return NextResponse.json({ message: "Draft" }, { status: 403 });
    return NextResponse.json({ meta: m, format: "html", content: html });
  }

  return NextResponse.json({ message: "Not Found" }, { status: 404 });
}
