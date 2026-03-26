'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ActionLink from '@/components/shared/ActionLink'
import FlowSteps from '@/components/shared/FlowSteps'
import Hero from '@/components/shared/Hero'
import Section from '@/components/shared/Section'
import SectionHeader from '@/components/shared/SectionHeader'
import SectionNav from '@/components/shared/SectionNav'
import SubLabel from '@/components/shared/SubLabel'
import AddonCategoryCards from './AddonCategoryCards'
import AddonGroupsSection from './AddonGroupsSection'
import { NAV_SECTIONS, ADDON_CATEGORY_CARDS, ADDON_GROUPS, TAKEOUT_CATEGORY_CARDS, TAKEOUT_GROUPS, TAKEOUT_IMAGE, WE_BRING_IMAGES, WE_BRING_SERVICES } from './constants'
import CtaStrip from './CtaStrip'
import PrivatePackageCard from './PrivatePackageCard'
import type { EventSection, PrivatePackageItem, VenuePackageItem } from './types'
import VenuePackageCard from './VenuePackageCard'
import WeBringServicesGrid from './WeBringServicesGrid'
import { getEventsPartyPageData } from '@/api/bookingApi'
import { QUERY_KEYS } from '@/constants/query-keys'
import { mapPartyPackageToPrivateItem, mapPartyPackageToVenueItem } from './partyPackageMappers'

