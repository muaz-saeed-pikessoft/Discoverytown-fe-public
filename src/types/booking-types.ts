export type ClassCategory = 'art' | 'music' | 'movement' | 'stem' | 'language'

export type BookingType = 'drop-in' | 'class' | 'event' | 'party'

export type BookingStatus = 'confirmed' | 'waitlisted' | 'cancelled' | 'completed'

export type MembershipType = 'standard' | 'member' | 'vip'

export type TimeSlot = {
  id: string
  date: string
  startTime: string
  endTime: string
  spotsTotal: number
  spotsAvailable: number
  pricePerChild: number
  ageMin: number
  ageMax: number
}

export type ClassEvent = {
  id: string
  title: string
  description: string
  instructor: string
  category: ClassCategory
  schedule: string
  duration: number
  spotsTotal: number
  spotsAvailable: number
  pricePerSession: number
  priceSeries: number
  ageMin: number
  ageMax: number
  imageSlug: string
  tags: string[]
  startDate: string
  endDate: string
  sessionsTotal: number
}

export type EventDay = {
  date: string
  startTime: string
  endTime: string
  activities: string[]
}

export type PricingTier = {
  id: string
  label: string
  price: number
  perks: string[]
  spotsAvailable: number
}

export type SpecialEvent = {
  id: string
  title: string
  description: string
  featured: boolean
  dates: EventDay[]
  location: string
  imageSlug: string
  pricingTiers: PricingTier[]
  tags: string[]
  maxCapacity: number
  registeredCount: number
}

export type PartyAddOn = {
  id: string
  label: string
  price: number
  description: string
  pricingModel: 'flat' | 'per-person'
}

export type PartyPackage = {
  id: string
  name: string
  tagline: string
  price: number
  depositAmount: number
  duration: number
  guestsIncluded: number
  pricePerExtraGuest: number
  features: string[]
  addOns: PartyAddOn[]
  color: 'primary' | 'secondary' | 'accent'
  popular: boolean
}

export type GuestRecord = {
  id: string
  name: string
  age: number
  relationship: string
}

export type BookingRecord = {
  id: string
  type: BookingType
  title: string
  date: string
  time: string
  status: BookingStatus
  amount: number
  confirmationCode: string
  guests: GuestRecord[]
}

export type ChildProfile = {
  id: string
  name: string
  dob: string
  allergies: string
  notes: string
}

export type CustomerProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  memberSince: string
  membershipType: MembershipType
  children: ChildProfile[]
}
