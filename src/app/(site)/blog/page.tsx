// src/app/(site)/blog/page.tsx
import type { Metadata } from "next";
import BgGradient from "@/components/Gradient/BgGradient/gray";
import BlogList from "./BlogList";
import { getAllPostsMeta } from "@/lib/blog-fs";
export const runtime = "nodejs";
export const revalidate = 60;

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/content/blog`, {
    next: { revalidate },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta(); // ← دیگه fetch لازم نیست
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
