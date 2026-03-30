'use client'

import type { Plan } from '@/types/clients.shared'

interface PlanComparisonCardProps {
  plan: Plan
  ctaLabel?: string
  onCta?: () => void
}

export default function PlanComparisonCard({ plan, ctaLabel = 'Join Now', onCta }: PlanComparisonCardProps) {
  return (
    <div className='dt-card-interactive rounded-[20px] p-5'>
      <div className='text-sm font-black text-[var(--dt-navy)]'>{plan.name}</div>
      <div className='mt-1 text-xl font-black text-[var(--dt-primary)]'>${plan.price}</div>
      <div className='text-xs font-semibold text-[var(--dt-text-muted)]'>{plan.billingCycle}</div>
      <div className='mt-3 space-y-1'>
        {Object.entries(plan.benefits).map(([key, value]) => (
          <div key={key} className='text-xs font-semibold text-[var(--dt-text-muted)]'>
            {key}: {String(value)}
          </div>
        ))}
      </div>
      <button type='button' onClick={onCta} className='dt-btn-primary mt-4 h-9 px-3 text-xs'>
        {ctaLabel}
      </button>
    </div>
  )
}

