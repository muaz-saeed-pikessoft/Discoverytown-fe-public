import HeroSection from '@/portal/user/components/home/HeroSection'
import WhatWeOfferSection from '@/portal/user/components/home/WhatWeOfferSection'
import WhyFamiliesLoveUsSection from '@/portal/user/components/home/WhyFamiliesLoveUsSection'
import SocialProofSection from '@/portal/user/components/home/SocialProofSection'
import CtaBannerSection from '@/portal/user/components/home/CtaBannerSection'

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
