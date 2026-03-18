import HeroSection from '@/components/home/HeroSection';
import WhatWeOfferSection from '@/components/home/WhatWeOfferSection';
import WhyFamiliesLoveUsSection from '@/components/home/WhyFamiliesLoveUsSection';
import SocialProofSection from '@/components/home/SocialProofSection';
import CtaBannerSection from '@/components/home/CtaBannerSection';

export default function HomePage() {
  return (
    <div className='bg-white text-[var(--dt-navy)] w-full overflow-x-hidden'>
      <HeroSection />
      <WhatWeOfferSection />
      <WhyFamiliesLoveUsSection />
      <SocialProofSection />
      <CtaBannerSection />
    </div>
  );
}
