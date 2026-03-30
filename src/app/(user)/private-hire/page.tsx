import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'

import ActionLink from '@/components/shared/ActionLink'
import CtaStrip from '@/components/shared/CtaStrip'
import FlowSteps from '@/components/shared/FlowSteps'
import Hero from '@/components/shared/Hero'
import Section from '@/components/shared/Section'
import SectionHeader from '@/components/shared/SectionHeader'
import ENV from '@/config/env'
import { ROUTES } from '@/constants/routes'
import { breadcrumbStructuredData } from '@/lib/seo/structured-data'
import LocationVenueCard from '@/portal/user/features/privatehire/components/LocationVenueCard'
import PrivateHireClientSection from '@/portal/user/features/privatehire/components/PrivateHireClientSection'
import { ServiceType } from '@/types/scheduling.shared'
import type { PublicService } from '@/types/scheduling.shared'

const tenantName = process.env.NEXT_PUBLIC_TENANT_DISPLAY_NAME ?? 'Discovery Town'
const tenantCity = process.env.NEXT_PUBLIC_TENANT_CITY ?? 'Discoverytown'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Private Hire & Venue Rental | ${tenantName}`
  const description = `Book ${tenantName} exclusively for your event. Perfect for birthday parties, corporate events, and group sessions in ${tenantCity}.`
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: '/private-hire' },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

async function loadPageData(): Promise<{
  services: PublicService[]
  locations: Array<{ id: string; name: string; address: string | null; city: string | null }>
}> {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000'
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const base = ENV.SITE_URL || ENV.API_BASE_URL || `${proto}://${host}`
  const tenant = ENV.TENANT_ID ? `?tenantId=${encodeURIComponent(ENV.TENANT_ID)}` : ''
  try {
    const [svcRes, locRes] = await Promise.all([
      fetch(`${base}/api/v1/services/public${tenant}`, { next: { revalidate: 300 } }),
      fetch(`${base}/api/v1/locations${tenant}`, { next: { revalidate: 300 } }),
    ])

    const services = svcRes.ok ? ((await svcRes.json()) as PublicService[]) : []

    const locations = locRes.ok
      ? ((await locRes.json()) as Array<{ id: string; name: string; address: string | null; city: string | null }>)
      : []
    return { services, locations }
  } catch {
    return { services: [], locations: [] }
  }
}

function facilitiesFromMetadata(metadata: Record<string, unknown>): string[] {
  const raw = metadata.facilities
  if (!Array.isArray(raw)) return ['Flexible layout', 'On-site team']
  return raw.filter((x): x is string => typeof x === 'string')
}

function capacityFromMetadata(metadata: Record<string, unknown>, fallback: number): number {
  const c = metadata.capacity
  return typeof c === 'number' && c > 0 ? c : fallback
}

function imageUrlFromMetadata(metadata: Record<string, unknown>): string | null {
  const raw = metadata.imageUrl
  if (typeof raw !== 'string') return null
  const value = raw.trim()
  if (!value) return null
  try {
    const u = new URL(value)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null

    // Unsplash "page" URLs are not direct images; normalize to source CDN.
    // Example: https://unsplash.com/photos/close-up-photography-of-house-ashxH5TQ8Go
    if (u.hostname === 'unsplash.com') {
      const parts = u.pathname.split('/').filter(Boolean)
      if (parts[0] === 'photos' && parts.length >= 2) {
        const last = parts[parts.length - 1]
        const id = last.split('-').at(-1)
        if (id && id.length >= 6) {
          return `https://source.unsplash.com/${id}/1600x1200`
        }
      }
    }

    return value
  } catch {
    return null
  }
}

