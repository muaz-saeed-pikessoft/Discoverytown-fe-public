'use client'

import type { ClassCardProps } from './types'

import { useState } from 'react'
import type { GymClass } from './types'

export default function ClassCard({ gymClass, accent, border, bg }: ClassCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[18px] overflow-hidden flex flex-col border-[1.5px] bg-[var(--dt-bg-card)] transition-all duration-[220ms]',
        hover ? '-translate-y-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.10)]' : 'shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
      ].join(' ')}
      style={{ borderColor: hover ? accent : border }}
    >
      {/* Top accent bar */}
      <div className='h-1' style={{ background: accent }} />

      {/* Image */}
      {gymClass.img && (
        <div className='h-[130px] overflow-hidden'>
          <img
            src={gymClass.img}
            alt={gymClass.name}
            className={[
              'w-full h-full object-cover transition-transform duration-[350ms] ease-in-out',
              hover ? 'scale-105' : 'scale-100',
            ].join(' ')}
          />
        </div>
      )}

      <div className='px-4 py-4 flex flex-col flex-1'>
        {gymClass.track && (
          <span
            className='self-start text-[10px] font-black tracking-[0.1em] uppercase px-2.5 py-[3px] rounded-full mb-2'
            style={{ background: bg, color: accent }}
          >
            {gymClass.track}
          </span>
        )}

        <h4 className='dt-font-heading text-[15px] font-black text-[var(--dt-dark)] leading-[1.3] mb-1'>
          {gymClass.name}
        </h4>
        <p className='text-[11px] font-bold mb-2' style={{ color: accent }}>
          Ages {gymClass.ages}
        </p>
        <p className='text-[13px] leading-[1.55] text-[var(--dt-text-muted)]'>{gymClass.desc}</p>
      </div>
    </div>
  )
}
