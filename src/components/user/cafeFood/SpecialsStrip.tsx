import { SPECIALS } from './pageConstants'

export default function SpecialsStrip() {
  return (
    <div className='grid grid-cols-3 gap-3 mb-6 max-lg:grid-cols-3 max-md:grid-cols-1'>
      {SPECIALS.map(item => (
        <article
          key={item.title}
          className='rounded-xl border border-[var(--dt-border)] px-4 py-4'
          style={{ background: item.bg }}
        >
          <p className='text-[11px] font-black tracking-[0.14em] uppercase mb-1' style={{ color: item.color }}>
            Today&apos;s Special
          </p>
          <p className='dt-font-heading font-black text-[18px] leading-[1.25] text-[var(--dt-dark)] mb-1'>
            {item.title}
          </p>
          <p className='text-[12px] text-[var(--dt-text-muted)] mb-2'>{item.note}</p>
          <p className='text-[16px] font-black text-[var(--dt-dark)]'>{item.price}</p>
        </article>
      ))}
    </div>
  )
}
