"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./ScrollStackItem"; // ← دقت کن مسیر همانی باشد

const mock = [
  { id: 1, text: "طراحی سایت شرکت ابرنواختر", link: "https://abarnoakhtar.ir/new", image: "/assets/images/works/002 - AbarnoAkhtar - [abarnoakhtar.ir].png" },
  { id: 2, text: "طراحی سایت شخصی هانی ادیب آزاد", link: "https://haniadibazad.ir", image: "/assets/images/works/003 - - - [haniadibazad.ir].png" },
  { id: 3, text: "طراحی سایت شخصی دئودار", link: "https://deodar.ir", image: "/assets/images/works/004 - وبسایت ریسپانسیو دئودار - [deodar.ir].png" },
  { id: 4, text: "طراحی سایت شرکت شوکا", link: "https://shooka.deodar.ir", image: "/assets/images/works/005 - Shooka — Company Portfolio Website - [shooka.deodar.ir].png" },
  { id: 5, text: "طراحی سایت شرکت Asora wise trading", link: "https://firexnull.deodar.ir", image: "/assets/images/works/006 - FireXNull - [firexnull.deodar.ir].png" },
  { id: 6, text: "طراحی سایت فروشگاه پی خاک سنگ", link: "/portfolio/#", image: "/assets/images/works/4.jpg" },
  { id: 7, text: "طراحی سایت رزرو آنلاین الوله", link: "/portfolio/#", image: "/assets/images/works/5.jpg" },
  { id: 8, text: "طراحی سایت فروشگاه لوازم ورزشی آلپ", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
  { id: 9, text: "طراحی سایت شرکت ایفاکو", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
  { id: 10, text: "طراحی سایت شرکت الکتروایمپورت", link: "/portfolio/#", image: "/assets/images/works/6.jpg" },
  { id: 11, text: "طراحی سایت فروشگاه رادین پدیده ایرانیان", link: "/portfolio/#", image: "/assets/images/works/3.jpg" },
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
          <ScrollStackItem>
            <h2 className="mb-2 text-lg font-bold leading-6 line-clamp-2 text-right">
              {item.text}
            </h2>

            {/* کانتینر تصویر با نسبت ثابت و انیمیشن نرم */}
            <div className="relative w-full aspect-[6/3] rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.text}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="
                  object-cover object-top select-none
                  transform-gpu will-change-transform
                  transition-transform duration-300 ease-out
                  group-hover:scale-[1.1]
                "
                draggable={false}
                priority={item.id === 1}
              />
            </div>

            <p className="mt-2 text-md opacity-70 text-right">پیش‌نمایش پروژه</p>
          </ScrollStackItem>
        </Link>
      ))}
    </ScrollStack>
  );
}
