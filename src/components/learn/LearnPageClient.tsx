'use client'

import React, { useState, useEffect } from 'react'

import { NAV_SECTIONS, TIERS, WHY_ITEMS } from './constants'
import type { LearnSection } from './types'
import Hero from '../shared/Hero'
import ActionLink from '../shared/ActionLink'
import FlowSteps from '../shared/FlowSteps'
import Section from '../shared/Section'
import SectionNav from '../shared/SectionNav'
import CtaStrip from '../shared/CtaStrip'

// Custom Cards & Sections
import WhyItemCard from './WhyItemCard'
import TierCard from './TierCard'
import CoreAcademicSection from './CoreAcademicSection'
import TestPrepSection from './TestPrepSection'
import EnrichmentSection from './EnrichmentSection'

export default function LearnPageClient() {
  const [activeSection, setActiveSection] = useState<LearnSection>('core-academic')

  function scrollToSection(id: LearnSection) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV_SECTIONS.map(n => n.id)

    const handleScroll = () => {
      let cur: LearnSection = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - 140 <= 0) cur = id
      }
      setActiveSection(prev => (prev === cur ? prev : cur))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='min-h-screen bg-[var(--dt-bg-page)] dt-font-body'>
      <Hero
        eyebrow={<p className='dt-eyebrow text-[var(--dt-learn-green)] mb-2'>Learn</p>}
        title={
          <>
            Where Curiosity Becomes{' '}
            <em className='not-italic text-[var(--dt-learn-green)]'>Knowledge</em>
          </>
        }
        description='DiscoveryTown Learn brings tutoring, test prep, and enrichment programs under one roof — for students from kindergarten through college, and beyond.'
        bgUrl='https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1400&q=80'
        actions={
          <ActionLink href='/book?service=learn' accentColor='var(--dt-learn-green)' className='px-7 py-3.5 text-sm'>
            Enroll Now
          </ActionLink>
        }
      />

      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={scrollToSection} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        <FlowSteps
          eyebrow='How Enrollment Works'
          title='Show families how to move from interest to signup'
          description='Tutoring and enrichment now have a visible frontend enrollment path instead of just brochure content.'
          accentColor='var(--dt-learn-green)'
          primaryHref='/book?service=learn'
          primaryLabel='Start Enrollment'
          secondaryHref='#core-academic'
          secondaryLabel='Browse Programs'
          steps={[
            { title: 'Choose the program type', description: 'Compare core academics, test prep, and enrichment to find the best fit.' },
            { title: 'Select the package', description: 'Open the booking flow to choose tutoring, prep bundles, or monthly enrichment plans.' },
            { title: 'Send enrollment details', description: 'Pick a time, add student details, and complete the frontend enrollment request.' },
          ]}
        />

        <div className='mb-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4'>
          {WHY_ITEMS.map(item => (
            <WhyItemCard key={item.title} item={item} />
          ))}
        </div>

        <div className='mb-10 grid grid-cols-1 gap-4 md:grid-cols-3'>
          {TIERS.map(tier => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>

        <div className='dt-section-divider' />

        <Section id='core-academic'>
          <CoreAcademicSection />
        </Section>

        <div className='dt-section-divider' />

        <Section id='test-prep'>
          <TestPrepSection />
        </Section>

        <div className='dt-section-divider' />

        <Section id='enrichment'>
          <EnrichmentSection />
        </Section>

        <CtaStrip
          title='Ready to unlock your child&apos;s potential?'
          subtitle='Browse programs, pick a tier, and enroll today.'
          primaryHref='/book?service=learn'
          primaryLabel='Enroll Now'
          primaryColor='var(--dt-learn-green)'
        />
      </div>
    </div>
  )
}
