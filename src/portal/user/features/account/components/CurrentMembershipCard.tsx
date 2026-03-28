'use client'

import StatusBadge from '@/components/shared/StatusBadge'
import type { SubscriptionWithPlan } from '@/types/clients.shared'

interface CurrentMembershipCardProps {
  subscription: SubscriptionWithPlan
}

export default function CurrentMembershipCard({ subscription }: CurrentMembershipCardProps) {
  return (
    <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-6 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Current plan</div>
          <div className='mt-2 text-[20px] font-black tracking-[-0.02em] text-[var(--dt-navy)]'>{subscription.plan.name}</div>
        </div>
        <div className='flex items-center gap-2'>
          <StatusBadge status={subscription.status.toLowerCase()} variant='membership' />
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--dt-primary-light)] text-[20px]'>🎟️</div>
        </div>
      </div>

      <div className='mt-4 rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-4'>
        <div className='text-[13px] font-semibold text-[var(--dt-text-body)]'>
          <span className='font-black text-[var(--dt-navy)]'>{subscription.plan.billingCycle}</span>
          <span className='mx-2 text-[var(--dt-text-subtle)]'>•</span>${subscription.plan.price}
        </div>
      </div>
    </div>
  )
}

