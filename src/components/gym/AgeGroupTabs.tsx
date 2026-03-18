'use client'
import type { AgeGroupTabsProps } from './types'

import type { AgeGroup } from './types'

export default function AgeGroupTabs({ groups, activeId, onSelect }: AgeGroupTabsProps) {
  return (
    <div className='flex flex-wrap gap-2.5 mb-8'>
      {groups.map(group => {
        const isActive = activeId === group.id

        return (
          <button
            key={group.id}
            type='button'
            onClick={() => onSelect(group.id)}
            className={[
              'inline-flex flex-col items-start rounded-[14px] border-[1.5px] px-[18px] py-2.5 text-left transition-all duration-[180ms]',
              isActive
                ? 'text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
                : 'border-[var(--dt-border)] bg-[var(--dt-bg-card)] text-[var(--dt-text-muted)] hover:border-black/20 hover:text-[var(--dt-dark)]',
            ].join(' ')}
            style={isActive ? { background: group.color.accent, borderColor: group.color.accent } : undefined}
          >
            <span className='text-[13px] font-black'>{group.label}</span>
            <span className={`text-[11px] font-bold ${isActive ? 'opacity-80' : 'opacity-60'}`}>{group.range}</span>
          </button>
        )
      })}
    </div>
  )
}
