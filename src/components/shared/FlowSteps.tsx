import type { FlowStep, FlowStepsProps } from './types'
import Link from 'next/link'

export default function FlowSteps({
  eyebrow,
  title,
  description,
  accentColor,
  steps,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: FlowStepsProps) {
  return (
    <section className='dt-surface mb-8 overflow-hidden rounded-[28px]'>
      <div className='grid gap-0 lg:grid-cols-[1.15fr_1fr]'>
        <div className='border-b border-[var(--dt-border)] px-7 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-9'>
          <p className='dt-eyebrow mb-2' style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h2 className='dt-section-title mb-3'>{title}</h2>
          <p className='dt-section-desc max-w-[560px]'>{description}</p>

          <div className='mt-6 flex flex-wrap gap-3'>
            <Link
              href={primaryHref}
              className='inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-black text-white no-underline transition hover:-translate-y-px'
              style={{ background: accentColor }}
            >
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className='inline-flex items-center justify-center rounded-xl border border-[var(--dt-border)] px-5 py-3 text-sm font-bold text-[var(--dt-navy)] no-underline transition hover:border-[var(--dt-text-subtle)]'
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className='grid gap-0 divide-y divide-[var(--dt-border)] bg-[linear-gradient(180deg,rgba(248,242,234,0.45),rgba(244,247,251,0.78))]'>
          {steps.map((step, index) => (
            <div key={step.title} className='flex gap-4 px-7 py-5 lg:px-8'>
              <div
                className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white'
                style={{ background: accentColor }}
              >
                {index + 1}
              </div>
              <div>
                <p className='mb-1 text-sm font-black text-[var(--dt-navy)]'>{step.title}</p>
                <p className='text-[13px] leading-[1.65] text-[var(--dt-text-muted)]'>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
