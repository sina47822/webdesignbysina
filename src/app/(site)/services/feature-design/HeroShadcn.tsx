"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils"; // اگر cn ندارید، از Template String استفاده کنید

/**
 * HeroShadcn — نسخه بدون Skeleton
 * Next.js + Tailwind + TypeScript + shadcn/ui (Button, Switch)
 * — سوئیچ تم (روشن/تیره) با افزودن/حذف کلاس `dark` روی <html>
 * — پشتیبانی از رنگ برند از طریق CSS Variable (--brand)
 * — افکت محو برای تصویر/GIF هنگام لود شدن (بدون Skeleton)
 */

interface HeroProps {
  gifUrl?: string; // لینک GIF یا ویدیو کوتاه لوپ
  brandColor?: string; // مثال: "#7c3aed"
  title?: string;
  subtitle?: string;
  description?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export default function HeroShadcn({
  gifUrl,
  brandColor = "#7c3aed",
  title = "طراحی کامپوننت‌های Next.js با Tailwind و TypeScript",
  subtitle = "سریع، مقیاس‌پذیر، تایپ‌سیف.",
  description = "از دکمه تا داشبورد؛ تم روشن/تیره، سفارشی‌سازی کامل و تحویل شفاف.",
  primaryHref = "#pricing",
  secondaryHref = "#samples",
}: HeroProps) {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  return (
    <section
      className={cn(
        "relative min-h-[80vh] overflow-hidden transition-colors",
        "bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
      )}
    >
      {/* پس‌زمینه گرادیانی با رنگ برند */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(closest-side, var(--brand), transparent)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--brand-ghost), transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* متن */}
        <div className="order-2 md:order-1">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">حالت تیره</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-gray-700 dark:text-gray-300">
            {subtitle}
          </p>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
            {description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-2xl px-5 py-6 text-base font-semibold"
              style={{ backgroundColor: "var(--brand)", color: "white" }}
            >
              <a href={primaryHref}>مشاهده قیمت‌ها</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl px-5 py-6 text-base font-semibold border-gray-300 dark:border-gray-700 hover:bg-[var(--brand-ghost)]"
            >
              <a href={secondaryHref}>نمونه کارها</a>
            </Button>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            <li>✅ الگوی کامپوننت‌محور</li>
            <li>✅ پشتیبانی و نگهداری</li>
            <li>✅ تمینگ روشن/تیره</li>
            <li>✅ تایپ‌سیف با TypeScript</li>
          </ul>
        </div>

        {/* تصویر / GIF بدون Skeleton */}
        <div className="order-1 md:order-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {gifUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={gifUrl}
                alt="Hero animation"
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-500",
                  imgLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImgLoaded(true)}
              />
            ) : (
              <SVGBackdrop onMount={() => setImgLoaded(true)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// SVG جایگزین وقتی GIF ندارید
function SVGBackdrop({ onMount }: { onMount?: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onMount?.(), 50);
    return () => clearTimeout(t);
  }, [onMount]);

  return (
    <svg
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <rect width="1200" height="600" fill="none" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M0 ${320 + i * 20} C 300 ${260 + i * 15}, 600 ${380 - i * 10}, 900 ${300 + i * 10} S 1200 ${330 + i * 20}, 1200 ${330 + i * 20}`}
          fill="none"
          stroke="currentColor"
          opacity={0.15 + i * 0.15}
          strokeWidth={2}
        />
      ))}
    </svg>
  );
}

/**
 * طرز استفاده در صفحه:
 *
 * import HeroShadcn from "@/components/HeroShadcn";
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <HeroShadcn
 *         gifUrl="https://media.giphy.com/media/26BRBupa9f3bQKdGE/giphy.gif"
 *         brandColor="#0ea5e9" // آبی تیل‌ویندی
 *       />
 *     </>
 *   );
 * }
 *
 * نکات:
 * 1) shadcn/ui را نصب کرده و Button و Switch را بسازید.
 * 2) Tailwind را با darkMode: "class" پیکربندی کنید.
 * 3) اگر util تابع cn ندارید، کلاس‌ها را با Template String ترکیب کنید.
 */
