'use client'

import { useState } from 'react'

import { DAY_NAMES, MONTH_NAMES } from './config'
import type { MiniCalendarProps } from './types'

export default function MiniCalendar({ selected, onSelect, accentHex }: MiniCalendarProps) {
  const today = new Date()
  const [yr, setYr] = useState(today.getFullYear())
  const [mo, setMo] = useState(today.getMonth())

  const daysInMonth = new Date(yr, mo + 1, 0).getDate()
  const firstDay = new Date(yr, mo, 1).getDay()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const formatDate = (day: number) => `${yr}-${String(mo + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const isPast = (day: number) => {
    const currentDate = new Date()

    currentDate.setHours(0, 0, 0, 0)

    return new Date(yr, mo, day) < currentDate
  }

  const prevMonth = () => {
    if (mo === 0) {
      setMo(11)
      setYr(value => value - 1)
    } else {
      setMo(value => value - 1)
    }
  }

  const nextMonth = () => {
    if (mo === 11) {
      setMo(0)
      setYr(value => value + 1)
    } else {
      setMo(value => value + 1)
    }
  }

  return (
    <div className='overflow-hidden rounded-[16px] border-[1.5px] border-[var(--dt-border)] bg-white'>
      <div className='flex items-center justify-between border-b border-[var(--dt-border)] bg-[var(--dt-bg-page)] px-[18px] py-3.5'>
        <button
          type='button'
          onClick={prevMonth}
          className='flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[var(--dt-border)] bg-white text-[18px] text-[var(--dt-text-muted)] transition-colors hover:bg-[var(--dt-border)]'
        >
          ‹
        </button>
        <span className='text-[14px] font-extrabold text-[var(--dt-navy)]'>
          {MONTH_NAMES[mo]} {yr}
        </span>
        <button
          type='button'
          onClick={nextMonth}
          className='flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[var(--dt-border)] bg-white text-[18px] text-[var(--dt-text-muted)] transition-colors hover:bg-[var(--dt-border)]'
        >
          ›
        </button>
      </div>

      <div className='p-4'>
        <div className='mb-1.5 grid grid-cols-7 gap-[3px]'>
          {DAY_NAMES.map(day => (
            <div key={day} className='pb-1 text-center text-[10px] font-extrabold text-[var(--dt-text-subtle)]'>
              {day}
            </div>
          ))}
        </div>
        <div className='grid grid-cols-7 gap-[3px]'>
          {cells.map((day, index) => {
            if (!day) return <div key={index} />

            const dateString = formatDate(day)
            const isSelected = selected === dateString
            const pastDate = isPast(day)

            return (
              <button
                key={index}
                type='button'
                disabled={pastDate}
                onClick={() => onSelect(dateString)}
                className='h-[34px] rounded-lg border-none text-[13px] font-medium transition-all duration-150'
                style={{
                  background: isSelected ? accentHex : 'transparent',
                  color: pastDate ? 'var(--dt-text-subtle)' : isSelected ? '#fff' : 'var(--dt-text-body)',
                  fontWeight: isSelected ? 800 : undefined,
                  cursor: pastDate ? 'not-allowed' : 'pointer',
                  opacity: pastDate ? 0.4 : 1,
                }}
                onMouseEnter={event => {
                  if (!pastDate && !isSelected) event.currentTarget.style.background = 'var(--dt-bg-page)'
                }}
                onMouseLeave={event => {
                  if (!isSelected) event.currentTarget.style.background = 'transparent'
                }}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
