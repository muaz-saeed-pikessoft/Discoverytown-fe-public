'use client'
import type { PrivatePackageCardProps } from './types'

import Link from 'next/link'
import { useState } from 'react'
import type { PrivatePackageItem } from './types'
import AccentPill from '@/components/shared/AccentPill'
import ActionLink from '@/components/shared/ActionLink'

export default function PrivatePackageCard({ pkg }: PrivatePackageCardProps) {
  const [hover, setHover] = useState(false)

  const optionSlug =
    pkg.id === 'mini' ? 'private-room-silver' : pkg.id === 'classic' ? 'private-room-gold' : 'private-room-platinum'

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

      {/* Image */}
      <div className='relative h-[180px] overflow-hidden'>
        <img
          src={pkg.img}
          alt={pkg.name}
          className={[
            'h-full w-full object-cover transition-transform duration-[400ms] ease-in-out',
            hover ? 'scale-[1.05]' : 'scale-100',
          ].join(' ')}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[var(--dt-dark)]/60 to-transparent' />

        {pkg.badge && (
          <div className='absolute top-3.5 right-3.5'>
            <AccentPill color='#fff' background={pkg.accent}>
              {pkg.badge}
            </AccentPill>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className='px-6 pt-6 pb-4 border-b border-[var(--dt-border)]'>
        <p className='text-[11px] font-black uppercase tracking-[0.13em] text-[var(--dt-text-subtle)] mb-1'>
          {pkg.name}
        </p>
        <div className='flex items-baseline gap-1 mb-3'>
          <span className='dt-font-heading text-[38px] font-black leading-none' style={{ color: pkg.accent }}>
            {pkg.price}
          </span>
        </div>
        <div className='flex flex-wrap gap-2'>
          <AccentPill color={pkg.accent} background={pkg.bg} className='normal-case tracking-normal text-[11px]'>
            Up to {pkg.children} kids
          </AccentPill>
          <AccentPill color={pkg.accent} background={pkg.bg} className='normal-case tracking-normal text-[11px]'>
            Up to {pkg.adults} adults
          </AccentPill>
          <span className='dt-pill-neutral text-[11px]'>{pkg.duration}</span>
        </div>
      </div>

      {/* Inclusions */}
      <div className='flex-1 px-6 py-5'>
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
                className='mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full'
                style={{ background: pkg.accent }}
              />
              <span>{inclusion.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className='border-t border-[var(--dt-border)] px-6 pb-6 pt-4'>
        <p className='mb-3 text-[12px] font-bold text-[var(--dt-text-muted)]'>+ {pkg.extraChild} (up to capacity)</p>
        <ActionLink
          href={`/book?service=events&option=${optionSlug}`}
          accentColor={pkg.accent}
          className={`w-full py-[13px] text-[13px] ${hover ? '-translate-y-[2px]' : ''}`}
        >
          Book This Package →
        </ActionLink>
      </div>
    </div>
  )
}
