"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TocItem = { id: string; title: string; level: 2 | 3 | 4; children: TocItem[] };
type Card = { slug: string; title?: string; description?: string; date?: string; cover?: string | null };

export default function TocAside({ toc, latest }: { toc: TocItem[]; latest: Card[] }) {
  const [active, setActive] = useState<string | null>(null);

  // Observe headings to highlight current section
  useEffect(() => {
    const ids = flatIds(toc);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const tocList = useMemo(
    () => (
      <ul className="space-y-1 text-sm leading-6">
        {toc.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={linkCls(i.id, active)}>{i.title}</a>
            {i.children.length > 0 && (
              <ul className="mt-1 mr-3 space-y-1 border-r pr-3 border-zinc-200 dark:border-zinc-800">
                {i.children.map((c1) => (
                  <li key={c1.id}>
                    <a href={`#${c1.id}`} className={linkCls(c1.id, active)}>{c1.title}</a>
                    {c1.children.length > 0 && (
                      <ul className="mt-1 mr-3 space-y-1 border-r pr-3 border-zinc-200 dark:border-zinc-800">
                        {c1.children.map((c2) => (
                          <li key={c2.id}>
                            <a href={`#${c2.id}`} className={linkCls(c2.id, active)}>{c2.title}</a>
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
    ),
    [toc, active]
  );

  return (
    <aside className="hidden lg:block lg:col-span-3 lg:self-start">
      <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/50 backdrop-blur p-4">
        <div className="text-sm font-semibold mb-2">فهرست مطالب</div>
        {toc.length === 0 ? (
          <p className="text-sm text-zinc-500">بخشی ثبت نشده است.</p>
        ) : (
          tocList
        )}

        {latest.length > 0 && (
          <>
            <div className="mt-6 text-sm font-semibold mb-2">جدیدترین مقالات</div>
            <ul className="space-y-2 text-sm">
              {latest.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    {p.title ?? p.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}

function flatIds(toc: TocItem[]): string[] {
  const out: string[] = [];
  for (const n of toc) {
    out.push(n.id);
    if (n.children?.length) out.push(...flatIds(n.children));
  }
  return out;
}

function linkCls(id: string, active: string | null) {
  const isActive = id === active;
  return `hover:underline ${isActive ? "text-primary font-medium" : ""}`;
}
