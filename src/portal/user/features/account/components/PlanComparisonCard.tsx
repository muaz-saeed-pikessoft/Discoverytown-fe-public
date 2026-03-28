'use client'

import type { Plan } from '@/types/clients.shared'

interface PlanComparisonCardProps {
  plan: Plan
  ctaLabel?: string
  onCta?: () => void
}

export default function PlanComparisonCard({ plan, ctaLabel = 'Join Now', onCta }: PlanComparisonCardProps) {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-5'>
      <div className='text-sm font-black text-gray-900'>{plan.name}</div>
      <div className='mt-1 text-xl font-black text-blue-700'>${plan.price}</div>
      <div className='text-xs font-semibold text-gray-500'>{plan.billingCycle}</div>
      <div className='mt-3 space-y-1'>
        {Object.entries(plan.benefits).map(([key, value]) => (
          <div key={key} className='text-xs font-semibold text-gray-600'>
            {key}: {String(value)}
          </div>
        ))}
      </div>
      <button type='button' onClick={onCta} className='mt-4 h-9 rounded-lg bg-blue-600 px-3 text-xs font-black text-white'>
        {ctaLabel}
      </button>
    </div>
  )
}

