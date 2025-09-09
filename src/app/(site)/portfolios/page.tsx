import InteractiveLinksPage from '@/components/Pages/Portfolios/InterActiveFull'
import Portfolios1 from '@/components/Pages/Portfolios/Portfolios'
import ScrollStacks from '@/components/Pages/Portfolios/ScrollStack'
import React from 'react'

const Portfolios = () => {
  return (
    <div className='flex flex-col items-center justify-center py-24'>
          <h1 className="text-4xl font-bold">
            نمونه پروژه ها
        </h1>
      <ScrollStacks />
    </div>
  )
}

export default Portfolios