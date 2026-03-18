'use client'
import type { FestivalCardProps } from './types'

import { useState } from 'react'
import { FESTIVAL_ACCENT_MAP } from './constants'
import type { FestivalItem } from './types'

function getAccentClasses(accent: string) {
  return FESTIVAL_ACCENT_MAP[accent] ?? FESTIVAL_ACCENT_MAP['primary']
}

export default function FestivalCard({ item }: FestivalCardProps) {
  const [hover, setHover] = useState(false)
  const ac = getAccentClasses(item.accent)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[16px] overflow-hidden flex flex-col transition-all duration-[220ms] border-[1.5px]',
        hover
          ? `${ac.borderHover} ${ac.bgHover} -translate-y-[3px] ${ac.shadowHover}`
          : 'border-[var(--dt-border)] bg-[var(--dt-bg-card)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
      ].join(' ')}
    >
      {/* Top bar */}
      <div className={`h-1 ${ac.bar}`} />

      <div className='px-5 py-5 flex flex-col flex-1'>
        <span
          className={`self-start text-[10px] font-black tracking-[0.13em] uppercase px-2.5 py-[3px] rounded-full mb-3 ${ac.badge} ${ac.badgeBg}`}
        >
          {item.season || 'Event'}
        </span>

        <h4 className='dt-font-heading text-[16px] font-black text-[var(--dt-dark)] leading-[1.3] mb-auto'>
          {item.name}
        </h4>

        <a
          href='/events'
          className={`mt-4 self-start inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-white text-[12px] font-bold no-underline border-[1.5px] transition-all duration-[220ms] ${ac.btn}`}
        >
          Learn More
          <span className={`inline-block transition-transform duration-[220ms] ${hover ? 'translate-x-[3px]' : ''}`}>
            →
          </span>
        </a>
      </div>
    </div>
  )
}
