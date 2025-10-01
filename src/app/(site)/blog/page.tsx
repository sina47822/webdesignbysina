// src/app/(site)/blog/page.tsx
import type { Metadata } from "next";
import BgGradient from "@/components/Gradient/BgGradient/gray";
import BlogList from "./BlogList";
export const runtime = "nodejs";
export const revalidate = 60;

// Fallback site URL used during build if NEXT_BACKEND_SITE_URL is not set.
// Keep this in sync with your other pages.
const SITE_API_URL = process.env.NEXT_BACKEND_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webdesignwithsina.ir";

export const metadata: Metadata = {
  title: "بلاگ",
  description: "مقالات فنی Next.js، Django و Performance",
  alternates: { canonical: "https://www.webdesignwithsina.ir/blog" },
  openGraph: {
    type: "website",
    url: "https://www.webdesignwithsina.ir/blog",
    title: "بلاگ — WebDesignWithSina",
    description: "مقالات فنی Next.js، Django و Performance",
  },
  twitter: { card: "summary_large_image" },
};

type Card = {
  slug: string;
  draft?: boolean;
  title?: string;
  description?: string;
  cover?: string | null;
  tags?: string[];
  date?: string;
};

async function getPosts(): Promise<Card[]> {
  // build URL safely
  const base = SITE_API_URL.replace(/\/+$/, ""); // remove trailing slash
  const url = `${base}/api/posts/`;

  // Short timeout so build doesn't hang if API is unreachable
  const controller = new AbortController();
  const timeoutMs = 7000; // 7s - tweak as needed
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`getPosts: non-ok response ${res.status} when fetching ${url}`);
      return [];
    }

    // ensure we await the JSON
    const data = (await res.json()) as Card[];
    if (!Array.isArray(data)) {
      console.error(`getPosts: expected array from ${url}, got:`, typeof data);
      return [];
    }
    return data;
  } catch (err: any) {
    clearTimeout(timeout);
    // Helpful debug info for build logs (ECONNREFUSED, DNS, timeout, etc.)
    console.error(`getPosts: fetch failed for ${url}:`, err?.message ?? err);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <BgGradient />
      <main className="mx-auto max-w-5xl px-4 py-20">
        <section className="mx-auto max-w-3xl text-center py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            بلاگ WebDesignWithSina
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">
            نکات عملی سئو، پررفورمنس و ادغام Next.js و Django
          </p>
        </section>

        {/* Client component gets posts as prop */}
        <BlogList posts={posts} />
      </main>
    </>
  );
}
