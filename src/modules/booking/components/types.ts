export type ServiceId =
  | 'open-play'
  | 'private-play'
  | 'camps'
  | 'pno'
  | 'field-trips'
  | 'we-bring'
  | 'events'
  | 'gym'
  | 'learn'
  | 'gifts'
  | 'rentals'

export interface ServiceOption {
  slug: string
  label: string
  price: string
  unit: string
  desc: string
  inclusions: string[]
  badge?: string
}

export interface BookingService {
  id: ServiceId
  label: string
  imgUrl: string
  photoUrl: string // cover photo shown at top of the service tile
  desc: string
  color: string // CSS color string e.g. 'var(--dt-teal)'
  colorHex: string // hex fallback for dynamic Tailwind e.g. '#00c49a'
  bgClass: string // Tailwind bg class e.g. 'bg-[#F0FDFB]'
  options: ServiceOption[]
  addons: string[]
  times: string[]
}

export interface BookingState {
  service: ServiceId | null
  option: string | null
  date: string | null
  time: string | null
  guests: number
  ages: string[]
  addons: string[]
  name: string
  email: string
  phone: string
  notes: string
}

export enum BookingStepIndex {
  Service = 0,
  Package = 1,
  DateTime = 2,
  Guests = 3,
  Review = 4,
}

export interface BookingProgressBarProps {
  steps: string[]
  current: number
  accentColor?: string
}

export interface BookingStepHeaderProps {
  eyebrow: string
  title: string
  sub?: string
  accentColor?: string
}

export type CalendarWidgetProps = {
  month: number
  year: number
  highlightedDates?: string[]
  onDateSelect?: (date: string) => void
  selectedDate?: string | null
}

export interface OptionTileProps {
  option: ServiceOption
  selected: boolean
  accentColor: string
  accentHex: string
  onClick: () => void
}

export interface ServiceTileProps {
  service: BookingService
  selected: boolean
  delay?: number
  onClick: () => void
}

export interface MiniCalendarProps {
  selected: string | null
  onSelect: (date: string) => void
  accentHex: string
}

export interface BackButtonProps {
  onClick: () => void
}

export interface NextButtonProps {
  label: string
  disabled: boolean
  accentHex: string
  onClick: () => void
}

export interface SuccessScreenProps {
  booking: BookingState
  svcLabel: string
  optLabel: string
  accentHex: string
  onReset: () => void
}

export interface BookingStepSharedProps {
  booking: BookingState
  accent: string
  accentHex: string
  update: (next: Partial<BookingState>) => void
  setStep: (step: BookingStepIndex) => void
}

export interface BookingServiceStepProps extends BookingStepSharedProps {
  services: BookingService[]
}

export interface BookingOptionsStepProps extends BookingStepSharedProps {
  service: BookingService
  toggleAddon: (addon: string) => void
}

export interface BookingDateTimeStepProps extends BookingStepSharedProps {
  service: BookingService
  option?: ServiceOption
}

export interface BookingGuestsStepProps extends BookingStepSharedProps {
  ageOptions: string[]
  toggleAge: (age: string) => void
}

export interface BookingReviewStepProps extends BookingStepSharedProps {
  service: BookingService
  option: ServiceOption
  onSubmit: () => void
}

export type Step = {
  label: string
}

export type StepIndicatorProps = {
  steps: Step[]
  currentStep: number
}
