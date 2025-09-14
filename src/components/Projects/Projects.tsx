"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktopRef = useRef<boolean | null>(null);

  const data = [
    { id: 1, category: "طراحی سایت شرکتی" ,title: "سایت ابرنواختر", link: "https://abarnoakhtar.ir/new", img: "/assets/images/works/abarnoakhtar.png", year:"2022" },
    { id: 2, category: "طراحی سایت شخصی" ,title: "سایت هانی ادیب آزاد", link: "https://haniadibazad.ir", img: "/assets/images/works/haniadibazad.png", year:"2022" },
    { id: 3, category: "طراحی سایت شخصی" ,title: "سایت دئودار", link: "https://deodar.ir", img: "/assets/images/works/deodar.png", year:"2022" },
    { id: 4, category: "طراحی سایت شرکتی" ,title: "سایت شوکا", link: "https://shooka.deodar.ir", img: "/assets/images/works/shooka-deodar.png", year:"2022" },
    { id: 5, category: "طراحی سایت شرکتی" ,title: "سایت Asora wise trading", link: "https://firexnull.deodar.ir", img: "/assets/images/works/firexnull-deodar.png", year:"2022" },
  ];

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const setup = () => {
      const isDesktop = window.innerWidth > 991;
      const wasDesktop = isDesktopRef.current;
      isDesktopRef.current = isDesktop;

      // پاکسازی قبل از ساخت دوباره
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(track);
      gsap.set(track, { clearProps: "x" });

      // if (!isDesktop) return; // موبایل/تبلت: بدون افکت افقی

      // تشخیص RTL از استایل واقعی کانتینر
      const isRTL = getComputedStyle(el).direction === "rtl";

      // مسافت کل حرکت = عرض محتوای افقی - عرض ویوپورت
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        // در RTL به سمت راست (+x) می‌رویم، در LTR به چپ (−x)
        x: isRTL ? distance : -distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          end: () => "+=" + distance,
        },
      });
    };

    setup();

    const handleResize = () => {
      setup();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className=" py-10 bg-gray-200/20">
              <h2 className="text-4xl justify-self-center font-yekan font-bold">نمونه پروژه ها</h2>
      </div>
    <section
      ref={containerRef}
      dir="rtl" // اگر کل سایت RTL است می‌توانی این خط را حذف کنی
      className="works thecontainer relative h-screen overflow-hidden bg-neutral-950 text-white"
    >

      <div ref={trackRef} className="track flex h-full">
        {data.map((item) => (
          <div key={item.id} className="panel relative h-screen w-screen shrink-0">
            <div className="item relative h-full w-full">
              <div className="img absolute inset-0">
                <img src={item.img} alt="" className="h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="cont absolute bg-white/40 dark:bg-gray-700/40 rounded-full mx-auto bottom-20 right-30 left-30 z-10 flex items-center gap-4 p-6">
                <div className="text-right px-10">
                  <span className="block text-sm tracking-widest text-white/80">
                    {item.category}
                  </span>
                  <h5 className="mt-1 text-2xl font-semibold">{item.title}</h5>
                </div>
                <div className="mr-auto">
                  <h6 className="text-lg text-white/80 px-10">{item.year}</h6>
                </div>
              </div>

              <a href={item.link} className="link-overlay absolute inset-0 z-20" aria-label={`${item.title} – open`} />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .track { will-change: transform; }
      `}</style>
    </section>
    </>
  );
}
