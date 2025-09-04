"use client";


import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";


/**
* Next.js (App Router) full‑screen loader, inspired by the provided Vue/GSAP example.
*
* Usage:
* 1) npm i gsap
* 2) Drop this file at: app/components/Loader.tsx (or components/Loader.tsx)
* 3) Render <Loader /> once, preferably in app/layout.tsx so it runs on first paint.
* 4) Optional props: text (string), onComplete (callback), className (string).
*/
export default function Loader({
        // text = "Loading",
        onComplete,
        className = "",
    }: {
        // text?: string;
        onComplete?: () => void;
        className?: string;
    }) 
    {
    const wrapRef = useRef<HTMLDivElement>(null);
    // const pathRef = useRef<SVGPathElement>(null);
    const imgWrapRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//             const wrap = wrapRef.current;
//             // const path = pathRef.current;
//             const imgWrap = imgWrapRef.current;
//         if (!wrap || !imgWrap) return;


//         // Respect reduced‑motion preferences
//         const prefersReduced = window.matchMedia(
//             "(prefers-reduced-motion: reduce)"
//         ).matches;


//         const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
//         const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";


//         if (prefersReduced) {
//                 // Instantly hide without motion
//                 gsap.set(wrap, { autoAlpha: 0, display: "none" });
//                 onComplete?.();
//             return;
//         }

//         // آماده‌سازی اولیه‌ی رَپِر تصویر برای reveal از راست -> چپ
//         gsap.set(imgWrap, {
//         clipPath: "inset(0 0 0 100%)",
//         willChange: "clip-path",
//         });

//         // Scope selectors to this component only
//         const ctx = gsap.context(() => {
//             const tl = gsap.timeline({
//                 defaults: { ease: "power2.out" },
//                 onComplete: () => onComplete?.(),
//         });

//         // 1) ابتدا تصویر را از راست به چپ نمایش بده
//         // tl.to(imgWrap, {
//         //     clipPath: "inset(0 0 0 0%)",
//         //     duration: 2,
//         //     ease: "power3.inOut",
//         // })

//         // 2) سپس حروف را بالا بکش و محو کن 
//         // tl.to(".load-text span", {
//         //     delay: 1.2,
//         //     y: -100,
//         //     opacity: 0,
//         //     stagger: 0.035,
//         //     duration: 1,
//         //     ease: "power3.inOut",
//         // })

//         // 3) موج پایینی
//         // .to(
//         //     path,
//         //     {
//         //         duration: 0.5,
//         //         attr: { d: curve },
//         //         ease: "power2.in",
//         //     },
//         //     "-=0.2"
//         // )
//         // .to(path, {
//         //     duration: 0.5,
//         //     attr: { d: flat },
//         //     ease: "power2.out",
//         // })

//         // 4) خروج اوورلی
//     //     .to(wrap, {
//     //         y: -1500,
//     //         duration: 0.9,
//     //         ease: "power2.inOut",
//     //     })
//     //     .set(wrap, { zIndex: -1, display: "none" });
//     }, wrap);


//     return () => ctx.revert();
// }, [onComplete]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const imgWrap = imgWrapRef.current;
    if (!wrap || !imgWrap) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(wrap, { autoAlpha: 0, display: "none" });
      onComplete?.();
      return;
    }
        // شروع: تصویر از راست مخفی است
    gsap.set(imgWrap, {
      clipPath: "inset(0 100% 0 0)",
      willChange: "clip-path",
    });
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => onComplete?.(),
    });

    tl.to(imgWrap, {
      clipPath: "inset(0 0% 0 0%)",
      duration: 2,
      ease: "power3.inOut",
    })
      .to(wrap, {
        y: -1500,
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.1,
    })
    .set(wrap, { zIndex: -1, display: "none" });
  }, [onComplete]);
return (
    <div
        ref={wrapRef}
        className={`loader-wrap fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-primary text-secondary ${className}`}
        role="status"
        aria-live="polite"
        aria-label="Loading"
    >
        <div className="loader-wrap-heading relative z-10 select-none">

            {/* 👇 تصویر را در یک رَپر با ref قرار می‌دهیم تا clip-path روی آن اعمال شود */}
            <div
                ref={imgWrapRef}
                className="relative w-[260px] h-[120px] sm:w-[400px] sm:h-[180px] overflow-hidden"
            >
            <Image
                src={"/assets/images/handwritinglogo.png"}
                alt=""
                fill
                sizes="(max-width: 640px) 260px, 400px"
                priority
                style={{ objectFit: "contain" }}
            />
            </div>
        </div>


        {/* Component‑scoped styles */}
        <style jsx>{`
            .loader-wrap svg path {
            /* Match the overlay background so the wave looks seamless */
            fill: #000000ff;
            }
            `}
        </style>
    </div>
);
}