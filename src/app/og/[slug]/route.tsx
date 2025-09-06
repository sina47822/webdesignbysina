// app/og/blog/[slug]/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const MAP: Record<string, { title: string; subtitle: string }> = {
  "nextjs-seo-checklist": {
    title: "چک‌لیست سئوی Next.js (۲۰۲۵)",
    subtitle: "Metadata • OG • Canonical • Robots • Schema",
  },
  "django-nextjs-integration": {
    title: "ادغام Django × Next.js",
    subtitle: "JWT/Session • SSR • Revalidate • CORS",
  },
  "core-web-vitals-2025": {
    title: "Core Web Vitals ۲۰۲۵",
    subtitle: "LCP • INP • CLS — راهکارهای عملی",
  },
};

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = MAP[slug] ?? { title: slug, subtitle: "WebDesignBySina" };

  const dana = await fetch(new URL("/fonts/dana-regular.woff", import.meta.url)).then(r => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0e",
          color: "#fff",
          padding: "60px",
          fontFamily: "Dana",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{data.title}</div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>{data.subtitle}</div>
          <div style={{ marginTop: 12, fontSize: 24, opacity: 0.8 }}>WebDesignBySina • webdesignwithsina.ir</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Dana", data: dana, style: "normal", weight: 400 }] }
  );
}