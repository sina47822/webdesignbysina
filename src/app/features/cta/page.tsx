
import Feature1 from '@/components/Features/Feature1'
import FeatureSteps from '@/components/Features/FeatureSteps'
import FeatureCard from '@/components/Features/FeatureCard'
import { FeatherIcon } from 'lucide-react'

import React from 'react'
import CTA1 from '@/components/CTA/CTA1'
import CTA2 from '@/components/CTA/CTA2'
import CTA3 from '@/components/CTA/CTA3'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ فیچر ها</h2>
            <p className="text-gray-600 dark:text-gray-300 group">شما میتوانید کد مورد نظر خود را به ما اطلاع دهید یا برای ساخت مدل مد نظر خود به <span className='text-blue-400 px-1 text-lg group-hover:font-bold'> این لینک </span>مراجعه کنید</p>
            <div className='flex flex-col gap-8'>
              {/* feature 1 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>کال تواکشن یک کد 3654</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <CTA1 />
                    </div>
                  </div>
              </div>
              {/* feature 2 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>کال تواکشن دو کد 3655</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="relative flex items-center justify-center">
                      <CTA2 />
                    </div>
                  </div>
              </div>
              {/* feature 3 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>کال تواکشن سه کد 3656</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="relative">
                      <CTA3 />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page