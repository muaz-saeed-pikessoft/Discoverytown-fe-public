import type { GiftCardProps } from './types'
import Link from 'next/link'

import type { GiftItem } from './types'
import { slugify } from '@/utils/slugify'
import AccentPill from '@/components/shared/AccentPill'
import ActionLink from '@/components/shared/ActionLink'

export default function GiftCard({ gift: propsGift, box }: GiftCardProps) {
  const defaultColor = { 
    bg: 'var(--dt-mint-soft)', 
    text: '#0CA678', 
    border: '#96F2D7', 
    accent: '#0CA678' 
  }

  const gift = propsGift || (box ? {
    id: box.id,
    name: box.name,
    price: box.priceLabel,
    tagline: box.tagline,
    image: box.image,
    badge: box.badges[0],
    color: defaultColor,
    occasion: 'DiscoveryTown Curated',
    contents: ['Handpicked for your occasion'],
    url: box.url,
  } : null)

  if (!gift) return null

  // Ensure color exists for TypeScript
  const color = ('color' in gift && gift.color) ? gift.color : defaultColor

  return (
    <div className='dt-card-interactive flex flex-col rounded-[24px]' style={{ borderColor: color.border }}>
      <div className='h-[5px]' style={{ background: color.accent }} />
      <div className='flex-1 px-6 pb-0 pt-6'>
        {gift.badge ? (
          <div className='mb-3 inline-block'>
            <AccentPill color='#fff' background={color.accent}>
              {gift.badge}
            </AccentPill>
          </div>
        ) : null}
        <img src={gift.image} alt={gift.name} className='w-14 h-14 object-cover rounded-full mb-3 shadow-sm' />
        <div className='mb-1 dt-font-heading text-[1.15rem] font-black text-[var(--dt-navy)]'>{gift.name}</div>
        <div className='mb-1.5 dt-font-heading text-[1.3rem] font-black' style={{ color: color.accent }}>
          {gift.price}
        </div>
        <div className='mb-4 inline-block'>
          <span className='dt-pill-neutral'>{'occasion' in gift ? gift.occasion : 'Special Occasion'}</span>
        </div>
        {('highlight' in gift && gift.highlight) ? (
          <div
            className='mb-3 rounded-[10px] border-l-[3px] px-3.5 py-2.5 text-xs font-bold leading-[1.5]'
            style={{ background: color.bg, borderColor: color.accent, color: color.text }}
          >
            💡 {gift.highlight}
          </div>
        ) : null}
      </div>
      <div className='px-6 pb-6'>
        <div className='mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#AAA]'>
          What&apos;s Inside
        </div>
        <ul className='m-0 flex list-none flex-col gap-1.5 p-0'>
          {('contents' in gift && gift.contents) ? gift.contents.map(item => (
            <li key={item} className='flex items-start gap-2 text-[13px] leading-[1.5] text-[#555]'>
              <div className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full' style={{ background: color.accent }} />
              <span>{item}</span>
            </li>
          )) : (
            <li className='text-[13px] text-[#555]'>Curated gift items</li>
          )}
        </ul>
      </div>
      <div className='mt-auto border-t border-[#F0EDE8] px-6 pb-6 pt-4'>
        <ActionLink
          href={'url' in gift ? gift.url : `/checkout?category=gift&item=${slugify(gift.name)}`}
          accentColor={color.accent}
          className='w-full py-3 text-sm'
        >
          Order This Gift →
        </ActionLink>
      </div>
    </div>
  )
}
