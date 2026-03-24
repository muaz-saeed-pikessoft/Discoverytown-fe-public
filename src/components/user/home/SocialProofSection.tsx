import { testimonials } from './constants'

export default function SocialProofSection() {
  return (
    <section className='mx-auto w-full max-w-[1300px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20'>
      <div className='mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='dt-eyebrow mb-2 text-[var(--dt-coral)]'>Families Love It</p>
          <h2 className='dt-section-title'>Heard from parents like you</h2>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <span key={i} className='text-[#f5a855] text-[18px]'>
                ★
              </span>
            ))}
          </div>
          <span className='text-[13px] font-bold text-[var(--dt-text-muted)]'>4.9 / 5 · 2,400+ reviews</span>
        </div>
      </div>

      <div className='grid gap-5 sm:grid-cols-3'>
        {testimonials.map(t => (
          <div
            key={t.name}
            className='rounded-[22px] border border-black/[0.06] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
          >
            <div className='flex mb-3'>
              {[...Array(5)].map((_, i) => (
                <span key={i} className='text-[#f5a855] text-[14px]'>
                  ★
                </span>
              ))}
            </div>
            <p className='text-[14px] leading-[1.82] text-[var(--dt-navy)] mb-5'>"{t.quote}"</p>
            <div className='flex items-center gap-3'>
              <div
                className='h-9 w-9 rounded-full flex items-center justify-center text-[12px] font-black text-white shrink-0'
                style={{ background: t.color }}
              >
                {t.avatar}
              </div>
              <div>
                <p className='text-[13px] font-black text-[var(--dt-navy)]'>{t.name}</p>
                <p className='text-[11.5px] text-[var(--dt-text-muted)]'>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