export default function EventsPageClient() {
  const [active, setActive] = useState<EventSection>('packages')

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.USER.EVENTS_PARTY_PAGE,
    queryFn: getEventsPartyPageData,
  })

  const packages = data?.packages ?? []
  const catalog = data?.catalog

  const privatePackages: PrivatePackageItem[] = packages
    .filter(p => p.kind === 'private_room')
    .map(mapPartyPackageToPrivateItem)

  const venuePackages: VenuePackageItem[] = packages
    .filter(p => p.kind === 'venue_buyout')
    .map(mapPartyPackageToVenueItem)

  const addonCategoryCards = catalog?.addonCategoryCards ?? ADDON_CATEGORY_CARDS
  const addonGroups = catalog?.addonGroups ?? ADDON_GROUPS
  const takeoutCategoryCards = catalog?.takeoutCategoryCards ?? TAKEOUT_CATEGORY_CARDS
  const takeoutGroups = catalog?.takeoutGroups ?? TAKEOUT_GROUPS
  const weBringServices = catalog?.weBringServices ?? WE_BRING_SERVICES
  const weBringImages = catalog?.weBringImages ?? WE_BRING_IMAGES
  const takeoutBannerImage = catalog?.takeoutBannerImageUrl ?? TAKEOUT_IMAGE

  function scrollTo(id: EventSection) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV_SECTIONS.map(n => n.id)

    const handleScroll = () => {
      let cur: EventSection = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - 140 <= 0) cur = id
      }
      setActive(prev => (prev === cur ? prev : cur))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='dt-font-body bg-[var(--dt-bg-page)] min-h-screen'>
      <Hero
        title={
          <>
            Events & <em className='not-italic text-[var(--dt-hero-accent)]'>Parties</em>
          </>
        }
        description='From intimate gatherings to whole-venue buyouts, we host celebrations your kids will never forget.'
        bgUrl='/events/hero.jpg'
        actions={
          <>
            <ActionLink href='/book?service=events' accentColor='var(--dt-primary)' className='px-7 py-3.5 text-sm'>
              Start Booking
            </ActionLink>
            <ActionLink
              href='#packages'
              variant='outline'
              className='dt-btn-hero-outline px-7 py-3.5 text-sm !text-white border-white/30 bg-white/10'
            >
              View Packages
            </ActionLink>
          </>
        }
      />
      <SectionNav items={NAV_SECTIONS} active={active} onNav={scrollTo} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20'>
             <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
          </div>
        ) : (
          <>
            <FlowSteps
              eyebrow='How Party Booking Works'
              title='Guide families from package browsing to confirmation'
              description='Events now have a visible frontend booking path covering room packages, takeout parties, add-ons, and mobile party setups.'
              accentColor='var(--dt-primary)'
              primaryHref='/book?service=events'
              primaryLabel='Start Party Booking'
              secondaryHref='#packages'
              secondaryLabel='See Packages'
              steps={[
                {
                  title: 'Choose a format',
                  description: 'Start with room packages, full buyouts, takeout parties, or mobile setups.',
                },
                {
                  title: 'Add upgrades',
                  description: 'Use add-ons and party extras to shape the event around budget and guest count.',
                },
                {
                  title: 'Submit the request',
                  description: 'Open the booking flow with the package selected and send the event details.',
                },
              ]}
            />

            {/* ── PACKAGES ─────────────────────────────────────────────────────── */}
            <Section id='packages'>
              <SectionHeader
                eyebrow='Packages'
                title='Find the Right Package for Your Event'
                desc='Whether you need a private party room or the whole venue, we have a package built for your group size and budget.'
              />

              {/* Private Room */}
              <SubLabel text='Private Room & Open Play' />
              <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.65] mb-6 max-w-[600px]'>
                Book a dedicated party room while your guests enjoy full access to everything DiscoveryTown has to offer.
                All packages include 2 hours of party room time.
              </p>
              <div className='grid grid-cols-3 gap-5 mb-12 max-lg:grid-cols-1'>
                {privatePackages.map(pkg => (
                  <PrivatePackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>

              {/* Whole Venue */}
              <SubLabel text='Whole Place Buyout' />
              <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.65] mb-6 max-w-[600px]'>
                Exclusive access to all of DiscoveryTown — both party rooms, every play area, and a dedicated staff team.
                Built for big, unforgettable celebrations.
              </p>
              <div className='grid grid-cols-3 gap-5 max-lg:grid-cols-1'>
                {venuePackages.map(pkg => (
                  <VenuePackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </Section>

            {/* ── ADD-ONS ──────────────────────────────────────────────────────── */}
            <Section id='add-ons'>
              <SectionHeader
                eyebrow='Add-Ons & Upgrades'
                title='Customize Your Celebration'
                desc='Elevate any package with food upgrades, custom desserts, themed decor, entertainment, and more. Jump to a category below or scroll through everything.'
              />

              {/* Category jump cards — 5 across */}
              <AddonCategoryCards items={ADDON_CATEGORY_CARDS} />

              {/* All groups — each has its own id for the jump */}
              <AddonGroupsSection groups={ADDON_GROUPS} />

              <CtaStrip
                title='Need help choosing add-ons?'
                subtitle='Our team can help you build the perfect party package for your budget.'
                href='/contact'
                buttonText='Talk to Us'
              />
            </Section>

            {/* ── TAKEOUT PARTY ────────────────────────────────────────────────── */}
            <Section id='takeout-party'>
              <SectionHeader
                eyebrow='Take Out Party'
                title='Party Supplies, Ready to Go'
                desc='Hosting at home or another venue? Order everything you need from DiscoveryTown — food, desserts, decor, and favors — all packed up and ready for your party.'
              />

              {/* Split banner */}
              <div className='mb-8 grid grid-cols-[1fr_1.1fr] gap-0 rounded-[20px] border-[1.5px] border-[var(--dt-border)] overflow-hidden max-md:grid-cols-1'>
                <div className='overflow-hidden h-[220px] max-md:h-[200px]'>
                  <img src={takeoutBannerImage} alt='Take out party' className='h-full w-full object-cover' />
                </div>
                <div className='bg-[var(--dt-dark)] px-8 py-9 flex flex-col justify-center'>
                  <p className='text-[11px] font-black tracking-[0.16em] uppercase text-[var(--dt-teal-dark)] mb-2.5'>
                    Order & Pick Up
                  </p>
                  <h3 className='dt-font-heading text-[22px] font-black text-white leading-[1.2] mb-3'>Party Anywhere</h3>
                  <p className='text-[14px] text-white/60 leading-[1.7]'>
                    Can&apos;t host at DiscoveryTown? No problem. Order your party needs in advance and pick them up before
                    your event — from pizzas and cupcakes to balloon garlands and goodie bags.
                  </p>
                </div>
              </div>

              {/* Takeout category jump cards */}
              <AddonCategoryCards items={takeoutCategoryCards} />

              {/* Takeout groups — each has its own id */}
              <AddonGroupsSection groups={takeoutGroups} />

              <CtaStrip
                title='Ready to order your Take Out Party?'
                subtitle='Place your order at least 48 hours in advance for best availability.'
                href='/book'
                buttonText='Order Now'
              />
            </Section>

            {/* ── WE BRING THE PARTY ───────────────────────────────────────────── */}
            <Section id='we-bring-party'>
              <SectionHeader
                eyebrow='Party at your place'
                title='We Come to Your Venue'
                desc="Can't come to us? We'll bring the entire DiscoveryTown experience to your backyard, park, school, or event space. From inflatables and entertainers to full catering and setup."
              />

              <div className='mb-7'>
                <WeBringServicesGrid services={weBringServices} images={weBringImages} />
              </div>

              {/* Pricing note — matches Play page dark card style */}
              <div className='mb-6 rounded-[16px] border border-[var(--dt-border)] bg-[var(--dt-bg-card)] px-6 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'>
                <p className='text-[11px] font-black uppercase tracking-[0.13em] text-[var(--dt-text-subtle)] mb-1'>
                  Custom Pricing
                </p>
                <p className='text-[14px] font-black text-[var(--dt-dark)] mb-1'>Tailored to your event</p>
                <p className='text-[13px] text-[var(--dt-text-muted)] leading-[1.65]'>
                  Pricing depends on location, guest count, travel distance, and the services you select. Share your event
                  details and we&apos;ll build a custom quote for you.
                </p>
              </div>

              {/* CTA */}
              <CtaStrip
                title='Ready to bring the party to you?'
                subtitle="Tell us about your event, guest count, and location — we'll handle the rest."
                href='/contact'
                buttonText='Get a Quote'
              />
            </Section>
          </>
        )}
      </div>
    </div>
  )
}
