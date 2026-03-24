'use client'
import type { PassCardProps } from './types'

import { useState } from 'react'
import type { PassItem } from './types'
import AccentPill from '@/components/shared/AccentPill'
import ActionLink from '@/components/shared/ActionLink'

function Tag({ label }: { label: string }) {
  return (
    <AccentPill color='#fff' background='var(--dt-teal)'>
      {label}
    </AccentPill>
  )
}

export default function PassCard({ pass }: PassCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'relative rounded-[20px] border-2 px-6 py-7 flex flex-col gap-2 cursor-pointer transition-all duration-[220ms] overflow-hidden',
        hover
          ? 'border-[var(--dt-teal)] bg-[var(--dt-teal-light)] shadow-[0_16px_40px_rgba(0,196,154,0.13)]'
          : 'border-[var(--dt-border)] bg-[var(--dt-bg-card)] shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
      ].join(' ')}
    >
      <div className='absolute top-0 left-0 right-0 h-1 bg-[var(--dt-teal)] rounded-t-[20px]' />

      {pass.tag && (
        <div className='absolute top-4 right-4'>
          <Tag label={pass.tag} />
        </div>
      )}

      <div className='mt-1'>
        <p className='text-[12px] font-bold text-[var(--dt-text-subtle)] mb-1'>{pass.name}</p>
        <div className='flex items-baseline gap-1'>
          <span className='dt-font-heading text-[42px] font-black leading-none text-[var(--dt-teal)]'>
            {pass.price}
          </span>
          <span className='text-[12px] font-semibold text-[var(--dt-text-subtle)]'>{pass.sub}</span>
        </div>
      </div>

      <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.5] mt-1'>{pass.desc}</p>

      <ActionLink
        href={`/book?service=open-play&option=${pass.slug}`}
        accentColor='var(--dt-teal)'
        className='mt-3 py-2.5 text-[13px]'
      >
        Book Now
      </ActionLink>
    </div>
  )
}
