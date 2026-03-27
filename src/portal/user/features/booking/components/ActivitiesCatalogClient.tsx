'use client'

import { useMemo, useState } from 'react'

import ActivityFilters from '@/portal/user/features/booking/components/ActivityFilters'
import PublicSlotCard from '@/portal/user/features/booking/components/PublicSlotCard'
import type { PublicService, PublicServiceSlot } from '@/types/scheduling.shared'

type BookingModeTab = 'ALL' | 'OPEN' | 'SCHEDULED'

interface ActivitiesCatalogClientProps {
  slots: PublicServiceSlot[]
  services: PublicService[]
  locations: Array<{ id: string; name: string; address: string; city: string }>
}

export default function ActivitiesCatalogClient({ slots, services, locations }: ActivitiesCatalogClientProps) {
  const [mode, setMode] = useState<BookingModeTab>('ALL')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const openServices = useMemo(() => services.filter(service => service.bookingMode === 'OPEN'), [services])

  const visibleOpenServices = mode === 'SCHEDULED' ? [] : openServices
  const visibleSlots = mode === 'OPEN' ? [] : slots
  const totalVisible = visibleOpenServices.length + visibleSlots.length

  return (
    <div className='space-y-5'>
      <div className='rounded-[26px] border border-black/[0.06] bg-white/90 p-5 shadow-[0_16px_50px_rgba(20,35,59,0.08)] backdrop-blur-sm'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <div>
            <div className='text-[11px] font-black uppercase tracking-[0.18em] text-[var(--dt-text-subtle)]'>Browse inventory</div>
            <div className='mt-1 text-sm font-semibold text-[var(--dt-text-body)]/75'>
              {totalVisible} option{totalVisible === 1 ? '' : 's'} available
            </div>
          </div>

          <div className='inline-flex h-10 items-center rounded-[999px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-1'>
            {([
              { id: 'ALL', label: 'All' },
              { id: 'OPEN', label: 'Open Play' },
              { id: 'SCHEDULED', label: 'Scheduled' },
            ] as Array<{ id: BookingModeTab; label: string }>).map(option => {
              const selected = mode === option.id
              return (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => setMode(option.id)}
                  className={[
                    'h-8 rounded-[999px] px-3 text-xs font-black transition',
                    selected ? 'bg-white text-[var(--dt-navy)] shadow-sm' : 'text-[var(--dt-text-subtle)] hover:text-[var(--dt-navy)]',
                  ].join(' ')}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className='mt-4'>
          <button
            type='button'
            onClick={() => setFiltersOpen(value => !value)}
            className='inline-flex h-10 items-center gap-2 rounded-[14px] border border-[var(--dt-border)] bg-white px-4 text-xs font-black text-[var(--dt-text-body)] transition hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
            aria-expanded={filtersOpen}
            aria-controls='activities-filters-panel'
          >
            {filtersOpen ? 'Hide filters' : 'Show filters'}
            <span className={['text-sm transition-transform', filtersOpen ? 'rotate-180' : 'rotate-0'].join(' ')}>⌃</span>
          </button>
        </div>

        <div
          id='activities-filters-panel'
          className={[
            'grid transition-all duration-300 ease-out',
            filtersOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0',
          ].join(' ')}
        >
          <div className='overflow-hidden'>
            <ActivityFilters className='rounded-[20px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-5' />
          </div>
        </div>
      </div>

      {totalVisible === 0 ? (
        <div className='rounded-[28px] border border-black/[0.06] bg-white/80 p-10 text-center backdrop-blur-sm shadow-[0_20px_60px_rgba(20,35,59,0.06)]'>
          <div className='text-lg font-black text-[var(--dt-navy)]'>No sessions available</div>
          <div className='mt-2 text-sm font-semibold text-[var(--dt-text-body)]/70'>Try another booking mode or check back soon.</div>
        </div>
      ) : (
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {visibleOpenServices.map(service => {
            const inferredLocation =
              locations.find(location => location.id === service.locationId) ??
              slots.find(slot => slot.serviceId === service.id)?.location ??
              locations[0] ??
              { id: 'loc-public-1', name: 'Main Floor', address: '—', city: '—' }

            return (
              <PublicSlotCard
                key={`open-${service.id}`}
                mode='open'
                service={service}
                location={inferredLocation}
                operatingHours={{ open: '09:00', close: '18:00' }}
              />
            )
          })}

          {visibleSlots.map(slot => (
            <PublicSlotCard key={slot.id} mode='scheduled' slot={slot} />
          ))}
        </div>
      )}
    </div>
  )
}

