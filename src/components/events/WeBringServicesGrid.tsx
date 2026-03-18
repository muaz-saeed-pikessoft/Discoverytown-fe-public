'use client'
import type { WeBringServicesGridProps } from './types'

import { useState } from 'react'
import type { WeBringServiceItem } from './types'

export default function WeBringServicesGrid({ services, images }: WeBringServicesGridProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2'>
      {services.map(service => {
        const active = hovered === service.name

        return (
          <div
            key={service.name}
            onMouseEnter={() => setHovered(service.name)}
            onMouseLeave={() => setHovered(null)}
            className={[
              'relative rounded-[16px] overflow-hidden h-[170px] border border-[var(--dt-border)] transition-all duration-[220ms]',
              active ? '-translate-y-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.10)]' : '',
            ].join(' ')}
          >
            <img
              src={images[service.name] ?? `https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80`}
              alt={service.name}
              className={[
                'w-full h-full object-cover block transition-transform duration-[350ms] ease-in-out',
                active ? 'scale-105' : 'scale-100',
              ].join(' ')}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/75 to-transparent' />
            <span className='absolute left-2.5 right-2.5 bottom-2.5 text-[13px] font-bold text-white leading-[1.35]'>
              {service.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
