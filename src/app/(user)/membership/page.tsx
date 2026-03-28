import type { Metadata } from 'next'
import Link from 'next/link'

import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'
import PlanComparisonCard from '@/portal/user/features/account/components/PlanComparisonCard'
import type { Plan } from '@/types/clients.shared'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Membership Plans',
    description: 'Join DiscoveryTown as a member and unlock exclusive benefits.',
    alternates: ENV.SITE_URL ? { canonical: `${ENV.SITE_URL}${ROUTES.USER.MEMBERSHIP}` } : undefined,
  }
}

export default async function MembershipPage() {
  const base = await getServerApiBaseUrl()
  const res = await fetch(`${base}/api/v1/plans`, { next: { revalidate: 300 } })
  const plans = (res.ok ? ((await res.json()) as Plan[]) : []) ?? []

  return (
    <div className='dt-container py-10'>
      <div className='mb-6'>
        <h1 className='text-3xl font-black text-gray-900'>Become a Member</h1>
        <p className='mt-2 text-sm font-semibold text-gray-600'>Choose a plan and enjoy discounted classes and priority booking.</p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {plans.map(plan => (
          <PlanComparisonCard key={plan.id} plan={plan} ctaLabel='Join Now' onCta={() => {}} />
        ))}
      </div>
      <div className='mt-8 text-sm font-semibold text-gray-600'>
        Already have an account?{' '}
        <Link href={ROUTES.USER.MY_MEMBERSHIP} className='text-blue-600 hover:underline'>
          Manage membership
        </Link>
      </div>
    </div>
  )
}

