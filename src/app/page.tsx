'use client'

import LogoCloud from "@/components/LogoCloud/LogoCloud";
import HomePage from "@/components/Pages/HomePage/HomePage";
import { cn } from "@/lib/utils";
import { Boxes } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap"

export default function Home() {
  //   const [showContent, setShowContent] = useState(false)

  // useEffect(() => {
  //   // Run GSAP animation on mount
  //   gsap.fromTo(
  //     ".intro",
  //     { opacity: 0 },
  //     { opacity: 1, duration: 1 }
  //   )

  //   // Wait 2 seconds before showing the real page
  //   const timer = setTimeout(() => {
  //     setShowContent(true)
  //   }, 4000)

  //   return () => clearTimeout(timer)
  // }, [])

  // if (!showContent) {
  //   return (
  //   <div className="h-[100vh] relative w-full overflow-hidden dark:bg-slate-900 flex flex-col items-center justify-center rounded-lg">
  //     <div className="absolute inset-0 w-full h-full dark:bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

  //     <Boxes />
  //     <h1 className={cn("md:text-4xl text-xl dark:text-white relative z-20")}>
  //       Webdesign By Sina
  //     </h1>
  //   </div>

  //  )
  // }
  return (
    <div>
        <HomePage />

    </div>
  );
}