export default async function PrivateHirePage() {
  const { services, locations } = await loadPageData()
  const privateServices = services.filter(s => s.serviceType === ServiceType.PRIVATE_HIRE)

  const siteUrl = ENV.SITE_URL || ENV.NEXTAUTH_URL || ''

  const localBusinessJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: tenantName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: tenantCity,
    },
    url: siteUrl ? `${siteUrl}/private-hire` : undefined,
  })

  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Private venue hire — ${tenantName}`,
    description: `Exclusive venue rental and private hire at ${tenantName} in ${tenantCity}.`,
    areaServed: tenantCity,
    provider: { '@type': 'LocalBusiness', name: tenantName },
  })

  const breadcrumbJsonLd = breadcrumbStructuredData([
    { name: 'Home', url: siteUrl ? `${siteUrl}/` : '/' },
    { name: 'Private hire', url: siteUrl ? `${siteUrl}/private-hire` : '/private-hire' },
  ])

  const locationById = new Map(locations.map(l => [l.id, l]))

  const venuesForPicker = locations.map(l => ({ id: l.id, name: l.name, city: l.city }))

  const inquiryVenues = privateServices.map(s => {
    const locId = s.locationId ?? locations[0]?.id ?? ''
    const loc = locationById.get(locId)
    return {
      serviceId: s.id,
      locationId: locId,
      label: loc ? `${s.name} — ${loc.name}` : s.name,
    }
  })

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: localBusinessJsonLd }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      <div className='dt-font-body bg-[var(--dt-bg-page)] min-h-screen'>
        <Hero
          bgUrl='/images/stock/private-hire-hero.svg'
          title={
            <>
              Book the <em className='not-italic text-[var(--dt-hero-accent)]'>whole space</em>
            </>
          }
          description={`Available for private events, birthday parties, and corporate bookings at ${tenantName}.`}
          actions={
            <>
              <ActionLink
                href='#inquiry'
                accentColor='var(--dt-primary)'
                className='px-7 py-3.5 text-sm'
              >
                Enquire now
              </ActionLink>
              <ActionLink
                href='#venues'
                variant='outline'
                className='dt-btn-hero-outline px-7 py-3.5 text-sm !text-white border-white/30 bg-white/10'
              >
                Explore venues
              </ActionLink>
            </>
          }
          hasGrain
        />

        <div className='dt-container-play py-8 pb-20'>
          <nav className='dt-sub-label mb-6 text-[var(--dt-text-muted)]' aria-label='Breadcrumb'>
            <Link href={ROUTES.USER.HOME} className='hover:underline'>
              Home
            </Link>
            <span className='mx-2 opacity-60'>/</span>
            <span className='text-[var(--dt-navy)]'>Private hire</span>
          </nav>

          <FlowSteps
            eyebrow='How Private Hire Works'
            title='Pick a venue, choose a preferred time, and we’ll confirm'
            description='Use availability as a guide, then send an enquiry. Our team will confirm the slot, deposit, and final details.'
            accentColor='var(--dt-primary)'
            primaryHref='#availability'
            primaryLabel='Check availability'
            secondaryHref='#inquiry'
            secondaryLabel='Send enquiry'
            steps={[
              {
                title: 'Browse venues',
                description: 'Compare capacities and what’s included across locations.',
              },
              {
                title: 'Check availability',
                description: 'See suggested start times with no overlapping sessions for your duration.',
              },
              {
                title: 'Enquire',
                description: 'Share your dates and event details — we’ll follow up to confirm.',
              },
            ]}
          />

          <Section id='venues'>
            <SectionHeader
              eyebrow='Venues'
              title='Choose your space'
              description='Locations offering private hire — check capacity and what’s included.'
              accentColor='var(--dt-primary)'
            />

            <div className='grid gap-8 md:grid-cols-2'>
              {privateServices.length === 0 ? (
                <p className='text-sm text-[var(--dt-text-muted)]'>
                  Venue packages will appear here once configured.
                </p>
              ) : (
                privateServices.map(s => {
                  const loc = s.locationId ? locationById.get(s.locationId) : undefined
                  const meta = s.metadata as Record<string, unknown>
                  return (
                    <LocationVenueCard
                      key={s.id}
                      title={s.name}
                      city={loc?.city ?? tenantCity}
                      capacity={capacityFromMetadata(meta, 60)}
                      facilities={facilitiesFromMetadata(meta)}
                      imageUrl={imageUrlFromMetadata(meta)}
                    />
                  )
                })
              )}
            </div>
          </Section>

          <Section id='included'>
            <SectionHeader
              eyebrow='Included'
              title='What’s typically included'
              description='Final inclusions and pricing are confirmed after enquiry.'
              accentColor='var(--dt-primary)'
            />

            <div className='grid gap-6 sm:grid-cols-3'>
              {['Dedicated host', 'Flexible setup', 'Optional catering add-ons'].map(x => (
                <div key={x} className='dt-card-interactive rounded-[20px] p-6 text-center'>
                  <div
                    className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--dt-primary-light)] text-[22px]'
                    aria-hidden
                  >
                    ✨
                  </div>
                  <p className='mt-3 text-sm font-black text-[var(--dt-navy)]'>{x}</p>
                </div>
              ))}
            </div>
          </Section>

          <PrivateHireClientSection locations={venuesForPicker} inquiryVenues={inquiryVenues} />

          <Section id='faq'>
            <SectionHeader
              eyebrow='FAQ'
              title='Common questions'
              description='If you’re unsure, send an enquiry — we’ll help.'
              accentColor='var(--dt-primary)'
            />

            <div className='space-y-3'>
              {[
                {
                  q: 'How far in advance should I book?',
                  a: 'We recommend at least 4–6 weeks for weekends. Shorter notice may be possible — ask in your enquiry.',
                },
                {
                  q: 'Is a deposit required?',
                  a: 'Yes — a deposit secures your date. The remaining balance is due before the event.',
                },
                {
                  q: 'Can we bring our own catering?',
                  a: 'Policies vary by location. Mention your plans in the enquiry and our team will confirm options.',
                },
              ].map(item => (
                <details key={item.q} className='dt-card-interactive rounded-[20px] px-6 py-5'>
                  <summary className='cursor-pointer text-sm font-black text-[var(--dt-navy)]'>
                    {item.q}
                  </summary>
                  <p className='mt-2 text-sm leading-[1.8] text-[var(--dt-text-muted)]'>{item.a}</p>
                </details>
              ))}
            </div>
          </Section>

          <CtaStrip
            title='Ready to plan your event?'
            subtitle='Send an enquiry and we’ll confirm availability, deposits, and next steps.'
            primaryHref='#inquiry'
            primaryLabel='Enquire now'
            primaryColor='var(--dt-primary)'
            secondaryHref={ROUTES.USER.CONTACT}
            secondaryLabel='Contact us'
          />
        </div>
      </div>
    </>
  )
}
