'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

interface BrandHeaderProps {
  name: string
  logoUrl?: string | null
  className?: string
}

export default function BrandHeader({ name, logoUrl, className }: BrandHeaderProps) {
  return (
    <div className={className}>
      <div className='flex items-center justify-between gap-4 rounded-[22px] border border-black/[0.06] bg-white/80 px-4 py-3 backdrop-blur-sm shadow-[0_10px_30px_rgba(20,35,59,0.06)]'>
        <Link href={ROUTES.USER.HOME} className='flex min-w-0 items-center gap-3'>
          <div className='relative h-10 w-10 overflow-hidden rounded-[14px] bg-[var(--dt-bg-page)]'>
            {logoUrl ? (
              <Image src={logoUrl} alt={`${name} logo`} fill sizes='40px' className='object-cover' />
            ) : (
              <div className='flex h-full w-full items-center justify-center text-sm font-black text-[var(--dt-text-subtle)]'>
                {name[0]}
              </div>
            )}
          </div>
          <div className='min-w-0'>
            <div className='truncate text-sm font-black text-[var(--dt-navy)] dt-font-heading'>{name}</div>
            <div className='text-xs font-semibold text-[var(--dt-text-body)]/70'>Activities & bookings</div>
          </div>
        </Link>

        <Link
          href={`${ROUTES.USER.PLAY}#browse-sessions`}
          className='dt-btn-primary px-4 py-2'
        >
          Browse
        </Link>
      </div>
    </div>
  )
}

