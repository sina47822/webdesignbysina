import Header1 from '@/components/Header/Header1'
import Header2 from '@/components/Header/Header2'
import React from 'react'

const page = () => {
  return (
    <div className=''>
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">صفحهٔ «هدر»</h2>
            <p className="text-gray-600">این یک صفحهٔ مستقل است و از طریق روت خودش رندر می‌شود.</p>
            <div className='flex flex-col gap-8'>
              {/* header 1 */}
              <div className="rounded-xl bg-gray-200 border p-6">
                  <div className="rounded-xl bg-white border p-6">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <Header1 />
                    </div>
                  </div>
              </div>
              {/* header 2 */}
              <div className='rounded-xl bg-gray-200 border p-6'>
                  <div className="rounded-xl bg-white border p-6">
                    <div className="[&>header]:relative [&>header]:top-0 [&>header]:left-0 [&>header]:static">
                      <Header2 />
                    </div>
                  </div>
              </div>
            </div>
        </section>
    </div>
  )
}

export default page