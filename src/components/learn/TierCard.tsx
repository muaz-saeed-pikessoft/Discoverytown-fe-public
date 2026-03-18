'use client'

import type { TierCardProps } from './types'

import { useState } from 'react'
import type { TierItem } from './types'

export default function TierCard({ tier }: TierCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'flex flex-col gap-2 rounded-[20px] border p-6 transition-all duration-[220ms] relative overflow-hidden',
        hover ? 'shadow-[0_20px_48px_rgba(0,0,0,0.08)] -translate-y-1' : 'shadow-[0_2px_10px_rgba(0,0,0,0.03)]',
      ].join(' ')}
      style={{
        background: tier.bg,
        borderColor: hover ? tier.color : tier.border,
      }}
    >
      {/* Top accent bar matching other Play components conceptually */}
      <div className='absolute top-0 left-0 right-0 h-1.5' style={{ background: tier.color }} />

      <div
        className='mt-2 mb-1 flex h-8 w-8 items-center justify-center rounded-[10px] text-sm font-black text-white transition-transform duration-[220ms]'
        style={{ background: tier.color, transform: hover ? 'scale(1.1)' : 'scale(1)' }}
      >
        {tier.num}
      </div>
      <div className='dt-font-heading text-[18px] font-black text-[var(--dt-dark)] leading-[1.3]'>{tier.name}</div>
      <div className='text-[11px] font-extrabold uppercase tracking-[0.08em]' style={{ color: tier.color }}>
        {tier.tag}
      </div>
      <div className='text-[13px] leading-[1.6] text-[var(--dt-text-muted)] mt-1'>{tier.desc}</div>
    </div>
  )
}
