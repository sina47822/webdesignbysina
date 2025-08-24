"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import MainHomePage from "./MainHomePage"
import LogoCloud from "@/components/LogoCloud/LogoCloud"
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background"
import { Boxes } from "lucide-react"
import { cn } from "@/lib/utils"

const HomePage = () => {

  return (
    <main className="">
        <MainHomePage />
    </main>
  )
}

export default HomePage