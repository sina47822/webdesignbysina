"use client";

import Link from "next/link";
import Image from "next/image";

function formatFa(d?: string) {
  return d
    ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(
        new Date(d)
      )
    : "";
}

type Card = {
  slug: string;
  draft?: boolean;
  title?: string;
  description?: string;
  cover?: string | null;
  tags?: string[];
  date?: string;
};

export default function BlogList({ posts }: { posts: Card[] }) {
  const visible = posts.filter((p) => !p.draft);

  if (visible.length === 0) {
    return <p>هنوز پستی منتشر نشده است.</p>;
  }

  return (
    <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/blog/${p.slug}`}
            className="group block overflow-hidden rounded-2xl bg-white/70 dark:bg-zinc-900/50 backdrop-blur border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm hover:shadow-lg ring-1 ring-transparent hover:ring-black/5 dark:hover:ring-white/10 transition-all duration-300"
          >
            <div className="relative aspect-[1200/630]">
              <Image
                src={p.cover ?? `/og/blog/${p.slug}`}
                alt={p.title ?? p.slug}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
            <div className="p-5">
              {p.date && (
                <time className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatFa(p.date)}
                </time>
              )}
              <h2 className="mt-2 line-clamp-2 text-lg font-bold tracking-tight">
                {p.title ?? p.slug}
              </h2>
              {p.description && (
                <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
                  {p.description}
                </p>
              )}
              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-200 dark:border-zinc-800 px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-200 bg-zinc-50/60 dark:bg-zinc-950/40"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
