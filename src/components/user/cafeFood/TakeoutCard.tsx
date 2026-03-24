import Link from 'next/link'

const ROWS = [
  { label: 'Available', val: 'Every day during open hours' },
  { label: 'How to Order', val: 'Walk up to the cafe counter' },
  { label: 'Packaging', val: 'Eco-friendly takeout containers' },
  { label: 'Options', val: 'Full menu - hot, cold & frozen' },
]

function ArrowIcon() {
  return (
    <svg width='13' height='13' viewBox='0 0 14 14' fill='none'>
      <path d='M3 7h8M7 3l4 4-4 4' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default function TakeoutCard() {
  return (
    <div className='rounded-[20px] overflow-hidden grid grid-cols-2 max-md:grid-cols-1 border border-[var(--dt-border)] min-h-[280px] shadow-[0_8px_32px_rgba(90,55,10,0.1)]'>
      {/* Left — dark panel */}
      <div className='bg-[var(--dt-dark)] px-9 py-10 flex flex-col justify-center'>
        <p className='text-[10px] font-extrabold tracking-[0.2em] uppercase text-[var(--dt-primary)] mb-2.5'>
          Take Out
        </p>
        <h3 className='dt-font-heading text-[28px] font-bold text-white leading-[1.15] mb-3.5'>
          Order at
          <br />
          <span className='text-[var(--dt-hero-accent)] italic'>the Counter</span>
        </h3>
        <p className='text-[13px] text-white/60 leading-[1.8] mb-7 max-w-[250px]'>
          Everything on our menu is available to take out — hot or cold. Great for picnics, playdates, or dinner on the
          way home.
        </p>
        <Link
          href='/book'
          className='self-start inline-flex items-center gap-2 px-[22px] py-[11px] rounded-xl bg-[var(--dt-primary)] text-white text-[13px] font-extrabold tracking-[0.03em] no-underline transition-all duration-200 hover:bg-[#d4a84b]'
        >
          Order Now
          <ArrowIcon />
        </Link>
      </div>

      {/* Right — detail rows */}
      <div className='bg-[var(--dt-bg-card)] px-8 py-9 flex flex-col justify-center'>
        {ROWS.map((row, i, arr) => (
          <div
            key={row.label}
            className={['py-[14px]', i < arr.length - 1 ? 'border-b border-[var(--dt-border)]' : ''].join(' ')}
          >
            <p className='text-[9px] font-extrabold tracking-[0.16em] uppercase text-[var(--dt-text-subtle)] mb-1'>
              {row.label}
            </p>
            <p className='text-[14px] font-bold text-[var(--dt-dark)]'>{row.val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
