'use client'
import type { AddonCategoryCardsProps } from './types'

import { useState } from 'react'
import type { AddonCategoryItem } from './types'

const ACCENT_MAP = {
  amber: {
    bar: 'bg-[#F59E0B]',
    badge: 'text-[#B45309] bg-[#FFF8EB]',
    button: 'bg-[#F59E0B] border-[#F59E0B]',
    hover: 'border-[#F59E0B] bg-[#FFFBEB] shadow-[0_12px_32px_rgba(245,158,11,0.15)]',
  },
  primary: {
    bar: 'bg-[var(--dt-primary)]',
    badge: 'text-[var(--dt-primary)] bg-[var(--dt-primary-light)]',
    button: 'bg-[var(--dt-primary)] border-[var(--dt-primary)]',
    hover: 'border-[var(--dt-primary)] bg-[var(--dt-primary-light)] shadow-[0_12px_32px_rgba(29,127,229,0.15)]',
  },
  teal: {
    bar: 'bg-[var(--dt-teal)]',
    badge: 'text-[var(--dt-teal-dark)] bg-[var(--dt-teal-light)]',
    button: 'bg-[var(--dt-teal-dark)] border-[var(--dt-teal-dark)]',
    hover: 'border-[var(--dt-teal)] bg-[var(--dt-teal-light)] shadow-[0_12px_32px_rgba(0,196,154,0.15)]',
  },
  dark: {
    bar: 'bg-[var(--dt-dark)]',
    badge: 'text-[var(--dt-dark)] bg-[var(--dt-bg-page)]',
    button: 'bg-[var(--dt-dark)] border-[var(--dt-dark)]',
    hover: 'border-[var(--dt-dark)] bg-[var(--dt-bg-page)] shadow-[0_12px_32px_rgba(15,30,61,0.12)]',
  },
} as const

function AddonCategoryCard({ item }: { item: AddonCategoryItem }) {
  const [hover, setHover] = useState(false)
  const ac = ACCENT_MAP[item.accent]

  function handleClick() {
    const el = document.getElementById(item.anchor)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[16px] overflow-hidden flex flex-col text-left w-full transition-all duration-[220ms] border-[1.5px]',
        hover
          ? `${ac.hover} -translate-y-[3px]`
          : 'border-[var(--dt-border)] bg-[var(--dt-bg-card)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
      ].join(' ')}
    >
      <div className={`h-1 w-full ${ac.bar}`} />
      <div className='px-5 py-5 flex flex-col flex-1'>
        <span
          className={`self-start rounded-full px-2.5 py-[3px] text-[10px] font-black uppercase tracking-[0.13em] mb-3 ${ac.badge}`}
        >
          Add-On
        </span>
        <h4 className='dt-font-heading text-[15px] font-black text-[var(--dt-dark)] leading-[1.3] mb-2'>{item.name}</h4>
        <p className='text-[13px] leading-[1.55] text-[var(--dt-text-muted)] mb-auto'>{item.desc}</p>
        <span
          className={[
            'mt-4 self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-white text-[12px] font-bold border-[1.5px] transition-all duration-[220ms]',
            ac.button,
          ].join(' ')}
        >
          Browse
          <span className={`inline-block transition-transform duration-[220ms] ${hover ? 'translate-x-[3px]' : ''}`}>
            →
          </span>
        </span>
      </div>
    </button>
  )
}

export default function AddonCategoryCards({ items }: AddonCategoryCardsProps) {
  return (
    <div className='mb-8 grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
      {items.map(item => (
        <AddonCategoryCard key={item.name} item={item} />
      ))}
    </div>
  )
}
