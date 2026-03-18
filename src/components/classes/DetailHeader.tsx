import type { DetailHeaderProps } from './types'
import type { FC } from 'react'
import Link from 'next/link'

import { CATEGORY_EMOJIS, CATEGORY_LABELS } from './constants'
import type { CategoryColors, ClassItem } from './types'

const DetailHeader: FC<DetailHeaderProps> = ({ item, colors, isFull, isAlmostFull }) => {
  return (
    <>
      <div className='border-b border-[#F0EDE8] bg-white py-3.5'>
        <div className='mx-auto max-w-[1280px] px-5 md:px-8'>
          <ul className='flex items-center gap-1.5 text-[13px] font-semibold text-[#AAA]'>
            <li>
              <Link className='text-[#4C6EF5] hover:underline' href='/'>
                Home
              </Link>
            </li>
            <li className='text-[#DDD]'>›</li>
            <li>
              <Link className='text-[#4C6EF5] hover:underline' href='/classes'>
                Classes
              </Link>
            </li>
            <li className='text-[#DDD]'>›</li>
            <li className='truncate text-[#AAA]'>{item.title}</li>
          </ul>
        </div>
      </div>

      <section
        className='relative overflow-hidden border-b border-black/5 py-11'
        style={{ background: colors.gradient }}
      >
        <div className='pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0%,transparent_70%)]' />
        <div className='mx-auto max-w-[1280px] px-5 md:px-8'>
          <div
            className='mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em]'
            style={{ color: colors.accent }}
          >
            <span className='h-[3px] w-5 rounded' style={{ background: colors.accent }} />
            {CATEGORY_EMOJIS[item.category]} {CATEGORY_LABELS[item.category]}
          </div>

          <h1 className='font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-black leading-[1.1] text-[var(--dt-navy)]'>
            {item.title}
          </h1>
          <p className='mb-5 mt-2 text-[15px] font-semibold text-[#666]'>Taught by {item.instructor}</p>

          <div className='flex flex-wrap gap-2'>
            {isFull && (
              <span className='inline-flex rounded-full border-[1.5px] border-[#FFD0D0] bg-[var(--dt-coral-soft)] px-3.5 py-1 text-xs font-bold text-[var(--dt-coral)]'>
                🔴 Waitlist Only
              </span>
            )}
            {isAlmostFull && (
              <span className='inline-flex rounded-full border-[1.5px] border-[#FDE68A] bg-[#FFFBEB] px-3.5 py-1 text-xs font-bold text-[#D97706]'>
                ⚠️ Almost Full
              </span>
            )}
            {item.tags.map(tag => (
              <span
                key={tag}
                className='inline-flex rounded-full border-[1.5px] border-[#E5E0D8] bg-white px-3.5 py-1 text-xs font-bold text-[#666]'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default DetailHeader
