'use client'

import React, { useState, useEffect } from 'react'

import { ALACARTE_GROUPS, GIFT_COLLECTIONS, NAV_SECTIONS } from './constants'
import type { GiftSectionId } from './types'
import Hero from '../shared/Hero'
import ActionLink from '../shared/ActionLink'
import FlowSteps from '../shared/FlowSteps'
import Section from '../shared/Section'
import SectionHeader from '../shared/SectionHeader'
import SectionNav from '../shared/SectionNav'
import CtaStrip from '../shared/CtaStrip'
import GiftCard from './GiftCard'
import DeliveryInfoSection from './DeliveryInfoSection'
import AlacarteSection from './AlacarteSection'

export default function GiftsPageClient() {
  const [activeSection, setActiveSection] = useState<GiftSectionId>('gourmet')

  function scrollToSection(id: GiftSectionId) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const ids = NAV_SECTIONS.map(n => n.id)

    const handleScroll = () => {
      let cur: GiftSectionId = ids[0]
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
        eyebrow={<p className='dt-eyebrow text-[var(--dt-coral)] mb-2'>Gifts &amp; Care Packages</p>}
        title={<>Gift an <em className='not-italic text-[var(--dt-coral)]'>Experience</em></>}
        description='Curated gift baskets, care packages, and activity kits delivered locally. Perfect for new parents, recovering kids, or just because.'
        bgUrl='https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1400&q=80'
        actions={
          <ActionLink href='/checkout?category=gift' accentColor='var(--dt-coral)' className='px-7 py-3.5 text-sm'>
            Order a Gift
          </ActionLink>
        }
      />

      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={scrollToSection} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        <FlowSteps
          eyebrow='How Gift Orders Work'
          title='Choose, personalize, then schedule delivery'
          description='Gift baskets now have a complete frontend order flow. Customers can pick a package, set delivery details, and submit the request without guessing what happens next.'
          accentColor='var(--dt-coral)'
          primaryHref='/checkout?category=gift'
          primaryLabel='Start Gift Order'
          secondaryHref='#gourmet'
          secondaryLabel='Browse Collections'
          steps={[
            { title: 'Choose a basket', description: 'Start from any collection and open the order flow directly from the card.' },
            { title: 'Set delivery details', description: 'Pick pickup or delivery, choose a date, and add any note or customization request.' },
            { title: 'Confirm the order', description: 'Review the gift, add your contact details, and submit the frontend request.' },
          ]}
        />

        {GIFT_COLLECTIONS.map(collection => (
          <React.Fragment key={collection.id}>
            <Section id={collection.id}>
              <SectionHeader
                eyebrow={collection.eyebrow}
                title={collection.title}
                desc={collection.desc}
                accentColor='var(--dt-coral)'
              />
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                {collection.gifts.map(gift => (
                  <GiftCard key={gift.name} gift={gift} />
                ))}
              </div>
            </Section>
            <div className='dt-section-divider' />
          </React.Fragment>
        ))}

        {/* À La Carte */}
        <Section id='alacarte'>
          <AlacarteSection />
        </Section>

        <div className='dt-section-divider' />

        {/* Delivery Info */}
        <Section id='delivery'>
          <DeliveryInfoSection />
        </Section>

        <CtaStrip
          title='Bring a smile to someone today'
          subtitle="Open the full gift checkout flow, choose a basket, and schedule the handoff."
          primaryHref='/checkout?category=gift'
          primaryLabel='Order Now'
          primaryColor='var(--dt-coral)'
        />
      </div>
    </div>
  )
}
