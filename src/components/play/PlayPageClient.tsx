'use client'

import { useEffect, useState } from 'react'

import CampCard from './CampCard'
import FestivalCard from './FestivalCard'
import FieldTrips from './FieldTrips'
import PNOSection from './PNOSection'
import PassCard from './PassCard'
import PrivatePlayCards from './PrivatePlayCards'
import WeBringServicesGrid from './WeBringServicesGrid'
import Hero from '../shared/Hero'
import ActionLink from '../shared/ActionLink'
import FlowSteps from '../shared/FlowSteps'
import Section from '../shared/Section'
import SectionHeader from '../shared/SectionHeader'
import SectionNav from '../shared/SectionNav'
import SubLabel from '../shared/SubLabel'
import CtaStrip from '../shared/CtaStrip'
import {
  CAMPS,
  IMAGINATIVE,
  NAV,
  PASSES,
  PNO,
  PNO_IMAGES,
  PRIVATE,
  SEASONAL,
  SKILL_EVENTS,
  WE_BRING,
  WE_BRING_IMGS,
} from './constants'
import type { SectionId } from './types'

export default function PlayPageClient() {
  const [active, setActive] = useState<SectionId>('open-play')

  function scrollTo(id: SectionId) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV.map(n => n.id)

    const handleScroll = () => {
      let cur: SectionId = ids[0]
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
          <PrivatePlayCards options={PRIVATE} />
        </Section>

        <Section id='camps'>
          <SectionHeader
            eyebrow='Camps'
            title='Adventure on Every Break'
            desc='Structured, supervised camp programs during school breaks — so kids keep the fun going all year long.'
          />
          <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
            {CAMPS.map(c => (
              <CampCard key={c.name} camp={c} />
            ))}
          </div>
        </Section>

        <Section id='special-events'>
          <SectionHeader
            eyebrow='Special Events'
            title='Magical Moments All Year Long'
            desc="From beloved characters to seasonal festivals and skill-building extravaganzas — there's always something exciting happening."
          />

          <SubLabel text='Seasonal Festivals' />
          <div className='grid grid-cols-3 gap-3.5 mb-2 max-md:grid-cols-1'>
            {SEASONAL.map(i => (
              <FestivalCard key={i.name} item={i} />
            ))}
          </div>

          <SubLabel text='Interactive & Imaginative Play' />
          <div className='grid grid-cols-3 gap-3.5 mb-2 max-md:grid-cols-1'>
            {IMAGINATIVE.map(i => (
              <FestivalCard key={i.name} item={i} />
            ))}
          </div>

          <SubLabel text='Specialty Skill-Building' />
          <div className='grid grid-cols-2 gap-3.5 max-md:grid-cols-1'>
            {SKILL_EVENTS.map(i => (
              <FestivalCard key={i.name} item={i} />
            ))}
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
            eyebrow='We Bring Play To You'
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
      </div>
    </div>
  )
}
