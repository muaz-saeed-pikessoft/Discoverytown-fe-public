'use client'

import { useEffect, useState } from 'react'

import AgeGroupPanel from './AgeGroupPanel'
import AgeGroupTabs from './AgeGroupTabs'
import AllClassesSection from './AllClassesSection'
import ScheduleSection from './ScheduleSection'
import SpecialProgramCard from './SpecialProgramCard'
import Hero from '../shared/Hero'
import ActionLink from '../shared/ActionLink'
import FlowSteps from '../shared/FlowSteps'
import Section from '../shared/Section'
import SectionHeader from '../shared/SectionHeader'
import SectionNav from '../shared/SectionNav'
import CtaStrip from '../shared/CtaStrip'
import { AGE_GROUPS, NAV_SECTIONS, SCHEDULE_DAYS, SPECIAL_PROGRAMS } from './constants'
import type { GymSection } from './types'
import { useMemo } from 'react'

export default function GymPageClient() {
  const [active, setActive] = useState<GymSection>('age-groups')
  const [activeAge, setActiveAge] = useState<string>('babies')

  const selectedGroup = useMemo(() => AGE_GROUPS.find(g => g.id === activeAge) ?? AGE_GROUPS[0], [activeAge])

  function scrollTo(id: GymSection) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV_SECTIONS.map(n => n.id)

    const handleScroll = () => {
      let cur: GymSection = ids[0]
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
        eyebrow={<p className='dt-eyebrow text-[var(--dt-teal)] mb-2'>The Gym</p>}
        title={<>Fitness for Every <em className='not-italic text-[var(--dt-hero-accent)]'>Age &amp; Stage</em></>}
        description="From babies taking their first wobbly steps to seniors staying sharp — DiscoveryTown's gym has a class for everyone. Move, play, sweat, and grow together."
        bgUrl='https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1800&q=80'
        actions={
          <>
            <ActionLink href='#age-groups' accentColor='var(--dt-teal)' className='px-7 py-3.5 text-sm'>
              Browse Classes
            </ActionLink>
            <ActionLink href='#schedule' variant='outline' className='dt-btn-hero-outline px-7 py-3.5 text-sm !text-white border-white/30 bg-white/10'>
              View Schedule
            </ActionLink>
          </>
        }
      />
      <SectionNav items={NAV_SECTIONS} active={active} onNav={scrollTo} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        <FlowSteps
          eyebrow='How Gym Booking Works'
          title='Pick the class path before you book'
          description='The gym page now explains the booking journey clearly so parents know how to go from age group and schedule to a reserved spot.'
          accentColor='var(--dt-teal)'
          primaryHref='/book?service=gym'
          primaryLabel='Book a Gym Class'
          secondaryHref='#schedule'
          secondaryLabel='See Schedule'
          steps={[
            { title: 'Match the age group', description: 'Use the age tabs and class lists to find the right program for each child or family member.' },
            { title: 'Choose the package', description: 'Open the booking flow to select single class, packs, or monthly memberships.' },
            { title: 'Reserve the session', description: 'Pick the date, time, guests, and submit the booking request from the shared frontend flow.' },
          ]}
        />

        <Section id='age-groups'>
          <SectionHeader
            eyebrow='Age Groups'
            title='Find Your Class'
            desc='Every class is designed specifically for its age group — developmentally appropriate, engaging, and run by trained instructors who know how to make fitness fun.'
          />
          <AgeGroupTabs groups={AGE_GROUPS} activeId={activeAge} onSelect={setActiveAge} />
          <AgeGroupPanel group={selectedGroup} />
        </Section>

        <Section id='classes'>
          <SectionHeader
            eyebrow='All Classes'
            title='Browse Every Offering'
            desc='A full look at every class across all age groups, organized by category.'
          />
          <AllClassesSection groups={AGE_GROUPS} />
        </Section>

        <Section id='schedule'>
          <SectionHeader
            eyebrow='Class Schedule'
            title='Built Around Your Life'
            desc='Our schedule is built around lifestyle anchors — school hours, nap times, and work shifts — so the whole family can participate without the logistics headache.'
          />
          <ScheduleSection days={SCHEDULE_DAYS} />
        </Section>

        <Section id='special'>
          <SectionHeader
            eyebrow='Special Programs'
            title='For Every Body &amp; Every Need'
            desc='Specialized programs designed for unique groups — because fitness should be accessible to everyone, at every stage of life.'
          />

          <div className='grid grid-cols-3 gap-4 mb-8 max-lg:grid-cols-2 max-md:grid-cols-1'>
            {SPECIAL_PROGRAMS.map(program => (
              <SpecialProgramCard key={program.name} program={program} />
            ))}
          </div>

          <CtaStrip
            title='Ready to get moving?'
            subtitle='Browse class availability, sign up, and reserve your spot today.'
            primaryHref='/book?service=gym'
            primaryLabel='Book a Class'
            secondaryHref='#schedule'
            secondaryLabel='View Class Schedule'
          />
        </Section>
      </div>
    </div>
  )
}
