'use client'
import type { CampCardProps } from './types'

import Link from 'next/link'
import { useState } from 'react'
import type { CampItem } from './types'
import AccentPill from '@/components/shared/AccentPill'
import ActionLink from '@/components/shared/ActionLink'

export default function CampCard({ camp }: CampCardProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'dt-card-interactive flex min-h-[360px] cursor-pointer flex-col rounded-[18px] border-2',
        hover
          ? 'border-[var(--dt-blue-mid)] bg-[var(--dt-blue-mid-light)] -translate-y-1 shadow-[0_16px_40px_rgba(59,148,203,0.16)]'
          : 'border-[var(--dt-border)] bg-[var(--dt-bg-card)] shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
      ].join(' ')}
    >
      <div className='h-1.5 w-full bg-[var(--dt-blue-mid)]' />

      <div className='relative w-full h-[170px] overflow-hidden border-b border-[var(--dt-blue-mid)]/[0.16] bg-[var(--dt-blue-mid)]/[0.07]'>
        <img
          src={camp.img}
          alt={camp.name}
          className={[
            'w-full h-full object-cover transition-transform duration-[350ms] ease-in-out',
            hover ? 'scale-105' : 'scale-100',
          ].join(' ')}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-black/[0.06]' />
      </div>

      <div className='px-5 pt-4 pb-5 flex flex-col flex-1'>
        <p className='dt-font-heading text-[18px] font-black text-[var(--dt-dark)] mb-2'>{camp.name}</p>

        <div className='flex gap-1.5 flex-wrap mb-4'>
          <AccentPill
            color='var(--dt-blue-mid)'
            background='var(--dt-blue-mid-light)'
            className='normal-case tracking-normal text-[10px]'
          >
            {camp.ages ?? 'Ages 3–12'}
          </AccentPill>
          <span className='dt-pill-neutral text-[10px]'>{camp.duration ?? 'School Break'}</span>
        </div>

        <ActionLink
          href={`/book?service=camps&option=${camp.slug}`}
          accentColor='var(--dt-blue-mid)'
          className='mt-auto py-2 text-[12px]'
        >
          Book Camp →
        </ActionLink>
      </div>
    </div>
  )
}
