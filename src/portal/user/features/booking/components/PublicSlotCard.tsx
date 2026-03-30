'use client'

import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import type { Location, PublicService, PublicServiceSlot } from '@/types/scheduling.shared'
import AvailabilityBadge from '@/portal/user/features/booking/components/AvailabilityBadge'
import { serviceTypeToParam } from '@/portal/user/features/booking/components/utils'
import { ServiceType } from '@/types/scheduling.shared'

type PublicSlotCardProps =
  | { mode: 'scheduled'; slot: PublicServiceSlot }
  | { mode: 'open'; service: PublicService; location: Pick<Location, 'id' | 'name' | 'address' | 'city'>; operatingHours: { open: string; close: string } | null }

export default function PublicSlotCard(props: PublicSlotCardProps) {
  const slot = props.mode === 'scheduled' ? props.slot : null
  const service = props.mode === 'scheduled' ? props.slot.service : props.service
  const location = props.mode === 'scheduled' ? props.slot.location : props.location

  const href =
    props.mode === 'scheduled'
      ? ROUTES.USER.ACTIVITY_DETAIL(serviceTypeToParam(service.serviceType), props.slot.id)
      : ROUTES.USER.ACTIVITY_OPEN_BOOK(serviceTypeToParam(service.serviceType), props.service.id)

  const start = slot ? new Date(slot.startAt) : null
  const end = slot ? new Date(slot.endAt) : null

  const imageUrl = (() => {
    const url = (service.metadata as Record<string, unknown> | undefined)?.imageUrl
    if (typeof url !== 'string' || !url) return null
    try {
      const parsed = new URL(url)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null

      if (parsed.hostname === 'unsplash.com') {
        const parts = parsed.pathname.split('/').filter(Boolean)
        if (parts[0] === 'photos' && parts.length >= 2) {
          const last = parts[parts.length - 1]
          const id = last.split('-').at(-1)
          if (id && id.length >= 6) {
            return `https://source.unsplash.com/${id}/1600x1200`
          }
        }
      }

      return url
    } catch {
      return null
    }
  })()

  const fallbackImageUrl = (() => {
    if (service.serviceType === ServiceType.OPEN_PLAY) {
      return '/images/stock/session-open-play.svg'
    }
    if (service.serviceType === ServiceType.GYM_CLASS || service.serviceType === ServiceType.FITNESS_ASSESSMENT) {
      return '/images/stock/session-gym.svg'
    }
    if (service.serviceType === ServiceType.WORKSHOP || service.serviceType === ServiceType.CAMP) {
      return '/images/stock/session-general.svg'
    }
    if (service.serviceType === ServiceType.SWIM_CLASS) {
      return '/images/stock/session-general.svg'
    }
    if (service.serviceType === ServiceType.PARTY_PACKAGE || service.serviceType === ServiceType.PRIVATE_HIRE) {
      return '/images/stock/private-hire-venue.svg'
    }
    return '/images/stock/session-general.svg'
  })()

  return (
    <Link
      href={href}
      className='dt-card-interactive group block overflow-hidden rounded-[20px]'
    >
      <div className='relative aspect-[4/3] w-full bg-[var(--dt-bg-page)]'>
        <img
          src={imageUrl ?? fallbackImageUrl}
          alt={service.name}
          loading='lazy'
          className='absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]'
        />
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,59,0.05)_0%,rgba(20,35,59,0.55)_100%)]' />
        <div className='absolute left-4 top-4'>
          <div className='dt-pill-accent bg-white/90 text-[var(--dt-navy)] shadow-sm'>
            {service.serviceType.replaceAll('_', ' ')}
          </div>
        </div>
        <div className='absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3'>
          <div className='min-w-0'>
            <div className='truncate text-base font-black text-white dt-font-heading'>{service.name}</div>
            <div className='mt-1 text-xs font-semibold text-white/85'>
              {location.name}
            </div>
          </div>
          <div className='shrink-0 rounded-[14px] bg-white/90 px-3 py-2 text-sm font-black text-[var(--dt-navy)]'>
            ${props.mode === 'scheduled' ? props.slot.effectivePrice : service.basePrice}
          </div>
        </div>
      </div>
      <div className='p-4'>
        <div className='text-xs font-semibold text-[var(--dt-text-body)]/75'>
          {props.mode === 'scheduled' && start && end ? (
            <>
              {start.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} ·{' '}
              {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
              {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </>
          ) : props.mode === 'open' && props.operatingHours ? (
            <>
              Open today: {props.operatingHours.open} – {props.operatingHours.close} · Choose your own time
            </>
          ) : (
            <>Choose your own time</>
          )}
        </div>

        <div className='mt-3 flex flex-wrap items-center justify-between gap-2'>
          {props.mode === 'scheduled' ? (
            <AvailabilityBadge availableSpots={props.slot.availableSpots} status={props.slot.status} capacity={props.slot.effectiveCapacity} />
          ) : (
            <div
              className='dt-pill-accent'
              style={{
                ['--dt-pill-bg' as string]: 'var(--dt-teal-light)',
                ['--dt-pill-color' as string]: 'var(--dt-teal-dark)',
              }}
            >
              Book now
            </div>
          )}
          <div className='text-xs font-semibold text-[var(--dt-text-body)]/70'>
            {props.mode === 'scheduled'
              ? props.slot.staffFirstName
                ? `Coach ${props.slot.staffFirstName}`
                : 'Staffed session'
              : 'Choose your own time'}
          </div>
        </div>
      </div>
    </Link>
  )
}

