'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCommerceItems } from '@/api/commerceApi'
import { NAV_SECTIONS, HERO_PILLS } from './constants'
import type { GiftSectionId } from './types'
import Hero from '@/components/shared/Hero'
import ActionLink from '@/components/shared/ActionLink'
import FlowSteps from '@/components/shared/FlowSteps'
import SectionHeader from '@/components/shared/SectionHeader'
import SectionNav from '@/components/shared/SectionNav'
import CtaStrip from '@/components/shared/CtaStrip'
import GiftCard from './GiftCard'
import AlacarteSection from './AlacarteSection'
import DeliveryInfoSection from './DeliveryInfoSection'

export default function GiftsPageClient() {
  const [activeSection, setActiveSection] = useState<GiftSectionId>('gift-boxes')

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['commerce', 'gifts'],
    queryFn: () => getCommerceItems('gifts'),
  })

  function scrollToSection(id: GiftSectionId) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const giftBoxes = useMemo(() => {
     const boxes = allProducts.filter(p => p.tags.includes('box'))
     if (boxes.length === 0) return []
     return boxes.map(p => ({
        id: p.id,
        name: p.name,
        tagline: p.description,
        priceLabel: `$${p.price.toFixed(2)}`,
        image: p.image,
        badges: p.tags.filter(t => t !== 'box' && t !== 'gifts'),
        url: `/checkout?category=gift&item=${p.id}`
     }))
  }, [allProducts])

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
    <div className='min-h-screen bg-[var(--dt-bg-page)] dt-font-body pb-20'>
      <Hero
        eyebrow={<p className='dt-eyebrow text-[var(--dt-primary)] mb-2'>Gifts &amp; Celebration</p>}
        title={
          <>
            Joy, Delivered with <em className='not-italic text-[var(--dt-primary)]'>Heart</em>
          </>
        }
        description='DiscoveryTown curated gift boxes, digital cards, and custom celebration bundles. Perfectly packaged and ready to make someone’s day.'
        bgUrl='https://images.unsplash.com/photo-1549462818-499cf8bc034d?w=1400&q=80'
        actions={
          <ActionLink href='#gift-boxes' accentColor='var(--dt-primary)' className='px-7 py-3.5 text-sm'>
            Browse Gift Boxes
          </ActionLink>
        }
      />

      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={scrollToSection} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-6'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20'>
             <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
          </div>
        ) : (
          <>
            <FlowSteps
              eyebrow='How Gifting Works'
              title='Choose, customize, and send in minutes'
              description='DiscoveryTown gifting now has a complete frontend purchase path for boxes and a la carte items.'
              accentColor='var(--dt-primary)'
              primaryHref='/checkout?category=gift'
              primaryLabel='Start Gifting Flow'
              secondaryHref='#gift-boxes'
              secondaryLabel='Browse Boxes'
              steps={[
                {
                  title: 'Pick your gift',
                  description: 'Choose a curated box, a la carte items, or a flexible digital card.',
                },
                {
                  title: 'Add a message',
                  description: 'Personalize the gift with a recipient name and a custom note in the checkout flow.',
                },
                {
                  title: 'Set fulfillment',
                  description: 'Choose digital delivery, local pickup, or doorstep shipping for physical gifts.',
                },
              ]}
            />

            <section id='gift-boxes' className='mt-8 scroll-mt-36'>
              <SectionHeader
                eyebrow='Curated Selections'
                title='Discovery Gift Boxes'
                description='Pre-packaged joy for every occasion. Each box is hand-assembled with our most popular shop and cafe treats.'
              />
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {giftBoxes.length > 0 ? giftBoxes.map(box => (
                  <GiftCard key={box.id} box={box} />
                )) : (
                  <div className='col-span-full py-12 text-center text-gray-400'>
                     No gift boxes found in the catalog.
                  </div>
                )}
              </div>
            </section>

            <div className='dt-section-divider' />

            <section id='a-la-carte' className='scroll-mt-32'>
              <AlacarteSection />
            </section>

            <div className='dt-section-divider' />

            <section id='delivery' className='scroll-mt-32'>
              <DeliveryInfoSection />
            </section>

            <CtaStrip
              title='Spread some joy today'
              subtitle='Start the gifting flow to combine items and messages in one beautiful package.'
              primaryHref='/checkout?category=gift'
              primaryLabel='Send a Gift'
              primaryColor='var(--dt-primary)'
              secondaryHref='/contact'
              secondaryLabel='Custom Requests'
            />
          </>
        )}
      </div>
    </div>
  )
}
