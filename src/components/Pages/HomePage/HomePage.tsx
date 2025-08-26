"use client"

import MainHomePage from "./MainHomePage"
import LogoCloud from "@/components/LogoCloud/LogoCloud"
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