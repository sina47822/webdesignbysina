// src/app/(site)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import Callout from "@/components/mdx/Callout";
import BgGradient from "@/components/Gradient/BgGradient/gray";
export const runtime = "nodejs";
export const revalidate = 60;
const SITE_URL =
  process.env.NEXT_BACKEND_SITE_URL ?? "https://www.webdesignwithsina.ir";

/* ---------- Types ---------- */
type Section = {
  id?: string;
  title: string;
  level?: number;
  // possible field names we want to support:
  bodyMd?: string;      // your payload uses this
  bodyHtml?: string;
  code_content?: string;
  code?: string;        // or `code`
  image?: { src: string; alt?: string };
  image_src?: string;   // in case API returns flat fields
  image_caption?: string;
  imageCaption?: string;
  callout_content?: string;
  callout?: string;     // or `callout`
  code_caption?: string;
  callout_type?: "info" | "warning" | "tip" | "danger" | undefined;
  [k: string]: any;
};
type BlogDoc = {
  id: number;
  title: string;
  description?: string;
  slug: string;
  date_published?: string;
  last_modified?: string;
  cover?: string | null;
  tags?: string[];
  categories?: string[];
  draft?: boolean;
  canonical?: string | null;
  metadata?: any;
  sections: Section[];
};

/* ---------- Fetch helper ---------- */
async function getPost(slug: string): Promise<BlogDoc | null> {
  const res = await fetch(`${SITE_URL}/api/posts/${slug}/export`, {
    next: { revalidate },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || !data.meta) return null;
  return { ...data.meta, sections: data.sections, id: 0 };
}

/* ---------- TOC helpers ---------- */
function slugifyFa(s: string) {
  return s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
type TocItem = { id: string; title: string; level: 2 | 3 | 4; children: TocItem[] };
function buildToc(sections: Array<{ id?: string; title: string; level?: 2 | 3 | 4 }>): TocItem[] {
  const items: TocItem[] = [];
  const stack: TocItem[] = [];
  for (const s of sections) {
    const level = (s.level ?? 2) as 2 | 3 | 4;
    const id = s.id ?? slugifyFa(s.title);
    const node: TocItem = { id, title: s.title, level, children: [] };
    while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
    if (stack.length === 0) items.push(node);
    else stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  return items;
}

/* ---------- Metadata ---------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPost(slug);
  if (!doc) return { title: "Not found" };
  const m = doc;
  const url = m.canonical ?? `${SITE_URL}/blog/${m.slug}`;
  const title = m.title;
  const desc = m.description ?? "";
  const cover = m.cover ?? `/og/blog/${m.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical: url, languages: { "fa-IR": url } },
    openGraph: {
      type: "article",
      url,
      title,
      description: desc,
      images: [{ url: cover, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [cover] },
  };
}

/* ---------- Page ---------- */
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = await getPost(slug);
  if (!doc) return notFound();
  const m = doc;
  if (m.draft) return notFound();
  const cover = m.cover ?? `/og/blog/${m.slug}`;
  const faDate = m.date_published ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(m.date_published)) : "";
  const faMod = m.last_modified ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(m.last_modified)) : "";
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: m.title,
    description: m.description,
    datePublished: m.date_published,
    dateModified: m.last_modified,
    mainEntityOfPage: m.canonical ?? `${SITE_URL}/blog/${m.slug}`,
    image: [`${SITE_URL}${cover}`],
    author: { "@type": "Organization", name: "WebDesignWithSina" },
    publisher: {
      "@type": "Organization",
      name: "WebDesignWithSina",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/android-chrome-512x512.png` },
    },
  };

  /* ---------- Compile sections (support multiple field names) ---------- */
  const compiledSections = await Promise.all(
    (doc.sections ?? []).map(async (rawSection, i) => {
      const s = rawSection as Section & { body?: string; code?: string; callout?: string; image_src?: string; imageCaption?: string };
      const level = Math.min(Math.max(s.level ?? 2, 2), 4) as 2 | 3 | 4;
      const id = s.id ?? slugifyFa(s.title) ?? `${i}`;

      // body: prefer bodyMd, fallback to body (or bodyHtml handled later)
      const bodySource = s.bodyMd ?? (s as any).body ?? null;
      const bodyNode = bodySource
        ? (
            await compileMDX({
              source: bodySource,
              components: { Callout },
              options: {
                parseFrontmatter: false,
                mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]] },
              },
            })
          ).content
        : null;

      // code: support both `code_content` and `code`
      const codeSource = s.code_content ?? s.code ?? (s as any).codeSnippet ?? null;
      const codeNode = codeSource
        ? (
            await compileMDX({
              source: "```\n" + codeSource + "\n```",
              options: {
                parseFrontmatter: false,
                mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]] },
              },
            })
          ).content
        : null;

      // callout: support callout_content or callout
      const calloutSource = s.callout_content ?? s.callout ?? (s as any).note ?? null;
      const calloutNode = calloutSource
        ? (
            await compileMDX({
              source: calloutSource,
              components: { Callout },
              options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
            })
          ).content
        : null;

      // image: support image object or flat image_src
      const imageObj = s.image ?? (s.image_src ? { src: s.image_src, alt: s.title } : undefined);

      // image caption: support multiple names
      const imageCaptionSource = s.image_caption ?? s.imageCaption ?? (s as any).imageCaption ?? null;
      const imageCaptionNode = imageCaptionSource
        ? (
            await compileMDX({
              source: imageCaptionSource,
              options: { parseFrontmatter: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
            })
          ).content
        : null;

      return {
        key: `${id}-${i}`,
        raw: s,
        id,
        level,
        title: s.title,
        bodyNode,
        bodyHtml: s.bodyHtml ?? null,
        codeNode,
        codeCaption: s.code_caption ?? null,
        calloutNode,
        calloutType: s.callout_type ?? "info",
        image: imageObj,
        imageCaptionNode,
      };
    })
  );

  const toc = buildToc(compiledSections.map(s => ({ id: s.id, title: s.title, level: s.level })));

  return (
    <>
      <BgGradient />
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <article className="max-w-7xl px-4 md:px-6 lg:px-8 py-16 mx-auto">
        {/* Cover + H1 */}
        <div className="relative max-w-4xl mx-auto mt-8 overflow-hidden rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/40 backdrop-blur shadow-sm ring-1 ring-black/0 hover:ring-black/5 dark:hover:ring-white/10 transition">
          <div className="relative aspect-[1200/630]">
            <Image
              src={cover}
              alt={m.title ?? m.slug}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <div className="text-xs text-zinc-200/90">
                {faDate && <span className="px-2">تاریخ انتشار: {faDate}</span>}
                {faMod && <span className="px-2">آخرین ویرایش: {faMod}</span>}
              </div>
              <h1 className="mt-2 text-2xl md:text-3xl font-extrabold text-white">
                {m.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Body + Sticky TOC (grid) */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          {/* Main content — 9/12 */}
          <div className="lg:col-span-9 min-w-0">
            <div
              className="
                prose prose-zinc dark:prose-invert max-w-none
                prose-h1:mb-6 prose-h1:text-2xl
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-pre:rounded-2xl prose-pre:text-zinc-100
                prose-pre:shadow-inner prose-pre:border prose-pre:border-transparent
                prose-code:rounded-md prose-code:bg-zinc-800/80 prose-code:px-2 prose-code:py-0.5
                prose-code:ltr prose-p:leading-8 prose-li:leading-8
              "
            >
              {compiledSections.map((s: any) => (
                <section key={s.key} className="scroll-mt-24">
                  {s.level === 2 && <h2 id={s.id} className="text-2xl font-yekan font-bold text-blue-300 py-4">{s.title}</h2>}
                  {s.level === 3 && <h3 id={s.id} className="text-xl font-yekan font-bold text-blue-500 py-4">{s.title}</h3>}
                  {s.level === 4 && <h4 id={s.id} className="text-lg font-yekan font-bold text-blue-800 py-4">{s.title}</h4>}

                  {/* Body: compiled MDX or raw HTML fallback */}
                  {s.bodyNode}
                  {!s.bodyNode && s.bodyHtml && <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />}

                  {/* Image (supports object or flat field), with compiled caption fallback */}
                  {s.image && s.image.src && (
                    <figure>
                      <Image
                        src={s.image.src}
                        alt={s.image.alt ?? s.title}
                        width={1200}
                        height={630}
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70"
                      />
                      {s.imageCaptionNode ? (
                        <figcaption className="text-sm text-zinc-500">{s.imageCaptionNode}</figcaption>
                      ) : null}
                    </figure>
                  )}

                  {/* Code block (compiled so rehype-pretty-code runs) */}
                  {s.codeNode && (
                    <div
                      dir="ltr"
                      className="
                        not-prose rounded-2xl p-4
                        bg-zinc-100 dark:bg-gray-400/15
                        border border-zinc-200 dark:border-neutral-800
                        overflow-x-auto
                      "
                      data-theme="github-dark"
                    >
                      <div className="[&>pre]:!m-0">{s.codeNode}</div>
                      {s.codeCaption && <div className="text-xs text-zinc-500 mt-2">{s.codeCaption}</div>}
                    </div>
                  )}

                  {/* Callout: prefer compiled MDX node, else plain text via Callout */}
                  {s.calloutNode ? (
                    <Callout type={s.calloutType}>{s.calloutNode}</Callout>
                  ) : s.raw && ((s.raw.callout ?? s.raw.callout_content) ? (
                    <Callout type={s.calloutType}>{s.raw.callout ?? s.raw.callout_content}</Callout>
                  ) : null)}
                </section>
              ))}
            </div>
          </div>

          {/* Sticky TOC - 3/12 */}
          <aside className="hidden lg:block lg:col-span-3 lg:self-start">
            <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/50 backdrop-blur p-4">
              <div className="text-sm font-semibold mb-2">فهرست مطالب</div>
              {toc.length === 0 ? (
                <p className="text-sm text-zinc-500">بخشی ثبت نشده است.</p>
              ) : (
                <ul className="space-y-1 text-sm leading-6">
                  {toc.map((i) => (
                    <li key={i.id}>
                      <a href={`#${i.id}`} className="hover:underline">{i.title}</a>
                      {i.children.length > 0 && (
                        <ul className="mt-1 mr-3 space-y-1 border-r pr-3 border-zinc-200 dark:border-zinc-800">
                          {i.children.map((c1) => (
                            <li key={c1.id}>
                              <a href={`#${c1.id}`} className="hover:underline">{c1.title}</a>
                              {c1.children.length > 0 && (
                                <ul className="mt-1 mr-3 space-y-1 border-r pr-3 border-zinc-200 dark:border-zinc-800">
                                  {c1.children.map((c2) => (
                                    <li key={c2.id}>
                                      <a href={`#${c2.id}`} className="hover:underline">{c2.title}</a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </aside>
        </div>

        {/* Footer CTAs */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/50 backdrop-blur p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold">سوالی داری یا پروژه‌ای در ذهنته؟</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">با ما تماس بگیر تا با هم بهترین مسیر رو بچینیم.</p>
            </div>
            <a
              href="/contact"
              className="rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              تماس
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
