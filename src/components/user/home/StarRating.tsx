import type { StarRatingProps } from './types'
import type { FC } from 'react'

const StarRating: FC<StarRatingProps> = ({ count }) => {
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className='text-sm text-[#FFD93D]'>
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
