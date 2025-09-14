"use client"

import MainHomePage from "../../Hero/MainHomePage"
import LogoCloud from "@/components/LogoCloud/LogoCloud"
import AppHero from "@/components/Hero/AppHero"
import FeatureSteps from "@/components/Features/FeatureSteps"
import CTA2 from "@/components/CTA/CTA2"
import Testimonials from "@/components/Testimonial/Testimonial"
import WorksPage from "@/components/Projects/Projects"

const HomePage = () => {

  return (
    <main className="">
        <MainHomePage />
        <FeatureSteps />
        <AppHero />
        <WorksPage />
        <div className="flex justify-center py-20"> 
          <Testimonials />
        </div>

    </main>
  )
}

export default HomePage