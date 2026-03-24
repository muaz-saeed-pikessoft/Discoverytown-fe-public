import type { DetailSectionProps, StatItem, StatsGridProps, DatesCardProps } from './types'
import type { FC, ReactNode } from 'react'

import type { CategoryColors } from './types'

export const DetailSection: FC<DetailSectionProps> = ({ title, children }) => {
  return (
    <section className='mb-7'>
      <h2 className='mb-3.5 flex items-center gap-2.5 font-serif text-[1.1rem] font-bold text-[var(--dt-navy)]'>
        {title}
        <span className='h-px flex-1 bg-[#F0EDE8]' />
      </h2>
      {children}
    </section>
  )
}

export const StatsGrid: FC<StatsGridProps> = ({ items }) => {
  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
      {items.map(item => (
        <div
          key={item.label}
          className='rounded-2xl border border-[#F0EDE8] bg-white px-3.5 py-[18px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
        >
          <div className='mb-2 text-[22px]'>{item.icon}</div>
          <div className='font-serif text-base font-bold leading-[1.2] text-[var(--dt-navy)]'>{item.value}</div>
          <div className='mt-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#AAA]'>{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export const DatesCard: FC<DatesCardProps> = ({ colors, startDate, endDate, schedule }) => {
  const rows = [
    {
      icon: '🟢',
      content: (
        <>
          <strong>Starts:</strong> {startDate}
        </>
      ),
    },
    {
      icon: '🔴',
      content: (
        <>
          <strong>Ends:</strong> {endDate}
        </>
      ),
    },
    { icon: '🔁', content: <>{schedule}</> },
  ]

  return (
    <div className='rounded-2xl border border-[#F0EDE8] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'>
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 py-1.5 text-sm leading-[1.5] text-[#555] ${index > 0 ? 'border-t border-[#F0EDE8]' : ''}`}
        >
          <span
            className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm'
            style={{ background: colors.bg }}
          >
            {row.icon}
          </span>
          <span>{row.content}</span>
        </div>
      ))}
    </div>
  )
}
