import type { CategoryTabsProps } from './types'
import type { FC } from 'react'
import type { ClassCategory } from '@/types/booking-types'

import { CATEGORY_EMOJIS, CATEGORY_LABELS } from './constants'
import type { CategoryFilter } from './types'

const CategoryTabs: FC<CategoryTabsProps> = ({ selectedCategory, onSelect }) => {
  return (
    <div className='mb-7 flex flex-wrap gap-2'>
      {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map(category => {
        const isActive = selectedCategory === category

        return (
          <button
            key={category}
            type='button'
            onClick={() => onSelect(category)}
            className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-1.5 text-[13px] font-bold transition ${
              isActive
                ? 'border-[#4C6EF5] bg-[#4C6EF5] text-white'
                : 'border-[#E5E0D8] bg-white text-[#888] hover:border-[#4C6EF5] hover:bg-[#F0F4FF] hover:text-[#4C6EF5]'
            }`}
          >
            {category !== 'all' && <span>{CATEGORY_EMOJIS[category as ClassCategory]}</span>}
            {CATEGORY_LABELS[category]}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
