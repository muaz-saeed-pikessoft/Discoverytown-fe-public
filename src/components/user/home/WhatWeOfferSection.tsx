import Link from 'next/link'
import { categoryCards } from './constants'

export default function WhatWeOfferSection() {
  return (
    <section className='mx-auto w-full max-w-[1300px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20'>
      <div className='mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='dt-eyebrow mb-2 text-[var(--dt-primary)]'>What We Offer</p>
          <h2 className='dt-section-title'>
            One destination.
            <br className='hidden sm:block' /> Every reason to come back.
          </h2>
        </div>
        <Link href='/book' className='dt-btn-primary self-start sm:self-auto shrink-0'>
          Book Now
        </Link>
      </div>

      <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {categoryCards.map(card => (
          <article
            key={card.title}
            className='group overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(0,0,0,0.12)]'
          >
            <div className='relative h-[210px] overflow-hidden'>
              <img
                src={card.image}
                alt={card.title}
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[rgba(10,20,40,0.65)] to-transparent' />
              <div
                className='absolute left-4 top-4 rounded-full px-3 py-1 text-[10.5px] font-black uppercase tracking-[0.14em]'
                style={{ background: 'rgba(255,255,255,0.95)', color: card.accentHex }}
              >
                {card.title}
              </div>
            </div>
            <div className='p-5'>
              <h3 className='dt-font-heading text-[1.45rem] font-black leading-[1.05] text-[var(--dt-navy)]'>
                {card.title}
              </h3>
              <p className='mt-3 text-[13.5px] leading-[1.82] text-[var(--dt-text-muted)]'>{card.description}</p>
              <div className='mt-6 flex flex-wrap gap-2.5'>
                <Link href={card.actionHref} className='dt-btn-primary'>
                  {card.actionLabel}
                </Link>
                <Link href={card.href} className='dt-btn-outline'>
                  Learn More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
