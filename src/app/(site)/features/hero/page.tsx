import Header1 from '@/components/Header/Header1'
import Header2 from '@/components/Header/Header2'
import Header3 from '@/components/Header/Header3'
import AppHero from '@/components/Hero/AppHero'
import Hero1 from '@/components/Hero/Hero1'
import FitnessHero from '@/components/Hero/FitnessHero'
import React from 'react'
import GradientHero from '@/components/Hero/GradientHero'
import HeroGeometric from '@/components/Hero/HeroGeometric'
import LucyHero from '@/components/Hero/LucyHeo'
import MinimalHero from '@/components/Hero/MinimalHero'
import Globe3D from '@/components/Hero/Globe3D'
import Trading from '@/components/Hero/TradingHero'
import MainHomePage from '@/components/Hero/MainHomePage'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ «هیرو»</h2>
            <p className="text-gray-600 dark:text-gray-300 group">شما میتوانید کد مورد نظر خود را به ما اطلاع دهید یا برای ساخت مدل مد نظر خود به <span className='text-blue-400 px-1 text-lg group-hover:font-bold'> این لینک </span>مراجعه کنید</p>
            <div className='flex flex-col gap-8'>
                {/* hero 0 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>هیرو یک کد 3163</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="">
                      <MainHomePage />
                    </div>
                  </div>
              </div>
              {/* hero 1 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>هیرو یک کد 3164</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="">
                      <AppHero />
                    </div>
                  </div>
              </div>
              {/* hero 2 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو دو کد 3165</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="">
                      <Hero1 />
                    </div>
                  </div>
              </div>
              {/* hero 3 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3166</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <FitnessHero />
                    </div>
                  </div>
              </div>
            {/* hero 4 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3167</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <GradientHero />
                    </div>
                  </div>
              </div>
            {/* hero 5 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3168</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <HeroGeometric />
                    </div>
                  </div>
              </div>
            {/* hero 6 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3169</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <LucyHero />
                    </div>
                  </div>
              </div>
            {/* hero 7 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3170</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <MinimalHero />
                    </div>
                  </div>
              </div>
            {/* hero 8 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3171</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <Globe3D />
                    </div>
                  </div>
              </div>
            {/* hero 9 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هیرو سه کد 3172</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <Trading />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page