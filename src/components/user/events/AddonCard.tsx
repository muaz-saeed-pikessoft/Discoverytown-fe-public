'use client'
import type { AddonCardProps } from './types'

import { useState } from 'react'
import type { AddonItem } from './types'

export default function AddonCard({ item, border, bg, priceBg, priceColor }: AddonCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[16px] overflow-hidden flex flex-col border-[1.5px] transition-all duration-[220ms]',
        hover ? '-translate-y-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.08)]' : 'shadow-[0_2px_8px_rgba(0,0,0,0.03)]',
      ].join(' ')}
      style={{ borderColor: hover ? priceBg : border, background: bg }}
    >
      {/* Top bar */}
      <div className='h-1' style={{ background: priceBg }} />

      <div className='px-5 py-5 flex flex-col flex-1'>
        <span
          className='self-start text-[10px] font-black tracking-[0.13em] uppercase px-2.5 py-[3px] rounded-full mb-3'
          style={{ background: priceBg, color: priceColor }}
        >
          {item.price}
        </span>

        <h4 className='dt-font-heading text-[15px] font-black text-[var(--dt-dark)] leading-[1.3] mb-2'>{item.name}</h4>

        <p className='text-[13px] leading-[1.55] text-[var(--dt-text-muted)] mt-auto'>{item.desc}</p>
      </div>
    </div>
  )
}
