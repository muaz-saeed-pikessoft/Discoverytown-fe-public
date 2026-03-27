import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import BrandHeader from '@/portal/user/features/booking/components/BrandHeader'
import type { PublicService, ServiceType } from '@/types/scheduling.shared'
import { ServiceType as ServiceTypeEnum } from '@/types/scheduling.shared'
import { getServerApiBaseUrl } from '@/lib/api/server-base-url'
import OpenBookingWidget from '@/portal/user/features/booking/components/OpenBookingWidget'

function paramToServiceType(param: string): ServiceType | null {
  const normalized = param.toUpperCase().replaceAll('-', '_')
  return (Object.values(ServiceTypeEnum) as string[]).includes(normalized) ? (normalized as ServiceType) : null
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return (await res.json()) as T
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceType: string; id: string }>
}): Promise<Metadata> {
  const { id, serviceType } = await params
  const base = await getServerApiBaseUrl()
  const tenantId = ENV.TENANT_ID ? `tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''
  const services = await fetchJson<PublicService[]>(`${base}/api/v1/services/public${tenantId ? `?${tenantId}` : ''}`)
  const service = services.find(s => s.id === id)
  if (!service) return { title: 'Service not found' }

  return {
    title: `Book ${service.name} | Activities`,
    description: `Book ${service.name}. Choose your own time.`,
    alternates: ENV.SITE_URL ? { canonical: `${ENV.SITE_URL}${ROUTES.USER.ACTIVITY_OPEN_BOOK(serviceType, id)}` } : undefined,
  }
}

export default async function ActivityOpenBookingPage({
  params,
}: {
  params: Promise<{ serviceType: string; id: string }>
}) {
  const { serviceType, id } = await params
  const st = paramToServiceType(serviceType)
  if (!st) notFound()

  const base = await getServerApiBaseUrl()
  const tenantId = ENV.TENANT_ID ? `tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''
  const services = await fetchJson<PublicService[]>(`${base}/api/v1/services/public${tenantId ? `?${tenantId}` : ''}`)
  const service = services.find(s => s.id === id)
  if (!service) notFound()

  const imageUrl = (() => {
    const url = (service.metadata as Record<string, unknown> | undefined)?.imageUrl
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
          <BrandHeader name='DiscoveryTown' />

          <div className='grid gap-6 lg:grid-cols-[1.55fr_1fr]'>
            <div className='space-y-5'>
              <div className='overflow-hidden rounded-[28px] border border-black/[0.06] bg-white/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.08)]'>
                <div className='relative aspect-[16/7] w-full bg-[var(--dt-bg-page)]'>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.name}
                      fill
                      sizes='(min-width: 1024px) 66vw, 100vw'
                      loading='lazy'
                      className='object-cover'
                    />
                  ) : null}
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,59,0.05)_0%,rgba(20,35,59,0.7)_100%)]' />
                  <div className='absolute left-6 top-6 flex flex-wrap items-center gap-2'>
                    <span className='rounded-[999px] bg-white/90 px-3 py-1 text-[11px] font-black tracking-[0.12em] text-[var(--dt-navy)]'>
                      {service.serviceType.replaceAll('_', ' ')}
                    </span>
                    <span className='rounded-[999px] bg-white/90 px-3 py-1 text-[11px] font-black tracking-[0.12em] text-[var(--dt-navy)]'>
                      Open booking
                    </span>
                  </div>
                  <div className='absolute bottom-6 left-6 right-6'>
                    <h1 className='text-3xl font-black tracking-[-0.02em] text-white dt-font-heading'>{service.name}</h1>
                    <div className='mt-2 text-sm font-semibold text-white/85'>Choose your own time and duration.</div>
                  </div>
                </div>

                <div className='p-6'>
                  {service.description ? (
                    <p className='text-sm font-semibold text-[var(--dt-text-body)]/80'>{service.description}</p>
                  ) : (
                    <p className='text-sm font-semibold text-[var(--dt-text-body)]/70'>
                      Select a date, choose a start time, then pick how long you’d like to stay.
                    </p>
                  )}

                  <div className='mt-5 flex flex-wrap items-center gap-3'>
                    <div className='rounded-[16px] bg-[var(--dt-bg-page)] px-4 py-3'>
                      <div className='text-[11px] font-black uppercase tracking-[0.22em] text-[var(--dt-text-subtle)]'>From</div>
                      <div className='mt-1 text-base font-black text-[var(--dt-navy)]'>${service.basePrice}</div>
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
                <div className='mt-1 text-lg font-black text-[var(--dt-navy)] dt-font-heading'>Choose your time</div>
                <div className='mt-4'>
                  <OpenBookingWidget service={service} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

