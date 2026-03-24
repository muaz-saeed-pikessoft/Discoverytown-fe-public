'use client'

import type { SubjectCardProps } from './types'

import { useState } from 'react'
import type { SubjectItem, ColorSet } from './types'

export default function SubjectCard({ subject, colorSet }: SubjectCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[20px] overflow-hidden border bg-[var(--dt-bg-card)] transition-all duration-[220ms]',
        hover
          ? 'shadow-[0_20px_48px_rgba(29,127,229,0.13)] -translate-y-1'
          : 'shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-[var(--dt-border)]',
      ].join(' ')}
      style={{ borderColor: hover ? colorSet.accent : 'var(--dt-border)' }}
    >
      {/* Image */}
      <div className='h-[180px] relative overflow-hidden'>
        <img
          src={subject.image}
          alt={subject.name}
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
        <h3 className='dt-font-heading text-[17px] font-black text-[var(--dt-dark)] leading-[1.3] mb-2'>
          {subject.name}
        </h3>
        <p className='text-[13px] leading-[1.6] text-[var(--dt-text-muted)] mt-auto'>{subject.desc}</p>
      </div>
    </div>
  )
}
