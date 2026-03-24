import HeroSection from '@/components/user/home/HeroSection'
import WhatWeOfferSection from '@/components/user/home/WhatWeOfferSection'
import WhyFamiliesLoveUsSection from '@/components/user/home/WhyFamiliesLoveUsSection'
import SocialProofSection from '@/components/user/home/SocialProofSection'
import CtaBannerSection from '@/components/user/home/CtaBannerSection'

export default function HomePage() {
  return (
    <div className='bg-white text-[var(--dt-navy)] w-full overflow-x-hidden'>
      <HeroSection />
      <WhatWeOfferSection />
      <WhyFamiliesLoveUsSection />
      <SocialProofSection />
      <CtaBannerSection />
    </div>
  )
}
