import type { BookingProgressBarProps } from './types'

export default function BookingProgressBar({
  steps,
  current,
  accentColor = 'var(--dt-teal)',
}: BookingProgressBarProps) {
  return (
    <div className='flex items-center gap-0 w-full'>
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current

        return (
          <div key={label} className='flex items-center' style={{ flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div className='flex flex-col items-center gap-[5px]'>
              <div
                className='w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[13px] font-black transition-all duration-300'
                style={{
                  background: done ? 'var(--dt-teal)' : active ? accentColor : 'var(--dt-border)',
                  color: done || active ? '#fff' : 'var(--dt-text-subtle)',
                  boxShadow: active ? `0 0 0 4px color-mix(in srgb, ${accentColor} 20%, transparent)` : 'none',
                  border: active ? `2px solid ${accentColor}` : 'none',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                className='text-[10px] font-bold whitespace-nowrap'
                style={{
                  color: active ? accentColor : done ? 'var(--dt-teal)' : 'var(--dt-text-subtle)',
                }}
              >
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className='flex-1 h-[2px] mx-1.5 mb-[18px] transition-all duration-300'
                style={{ background: done ? 'var(--dt-teal)' : 'var(--dt-border)' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
