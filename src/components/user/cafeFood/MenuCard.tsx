import type { MenuCardItem, MenuCardProps } from './types'

function imageFor(item: MenuCardItem) {
  if (item.image) return item.image

  const seed = encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'))

  return `https://picsum.photos/seed/${seed}/800/520`
}

export default function MenuCard({ item, accent = 'var(--dt-blue-mid)', qty = 0, onAdd, onRemove }: MenuCardProps) {
  return (
    <article className='group rounded-[18px] border border-[var(--dt-border)] bg-[var(--dt-bg-card)] overflow-hidden transition-all duration-200 shadow-[0_0_0_1px_rgba(29,127,229,0.12),0_8px_22px_rgba(15,31,61,0.07)] hover:-translate-y-[4px] hover:shadow-[0_0_0_1px_rgba(29,127,229,0.2),0_16px_40px_rgba(15,31,61,0.13)]'>
      <div className='relative aspect-[4/3] overflow-hidden bg-[var(--dt-primary-light)]'>
        <img
          src={imageFor(item)}
          alt={item.name}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />

        {item.badge && (
          <span
            className='absolute top-3 right-3 text-[10px] font-black tracking-[0.08em] uppercase text-white px-2.5 py-[3px] rounded-full'
            style={{ background: accent }}
          >
            {item.badge}
          </span>
        )}
      </div>

      <div className='px-4 pt-4 pb-4'>
        <p className='dt-font-heading text-[18px] font-black text-[var(--dt-dark)] leading-[1.2] mb-1.5'>{item.name}</p>
        <p className='text-[12px] text-[var(--dt-text-muted)] leading-[1.6] min-h-[40px]'>{item.desc}</p>

        <div className='mt-3.5 flex items-center justify-between gap-2'>
          <p className='dt-font-heading text-[18px] font-bold text-[var(--dt-dark)]'>{item.priceLabel}</p>

          {qty > 0 ? (
            <div className='inline-flex items-center rounded-lg border border-black/[0.14] overflow-hidden bg-[var(--dt-bg-card)]'>
              <button
                type='button'
                onClick={onRemove}
                className='w-[28px] h-[28px] border-none bg-transparent cursor-pointer text-[14px] font-bold text-black/60 transition-colors duration-150 hover:text-black/80'
              >
                -
              </button>
              <span className='min-w-[24px] px-1.5 text-center text-[11px] font-bold tracking-wide text-[var(--dt-dark)]'>
                {qty}
              </span>
              <button
                type='button'
                onClick={onAdd}
                className='w-[28px] h-[28px] border-none cursor-pointer text-[14px] font-bold text-white bg-[var(--dt-teal-dark)] transition-colors duration-150 hover:bg-[var(--dt-teal)]'
              >
                +
              </button>
            </div>
          ) : (
            <button
              type='button'
              onClick={onAdd}
              className='px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide cursor-pointer transition-all duration-200 whitespace-nowrap border bg-transparent border-black/[0.14] text-black/60 hover:text-white hover:border-[var(--dt-teal-dark)] hover:bg-[var(--dt-teal-dark)]'
            >
              Add +
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
