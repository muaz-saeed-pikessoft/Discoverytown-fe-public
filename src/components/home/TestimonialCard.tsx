import type { TestimonialCardProps } from './types'
import type { FC } from 'react'

import StarRating from './StarRating'
import type { TestimonialItem } from './types'

const TestimonialCard: FC<TestimonialCardProps> = ({ item, testimonial }) => {
  const data = item || testimonial
  if (!data) return null

  return (
    <article className='rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'>
      <div className='mb-2 font-serif text-[56px] leading-none text-[var(--dt-coral)]/30'>&quot;</div>
      <StarRating count={data.stars || 5} />
      <p className='mt-3 text-[15px] leading-[1.75] text-[#444]'>{data.text || data.quote}</p>
      <div className='mt-6 flex items-center gap-3'>
        <img src={data.avatar} alt={data.name} className='h-[46px] w-[46px] rounded-full object-cover' />
        <div>
          <div className='text-sm font-extrabold text-[var(--dt-navy)]'>{data.name}</div>
          <div className='text-xs text-[#999]'>{data.role}</div>
        </div>
      </div>
    </article>
  )
}

export default TestimonialCard
