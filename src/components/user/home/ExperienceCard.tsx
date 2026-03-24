import type { ExperienceCardProps } from './types'
import type { FC } from 'react'
import Link from 'next/link'

import type { ExperienceItem } from './types'

const ExperienceCard: FC<ExperienceCardProps> = ({ item }) => {
  return (
    <Link
      href={item.href}
      className='group flex flex-col overflow-hidden rounded-3xl bg-white no-underline shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]'
    >
      <div className='relative h-[200px] overflow-hidden'>
        <img
          src={item.image}
          alt={item.title}
          className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
        />
        <span className='absolute right-3.5 top-3.5 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-[var(--dt-navy)]'>
          {item.badge}
        </span>
        <div
          className='absolute -bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-[14px] text-2xl shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
          style={{ background: item.bg }}
        >
          {item.emoji}
        </div>
      </div>

      <div className='flex flex-1 flex-col px-6 pb-6 pt-8'>
        <h3 className='mb-2 font-serif text-[1.3rem] font-bold text-[var(--dt-navy)]'>{item.title}</h3>
        <p className='flex-1 text-sm leading-[1.65] text-[#666]'>{item.description}</p>
        <div
          className='mt-5 inline-flex items-center gap-1.5 text-[13px] font-extrabold transition-all group-hover:gap-2.5'
          style={{ color: item.color }}
        >
          Explore
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default ExperienceCard
