import type { ScheduleSectionProps } from './types'
import type { ScheduleDay } from './types'

export default function ScheduleSection({ days }: ScheduleSectionProps) {
  return (
    <>
      {/* Concurrent programming callout — matches Play page dark card style */}
      <div className='mb-8 grid grid-cols-[1fr_1.1fr] gap-0 rounded-[20px] border-[1.5px] border-[var(--dt-border)] overflow-hidden max-md:grid-cols-1'>
        <div className='bg-[var(--dt-dark)] px-8 py-8 flex flex-col justify-center'>
          <p className='text-[11px] font-black tracking-[0.16em] uppercase text-[var(--dt-teal-dark)] mb-2'>
            Our Approach
          </p>
          <h3 className='dt-font-heading text-[20px] font-black text-white leading-[1.2] mb-3'>
            Concurrent Programming
          </h3>
          <p className='text-[14px] text-white/60 leading-[1.7]'>
            Instead of asking a parent to sit in the lobby while their child takes a class, we offer an adult class at
            the exact same time. Multiple generations work out simultaneously — everyone wins.
          </p>
        </div>
        <div className='bg-[var(--dt-bg-page)] px-8 py-8 flex flex-col justify-center border-l border-[var(--dt-border)] max-md:border-l-0 max-md:border-t'>
          <p className='text-[11px] font-black uppercase tracking-[0.13em] text-[var(--dt-text-subtle)] mb-2'>
            Lobby Lizard Discount
          </p>
          <p className='dt-font-heading text-[22px] font-black text-[var(--dt-dark)] mb-2'>50% off adult class</p>
          <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.65]'>
            Sign your child up for a class and get the concurrent adult class at half price. Turns a waiting parent into
            a happy, active member.
          </p>
        </div>
      </div>

      {/* Day jump buttons */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {days.map(day => (
          <button
            key={day.day}
            type='button'
            className='rounded-full border-[1.5px] px-5 py-[9px] text-[13px] font-bold text-white transition-all duration-[150ms] hover:-translate-y-[1px]'
            style={{ background: day.color, borderColor: day.color }}
            onClick={() =>
              document.getElementById(`sched-${day.day}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Day cards */}
      <div className='flex flex-col gap-5'>
        {days.map(day => (
          <div
            key={day.day}
            id={`sched-${day.day}`}
            className='overflow-hidden rounded-[20px] border-[1.5px] border-[var(--dt-border)] bg-white shadow-[0_2px_14px_rgba(0,0,0,0.04)] scroll-mt-[140px]'
          >
            {/* Day header */}
            <div
              className='border-b border-[var(--dt-border)] px-7 py-5'
              style={{ borderLeft: `4px solid ${day.color}` }}
            >
              <h3 className='dt-font-heading text-[20px] font-black text-[var(--dt-dark)] mb-0.5'>{day.day}</h3>
              <p className='text-[13px] font-semibold' style={{ color: day.color }}>
                {day.label} — {day.desc}
              </p>
            </div>

            {/* Slots */}
            <div className='py-2'>
              {day.slots.map((slot, si) => (
                <div
                  key={`${day.day}-${si}`}
                  className='grid grid-cols-[160px_1fr] gap-5 border-b border-[var(--dt-border)] px-7 py-4 last:border-b-0 max-sm:grid-cols-1 max-sm:gap-2'
                >
                  <div className='pt-[3px] text-[12px] font-black text-[var(--dt-text-subtle)] whitespace-nowrap'>
                    {slot.time}
                  </div>
                  <div className='flex flex-col gap-2'>
                    {slot.simultaneous && (
                      <span
                        className='self-start inline-block rounded-full px-2.5 py-[3px] text-[10px] font-black uppercase tracking-[0.08em] text-white mb-1'
                        style={{ background: 'var(--dt-primary)' }}
                      >
                        Simultaneous — Multiple Studios
                      </span>
                    )}
                    {slot.studios.map((studio, idx) => (
                      <div key={idx} className='flex items-start gap-2.5'>
                        {studio.studio !== '–' && studio.studio !== '-' && (
                          <span className='min-w-[70px] pt-[3px] text-[11px] font-black uppercase tracking-[0.06em] text-[var(--dt-text-subtle)] whitespace-nowrap'>
                            {studio.studio}
                          </span>
                        )}
                        <div className='flex-1 text-[13px] font-bold text-[var(--dt-dark)]'>
                          {studio.label}
                          {studio.tag && (
                            <span
                              className='ml-2 inline-block rounded-full px-2.5 py-[3px] text-[11px] font-black text-white'
                              style={{ background: studio.tagColor }}
                            >
                              {studio.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
