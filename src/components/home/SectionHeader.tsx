import type { SectionHeaderProps } from './types'

import type { FC, ReactNode } from 'react'

const SectionHeader: FC<SectionHeaderProps> = ({ eyebrow, title, subtitle, center = false, dark = false }) => {
  
  return (
    <div className={center ? 'mx-auto mb-12 text-center' : 'mb-14'}>
      <div
        className={`mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] ${
          dark ? 'text-[var(--dt-coral)]' : 'text-[var(--dt-coral)]'
        }`}
      >
        <span className='h-[3px] w-6 rounded bg-[var(--dt-coral)]' />
        {eyebrow}
      </div>
      <h2
        className={`font-serif text-[clamp(2rem,4vw,2.8rem)] font-black leading-[1.15] ${dark ? 'text-white' : 'text-[var(--dt-navy)]'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-[560px] text-base leading-[1.7] ${dark ? 'text-white/55' : 'text-[#666]'} ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
