
import Feature1 from '@/components/Features/Feature1'
import FeatureSteps from '@/components/Features/FeatureSteps'
import FeatureCard from '@/components/Features/FeatureCard'
import { FeatherIcon } from 'lucide-react'

import React from 'react'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ فیچر ها</h2>
            <p className="text-gray-600 dark:text-gray-300 group">شما میتوانید کد مورد نظر خود را به ما اطلاع دهید یا برای ساخت مدل مد نظر خود به <span className='text-blue-400 px-1 text-lg group-hover:font-bold'> این لینک </span>مراجعه کنید</p>
            <div className='flex flex-col gap-8'>
              {/* feature 1 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>فیچر یک کد 3554</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <Feature1 />
                    </div>
                  </div>
              </div>
              {/* feature 2 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>فیچر قدم ها کد 3555</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="relative">
                      <FeatureSteps />
                    </div>
                  </div>
              </div>
                {/* feature 3 */}
              <div className='rounded-xl border p-6'>
                  <p className='pb-4'>فیچر آیکون کد 3556</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border p-6">
                    <div className="relative">
                      <FeatureCard />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page