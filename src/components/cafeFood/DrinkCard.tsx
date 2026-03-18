import type { DrinkCardProps } from './types'
import type { DrinkItem } from './types'

export default function DrinkCard({ item, accent = 'var(--dt-blue-mid)' }: DrinkCardProps) {
  return (
    <div className='relative rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-card)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,31,61,0.10)] group'>
      {/* Top accent bar */}
      <div className='h-[3px]' style={{ background: accent }} />

      <div className='px-5 py-4'>
        <p className='dt-font-heading text-[15px] font-black text-[var(--dt-dark)] leading-[1.3] mb-1.5'>{item.name}</p>

        {item.desc && <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.6]'>{item.desc}</p>}

        {item.variants && (
          <div className='mt-3 pt-3 border-t border-[var(--dt-border)] flex flex-col gap-2'>
            {item.variants.map(v => (
              <div key={v.label}>
                <p className='text-[10px] font-black tracking-[0.13em] uppercase mb-0.5' style={{ color: accent }}>
                  {v.label}
                </p>
                <p className='text-[12px] text-[var(--dt-text-muted)] leading-[1.5]'>{v.items}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
