'use client'

import AccountShell from '@/portal/user/features/account/components/AccountShell'
import CurrentMembershipCard from '@/portal/user/features/account/components/CurrentMembershipCard'
import PlanComparisonCard from '@/portal/user/features/account/components/PlanComparisonCard'
import { useAvailablePlans, useMySubscription, useSubscribeToPlan } from '@/portal/user/features/account/hooks/useMySubscription'

export default function MyAccountMembershipPage() {
  const subscriptionQuery = useMySubscription()
  const plansQuery = useAvailablePlans()
  const subscribe = useSubscribeToPlan()

  const subscription = subscriptionQuery.data
  const plans = plansQuery.data ?? []

  return (
    <AccountShell title='Membership' subtitle='View your current membership or explore available plans.'>
      {subscription ? (
        <CurrentMembershipCard subscription={subscription} />
      ) : plans.length === 0 ? (
        <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-8 text-center shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
          <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--dt-primary-light)] text-[22px]'>🎟️</div>
          <div className='mt-4 text-[18px] font-black text-[var(--dt-navy)]'>No plans available</div>
          <div className='mt-2 text-[14px] font-semibold text-[var(--dt-text-body)]'>
            Please check back later or ask the front desk for current membership options.
          </div>
        </div>
      ) : (
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {plans.map(plan => (
            <PlanComparisonCard
              key={plan.id}
              plan={plan}
              onCta={() => subscribe.mutate({ planId: plan.id, input: { paymentMethodId: 'pm_mock_1' } })}
            />
          ))}
        </div>
      )}
    </AccountShell>
  )
}

