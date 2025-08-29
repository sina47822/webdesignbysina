import Footer4Col from '@/components/Footer/Footer4Col'
import FooterGlow from '@/components/Footer/FooterGlow'
import FooterNewsletter from '@/components/Footer/FooterNewsletter'

import React from 'react'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ فوتر</h2>
            <p className="text-gray-600 dark:text-gray-300 group">شما میتوانید کد مورد نظر خود را به ما اطلاع دهید یا برای ساخت مدل مد نظر خود به <span className='text-blue-400 px-1 text-lg group-hover:font-bold'> این لینک </span>مراجعه کنید</p>
            <div className='flex flex-col gap-8'>
              {/* footer 1 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>فوتر چهار ستونی یک کد 3354</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="">
                      <Footer4Col />
                    </div>
                  </div>
              </div>
              {/* header 2 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>فوتر شفاف کد 3355</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <FooterGlow />
                    </div>
                  </div>
              </div>
              {/* header 3 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>فوتر خبرنامه کد 3356</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <FooterNewsletter />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page