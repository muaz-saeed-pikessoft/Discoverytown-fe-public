'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { AGE_OPTIONS, BOOKING_STEPS, SERVICES } from './constants'
import { createInitialBookingState, getInitialBookingStep } from './config'
import BookingProgressBar from './BookingProgressBar'
import SuccessScreen from './SuccessScreen'
import { BookingStepIndex, type BookingState, type ServiceId } from './types'
import DateTimeStep from './steps/DateTimeStep'
import GuestsStep from './steps/GuestsStep'
import OptionsStep from './steps/OptionsStep'
import ReviewStep from './steps/ReviewStep'
import ServiceStep from './steps/ServiceStep'

function getServiceId(value: string | null): ServiceId | null {
  if (!value) return null

  return SERVICES.some(service => service.id === value) ? (value as ServiceId) : null
}

export default function BookingPageClient() {
  const searchParams = useSearchParams()

  const defaultService = getServiceId(searchParams?.get('service'))
  const defaultOption = searchParams?.get('option') || null
  const initialStep = getInitialBookingStep(defaultService, defaultOption)

  const [step, setStep] = useState<BookingStepIndex>(initialStep)
  const [done, setDone] = useState(false)
  const [booking, setBooking] = useState<BookingState>(() => createInitialBookingState(defaultService, defaultOption))

  const service = SERVICES.find(currentService => currentService.id === booking.service)
  const option = service?.options.find(currentOption => currentOption.slug === booking.option)

  const accent = service?.color ?? 'var(--dt-teal)'
  const accentHex = service?.colorHex ?? '#00c49a'

  const update = (next: Partial<BookingState>) => setBooking(current => ({ ...current, ...next }))

  const toggleAddon = (addon: string) =>
    update({
      addons: booking.addons.includes(addon)
        ? booking.addons.filter(currentAddon => currentAddon !== addon)
        : [...booking.addons, addon],
    })

  const toggleAge = (age: string) =>
    update({
      ages: booking.ages.includes(age) ? booking.ages.filter(currentAge => currentAge !== age) : [...booking.ages, age],
    })

  const resetBooking = () => {
    setDone(false)
    setStep(BookingStepIndex.Service)
    setBooking(createInitialBookingState(null, null))
  }

  if (done && service && option) {
    return (
      <SuccessScreen
        booking={booking}
        svcLabel={service.label}
        optLabel={option.label}
        accentHex={accentHex}
        onReset={resetBooking}
      />
    )
  }

  return (
    <div className='dt-font-body min-h-screen bg-[var(--dt-bg-page)]'>
      <nav className='sticky top-0 z-40 border-b border-[var(--dt-border)] bg-[rgba(251,248,243,0.94)] backdrop-blur-xl'>
        <div className='mx-auto flex h-[68px] max-w-[900px] items-center justify-between gap-4 px-6'>
          <div className='mx-4 hidden max-w-[560px] flex-1 sm:block'>
            <BookingProgressBar steps={BOOKING_STEPS} current={step} accentColor={accent} />
          </div>
          <span className='whitespace-nowrap text-[12px] font-bold text-[var(--dt-text-subtle)]'>
            Step {step + 1}/{BOOKING_STEPS.length}
          </span>
        </div>
        <div className='px-6 pb-3 sm:hidden'>
          <BookingProgressBar steps={BOOKING_STEPS} current={step} accentColor={accent} />
        </div>
      </nav>

      <div className='mx-auto max-w-[900px] px-5 py-10 pb-24'>
        {step === BookingStepIndex.Service && (
          <ServiceStep
            booking={booking}
            services={SERVICES}
            accent={accent}
            accentHex={accentHex}
            update={update}
            setStep={setStep}
          />
        )}

        {step === BookingStepIndex.Package && service && (
          <OptionsStep
            booking={booking}
            service={service}
            accent={accent}
            accentHex={accentHex}
            update={update}
            setStep={setStep}
            toggleAddon={toggleAddon}
          />
        )}

        {step === BookingStepIndex.DateTime && service && (
          <DateTimeStep
            booking={booking}
            service={service}
            option={option}
            accent={accent}
            accentHex={accentHex}
            update={update}
            setStep={setStep}
          />
        )}

        {step === BookingStepIndex.Guests && service && (
          <GuestsStep
            booking={booking}
            ageOptions={AGE_OPTIONS}
            accent={accent}
            accentHex={accentHex}
            update={update}
            setStep={setStep}
            toggleAge={toggleAge}
          />
        )}

        {step === BookingStepIndex.Review && service && option && (
          <ReviewStep
            booking={booking}
            service={service}
            option={option}
            accent={accent}
            accentHex={accentHex}
            update={update}
            setStep={setStep}
            onSubmit={() => setDone(true)}
          />
        )}
      </div>
    </div>
  )
}
