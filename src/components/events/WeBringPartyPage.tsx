'use client'

import { useState } from 'react'

import CtaStrip from './CtaStrip'
import WeBringServicesGrid from './WeBringServicesGrid'
import Hero from '../shared/Hero'
import Section from '../shared/Section'
import SectionHeader from '../shared/SectionHeader'
import SectionNav from '../shared/SectionNav'
import { NAV_SECTIONS, WE_BRING_IMAGES, WE_BRING_SERVICES } from './constants'
import type { EventSection } from './types'

const WHY_US = [
  {
    icon: '🚚',
    title: 'Full Delivery & Setup',
    desc: 'We handle delivery, setup, and teardown so you can focus on the event itself.',
  },
  { icon: '📍', title: 'Any Location', desc: 'Backyards, parks, schools, and community venues all work.' },
  { icon: '👥', title: 'Any Group Size', desc: 'We can scale from intimate gatherings to large public events.' },
  { icon: '🎨', title: 'Fully Customizable', desc: 'Mix services together to fit your budget, space, and guest list.' },
]

function LocalFeatureGrid({ items }: { items: typeof WHY_US }) {
  return (
    <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
      {items.map(item => (
        <div key={item.title} className='rounded-2xl border border-[var(--dt-border)] bg-white p-6 shadow-sm flex gap-4 items-start'>
          <div className='text-3xl'>{item.icon}</div>
          <div>
            <h4 className='font-black text-[var(--dt-dark)] mb-1'>{item.title}</h4>
            <p className='text-sm text-[var(--dt-text-muted)] leading-relaxed'>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function WeBringPartyPage() {
  const [activeSection, setActiveSection] = useState<EventSection>('we-bring-party')

  return (
    <div className='min-h-screen bg-[var(--dt-bg-page)] dt-font-body'>
      <Hero
        eyebrow={<p className='dt-eyebrow text-[var(--dt-coral)] mb-2'>We Bring The Party To You</p>}
        title='We Come to Your Venue'
        description="Can't come to us? We'll bring the DiscoveryTown experience to your backyard, park, school, or event space."
        bgUrl='https://images.unsplash.com/photo-1619301871534-b19f6efd2e6c?w=1400&q=80'
        actions={
          <a href='/contact' className='inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--dt-coral)] text-white text-sm font-bold no-underline'>
            Get a Custom Quote
          </a>
        }
      />

      <SectionNav items={NAV_SECTIONS} active={activeSection} onNav={setActiveSection} />

      <div className='mx-auto max-w-[1200px] px-6 pb-20 pt-8'>
        <Section id='we-bring-party'>
          <SectionHeader
            eyebrow='We Bring The Party To You'
            title='The Full DiscoveryTown Experience, Anywhere'
            description='From inflatables and train rides to full catering, entertainment, and setup, we bring everything you need to make your off-site event spectacular.'
          />

          <div className='mb-10'>
            <LocalFeatureGrid items={WHY_US} />
          </div>

          <div className='mb-4 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--dt-text-subtle)]'>
            What We Can Bring
          </div>

          <div className='mb-10'>
            <WeBringServicesGrid services={WE_BRING_SERVICES} images={WE_BRING_IMAGES} />
          </div>

          <div className='mb-8 flex gap-3 rounded-[18px] border border-[var(--dt-border)] bg-white px-6 py-5 text-[13px] leading-[1.65] text-black/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'>
            <span className='shrink-0 text-[22px]'>💰</span>
            <div>
              <div className='mb-1 font-serif text-[15px] font-black text-[var(--dt-navy)]'>Custom Pricing</div>
              Pricing depends on location, guest count, travel distance, and the services you select. Share your event
              details and the team can build a custom quote.
            </div>
          </div>

          <CtaStrip
            title='Ready to bring the party to you?'
            subtitle="Tell us about your event, guest count, and location and we'll handle the rest."
            href='/contact'
            buttonText='Get a Quote →'
            gradientClassName='bg-[linear-gradient(135deg,var(--dt-coral)_0%,#FF8E53_100%)]'
            buttonTextColor='var(--dt-coral)'
          />
        </Section>
      </div>
    </div>
  )
}
