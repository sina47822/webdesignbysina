import Header1 from '@/components/Header/Header1'
import Header2 from '@/components/Header/Header2'
import Header3 from '@/components/Header/Header3'
import React from 'react'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ «هدر»</h2>
            <p className="text-gray-600 dark:text-gray-300 group">شما میتوانید کد مورد نظر خود را به ما اطلاع دهید یا برای ساخت مدل مد نظر خود به <span className='text-blue-400 px-1 text-lg group-hover:font-bold'> این لینک </span>مراجعه کنید</p>
            <div className='flex flex-col gap-8'>
              {/* header 1 */}
              <div className="rounded-xl bg-gray-200 dark:bg-gray-900 border p-6">
                  <p className='pb-4'>هدر یک کد 3254</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <Header1 />
                    </div>
                  </div>
              </div>
              {/* header 2 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هدر دو کد 3255</p>
                  <div className="rounded-xl bg-white  dark:bg-gray-900 border">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <Header2 />
                    </div>
                  </div>
              </div>
              {/* header 3 */}
              <div className='rounded-xl bg-gray-200 dark:bg-gray-900 border p-6'>
                  <p className='pb-4'>هدر سه کد 3256</p>
                  <div className="rounded-xl bg-white dark:bg-gray-900 border">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <Header3 />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page