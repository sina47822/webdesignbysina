"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const mock = [ 
  { id: 1, text: "طراحی سایت شرکت ابرنواختر", link: "https://abarnoakhtar.ir/new", image: "/assets/images/works/002 - AbarnoAkhtar - [abarnoakhtar.ir].png" },
  { id: 2, text: "طراحی سایت شخصی هانی ادیب آزاد", link: "https://haniadibazad.ir", image: "/assets/images/works/003 - - - [haniadibazad.ir].png" },
  { id: 3, text: "طراحی سایت شخصی دئودار", link: "https://deodar.ir", image: "/assets/images/works/004 - وبسایت ریسپانسیو دئودار - [deodar.ir].png" },
  { id: 4, text: "طراحی سایت شرکت شوکا ", link: "https://shooka.deodar.ir", image: "/assets/images/works/005 - Shooka — Company Portfolio Website - [shooka.deodar.ir].png" },
  { id: 5, text: "طراحی سایت شرکت Asora wise trading", link: "https://firexnull.deodar.ir", image: "/assets/images/works/006 - FireXNull - [firexnull.deodar.ir].png" },
  { id: 6, text: "طراحی سایت فروشگاه پی خاک سنگ", link: "/portfolio/#", image: "/assets/images/works/4.jpg" },
  { id: 7, text: "طراحی سایت رزرو آنلاین الوله", link: "/portfolio/#", image: "/assets/images/works/5.jpg" },
  { id: 8, text: "طراحی سایت فروشگاه لوازم ورزشی آلپ", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
  { id: 9, text: "طراحی سایت شرکت ایفاکو", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
  { id: 10, text: "طراحی سایت شرکت الکتروایمپورت", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
  { id: 11, text: "طراحی سایت فروشگاه رادین پدیده ایرانیان", link: "/portfolio/#", image: "/assets/images/works/3.jpg" },

];

type Item = { id: number; text: string; link: string; image: string; heightVH?: number };
const data: Item[] = mock;

const DEFAULT_VH = 300; // اگر برای آیتم heightVH ندهی، از این استفاده می‌شود.

export default function InteractiveLinksPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // کمک‌تابع: مقدار پایان y را درست حساب می‌کند (ارتفاع ظرف - 100vh)
  const yEnd = (vh: number) => `-${Math.max(vh - 100, 0)}vh`;

  return (
    <main className="relative">
      {/* لایه پس‌زمینه ثابت */}
      <div className="fixed inset-0 -z-10">
        {/* پیش‌فرض مشکی */}
        <div className="absolute inset-0 bg-primary-foreground" />

        {/* وقتی هاور داریم، تصویر مربوطه نشون داده میشه */}
        <AnimatePresence mode="wait">
          {hoveredId !== null && (
            <motion.div
              key={`frame-${hoveredId}`}
              className="absolute inset-0"
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.2, ease: "easeInOut" },
              }}
            >
                {(() => {
                  const item = data.find(d => d.id === hoveredId)!;
                  const vh = item.heightVH ?? DEFAULT_VH;
                  return (
                    // فقط ظرف بلند تصویر حرکت می‌کند
                    <motion.div
                      key={`img-${item.id}-${vh}`}
                      className="relative w-full will-change-transform"
                      style={{ height: `${vh}vh` }}              // ← ظرف بلند (مثلاً 300vh)
                      initial={{ y: "0vh" }}                     // ← از بالای خود تصویر شروع کن
                      animate={{ y: yEnd(vh) }}                  // ← تا انتهای قابل‌نمایش (vh-100)
                      transition={{ y: { duration: 6.5, ease: "easeInOut", delay: 1 } }} // ← حرکت آهسته
                    >
                      <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover object-top"
                          priority
                      />
                    </motion.div>
                  );
                })()}
                {/* تون روی تصویر (لایت/دارک) */}
                <div className="absolute inset-0 bg-primary-forground/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* متن‌ها */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="space-y-10 md:space-y-14">
            {data.map((item) => {
              const isActive = hoveredId === item.id;
              const someHovered = hoveredId !== null;
              return (
                <li
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={[
                    "group cursor-pointer select-none transition-opacity duration-300",
                    // حالت عادی
                    !someHovered && "opacity-100",
                    // وقتی هاور داریم
                    someHovered && !isActive && "opacity-20",
                    someHovered && isActive && "opacity-100",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <h2 className="relative text-2xl sm:text-3xl md:text-4xl pr-3 font-yekan font-bold">
                    <span className="opacity-70 text-sm md:text-xl absolute lg:-top-2 lg:-right-2 -top-4 -right-4">
                      {item.id}.
                    </span>
                    <Link href={item.link} >
                      <span className="strokeme">
                        {item.text}
                      </span>
                    </Link>
                  </h2>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
