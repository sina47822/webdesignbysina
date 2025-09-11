"use client";
import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

/* ---------- Item (کارت) ---------- */
export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={[
      "scroll-stack-card",
      "relative w-full max-w-2xl md:max-w-5xl xl:max-w-7xl mx-auto h-auto my-5 p-4",
      "rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
      "origin-top will-change-transform opacity-0 translate-y-3 transition-opacity duration-500",
      itemClassName.trim(),
    ].join(" ")}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      contain: "paint",
    }}
    // وقتی در اولین آپدیت ترنسفورم می‌گیریم، کارت ظاهر می‌شه
    data-appear="false"
  >
    {children}
  </div>
);

/* ---------- Stack ---------- */
export interface ScrollStackProps {
  className?: string;
  children: React.ReactNode;
  itemDistance?: number; // فاصله عمودی بین کارت‌ها
  itemScale?: number; // اختلاف اسکیل هر کارت نسبت به قبلی
  itemStackDistance?: number; // فاصله چسبندگی در حالت پین
  stackPosition?: string; // نقطه پین (درصد از ارتفاع نما)
  scaleEndPosition?: string; // جایی که اسکیل به هدف می‌رسه
  baseScale?: number; // اسکیل پایه برای کارت اول
  rotationAmount?: number; // اگر خواستی چرخش بدی (پیش‌فرض 0)
  useWindowScroll?: boolean;
  smooth?: boolean; // Lenis
  onStackComplete?: () => void;
}

type Transform = { y: number; s: number; r: number };

