'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ActionLink from '@/components/shared/ActionLink'
import CtaStrip from '@/components/shared/CtaStrip'
import FlowSteps from '@/components/shared/FlowSteps'
import Hero from '@/components/shared/Hero'
import Section from '@/components/shared/Section'
import SectionHeader from '@/components/shared/SectionHeader'
import SectionNav from '@/components/shared/SectionNav'
import SubLabel from '@/components/shared/SubLabel'
import CampCard from './CampCard'
import FestivalCard from './FestivalCard'
import FieldTrips from './FieldTrips'
import PNOSection from './PNOSection'
import PassCard from './PassCard'
import PrivatePlayCards from './PrivatePlayCards'
import WeBringServicesGrid from './WeBringServicesGrid'
import { getEvents, getClasses, getPartyPackages } from '@/api/bookingApi'
import {
  PASSES,
  NAV,
  PNO,
  PNO_IMAGES,
  WE_BRING,
  WE_BRING_IMGS,
} from './constants'
import type { SectionId } from './types'

export default function PlayPageClient() {
  const [active, setActive] = useState<SectionId>('open-play')

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['play', 'events'],
    queryFn: getEvents,
  })

  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ['play', 'classes'],
    queryFn: getClasses,
  })

  const { data: packages = [], isLoading: packagesLoading } = useQuery({
    queryKey: ['play', 'packages'],
    queryFn: getPartyPackages,
  })

  const playPageLoading = eventsLoading || classesLoading || packagesLoading

  function scrollTo(id: SectionId) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (playPageLoading) return

    const ids = NAV.map(n => n.id) as SectionId[]

    // Below fixed navbar + sticky section nav (~74px + bar).
    const ACTIVATION_OFFSET_PX = 148

    function updateActiveFromScroll() {
      let cur: SectionId = ids[0]
      let matched = false

      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i])
        if (!el) continue

        const nextEl = i + 1 < ids.length ? document.getElementById(ids[i + 1]) : null
        const top = el.getBoundingClientRect().top
        const nextTop = nextEl ? nextEl.getBoundingClientRect().top : Number.POSITIVE_INFINITY

        // Active = this section has started (top at/above line) and the next has not yet reached the line.
        if (top <= ACTIVATION_OFFSET_PX && nextTop > ACTIVATION_OFFSET_PX) {
          cur = ids[i]
          matched = true
          break
        }
      }

      if (!matched) {
        const firstEl = document.getElementById(ids[0])
        if (firstEl && firstEl.getBoundingClientRect().top > ACTIVATION_OFFSET_PX) {
          cur = ids[0]
        } else {
          for (let j = ids.length - 1; j >= 0; j--) {
            const el = document.getElementById(ids[j])
            if (el) {
              cur = ids[j]
              break
            }
          }
        }
      }

      setActive(prev => (prev === cur ? prev : cur))
    }

    updateActiveFromScroll()
    requestAnimationFrame(updateActiveFromScroll)

    window.addEventListener('scroll', updateActiveFromScroll, { passive: true })
    window.addEventListener('resize', updateActiveFromScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll)
      window.removeEventListener('resize', updateActiveFromScroll)
    }
  }, [playPageLoading])

  return (
    <div className='dt-font-body bg-[var(--dt-bg-page)] min-h-screen'>
      <Hero
        title={
          <>
            Where Every Kid&apos;s <em className='not-italic text-[var(--dt-hero-accent)]'>Adventure</em> Begins
          </>
        }
        description='Book unforgettable experiences from open play to magical camps, parties and more. Fun starts here.'
        bgUrl='/play/backimg3.jpeg'
        actions={
          <>
            <ActionLink href='/book' accentColor='var(--dt-teal)' className='px-7 py-3.5 text-sm'>
              Book Now
            </ActionLink>
            <ActionLink
              href='#open-play'
              variant='outline'
              className='dt-btn-hero-outline px-7 py-3.5 text-sm !text-white border-white/30 bg-white/10'
            >
              Explore Activities
            </ActionLink>
          </>
        }
      />
      <SectionNav active={active} onNav={scrollTo} items={NAV} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        {playPageLoading ? (
          <div className='flex items-center justify-center py-20'>
             <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
          </div>
        ) : (
          <>
            <FlowSteps
              eyebrow='How Play Booking Works'
              title='Every play option now has a clear next step'
              description='Open play, camps, parents night out, field trips, and mobile experiences should all point into booking instead of leaving families guessing.'
              accentColor='var(--dt-teal)'
              primaryHref='/book'
              primaryLabel='Open Booking Flow'
              secondaryHref='#open-play'
              secondaryLabel='Explore Activities'
              steps={[
                {
                  title: 'Pick the experience',
                  description: 'Choose open play, camps, PNO, group visits, or mobile play directly from this page.',
                },
                {
                  title: 'Choose a package',
                  description: 'Each card routes into the shared booking flow with the service and option prefilled.',
                },
                {
                  title: 'Reserve your spot',
                  description: 'Select date, time, guests, and contact details to complete the frontend booking journey.',
                },
              ]}
            />

            <Section id='open-play'>
              <SectionHeader
                eyebrow='Open Play'
                title='Drop In & Explore'
                desc='No schedule, no pressure — just two hours of pure play. Choose the pass that fits your family best.'
              />
              <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
                {PASSES.map(p => (
                  <PassCard key={p.name} pass={p} />
                ))}
              </div>
            </Section>

            <Section id='private-play'>
              <SectionHeader
                eyebrow='Private Play'
                title='Reserve the Space Just for You'
                desc='Want the whole place to yourselves? Choose one of three private options for your group or event.'
              />
              <PrivatePlayCards
                options={packages
                  .filter(pkg => pkg.kind === 'private_room')
                  .map(pkg => ({
                    slug: pkg.id,
                    name: pkg.name,
                    desc: pkg.tagline,
                    accent: pkg.color === 'primary' ? 'primary' : 'primary',
                    img:
                      pkg.imageUrl ||
                      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80',
                  }))}
              />
            </Section>

            <Section id='camps'>
              <SectionHeader
                eyebrow='Camps'
                title='Adventure on Every Break'
                desc='Structured, supervised camp programs during school breaks — so kids keep the fun going all year long.'
              />
              <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
                {classes.map(c => (
                  <CampCard 
                    key={c.id} 
                    camp={{
                      slug: c.id,
                      name: c.title,
                      accent: 'primary',
                      img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80',
                      description: c.description,
                      duration: c.schedule,
                      ages: `Ages ${c.ageMin}-${c.ageMax}`
                    }} 
                  />
                ))}
              </div>
            </Section>

            <Section id='special-events'>
              <SectionHeader
                eyebrow='Special Events'
                title='Magical Moments All Year Long'
                desc="From beloved characters to seasonal festivals and skill-building extravaganzas — there's always something exciting happening."
              />

              <SubLabel text='Active Events' />
              <div className='grid grid-cols-3 gap-3.5 mb-2 max-md:grid-cols-1'>
                {events
                  .filter(e => !e.tags.includes('holiday'))
                  .map(e => {
                  const firstDate = e.dates[0]

                  return (
                    <FestivalCard 
                      key={e.id} 
                      item={{
                        name: e.title,
                        season: firstDate ? new Date(firstDate.date).toLocaleDateString('en-US', { month: 'long' }) : 'Upcoming',
                        accent: 'primary',
                        desc: e.description
                      }} 
                    />
                  )
                })}
              </div>
            </Section>

            <Section id='holiday-events'>
              <SectionHeader
                eyebrow='Holiday Events'
                title='Celebrate the Season With Us'
                desc='Themed nights, festive activities, and family traditions — reserve early for popular holiday dates.'
              />
              <SubLabel text='Holiday lineup' />
              {events.filter(e => e.tags.includes('holiday')).length > 0 ? (
                <div className='grid grid-cols-3 gap-3.5 mb-2 max-md:grid-cols-1'>
                  {events
                    .filter(e => e.tags.includes('holiday'))
                    .map(e => {
                      const firstDate = e.dates[0]

                      return (
                        <FestivalCard
                          key={e.id}
                          item={{
                            name: e.title,
                            season: firstDate
                              ? new Date(firstDate.date).toLocaleDateString('en-US', { month: 'long' })
                              : 'Upcoming',
                            accent: 'primary',
                            desc: e.description,
                          }}
                        />
                      )
                    })}
                </div>
              ) : (
                <p className='text-[14px] leading-relaxed text-[var(--dt-text-muted)] max-w-[560px]'>
                  Our holiday calendar updates throughout the year. Browse all upcoming dates on Events or book your visit now.
                </p>
              )}
              <div className='mt-6 flex flex-wrap gap-3'>
                <ActionLink href='/events' accentColor='var(--dt-teal)' className='px-6 py-3 text-sm'>
                  View Events
                </ActionLink>
                <ActionLink href='/book' variant='outline' className='px-6 py-3 text-sm'>
                  Book a visit
                </ActionLink>
              </div>
            </Section>

            <Section id='parents-night-out'>
              <SectionHeader
                eyebrow="Parents' Night Out"
                title='You Deserve a Night Off'
                desc="Drop off the kids and enjoy your evening — we've got it covered."
              />
              <PNOSection details={PNO} images={PNO_IMAGES} />
            </Section>

            <Section id='field-trips'>
              <FieldTrips />
            </Section>

            <Section id='we-bring-play'>
              <SectionHeader
                eyebrow='Party at your place'
                title='The Party Comes to You'
                desc={"Can't come to us? We'll bring the magic to your backyard, venue, or event space."}
              />
              <WeBringServicesGrid services={WE_BRING} images={WE_BRING_IMGS} />

              <CtaStrip
                title='Ready to bring the fun home?'
                subtitle='Available for birthdays, playdates, corporate family days & more.'
                primaryHref='/book?service=we-bring'
                primaryLabel='Book Now'
                secondaryHref='/we-bring'
                secondaryLabel='Learn More'
              />
            </Section>
          </>
        )}
      </div>
    </div>
  )
}
