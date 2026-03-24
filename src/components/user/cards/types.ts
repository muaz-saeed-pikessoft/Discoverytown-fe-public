import type { PartyPackage } from '@/types/booking-types'

export type BookingCardProps = {
  title: string
  subtitle?: string
  date: string
  time: string
  spotsAvailable: number
  spotsTotal: number
  price: number
  ageMin: number
  ageMax: number
  onBook: () => void
  variant?: 'default' | 'compact'
}

export type EventCardProps = {
  id: string
  title: string
  description: string
  dateLabel: string
  featured?: boolean
  tags: string[]
  lowestPrice: number
  imageSlug: string
  onViewDetails: () => void
}

export type PartyPackageCardProps = {
  pkg: PartyPackage
  selected: boolean
  onSelect: (id: string) => void
}
