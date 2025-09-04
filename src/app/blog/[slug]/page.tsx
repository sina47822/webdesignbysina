// app/(site)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

type Post = {
  title: string;
  description: string;
  slug: string;
  cover: string; // "/og/post-1.jpg"
  date: string;
};

async function getPost(slug: string): Promise<Post | null> {
  // دیتا را از CMS/DB بگیر
  return {
    title: "Next.js SEO Checklist (2025)",
    description: "A practical checklist to ship SEO-friendly Next.js apps.",
    slug,
    cover: "/og/post-1.jpg",
    date: "2025-08-15",
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const SITE_URL = "https://www.webdesignbysina.com";
  const post = await getPost(params.slug);
  if (!post) return { title: "Not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.cover] },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return null;

  const SITE_URL = "https://www.webdesignwithsina.ir";
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: [`${SITE_URL}${post.cover}`],
    author: { "@type": "Organization", name: "WebDesignwithSina" },
    publisher: { "@type": "Organization", name: "WebDesignwithSina", logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/android-chrome-512x512.png` } },
  };

  return (
    <>
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {/* محتوا */}
      <article className="prose prose-invert mx-auto">{post.title}</article>
    </>
  );
}
