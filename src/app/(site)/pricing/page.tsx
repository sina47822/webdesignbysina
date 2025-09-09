import CongestedPricing from '@/components/Pages/Pricing/CongestedPricing'
import NextPricingPage from '@/components/Pages/Pricing/nextPricingPage'
import PricingPage from '@/components/Pages/Pricing/pricing'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='flex justify-center items-center py-20'>
        <CongestedPricing />
    </div>
    <PricingPage />
    <NextPricingPage />
    </>
  )
}

export default page