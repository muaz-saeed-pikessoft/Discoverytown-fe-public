import type { FiltersBarProps } from './types'
import type { ChangeEvent, FC } from 'react'

import { SORT_OPTIONS } from './constants'
import type { SortOption } from './types'

const FiltersBar: FC<FiltersBarProps> = ({
  searchQuery,
  sortBy,
  hasActiveFilters,
  onSearchChange,
  onSortChange,
  onClear,
}) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption)
  }

  return (
    <div className='mb-6 rounded-[20px] border border-[#F0EDE8] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:p-6'>
      <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-2 xl:grid-cols-[1fr_220px_auto]'>
        <div>
          <label htmlFor='classes-search' className='mb-2 block text-[13px] font-bold text-[var(--dt-navy)]'>
            Search
          </label>
          <input
            id='classes-search'
            type='text'
            value={searchQuery}
            onChange={event => onSearchChange(event.target.value)}
            placeholder='Title, instructor, or keyword...'
            className='w-full rounded-xl border-[1.5px] border-[#E5E0D8] px-4 py-2.5 text-sm text-[var(--dt-navy)] outline-none transition focus:border-[#4C6EF5] focus:shadow-[0_0_0_3px_rgba(76,110,245,0.12)]'
          />
        </div>

        <div>
          <label htmlFor='classes-sort' className='mb-2 block text-[13px] font-bold text-[var(--dt-navy)]'>
            Sort By
          </label>
          <select
            id='classes-sort'
            value={sortBy}
            onChange={handleSortChange}
            className='w-full cursor-pointer appearance-none rounded-xl border-[1.5px] border-[#E5E0D8] bg-white px-4 py-2.5 text-sm text-[var(--dt-navy)] outline-none transition focus:border-[#4C6EF5] focus:shadow-[0_0_0_3px_rgba(76,110,245,0.12)]'
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type='button'
          onClick={onClear}
          disabled={!hasActiveFilters}
          className='h-[42px] rounded-xl border-[1.5px] border-[#E5E0D8] px-5 text-sm font-bold text-[#888] transition hover:border-[var(--dt-coral)] hover:text-[var(--dt-coral)] disabled:cursor-not-allowed disabled:opacity-40'
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersBar
