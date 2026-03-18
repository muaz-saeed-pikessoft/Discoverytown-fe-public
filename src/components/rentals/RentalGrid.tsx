import type { RentalGridProps } from './types'
import Link from 'next/link'

import type { AccentTheme, RentalItem } from './types'
import { slugify } from '@/utils/slugify'
import AccentPill from '../shared/AccentPill'
import ActionLink from '../shared/ActionLink'

export default function RentalGrid({ items, theme }: RentalGridProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {items.map(item => (
        <div
          key={item.name}
          className='dt-card-interactive relative flex items-start gap-3.5 px-[22px] py-5'
          style={{ borderColor: theme.accentBorder }}
        >
          {item.badge ? (
            <div className='absolute -right-3.5 -top-2'>
              <AccentPill color='#fff' background={theme.accentText}>
              {item.badge}
              </AccentPill>
            </div>
          ) : null}
          <img src={item.image} alt={item.name} className='w-[60px] h-[60px] object-cover rounded-[14px] shrink-0 mt-0.5' />
          <div className='flex-1'>
            <div className='mb-1 text-sm font-extrabold text-[var(--dt-navy)]'>{item.name}</div>
            <div className='mb-2 text-[13px] leading-[1.6] text-[#666]'>{item.desc}</div>
            <div className='flex flex-wrap items-center gap-2.5'>
              <AccentPill color={theme.accentText} background={theme.accentBg} className='normal-case tracking-normal text-[11px]'>
                {item.price}
              </AccentPill>
              <ActionLink
                href={`/checkout?category=rental&item=${slugify(item.name)}`}
                accentColor={theme.accentText}
                className='rounded-full px-3 py-[3px] text-xs'
              >
                Reserve Item
              </ActionLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
