'use client'

import { useState } from 'react'

import Section from '@/components/shared/Section'
import SectionHeader from '@/components/shared/SectionHeader'
import PrivateHireAvailabilityPicker from '@/portal/user/features/privatehire/components/PrivateHireAvailabilityPicker'
import PrivateHireInquiryForm from '@/portal/user/features/privatehire/components/PrivateHireInquiryForm'

interface PrivateHireClientSectionProps {
  locations: Array<{ id: string; name: string; city: string | null }>
  inquiryVenues: Array<{ serviceId: string; locationId: string; label: string }>
}

export default function PrivateHireClientSection({
  locations,
  inquiryVenues,
}: PrivateHireClientSectionProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  return (
    <>
      <Section id='availability'>
        <SectionHeader
          eyebrow='Availability'
          title='Check availability'
          description='Pick a location and date — we’ll highlight start times with no overlapping sessions for your duration.'
          accentColor='var(--dt-primary)'
        />
        {locations.length > 0 ? (
          <PrivateHireAvailabilityPicker locations={locations} onTimeSelected={time => setSelectedTime(time)} />
        ) : (
          <p className='text-sm text-[var(--dt-text-muted)]'>No locations are available yet.</p>
        )}
      </Section>

      <Section id='inquiry'>
        <SectionHeader
          eyebrow='Enquiry'
          title='Enquire now'
          description='Tell us about your event — we’ll follow up shortly to confirm the slot and deposit.'
          accentColor='var(--dt-primary)'
        />
        {inquiryVenues.length > 0 ? (
          <PrivateHireInquiryForm venues={inquiryVenues} defaultTimeNote={selectedTime ?? undefined} />
        ) : (
          <p className='text-sm text-[var(--dt-text-muted)]'>Enquiry form is unavailable until venues are configured.</p>
        )}
      </Section>
    </>
  )
}

