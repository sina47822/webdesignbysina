// app/(site)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import Callout from "@/components/mdx/Callout";

export const runtime = "nodejs";
export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webdesignwithsina.ir";

type Section = {
  id?: string;
  title: string;
  level?: 2 | 3 | 4;
  bodyMd?: string;
  bodyHtml?: string;
  image?: { src: string; alt: string; caption?: string };
  code?: { language?: string; content: string; caption?: string; filename?: string };
  callout?: { type?: "info" | "warning" | "success" | "error"; content: string };
};

type BlogDoc = {
  meta: {
    title: string;
    description?: string;
    slug: string;
    date?: string;
    lastModified?: string;
    cover?: string | null;
    tags?: string[];
    draft?: boolean;
    canonical?: string | null;
  };
  sections: Section[];
};

function getOrigin() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (!host) return "http://localhost:3000";
  return `${proto}://${host}`;
}

function BgGradient() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-gradient-to-b from-zinc-100 via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900"
    />
  );
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
    const level = ((s.level ?? 2) as 2 | 3 | 4);
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
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const origin = getOrigin();
  const res = await fetch(`${origin}/api/content/blog/${params.slug}`, { next: { revalidate } });
  if (!res.ok) return { title: "Not found" };
  const doc: BlogDoc = await res.json();
  const m = doc.meta;

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
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const origin = getOrigin();
  const res = await fetch(`${origin}/api/content/blog/${params.slug}`, { next: { revalidate } });
  if (!res.ok) return notFound();

  const doc: BlogDoc = await res.json();
  const m = doc.meta;
  if (m.draft) return notFound();

  const cover = m.cover ?? `/og/blog/${m.slug}`;
  const faDate = m.date ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(m.date)) : "";
  const faMod = m.lastModified ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(m.lastModified)) : "";

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: m.title,
    description: m.description,
    datePublished: m.date,
    dateModified: m.lastModified,
    mainEntityOfPage: m.canonical ?? `${SITE_URL}/blog/${m.slug}`,
    image: [`${SITE_URL}${cover}`],
    author: { "@type": "Organization", name: "WebDesignWithSina" },
    publisher: {
      "@type": "Organization",
      name: "WebDesignWithSina",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/android-chrome-512x512.png` },
    },
  };

  // Compile sections (MD + code) and ensure stable id
  const compiledSections = await Promise.all(
    (doc.sections ?? []).map(async (s, i) => {
      const level = (Math.min(Math.max(s.level ?? 2, 2), 4) as 2 | 3 | 4);
      const id = s.id ?? slugifyFa(s.title) ?? `${i}`;

      const bodyNode = s.bodyMd
        ? (
            await compileMDX({
              source: s.bodyMd,
              components: { Callout },
              options: {
                parseFrontmatter: false,
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
                },
              },
            })
          ).content
        : null;

      const codeNode = s.code
        ? (
            await compileMDX({
              source: `\`\`\`${s.code.language ?? ""}\n${s.code.content}\n\`\`\``,
              options: {
                parseFrontmatter: false,
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
                },
              },
            })
          ).content
        : null;

      return { key: `${id}-${i}`, ...s, id, level, bodyNode, codeNode };
    })
  );

  // Build TOC (based on h2/h3/h4)
  const toc = buildToc(compiledSections.map(s => ({ id: s.id, title: s.title, level: s.level })));

  return (
    <>
      <BgGradient />
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <article className="max-w-7xl  px-4 md:px-6 lg:px-8 py-16 mx-auto ">
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
              {compiledSections.map((s) => (
                <section key={s.key} className="scroll-mt-24">
                  {s.level === 2 && <h2 id={s.id} className="text-2xl font-yekan font-bold text-blue-300 py-4">{s.title}</h2>}
                  {s.level === 3 && <h3 id={s.id} className="text-xl font-yekan font-bold text-blue-500 py-4">{s.title}</h3>}
                  {s.level === 4 && <h4 id={s.id} className="text-lg font-yekan font-bold text-blue-800 py-4">{s.title}</h4>}

                  {/* متن */}
                  {s.bodyNode}
                  {!s.bodyNode && s.bodyHtml && <div dangerouslySetInnerHTML={{ __html: s.bodyHtml }} />}

                  {/* تصویر */}
                  {s.image && (
                    <figure>
                      <Image
                        src={s.image.src}
                        alt={s.image.alt || s.title}
                        width={1200}
                        height={630}
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70"
                      />
                      {s.image.caption && (
                        <figcaption className="text-sm text-zinc-500">{s.image.caption}</figcaption>
                      )}
                    </figure>
                  )}

                  {/* کد — p-4 + rounded-2xl */}
                  {s.code && (
                    <div 
                      dir="ltr"
                      className="
                        not-prose  rounded-2xl p-4
                        bg-zinc-100 dark:bg-gray-400/15
                        border border-zinc-200 dark:border-neutral-800
                        overflow-x-auto
                      "
                      data-theme="github-dark"
                      >
                      {s.code.filename && (
                        <div className="text-xs text-zinc-500 mb-2">{s.code.filename}</div>
                      )}
                      {/* MDX-rendered codeblock */}
                      <div className="[&>pre]:!m-0">{s.codeNode}</div>
                      {s.code.caption && <div className="text-xs text-zinc-500 mt-2">{s.code.caption}</div>}
                    </div>
                  )}

                  {/* Callout */}
                  {s.callout && <Callout type={(s.callout as any)?.type ?? "info"}>{s.callout.content}</Callout>}
                </section>
              ))}
            </div>
          </div>

          {/* Sticky TOC - 3/12 */}
          <aside className="hidden lg:block lg:col-span-3 lg:self-start">
            {/* نکته: sticky روی خود nav اعمال شده تا ۱۰۰٪ عمل کند */}              
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
