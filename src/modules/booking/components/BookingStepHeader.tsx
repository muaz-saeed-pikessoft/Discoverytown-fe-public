import type { BookingStepHeaderProps } from './types'

export default function BookingStepHeader({
  eyebrow,
  title,
  sub,
  accentColor = 'var(--dt-teal)',
}: BookingStepHeaderProps) {
  return (
    <div className='mb-8'>
      <p className='dt-eyebrow mb-2' style={{ color: accentColor }}>
        {eyebrow}
      </p>
      <h2 className='dt-font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-black text-[var(--dt-navy)] leading-[1.1] mb-3'>
        {title}
      </h2>
      {sub && <p className='text-[15px] text-[var(--dt-text-muted)] leading-[1.75] max-w-[560px]'>{sub}</p>}
    </div>
  )
}