// helper type to set webkitTransform without `any`
type CSSStyleWithWebkit = CSSStyleDeclaration & { webkitTransform?: string };

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 80,
  itemScale = 0.015,
  itemStackDistance = 24,
  stackPosition = "22%",
  scaleEndPosition = "8%",
  baseScale = 0.72,
  rotationAmount = 0,
  useWindowScroll = true,
  smooth = true,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const lenisRef = useRef<{ lenis: Lenis; id: number } | null>(null);

  const cardsRef = useRef<HTMLDivElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, Transform>());
  const targetTransformsRef = useRef(new Map<number, Transform>());
  const tickingRef = useRef(false);
  const lastTimeRef = useRef<number>(performance.now());

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return Number(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || window.pageYOffset,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (el: HTMLElement) => {
      if (useWindowScroll) {
        const r = el.getBoundingClientRect();
        return r.top + (window.scrollY || window.pageYOffset);
      }
      return el.offsetTop;
    },
    [useWindowScroll]
  );

  // هدف ترنسفورم‌ها را براساس اسکرول محاسبه می‌کنیم (بدون رندر)
  const computeTargets = useCallback(() => {
    if (!cardsRef.current.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPos = parsePercentage(stackPosition, containerHeight);
    const scaleEndPos = parsePercentage(scaleEndPosition, containerHeight);

    const endEl = useWindowScroll
      ? (document.querySelector(".scroll-stack-end") as HTMLElement | null)
      : (scrollerRef.current?.querySelector(".scroll-stack-end") as HTMLElement | null);

    const endTop = endEl ? getElementOffset(endEl) : 0;

    const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    cardsRef.current.forEach((card, i) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPos - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPos;
      const pinStart = triggerStart;
      const pinEnd = endTop - containerHeight / 2;

      const scaleProgress = clamp01((scrollTop - triggerStart) / (triggerEnd - triggerStart));
      const targetScale = baseScale + i * itemScale;
      const s = 1 - scaleProgress * (1 - targetScale);
      const r = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let y = 0;
      const pinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (pinned) {
        y = scrollTop - cardTop + stackPos + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        y = pinEnd - cardTop + stackPos + itemStackDistance * i;
      }

      targetTransformsRef.current.set(i, { y, s, r });

      // بارِ اول: کارت رو ظاهر کن
      if (card.getAttribute("data-appear") !== "true") {
        card.setAttribute("data-appear", "true");
        card.style.opacity = "1";
        (card.style as CSSStyleDeclaration).translate = "0 0";
      }
    });

    // استیت تکمیل
    const lastIndex = cardsRef.current.length - 1;
    if (lastIndex >= 0) {
      const card = cardsRef.current[lastIndex];
      const cardTop = getElementOffset(card);
      const pinStart = cardTop - stackPos - itemStackDistance * lastIndex;
      const pinEnd = endTop - containerHeight / 2;
      const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (inView && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!inView && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }
  }, [
    baseScale,
    itemScale,
    itemStackDistance,
    parsePercentage,
    getScrollData,
    getElementOffset,
    stackPosition,
    scaleEndPosition,
    rotationAmount,
    useWindowScroll,
    onStackComplete,
  ]);

  // رندر اسموس: از last به target با lerp بر اساس زمان
  const renderSmooth = useCallback(() => {
    const now = performance.now();
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // حداکثر 50ms
    lastTimeRef.current = now;

    // سرعت اسموس (هرچه بزرگ‌تر، سریع‌تر)
    const speed = 12;
    const alpha = 1 - Math.exp(-speed * dt); // از 0 تا 1

    cardsRef.current.forEach((card, i) => {
      const target = targetTransformsRef.current.get(i) || { y: 0, s: 1, r: 0 };
      const last = lastTransformsRef.current.get(i) || { y: target.y, s: target.s, r: target.r };

      const y = lerp(last.y, target.y, alpha);
      const s = lerp(last.s, target.s, alpha);
      const r = lerp(last.r, target.r, alpha);

      // فقط transform؛ هیچ فیلتر/blur که لرزش بده نداریم
      card.style.transform = `translate3d(0, ${y}px, 0) scale(${s}) rotate(${r}deg)`;
      lastTransformsRef.current.set(i, { y, s, r });
    });
  }, []);

  const tick = useCallback(() => {
    tickingRef.current = false;
    computeTargets();
    renderSmooth();
  }, [computeTargets, renderSmooth]);

  const onScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      rafId.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return;

    // کارت‌ها
    cardsRef.current = Array.from(
      useWindowScroll
        ? (document.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLDivElement>)
        : (scrollerRef.current?.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLDivElement> | null) ?? []
    );

    // استایل پایه کارت‌ها
    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";

      // enable GPU compositing without `any`
      (card.style as CSSStyleWithWebkit).webkitTransform = "translateZ(0)";
      card.style.transform = "translateZ(0)";
      card.style.backfaceVisibility = "hidden";
      card.style.filter = ""; // blur حذف
    });

    // لیسنر اسکرول: یا Lenis یا نیتیو (اما بدون scroll-behavior smooth)
    if (smooth) {
      const wrapperEl: HTMLElement | undefined = useWindowScroll ? undefined : scrollerRef.current ?? undefined;
      const contentEl: HTMLElement | undefined = useWindowScroll
        ? undefined
        : (scrollerRef.current?.querySelector(".scroll-stack-inner") as HTMLElement | null) ?? undefined;

      const lenis = new Lenis({
        // برای window نیازی به wrapper/content نیست
        // these properties are optional; pass only when defined
        ...(wrapperEl ? { wrapper: wrapperEl } : {}),
        ...(contentEl ? { content: contentEl } : {}),
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        lerp: 0.12,
        syncTouch: true,
      } as unknown as ConstructorParameters<typeof Lenis>[0]); // keep exact lib typing happy across versions

      lenis.on("scroll", onScroll);

      let id = requestAnimationFrame(function raf(t) {
        lenis.raf(t);
        id = requestAnimationFrame(raf);
      });

      lenisRef.current = { lenis, id };
      onScroll(); // اولین فریم
    } else {
      const container: HTMLElement | Window = useWindowScroll ? window : (scrollerRef.current as HTMLDivElement);
      container.addEventListener("scroll", onScroll as EventListener, { passive: true });
      onScroll();
    }

    return () => {
      if (lenisRef.current) {
        const { lenis, id } = lenisRef.current;
        cancelAnimationFrame(id);
        lenis.destroy();
        lenisRef.current = null;
      } else {
        const container: HTMLElement | Window = useWindowScroll ? window : (scrollerRef.current as HTMLDivElement);
        container.removeEventListener("scroll", onScroll as EventListener);
      }

      if (rafId.current) cancelAnimationFrame(rafId.current);
      lastTransformsRef.current.clear();
      targetTransformsRef.current.clear();
    };
  }, [smooth, useWindowScroll, itemDistance, onScroll]);

  return (
    <div
      className={["relative w-full h-full overflow-y-auto overflow-x-visible", className.trim()].join(" ")}
      ref={scrollerRef}
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "auto", // جلوگیری از تداخل با Lenis
        // scroll-behavior عمداً auto می‌مونه
        transform: "translateZ(0)",
        willChange: "scroll-position",
      }}
    >
      <div className="scroll-stack-inner pt-[18vh] px-4 pb-[40rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
}
