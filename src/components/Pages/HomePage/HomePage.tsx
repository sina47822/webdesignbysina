"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import MainHomePage from "./MainHomePage"
import LogoCloud from "@/components/LogoCloud/LogoCloud"
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background"
import { Boxes } from "lucide-react"
import { cn } from "@/lib/utils"
import MinimalHero from "@/components/Hero/MinimalHero"
import AppHero from "@/components/Hero/AppHero"
import FeatureSteps from "@/components/Features/FeatureSteps"
import CTA2 from "@/components/CTA/CTA2"

const HomePage = () => {

  return (
    <main className="">
        <MainHomePage />
        <FeatureSteps />
        <AppHero />
        <LogoCloud />
        <div className="flex justify-center pt-20"> 
          <CTA2 />
        </div>
    </main>
  )
}

export default HomePage