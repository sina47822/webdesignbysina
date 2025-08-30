import Faq1 from '@/components/FAQ/FAQ1'
import Faq2 from '@/components/FAQ/FAQ2'

import React from 'react'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ سوالات متداول</h2>
            <p className="text-gray-600 dark:text-gray-300 group">شما میتوانید کد مورد نظر خود را به ما اطلاع دهید یا برای ساخت مدل مد نظر خود به <span className='text-blue-400 px-1 text-lg group-hover:font-bold'> این لینک </span>مراجعه کنید</p>
            <div className='flex flex-col gap-8'>
              {/* faq 1 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>سوالات متداول یک کد 3354</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <Faq1 />
                    </div>
                  </div>
              </div>
              {/* faq 2 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>سوالات متداول دو کد 3355</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <Faq2 />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page