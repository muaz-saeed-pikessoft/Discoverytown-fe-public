'use client'

import type { SpecialProgramCardProps } from './types'

import { useState } from 'react'
import type { SpecialProgram } from './types'

export default function SpecialProgramCard({ program }: SpecialProgramCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[20px] overflow-hidden flex flex-col border-[1.5px] bg-[var(--dt-bg-card)] transition-all duration-[220ms]',
        hover ? '-translate-y-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.10)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
      ].join(' ')}
      style={{ borderColor: hover ? program.badgeColor : program.border }}
    >
      {/* Top accent bar */}
      <div className='h-1' style={{ background: program.badgeColor }} />

      {/* Image */}
      <div className='h-[160px] overflow-hidden'>
        <img
          src={program.img}
          alt={program.name}
          className={[
            'w-full h-full object-cover transition-transform duration-[350ms] ease-in-out',
            hover ? 'scale-105' : 'scale-100',
          ].join(' ')}
        />
      </div>

      <div className='px-5 py-5 flex flex-col flex-1'>
        <span
          className='self-start text-[10px] font-black tracking-[0.13em] uppercase px-2.5 py-[3px] rounded-full mb-3'
          style={{ background: program.badgeBg, color: program.badgeColor }}
        >
          {program.badge}
        </span>
        <h4 className='dt-font-heading text-[16px] font-black text-[var(--dt-dark)] leading-[1.3] mb-2'>
          {program.name}
        </h4>
        <p className='text-[13px] leading-[1.55] text-[var(--dt-text-muted)]'>{program.desc}</p>
      </div>
    </div>
  )
}
