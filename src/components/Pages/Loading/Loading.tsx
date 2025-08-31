"use client";


import { useEffect, useRef } from "react";
import { gsap } from "gsap";


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
        text = "Loading",
        onComplete,
        className = "",
    }: {
    text?: string;
    onComplete?: () => void;
    className?: string;
    }) 
    {
    const wrapRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);


    useEffect(() => {
            const wrap = wrapRef.current;
            const path = pathRef.current;
        if (!wrap || !path) return;


        // Respect reduced‑motion preferences
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";


        if (prefersReduced) {
                // Instantly hide without motion
                gsap.set(wrap, { autoAlpha: 0, display: "none" });
                onComplete?.();
            return;
        }


        // Scope selectors to this component only
        const ctx = gsap.context(() => {
        const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
            onComplete: () => onComplete?.(),
        });


        // Lift and fade letters, then morph the bottom wave, then slide the overlay away
        tl.to(".load-text span", {
            delay: 1.2,
            y: -100,
            opacity: 0,
            stagger: 0.035,
            duration: 1,
            ease: "power3.inOut",
        })
        .to(
            path,
                {
                    duration: 0.5,
                    attr: { d: curve },
                    ease: "power2.in",
                },
            "-=0.2"
        )
        .to(path, {
            duration: 0.5,
            attr: { d: flat },
            ease: "power2.out",
        })
        .to(wrap, {
            y: -1500,
            duration: 0.9,
            ease: "power2.inOut",
        })
        .set(wrap, { zIndex: -1, display: "none" });
    }, wrap);


    return () => ctx.revert();
    }, [onComplete]);


return (
    <div
        ref={wrapRef}
        className={`loader-wrap fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-primary text-secondary ${className}`}
        role="status"
        aria-live="polite"
        aria-label="Loading"
    >
        <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-0 h-[120vh] w-full"
            aria-hidden
        >
            <path
                ref={pathRef}
                id="svg"
                d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
            ></path>
        </svg>


        <div className="loader-wrap-heading relative z-10 select-none">
            <h2 className="load-text text-gray-200 flex gap-1 text-4xl font-bold tracking-widest sm:text-5xl">
                {Array.from(text).map((ch, i) => (
                    <span key={i} className="inline-block">
                    {ch}
                    </span>
                ))}
            </h2>
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