"use client";
import { useState } from "react";

type HeroProps = {
  gifUrl?: string; // لینک GIF دلخواه
};

export default function FeatureHero({ gifUrl }: HeroProps) {
  const [dark, setDark] = useState(false);

  return (
    <section
      className={"min-h-[80vh] dark:bg-gray-950 dark:text-gray-100 transition-colors min-h-[80vh] bg-white text-gray-900 transition-colors"
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* متن */}
        <div>
          <button
            onClick={() => setDark((v) => !v)}
            className="mb-6 rounded-xl border px-3 py-1.5 text-sm hover:opacity-90"
          >
          </button>

          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            طراحی کامپوننت‌های Next.js با Tailwind و TypeScript
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            از دکمه تا داشبورد: ساخت سریع، مقیاس‌پذیر و قابل‌نگهداری با الگوهای
            حرفه‌ای، تم تیره/روشن و کدنویسی تایپ‌سیف.
          </p>

          <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400">
            سفارشی‌سازی کامل، ریسپانسیو واقعی و مستندسازی شفاف—همه در یک
            پکیج. زمان تحویل کوتاه، کیفیت پایدار.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="rounded-2xl px-5 py-3 font-semibold border border-transparent bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:opacity-90"
            >
              مشاهده قیمت‌ها
            </a>
            <a
              href="#samples"
              className="rounded-2xl px-5 py-3 font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              نمونه کارها
            </a>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
            <li>✅ الگوی کامپوننت‌محور</li>
            <li>✅ پشتیبانی و نگهداری</li>
            <li>✅ تمینگ روشن/تیره</li>
            <li>✅ مستندات و Storybook</li>
          </ul>
        </div>

        {/* تصویر / GIF */}
        <div className="relative">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* اگر GIF ندادی، یک شکل موج SVG مینیمال نمایش می‌دهیم */}
            {gifUrl ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: 'auto' }}
              >
                <source src={gifUrl} type="video/mp4" />
                </video>
            ) : (
              <svg
                viewBox="0 0 1200 600"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="100%" stopColor="currentColor" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="none" />
                {/* موج‌های ساده برای حالت بدون GIF */}
                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={`M0 ${320 + i * 20} C 300 ${260 + i * 15}, 600 ${
                      380 - i * 10
                    }, 900 ${300 + i * 10} S 1200 ${330 + i * 20}, 1200 ${
                      330 + i * 20
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.15 + i * 0.15}
                    strokeWidth={2}
                  />
                ))}
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
