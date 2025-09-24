"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./ScrollStackItem"; // ← دقت کن مسیر همانی باشد

const mock = [
  { id: 1, text: "طراحی سایت شرکتی" ,title: "سایت ابرنواختر", link: "https://abarnoakhtar.ir/new", image: "/assets/images/works/abarnoakhtar.png" },
  { id: 2, text: "طراحی سایت شخصی" ,title: "سایت هانی ادیب آزاد", link: "https://haniadibazad.ir", image: "/assets/images/works/haniadibazad.png" },
  { id: 3, text: "طراحی سایت شخصی" ,title: "سایت دئودار", link: "https://deodar.ir", image: "/assets/images/works/deodar.png" },
  { id: 4, text: "طراحی سایت شرکتی" ,title: "سایت شوکا", link: "https://shooka.deodar.ir", image: "/assets/images/works/shooka-deodar.png" },
  { id: 5, text: "طراحی سایت شرکتی" ,title: "سایت Asora wise trading", link: "https://firexnull.deodar.ir", image: "/assets/images/works/firexnull-deodar.png" },
  { id: 6, text: "طراحی سایت فروشگاهی" ,title: "طراحی سایت شرکت الکتروایمپورت ", link: "https://shop.deodar.ir", image: "/assets/images/works/shop-deodar.png" },
  { id: 7, text: "طراحی سایت فروشگاهی" ,title: "طراحی سایت فروشگاه پی خاک سنگ", link: "/portfolio/#", image: "/assets/images/works/peykhaksang.png" },
  { id: 8, text: "طراحی سایت فروشگاهی" ,title: "طراحی سایت فروشگاه لوازم ورزشی آلپ", link: "/portfolio/#", image: "/assets/images/works/biakooh.png" },
  { id: 9, text: "طراحی سایت شرکتی" ,title: "طراحی سایت شرکت ایفاکو", link: "/portfolio/#", image: "/assets/images/works/iphaco.png" },
  { id: 10, text: "طراحی سایت" ,title: "طراحی سایت رزرو آنلاین الوله", link: "/portfolio/#", image: "/assets/images/works/elole.png" },
  { id: 11, text: "طراحی سایت" ,title: "طراحی سایت فروشگاه رادین پدیده ایرانیان", link: "/portfolio/#", image: "/assets/images/works/radinpadideiranian.png" },
  { id: 12, text: "طراحی سایت" ,title: "طراحی سایت شرکت سافت میکر", link: "/portfolio/#", image: "/assets/images/works/2.jpg" },
  { id: 13, text: "طراحی سایت" ,title: "طراحی سایت فروشگاه دیدگاه آرت گالری", link: "/portfolio/#", image: "/assets/images/works/4.jpg" },
  { id: 14, text: "طراحی سایت" ,title: "طراحی سایت شرکتی هورآسمان ", link: "/portfolio/#", image: "/assets/images/works/5.jpg" },
  { id: 15, text: "طراحی سایت" ,title: "طراحی سایت شرکتی پوتیران", link: "/portfolio/#", image: "/assets/images/works/1.jpg" },
  { id: 16, text: "طراحی سایت" ,title: "طراحی سایت خبری کمپیا", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
];

export default function ScrollStacks() {
  return (
    <ScrollStack
      useWindowScroll
      smooth={true}       // ← اسموس اسکرول
      baseScale={0.82}    // کارت‌ها کوچیک‌تر
      itemScale={0.015}   // اختلاف اسکیل کم و ملایم
      className="px-2"
    >
      {mock.map((item) => (
        <Link href={item.link} key={item.id} className="block group">
          <ScrollStackItem >
            {/* کانتینر تصویر با نسبت ثابت و انیمیشن نرم */}
            <div className="relative w-full aspect-[18/9] rounded-4xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="
                  object-cover object-top select-none
                  transform-gpu will-change-transform
                  transition-transform duration-500 ease-out
                  group-hover:scale-[1]
                  hover-pan
                "
                draggable={false}
                priority={item.id === 1}
              />
            </div>

            {/* گرادینت عمودی شفاف تا مشکی */}
            <div
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-b from-transparent via-black/20 to-black/80
              "
              aria-hidden="true"
            />
            {/* متن روی تصویر (پایین) */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 right-6 bottom-5">
              <h3 className="text-white text-lg sm:text-2xl font-semibold leading-6 line-clamp-2">
                {item.title}
              </h3>
              <p className="mt-1 text-white/80 text-sm line-clamp-2">
                {item.text}
              </p>
            </div>
          </ScrollStackItem>
        </Link>
      ))}
    </ScrollStack>
  );
}
