import type { EmptyStateProps } from './types'
import type { FC } from 'react'

const EmptyState: FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className='rounded-[20px] border-[1.5px] border-dashed border-[#E5E0D8] bg-white px-8 py-14 text-center'>
      <span className='mb-3 block text-5xl'>🔍</span>
      <div className='mb-2 font-serif text-[1.4rem] font-bold text-[var(--dt-navy)]'>No classes found</div>
      <p className='mb-5 text-[15px] text-[#888]'>Try a different search term or reset your filters.</p>
      <button
        type='button'
        onClick={onReset}
        className='inline-flex items-center rounded-xl bg-[#4C6EF5] px-7 py-3 text-sm font-extrabold text-white shadow-[0_4px_14px_rgba(76,110,245,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(76,110,245,0.45)]'
      >
        Reset Filters
      </button>
    </div>
  )
}

export default EmptyState
