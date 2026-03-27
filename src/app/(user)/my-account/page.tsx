import type { Metadata } from 'next'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'
import AccountDashboardCard from '@/portal/user/features/account/components/AccountDashboardCard'
import AccountShell from '@/portal/user/features/account/components/AccountShell'

interface MyCreditsResponse {
  balance: string
  packs: Array<{ id: string }>
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 30 } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'My Account',
    robots: { index: false, follow: false },
  }
}

export default async function MyAccountPage() {
  const base = await getServerApiBaseUrl()
  const [profile, credits, subscription, documents] = await Promise.all([
    fetchJson<{ firstName: string }>(`${base}/api/v1/my-profile`),
    fetchJson<MyCreditsResponse>(`${base}/api/v1/my-credits`),
    fetchJson<{ plan?: { name: string } } | null>(`${base}/api/v1/my-subscription`),
    fetchJson<Array<{ id: string; signature: unknown | null }>>(`${base}/api/v1/my-documents`),
  ])

  const pendingDocs = (documents ?? []).filter(d => !d.signature).length
  const welcomeName = profile?.firstName ?? 'there'

  return (
    <AccountShell
      title={`Hello, ${welcomeName}!`}
      subtitle='Quickly manage your family, bookings, membership, and documents from one place.'
      actions={
        <>
          <Link
            href={ROUTES.USER.ACTIVITIES}
            className='rounded-[999px] border border-[var(--dt-border)] bg-white px-4 py-2.5 text-[14px] font-bold text-[var(--dt-text-body)] no-underline transition-all hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
          >
            Browse activities
          </Link>
          <Link href={ROUTES.USER.BOOK} className='dt-btn-primary px-5 py-2.5'>
            Book now
          </Link>
        </>
      }
    >
      <div className='space-y-6'>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          <AccountDashboardCard label='Credit balance' value={credits?.balance ?? '0'} href={ROUTES.USER.MY_CREDITS} icon='💳' />
          <AccountDashboardCard label='Class packs' value={String(credits?.packs.length ?? 0)} href={ROUTES.USER.MY_CREDITS} icon='🎫' />
          <AccountDashboardCard
            label='Membership'
            value={subscription?.plan?.name ?? 'No membership'}
            href={ROUTES.USER.MY_MEMBERSHIP}
            icon='🏷️'
          />
          <AccountDashboardCard label='Pending documents' value={String(pendingDocs)} href={ROUTES.USER.MY_DOCUMENTS} icon='📝' />
        </div>

        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          <AccountDashboardCard label='My family' value='Manage' href={ROUTES.USER.MY_FAMILY} icon='👨‍👩‍👧‍👦' />
          <AccountDashboardCard label='My bookings' value='View' href={ROUTES.USER.MY_BOOKINGS} icon='📅' />
          <AccountDashboardCard label='Profile' value='Update' href={ROUTES.USER.MY_PROFILE} icon='👤' />
        </div>
      </div>
    </AccountShell>
  )
}
