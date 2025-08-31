"use client";


import { useCallback, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";


/**
* Circular scroll-progress + back-to-top button for Next.js (App Router or Pages).
*
* Usage:
* 1) Drop this file as components/ScrollToTopProgress.tsx
* 2) Render once near the root (e.g., in app/layout.tsx or _app.tsx):
* <ScrollToTopProgress />
* 3) Optional props: size, strokeWidth, threshold, className.
*/
export default function ScrollToTopProgress({
        size = 56,
        strokeWidth = 3,
        threshold = 200,
        className = "",
    }: {
        size?: number;
        strokeWidth?: number;
        threshold?: number; // pixels scrolled before showing the control
        className?: string;
    }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const lengthRef = useRef<number>(0);


    const updateProgress = useCallback(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;


    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;


    const length = lengthRef.current;
    const dashoffset = length - progress * length;
    path.style.strokeDashoffset = `${dashoffset}`;


    if (scrollTop > threshold) {
        wrap.classList.add("active");
        } else {
        wrap.classList.remove("active");
        }
    }, [threshold]);


    const scrollToTop = useCallback(() => {
        try {
        window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
        window.scrollTo(0, 0);
        }
    }, []);

    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;


        // Measure path length and prime dash styles
        const length = path.getTotalLength();
        lengthRef.current = length;
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = `${length}`;


        // Use a tiny transition for smooth progress
        path.style.transition = "stroke-dashoffset 40ms linear";


        // Initial update and listeners
        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
        return () => {
        window.removeEventListener("scroll", updateProgress as any);
        window.removeEventListener("resize", updateProgress as any);
        };
    }, [updateProgress]);


    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            scrollToTop();
        }
    };


    return (
        <div
            ref={wrapRef}
            role="button"
            aria-label="Scroll to top"
            tabIndex={0}
            onClick={scrollToTop}
            onKeyDown={onKeyDown}
            className={`text-secondary bg-primary progress-wrap fixed bottom-6 right-6 z-[1000] flex items-center justify-center rounded-full backdrop-blur shadow-lg ring-1 ring-black/10 cursor-pointer ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                className="progress-circle"
                width="100%"
                height="100%"
                viewBox="-1 -1 102 102"
                aria-hidden
            >
                <path ref={pathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
            </svg>


            {/* Up arrow indicator */}
            <span className="pointer-events-none absolute text-sm font-yekan dark:text-gray-800 select-none" aria-hidden>
                <FaArrowUp />
            </span>


        <style jsx>
            {`
                .progress-wrap {
                opacity: 0;
                transform: translateY(8px);
                transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
                }
                .progress-wrap.active {
                opacity: 1;
                transform: translateY(0);
                }
                .progress-wrap:hover {
                box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }
                .progress-circle path {
                fill: none;
                stroke: currentColor;
                stroke-width: ${strokeWidth};
                /* start at top */
                transform: rotate(-90deg);
                transform-origin: center;
                }
            `}
        </style>
        </div>
    );
}