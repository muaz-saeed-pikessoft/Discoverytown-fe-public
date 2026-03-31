'use client'

import { useState } from 'react'

import ActionLink from '@/components/shared/ActionLink'
import { ROUTES } from '@/constants/routes'
import type { PrivatePlayCardsProps, PrivatePlayOption } from './types'

function PrivateCard({ opt }: { opt: PrivatePlayOption }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        'rounded-[20px] overflow-hidden border border-[var(--dt-border)] bg-[var(--dt-bg-card)] transition-all duration-[220ms]',
        hover ? '-translate-y-1 shadow-[0_20px_48px_rgba(29,127,229,0.13)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.05)]',
      ].join(' ')}
    >
      {/* Image */}
      <div className='h-[180px] relative overflow-hidden'>
        <img
          src={opt.img}
          alt={opt.name}
          className={[
            'w-full h-full object-cover transition-transform duration-[400ms] ease-in-out',
            hover ? 'scale-[1.06]' : 'scale-100',
          ].join(' ')}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[var(--dt-dark)]/80 to-transparent' />

        {/* Dot indicator */}
        <div className='absolute top-3.5 left-3.5 w-2.5 h-2.5 rounded-full bg-[var(--dt-blue-mid)] shadow-[0_0_0_3px_rgba(59,148,203,0.27)]' />
      </div>

      {/* Content */}
      <div className='px-5 py-5'>
        <h3 className='dt-font-heading text-[17px] font-black text-[var(--dt-dark)] leading-[1.3] mb-4'>{opt.name}</h3>
        <ActionLink
          href={ROUTES.USER.PRIVATE_HIRE}
          accentColor='var(--dt-blue-mid)'
          className='w-full py-3 text-[13px]'
        >
          Private Hire Details →
        </ActionLink>
      </div>
    </div>
  )
}

export default function PrivatePlayCards({ options }: PrivatePlayCardsProps) {
  return (
    <div className='grid grid-cols-3 gap-4 max-md:grid-cols-1'>
      {options.map(option => (
        <PrivateCard key={option.name} opt={option} />
      ))}
    </div>
  )
}
