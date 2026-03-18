'use client'

import React, { useState, useEffect } from 'react'

import { NAV_SECTIONS, RENTAL_SECTIONS, ENTERTAINER_NOTE } from './constants'
import type { RentalSectionId } from './types'
import Hero from '../shared/Hero'
import ActionLink from '../shared/ActionLink'
import FlowSteps from '../shared/FlowSteps'
import Section from '../shared/Section'
import SectionHeader from '../shared/SectionHeader'
import SectionNav from '../shared/SectionNav'
import CtaStrip from '../shared/CtaStrip'
import RentalGrid from './RentalGrid'

export default function RentalsPageClient() {
  const [activeSection, setActiveSection] = useState<RentalSectionId>('inflatables')

  function scrollToSection(id: RentalSectionId) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV_SECTIONS.map(n => n.id)

    const handleScroll = () => {
      let cur: RentalSectionId = ids[0]
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
        eyebrow={<p className='dt-eyebrow text-[var(--dt-coral)] mb-2'>Rentals</p>}
        title={<>Everything You Need to <em className='not-italic text-[var(--dt-coral)]'>Throw a Party</em></>}
        description='From bounce houses and photo booths to party staff, AV equipment, and concession machines — DiscoveryTown has every rental you need for an unforgettable event.'
        bgUrl='https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80'
        actions={
          <ActionLink href='/checkout?category=rental' accentColor='var(--dt-coral)' className='px-7 py-3.5 text-sm'>
            Build a Request
          </ActionLink>
        }
      />

      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={scrollToSection} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        <FlowSteps
          eyebrow='How Rental Requests Work'
          title='Plan the event before you ever call'
          description='Each rental item now has a clear next step. Customers can browse equipment, open a request flow, and submit event details for pricing and availability.'
          accentColor='var(--dt-coral)'
          primaryHref='/checkout?category=rental'
          primaryLabel='Start Rental Request'
          secondaryHref='#inflatables'
          secondaryLabel='Browse Rentals'
          steps={[
            { title: 'Choose your rental', description: 'Pick inflatables, decor, concessions, AV, staffing, or any other event need.' },
            { title: 'Add event details', description: 'Set the event date, quantity, venue, and any setup notes or theme requests.' },
            { title: 'Submit for confirmation', description: 'Review the request and send it through the frontend quote flow.' },
          ]}
        />

        {RENTAL_SECTIONS.map((section, index) => (
          <React.Fragment key={section.id}>
            <Section id={section.id}>
              <SectionHeader
                eyebrow={section.eyebrow}
                title={section.title}
                desc={section.desc}
                accentColor='var(--dt-coral)'
              />

              {section.id === 'entertainers' && (
                <div className='mb-5 flex items-start gap-2.5 rounded-[14px] border-[1.5px] border-[#FDE68A] bg-[#FFFBEB] px-5 py-3.5 text-[13px] font-bold text-[#D97706]'>
                  <span className='shrink-0'>📍</span>
                  <span>{ENTERTAINER_NOTE}</span>
                </div>
              )}

              <RentalGrid items={section.items} theme={section.theme} />
            </Section>
            {index < RENTAL_SECTIONS.length - 1 && <div className='dt-section-divider' />}
          </React.Fragment>
        ))}

        <CtaStrip
          title='Ready to build your perfect event?'
          subtitle='Start the request flow, then mix rentals, timing, and setup notes in one place.'
          primaryHref='/checkout?category=rental'
          primaryLabel='Build Rental Request'
          primaryColor='var(--dt-coral)'
          secondaryHref='/contact'
          secondaryLabel='Talk to Us'
        />
      </div>
    </div>
  )
}
