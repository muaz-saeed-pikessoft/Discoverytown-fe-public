'use client'
import type { VenuePackageCardProps } from './types'

import Link from 'next/link'
import { useState } from 'react'
import type { VenuePackageItem } from './types'

export default function VenuePackageCard({ pkg }: VenuePackageCardProps) {
  const [hover, setHover] = useState(false)
  const optionSlug = `venue-buyout-${pkg.id}`

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'flex flex-col overflow-hidden rounded-[20px] border-2 bg-[var(--dt-bg-card)] transition-all duration-[220ms]',
        hover
          ? '-translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.10)]'
          : 'border-[var(--dt-border)] shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
      ].join(' ')}
      style={{ borderColor: hover ? pkg.accent : undefined }}
    >
      {/* Top accent bar */}
      <div style={{ height: 6, background: pkg.accent }} />

      <div className='px-7 pb-5 pt-7'>
        {pkg.badge && (
          <div
            className='mb-3 inline-block rounded-full px-3 py-[3px] text-[11px] font-black text-white'
            style={{ background: pkg.accent }}
          >
            {pkg.badge}
          </div>
        )}

        <p className='text-[12px] font-bold text-[var(--dt-text-subtle)] mb-1'>{pkg.name}</p>
        <div className='flex items-baseline gap-1 mb-4'>
          <span className='dt-font-heading text-[42px] font-black leading-none' style={{ color: pkg.accent }}>
            {pkg.price}
          </span>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-[13px] font-bold text-[var(--dt-text-muted)]'>Up to {pkg.guests} guests</p>
          <p className='text-[13px] font-bold text-[var(--dt-text-muted)]'>{pkg.duration}</p>
          <p className='text-[13px] font-bold text-[var(--dt-text-muted)]'>{pkg.staff}</p>
        </div>
      </div>

      <div className='flex-1 border-t border-[var(--dt-border)] px-7 pb-5 pt-5'>
        <p className='mb-3 text-[11px] font-black uppercase tracking-[0.13em] text-[var(--dt-text-subtle)]'>
          What&apos;s Included
        </p>
        <ul className='m-0 flex list-none flex-col gap-2 p-0'>
          {pkg.inclusions.map(inclusion => (
            <li
              key={inclusion.text}
              className='flex items-start gap-2 text-[13px] leading-[1.5] text-[var(--dt-text-muted)]'
            >
              <span
                className='mt-[3px] inline-block h-1.5 w-1.5 shrink-0 rounded-full'
                style={{ background: pkg.accent }}
              />
              <span>{inclusion.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className='mx-7 mb-4 mt-4 flex items-center gap-2 rounded-xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] px-4 py-3 text-[12px] font-bold text-[var(--dt-text-muted)]'>
        {pkg.deposit}
      </div>

      <Link
        href={`/book?service=events&option=${optionSlug}`}
        className={[
          'mx-7 mb-7 block rounded-[14px] py-[13px] text-center text-[13px] font-black text-white no-underline transition-all duration-150',
          hover ? '-translate-y-[2px]' : '',
        ].join(' ')}
        style={{
          background: pkg.accent,
          boxShadow: hover ? `0 6px 20px ${pkg.accent}55` : undefined,
        }}
      >
        Book This Package →
      </Link>
    </div>
  )
}
