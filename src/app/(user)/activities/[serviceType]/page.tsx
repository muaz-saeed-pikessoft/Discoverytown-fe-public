import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import PublicSlotCard from '@/portal/user/features/booking/components/PublicSlotCard'
import BrandHeader from '@/portal/user/features/booking/components/BrandHeader'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'
import type { PublicServiceSlot, ServiceType } from '@/types/scheduling.shared'
import { ServiceType as ServiceTypeEnum } from '@/types/scheduling.shared'

function paramToServiceType(param: string): ServiceType | null {
  const normalized = param.toUpperCase().replaceAll('-', '_')
  return (Object.values(ServiceTypeEnum) as string[]).includes(normalized) ? (normalized as ServiceType) : null
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return (await res.json()) as T
}

export async function generateStaticParams() {
  return Object.values(ServiceTypeEnum).map(t => ({ serviceType: t.toLowerCase().replaceAll('_', '-') }))
}

export async function generateMetadata({ params }: { params: Promise<{ serviceType: string }> }): Promise<Metadata> {
  const { serviceType } = await params
  return {
    title: `${serviceType} | Activities`,
    alternates: ENV.SITE_URL ? { canonical: `${ENV.SITE_URL}${ROUTES.USER.ACTIVITY_CATEGORY(serviceType)}` } : undefined,
  }
}

export default async function ActivityCategoryPage({ params }: { params: Promise<{ serviceType: string }> }) {
  const { serviceType } = await params
  const st = paramToServiceType(serviceType)
  if (!st) notFound()

  const base = await getServerApiBaseUrl()
  const query: string[] = []
  if (ENV.TENANT_ID) query.push(`tenantId=${encodeURIComponent(ENV.TENANT_ID)}`)
  query.push(`serviceType=${encodeURIComponent(st)}`)
  const url = `${base}/api/v1/calendar/public?${query.join('&')}`

  const slots = await fetchJson<PublicServiceSlot[]>(url).catch(() => [] as PublicServiceSlot[])

  return (
    <div className='mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8'>
      <BrandHeader name='DiscoveryTown' />
      <div className='rounded-2xl border border-base-300 bg-base-100 p-6'>
        <div className='text-lg font-black text-base-content'>{st.replaceAll('_', ' ')}</div>
        <div className='mt-1 text-sm font-semibold text-base-content/60'>Browse upcoming sessions and book online.</div>
      </div>

      {slots.length === 0 ? (
        <div className='rounded-2xl border border-base-300 bg-base-100 p-8 text-center'>
          <div className='text-lg font-black text-base-content'>No sessions found</div>
          <div className='mt-2 text-sm font-semibold text-base-content/60'>Try a different category.</div>
        </div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {slots.slice(0, 48).map(slot => (
            <PublicSlotCard key={slot.id} mode='scheduled' slot={slot} />
          ))}
        </div>
      )}
    </div>
  )
}

