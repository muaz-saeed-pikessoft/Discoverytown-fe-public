'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCommerceItems } from '@/api/commerceApi'
import { FILTER_TAGS, NAV_SECTIONS, SHOP_SECTIONS } from './constants'
import type { FilterTag, ShopItem, ShopSectionId } from './types'
import Hero from '@/components/shared/Hero'
import ActionLink from '@/components/shared/ActionLink'
import FlowSteps from '@/components/shared/FlowSteps'
import Section from '@/components/shared/Section'
import SectionHeader from '@/components/shared/SectionHeader'
import SectionNav from '@/components/shared/SectionNav'
import CtaStrip from '@/components/shared/CtaStrip'
import ShopCard from './ShopCard'
import MemberBanner from './MemberBanner'
import FilterBar from './FilterBar'
import { slugify } from '@/utils/slugify'

export default function ShopPageClient() {
  const [activeSection, setActiveSection] = useState<ShopSectionId>('toys')
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All')

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['commerce', 'shop'],
    queryFn: () => getCommerceItems('shop'),
  })

  function scrollToSection(id: ShopSectionId) {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const mappedSections = useMemo(() => {
    return SHOP_SECTIONS.map(section => {
      const apiItemsForSection = allProducts
        .filter(p => p.tags.includes(section.id))
        .map(p => ({
          name: p.name,
          desc: p.description,
          price: `$${p.price.toFixed(2)}`,
          image: p.image,
          badge: p.tags.find(t => FILTER_TAGS.includes(t as any)) as FilterTag || undefined,
          color: 'var(--dt-shop-purple)',
          bg: '#F3F0FF',
          border: '#D0BFFF'
        }))
      
      return {
        ...section,
        items: apiItemsForSection.length > 0 ? apiItemsForSection : section.items
      }
    })
  }, [allProducts])

  const filtered = useMemo(() => {
    return Object.fromEntries(
      mappedSections.map(section => [
        section.id,
        activeFilter === 'All' ? section.items : section.items.filter((item: ShopItem) => item.badge === activeFilter),
      ])
    ) as Record<ShopSectionId, ShopItem[]>
  }, [activeFilter, mappedSections])

  useEffect(() => {
    const ids = NAV_SECTIONS.map(n => n.id)

    const handleScroll = () => {
      let cur: ShopSectionId = ids[0]
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
        eyebrow={<p className='dt-eyebrow text-[var(--dt-shop-purple)] mb-2'>The Shop</p>}
        title={
          <>
            Take the <em className='not-italic text-[var(--dt-shop-purple)]'>Magic Home</em>
          </>
        }
        description='Curated toys, apparel, books, and sensory bins. The exact same high-quality brands we use in our play areas, available for your own playroom.'
        bgUrl='https://images.unsplash.com/photo-1596461404969-9ce205b34be3?w=1400&q=80'
        actions={
          <ActionLink href='#toys' accentColor='var(--dt-shop-purple)' className='px-7 py-3.5 text-sm'>
            Shop Now
          </ActionLink>
        }
      />

      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={scrollToSection} />

      <div className='max-w-[1200px] mx-auto px-6 py-8 pb-20'>
        {isLoading ? (
          <div className='flex items-center justify-center py-20'>
             <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-shop-purple)] border-t-transparent' />
          </div>
        ) : (
          <>
            <FlowSteps
              eyebrow='How Shop Checkout Works'
              title='From browsing to pickup in three steps'
              description='Every product card now leads into a dedicated frontend checkout flow so shoppers understand exactly how to purchase.'
              accentColor='var(--dt-shop-purple)'
              primaryHref='/checkout?category=shop'
              primaryLabel='Start Shop Checkout'
              secondaryHref='#toys'
              secondaryLabel='Browse Products'
              steps={[
                {
                  title: 'Pick an item',
                  description: 'Choose toys, apparel, furniture, or branded gear from any section.',
                },
                {
                  title: 'Set fulfillment',
                  description: 'Choose pickup or delivery, add quantity, and set your preferred handoff date.',
                },
                {
                  title: 'Send the request',
                  description: 'Review the order, enter contact details, and complete the frontend purchase flow.',
                },
              ]}
            />

            <MemberBanner />
            <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {/* Sections */}
            {mappedSections.map((section, index) => {
              const items = filtered[section.id]

              return (
                <React.Fragment key={section.id}>
                  <Section id={section.id}>
                    <SectionHeader
                      eyebrow={section.eyebrow}
                      title={section.title}
                      desc={section.desc}
                      accentColor='var(--dt-shop-purple)'
                    />

                    {items.length === 0 ? (
                      <div className='py-12 text-center text-[var(--dt-text-subtle)]'>
                        <img
                          src='https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&q=80'
                          alt='Not found'
                          className='w-[64px] h-[64px] object-cover rounded-full mx-auto mb-3 opacity-50'
                        />
                        <div className='text-[15px] font-bold'>{section.emptyText.replace('{filter}', activeFilter)}</div>
                      </div>
                    ) : (
                      <div className='grid grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-3'>
                        {items.map(item => (
                          <ShopCard
                            key={item.name}
                            item={item}
                            href={`/checkout?category=shop&item=${slugify(item.name)}`}
                            showAge={section.showAge}
                            showSizes={section.showSizes}
                            showMaterial={section.showMaterial}
                          />
                        ))}
                      </div>
                    )}
                  </Section>
                  {index < mappedSections.length - 1 ? <div className='dt-section-divider' /> : null}
                </React.Fragment>
              )
            })}

            <CtaStrip
              title='Looking for something specific?'
              subtitle='Start the checkout flow for any product or ask us to source something you saw in-store.'
              primaryHref='/checkout?category=shop'
              primaryLabel='Open Shop Checkout'
              primaryColor='var(--dt-shop-purple)'
              secondaryHref='/contact'
              secondaryLabel='Contact Us'
            />
          </>
        )}
      </div>
    </div>
  )
}
