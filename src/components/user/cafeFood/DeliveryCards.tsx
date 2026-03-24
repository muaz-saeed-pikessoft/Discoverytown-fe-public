import type { DeliveryCardsProps } from './types'
import Link from 'next/link'

import { BLUE } from './pageConstants'
import type { DeliveryOption } from './types'

export default function DeliveryCards({ options }: DeliveryCardsProps) {
  return (
    <div className='grid grid-cols-2 gap-5 max-md:grid-cols-1'>
      {options.map(option => (
        <div
          key={option.title}
          className='rounded-2xl border border-[var(--dt-border)] overflow-hidden bg-[var(--dt-bg-card)] shadow-[0_8px_24px_rgba(10,15,30,0.07)]'
        >
          <div className='h-44 relative'>
            <img src={option.image} alt={option.title} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-[#080f1f]/65 to-transparent' />
          </div>
          <div className='px-6 py-5'>
            <p className='dt-font-heading text-[21px] font-black text-[var(--dt-dark)] leading-[1.2] mb-2'>
              {option.title}
            </p>
            <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.65] mb-4'>{option.desc}</p>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--dt-blue-mid)] text-white text-[13px] font-bold no-underline transition-all duration-200 hover:bg-[var(--dt-primary)]'
              style={{ color: '#fff', background: BLUE }}
            >
              Request Quote
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
