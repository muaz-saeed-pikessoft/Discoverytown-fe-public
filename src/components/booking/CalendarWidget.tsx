import type { CalendarWidgetProps } from './types'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function toIsoDate(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')

  return `${year}-${mm}-${dd}`
}

export default function CalendarWidget({
  month,
  year,
  highlightedDates = [],
  onDateSelect,
  selectedDate,
}: CalendarWidgetProps) {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const today = new Date()

  return (
    <div className='overflow-hidden rounded-[20px] border border-[#F0EDE8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]'>
      <div className='flex items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--dt-coral),#FF8E53)] px-5 pb-4 pt-[18px]'>
        <button
          className='flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white/20 text-white transition hover:bg-white/35'
          type='button'
          aria-label='Previous month'
        >
          <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
          </svg>
        </button>

        <div className='flex-1 text-center font-serif text-[1.1rem] font-bold text-white'>
          {MONTH_NAMES[month - 1]} {year}
        </div>

        <button
          className='flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white/20 text-white transition hover:bg-white/35'
          type='button'
          aria-label='Next month'
        >
          <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
        </button>
      </div>

      <div className='p-4'>
        <div className='grid grid-cols-7 gap-1'>
          {DAY_LABELS.map(day => (
            <div
              key={day}
              className='py-1.5 text-center text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#CCC]'
            >
              {day}
            </div>
          ))}

          {cells.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} />

            const iso = toIsoDate(year, month, day)
            const isHighlighted = highlightedDates.includes(iso)
            const isSelected = selectedDate === iso
            const isToday = day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear()

            const baseClass =
              'relative flex h-9 w-full items-center justify-center rounded-[10px] border-none text-[13px] font-semibold transition'

            const dateClass = isSelected
              ? 'cursor-pointer bg-[var(--dt-coral)] font-black text-white shadow-[0_4px_12px_rgba(255,107,107,0.35)] scale-[1.08]'
              : isHighlighted
                ? 'cursor-pointer bg-[var(--dt-coral-soft)] font-extrabold text-[var(--dt-coral)] hover:scale-[1.08] hover:bg-[var(--dt-coral)] hover:text-white'
                : isToday
                  ? 'cursor-default border-2 border-[var(--dt-coral)] font-extrabold text-[var(--dt-coral)]'
                  : 'cursor-default text-[#AAA]'

            return (
              <button
                key={iso}
                className={`${baseClass} ${dateClass}`}
                onClick={() => isHighlighted && onDateSelect?.(iso)}
                disabled={!isHighlighted && !isSelected}
                type='button'
                aria-label={`${day} ${MONTH_NAMES[month - 1]}`}
                aria-pressed={isSelected}
              >
                {day}
                {(isHighlighted || isSelected) && (
                  <span
                    className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-[var(--dt-coral)]'
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {highlightedDates.length > 0 && (
        <div className='flex items-center justify-center gap-1.5 px-4 pb-[14px] pt-2.5 text-[11px] font-semibold text-[#BBB]'>
          <div className='h-[7px] w-[7px] rounded-full bg-[var(--dt-coral)]' />
          Dates with available sessions
        </div>
      )}
    </div>
  )
}
