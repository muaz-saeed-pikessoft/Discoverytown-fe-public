import type { Metadata } from 'next'

import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'
import Hero from '@/components/shared/Hero'
import type { PublicService, PublicServiceSlot } from '@/types/scheduling.shared'
import ActivitiesCatalogClient from '@/portal/user/features/booking/components/ActivitiesCatalogClient'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return (await res.json()) as T
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Activities & Classes',
    description: 'Browse activities and book online.',
    alternates: ENV.SITE_URL ? { canonical: `${ENV.SITE_URL}${ROUTES.USER.ACTIVITIES}` } : undefined,
  }
}

export default async function ActivitiesPage() {
  const base = await getServerApiBaseUrl()
  const tenantIdParam = ENV.TENANT_ID ? `tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''

  const slotsUrl = `${base}/api/v1/calendar/public${tenantIdParam ? `?${tenantIdParam}` : ''}`
  const servicesUrl = `${base}/api/v1/services/public${tenantIdParam ? `?${tenantIdParam}` : ''}`
  const locationsUrl = `${base}/api/v1/locations${tenantIdParam ? `?${tenantIdParam}` : ''}`

  const [slots, services, locations] = await Promise.all([
    fetchJson<PublicServiceSlot[]>(slotsUrl).catch(() => [] as PublicServiceSlot[]),
    fetchJson<PublicService[]>(servicesUrl).catch(() => [] as PublicService[]),
    fetchJson<Array<{ id: string; name: string; address: string; city: string }>>(locationsUrl).catch(() => []),
  ])

  return (
    <div className='min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#EEF4FF_0%,#FFF6EE_100%)] dt-font-body'>
      <Hero
        title={
          <>
            <em className='not-italic text-[var(--dt-hero-accent)]'>Activities</em> & Classes
          </>
        }
        description='Pick between open-ended play and scheduled sessions, then book in a few clicks.'
        bgStyle={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80')",
          backgroundPosition: 'center 45%',
          backgroundSize: 'cover',
        }}
      />

      <div className='dt-container py-8'>
        <section id='activities-catalog'>
          <ActivitiesCatalogClient slots={slots} services={services} locations={locations} />
        </section>
      </div>
    </div>
  )
}

