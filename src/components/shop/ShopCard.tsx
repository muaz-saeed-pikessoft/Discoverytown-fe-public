import type { ShopCardProps } from './types'
import type { ShopItem } from './types'
import AccentPill from '../shared/AccentPill'
import ActionLink from '../shared/ActionLink'

export default function ShopCard({ item, href, showMaterial = false, showSizes = false, showAge = false }: ShopCardProps) {
  const badgeColor = item.badge === 'Sale' ? 'var(--dt-coral)' : item.badge === 'New' ? '#0CA678' : item.color

  return (
    <div
      className='dt-card-interactive flex flex-col'
      style={{ borderColor: item.border }}
    >
      <div className='h-[5px]' style={{ background: item.color }} />

      {item.badge ? (
        <div
          className='absolute ml-auto mr-3 mt-3 w-fit self-end'
          style={{ background: badgeColor }}
        >
          <AccentPill color='#fff' background={badgeColor}>
            {item.badge === 'Sale' ? 'Sale' : item.badge}
          </AccentPill>
        </div>
      ) : null}

      <div className='flex-1 px-[22px] pb-4 pt-5'>
        <img src={item.image} alt={item.name} className='w-[64px] h-[64px] object-cover rounded-[14px] mb-3 shadow-sm' />
        <div className='mb-1 text-[15px] font-extrabold text-[var(--dt-navy)]'>{item.name}</div>
        <div className='mb-3 text-[13px] leading-[1.6] text-[#666]'>{item.desc}</div>

        <div className='mb-3 flex flex-wrap gap-1.5'>
          {showAge && item.age ? (
            <AccentPill color={item.color} background={item.bg} className='normal-case tracking-normal text-[11px]'>
              Ages {item.age}
            </AccentPill>
          ) : null}
          {showSizes && item.sizes ? (
            <AccentPill color={item.color} background={item.bg} className='normal-case tracking-normal text-[11px]'>
              {item.sizes}
            </AccentPill>
          ) : null}
          {showMaterial && item.material ? (
            <span className='dt-pill-neutral'>{item.material}</span>
          ) : null}
        </div>
      </div>

      <div className='flex items-center justify-between gap-2.5 border-t border-[#F0EDE8] px-[22px] pb-5 pt-3.5'>
        <div>
          <div className='dt-font-heading text-[18px] font-black' style={{ color: item.color }}>
            {item.price}
          </div>
          {item.originalPrice ? <div className='text-xs text-[#AAA] line-through'>{item.originalPrice}</div> : null}
        </div>
        <ActionLink href={href} accentColor={item.color} className='px-[18px] py-[9px] text-[13px]'>
          Buy Now
        </ActionLink>
      </div>
    </div>
  )
}
