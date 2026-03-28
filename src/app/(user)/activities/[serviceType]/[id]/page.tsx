import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import BrandHeader from '@/portal/user/features/booking/components/BrandHeader'
import BookingWidgetClient from '@/portal/user/features/booking/components/BookingWidgetClient'
import type { PublicServiceSlot, ServiceType } from '@/types/scheduling.shared'
import { ServiceType as ServiceTypeEnum } from '@/types/scheduling.shared'
import { eventStructuredData } from '@/lib/seo/structured-data'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'

function paramToServiceType(param: string): ServiceType | null {
  const normalized = param.toUpperCase().replaceAll('-', '_')
  return (Object.values(ServiceTypeEnum) as string[]).includes(normalized) ? (normalized as ServiceType) : null
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return (await res.json()) as T
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceType: string; id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const base = await getServerApiBaseUrl()
  const tenantId = ENV.TENANT_ID ? `tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''
  const slot = await fetchJson<PublicServiceSlot>(`${base}/api/v1/calendar/public/${id}${tenantId ? `?${tenantId}` : ''}`)
  if (!slot) return { title: 'Session not found' }

  return {
    title: `${slot.service.name} | Activities`,
    description: `${slot.service.name} at ${slot.location.name}. Book online.`,
    alternates: ENV.SITE_URL
      ? { canonical: `${ENV.SITE_URL}${ROUTES.USER.ACTIVITY_DETAIL(slot.service.serviceType.toLowerCase().replaceAll('_', '-'), id)}` }
      : undefined,
  }
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ serviceType: string; id: string }>
}) {
  const { serviceType, id } = await params
  const st = paramToServiceType(serviceType)
  if (!st) notFound()

  const base = await getServerApiBaseUrl()
  const tenantId = ENV.TENANT_ID ? `tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''
  const slot = await fetchJson<PublicServiceSlot>(`${base}/api/v1/calendar/public/${id}${tenantId ? `?${tenantId}` : ''}`)
  if (!slot) notFound()

  const start = new Date(slot.startAt)
  const end = new Date(slot.endAt)
  const tenant = { name: 'DiscoveryTown', siteUrl: ENV.SITE_URL || '' }

  const imageUrl = (() => {
    const url = (slot.service.metadata as Record<string, unknown> | undefined)?.imageUrl
    if (typeof url !== 'string' || !url) return null
    try {
      const parsed = new URL(url)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
      return url
    } catch {
      return null
    }
  })()

  return (
    <div className='min-h-[calc(100vh-74px)] bg-[linear-gradient(135deg,#EEF4FF_0%,#FFF6EE_100%)] dt-font-body'>
      <div className='dt-container py-8'>
        <div className='space-y-6'>
          <BrandHeader name={tenant.name} />

          <div className='grid gap-6 lg:grid-cols-[1.55fr_1fr]'>
            <div className='space-y-5'>
              <div className='overflow-hidden rounded-[28px] border border-black/[0.06] bg-white/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='relative aspect-[16/7] w-full bg-[var(--dt-bg-page)]'>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={slot.service.name}
                      fill
                      sizes='(min-width: 1024px) 66vw, 100vw'
                      loading='lazy'
                      className='object-cover'
                    />
                  ) : null}
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,59,0.05)_0%,rgba(20,35,59,0.7)_100%)]' />
                  <div className='absolute left-6 top-6 flex flex-wrap items-center gap-2'>
                    <span className='rounded-[999px] bg-white/90 px-3 py-1 text-[11px] font-black tracking-[0.12em] text-[var(--dt-navy)]'>
                      {slot.service.serviceType.replaceAll('_', ' ')}
                    </span>
                    <span className='rounded-[999px] bg-white/90 px-3 py-1 text-[11px] font-black tracking-[0.12em] text-[var(--dt-navy)]'>
                      {slot.location.name}
                    </span>
                  </div>
                  <div className='absolute bottom-6 left-6 right-6'>
                    <h1 className='text-3xl font-black tracking-[-0.02em] text-white dt-font-heading'>{slot.service.name}</h1>
                    <div className='mt-2 text-sm font-semibold text-white/85'>
                      {start.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} ·{' '}
                      {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                      {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  {slot.service.description ? (
                    <p className='text-sm font-semibold text-[var(--dt-text-body)]/80'>{slot.service.description}</p>
                  ) : (
                    <p className='text-sm font-semibold text-[var(--dt-text-body)]/70'>
                      A fun session designed for all skill levels. Reserve your spot in minutes.
                    </p>
                  )}

                  <div className='mt-5 flex flex-wrap items-center gap-3'>
                    <div className='rounded-[16px] bg-[var(--dt-bg-page)] px-4 py-3'>
                      <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Price</div>
                      <div className='mt-1 text-base font-black text-[var(--dt-navy)]'>${slot.effectivePrice}</div>
                    </div>
                    <div className='rounded-[16px] bg-[var(--dt-bg-page)] px-4 py-3'>
                      <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Capacity</div>
                      <div className='mt-1 text-base font-black text-[var(--dt-navy)]'>{slot.effectiveCapacity}</div>
                    </div>
                    <div className='rounded-[16px] bg-[var(--dt-bg-page)] px-4 py-3'>
                      <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Availability</div>
                      <div className='mt-1 text-base font-black text-[var(--dt-navy)]'>
                        {slot.availableSpots <= 0 ? 'Full' : `${slot.availableSpots} left`}
                      </div>
                    </div>
                  </div>

                  <div className='mt-6'>
                    <Link
                      href={ROUTES.USER.ACTIVITIES}
                      className='inline-flex items-center gap-2 text-sm font-black text-[var(--dt-primary)] hover:underline'
                    >
                      ← Browse all activities
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='lg:sticky lg:top-6 h-fit'>
              <div className='rounded-[28px] border border-black/[0.06] bg-white/90 p-5 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>Ready to book?</div>
                <div className='mt-1 text-lg font-black text-[var(--dt-navy)] dt-font-heading'>Reserve your spot</div>
                <div className='mt-4'>
                  <BookingWidgetClient slot={slot} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ENV.SITE_URL ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: eventStructuredData(slot, { ...tenant, siteUrl: ENV.SITE_URL }),
          }}
        />
      ) : null}
    </div>
  )
}

