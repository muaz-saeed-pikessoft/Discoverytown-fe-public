import type { HeroProps } from './types'
import type { FC } from 'react'

const Hero: FC<HeroProps> = ({ totalPrograms, openSpots, waitlistOnly }) => {
  return (
    <section className='relative overflow-hidden border-b border-[#4C6EF5]/10 bg-[linear-gradient(135deg,#F0F4FF_0%,#FFF8F0_55%,var(--dt-mint-soft)_100%)] py-12 md:py-14'>
      <div className='pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(76,110,245,0.1)_0%,transparent_70%)]' />
      <div className='mx-auto max-w-[1280px] px-5 md:px-8'>
        <div className='mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#4C6EF5]'>
          <span className='h-[3px] w-5 rounded bg-[#4C6EF5]' />
          Discovery Town
        </div>
        <h1 className='font-serif text-[clamp(2rem,4vw,2.8rem)] font-black leading-[1.1] text-[var(--dt-navy)]'>
          Classes &amp; <span className='text-[#4C6EF5]'>Programs</span>
        </h1>
        <p className='mb-6 mt-3 max-w-[560px] text-base leading-[1.7] text-[#666]'>
          Structured learning across art, music, movement, STEM, and language. Reserve your child&apos;s spot online in
          seconds.
        </p>

        <div className='flex flex-wrap gap-2.5'>
          <span className='inline-flex items-center rounded-full border-[1.5px] border-[#C5D0FF] bg-[#F0F4FF] px-4 py-1.5 text-[13px] font-bold text-[#4C6EF5]'>
            {totalPrograms} programs
          </span>
          <span className='inline-flex items-center rounded-full border-[1.5px] border-[#96F2D7] bg-[var(--dt-mint-soft)] px-4 py-1.5 text-[13px] font-bold text-[#0CA678]'>
            {openSpots} open spots
          </span>
          <span className='inline-flex items-center rounded-full border-[1.5px] border-[#FDE68A] bg-[#FFFBEB] px-4 py-1.5 text-[13px] font-bold text-[#D97706]'>
            {waitlistOnly} waitlist only
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
