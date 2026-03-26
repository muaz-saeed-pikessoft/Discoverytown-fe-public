import type { MenuBoardProps } from './types'
import MenuCard from './MenuCard'
import type { MenuRow } from './pageTypes'

export default function MenuBoard({
  title,
  subtitle,
  accent,
  anchorId,
  rows,
  cartQty,
  onAdd,
  onRemove,
}: MenuBoardProps) {
  return (
    <div
      id={anchorId}
      className='rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-card)] overflow-hidden transition-shadow duration-200 shadow-[0_0_0_1px_rgba(29,127,229,0.08),0_8px_24px_rgba(10,15,30,0.07)] hover:shadow-[0_0_0_1px_rgba(29,127,229,0.16),0_12px_30px_rgba(10,15,30,0.09)] scroll-mt-[120px]'
    >
      <div className='px-5 py-4 border-b border-[var(--dt-border)]' style={{ background: `${accent}12` }}>
        <p className='dt-font-heading text-[18px] font-black leading-[1.2] mb-1' style={{ color: 'var(--dt-dark)' }}>
          {title}
        </p>
        {subtitle && <p className='text-[12px] text-[var(--dt-text-muted)] leading-[1.6]'>{subtitle}</p>}
        <div className='mt-2 h-px' style={{ background: `linear-gradient(to right, ${accent}80, transparent)` }} />
      </div>

      <div className='p-3'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4'>
          {rows.map(item => (
            <div key={item.id}>
              <MenuCard
                item={{
                  name: item.name,
                  desc: item.detail || 'Freshly prepared daily.',
                  priceLabel: item.priceLabel,
                  badge: item.badge,
                  image: item.img,
                }}
                accent={accent}
                qty={cartQty[item.id] ?? 0}
                onAdd={() => onAdd(item)}
                onRemove={() => onRemove(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
