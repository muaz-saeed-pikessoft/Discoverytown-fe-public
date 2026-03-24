import type { FilterBarProps } from './types'
import React from 'react'
import AccentPill from '@/components/shared/AccentPill'
import { FILTER_TAGS } from './constants'
import type { FilterTag } from './types'

export default function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  return (
    <div className='mb-6 flex flex-wrap items-center gap-2.5'>
      <span className='text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--dt-text-subtle)]'>Filter:</span>
      {FILTER_TAGS.map(tag => (
        <button
          key={tag}
          type='button'
          onClick={() => setActiveFilter(tag)}
          className='transition-transform hover:-translate-y-px'
        >
          <AccentPill
            color={activeFilter === tag ? '#fff' : 'var(--dt-shop-purple)'}
            background={activeFilter === tag ? 'var(--dt-shop-purple)' : 'var(--dt-shop-purple-light)'}
            className='normal-case tracking-normal px-4 py-[7px] text-[13px]'
          >
            {tag === 'Sale' ? 'Sale ↓' : tag}
          </AccentPill>
        </button>
      ))}
    </div>
  )
}
