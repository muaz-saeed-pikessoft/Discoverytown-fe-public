'use client'

import type { TestPrepCardProps } from './types'

import { useState } from 'react'
import type { TestItem, ColorSet } from './types'

export default function TestPrepCard({ test, colorSet }: TestPrepCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[20px] overflow-hidden border border-[var(--dt-border)] bg-[var(--dt-bg-card)] transition-all duration-[220ms] relative',
        hover ? '-translate-y-1 shadow-[0_20px_48px_rgba(29,127,229,0.13)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]',
      ].join(' ')}
    >
      {/* Badge outside image container, acting as absolute layer on whole card if provided */}
      {test.badge ? (
        <div
          className='absolute right-3.5 top-3.5 z-10 rounded-full px-2.5 py-[3px] text-[10px] font-black tracking-[0.05em] uppercase text-white shadow-sm'
          style={{ background: colorSet.accent }}
        >
          {test.badge}
        </div>
      ) : null}

      {/* Image */}
      <div className='h-[180px] relative overflow-hidden'>
        <img
          src={test.image}
          alt={test.name}
          className={[
            'w-full h-full object-cover transition-transform duration-[400ms] ease-in-out',
            hover ? 'scale-[1.06]' : 'scale-100',
          ].join(' ')}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[var(--dt-dark)]/80 to-transparent' />

        {/* Dot indicator */}
        <div
          className='absolute top-3.5 left-3.5 w-2.5 h-2.5 rounded-full shadow-[0_0_0_3px_rgba(255,255,255,0.27)]'
          style={{ background: colorSet.accent }}
        />
      </div>

      {/* Content */}
      <div className='px-5 py-5 flex flex-col h-[calc(100%-180px)]'>
        <h3 className='dt-font-heading text-[17px] font-black text-[var(--dt-dark)] leading-[1.3] mb-2'>{test.name}</h3>
        <p className='text-[13px] leading-[1.6] text-[var(--dt-text-muted)] mt-auto'>{test.desc}</p>
      </div>
    </div>
  )
}
