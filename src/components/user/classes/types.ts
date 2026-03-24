import type { ReactNode } from 'react'
import type { ClassCategory, ClassEvent } from '@/types/booking-types'

export type CategoryFilter = ClassCategory | 'all'

export type SortOption = 'upcoming' | 'price-low' | 'price-high' | 'availability'

export interface CategoryColors {
  bg: string
  text: string
  border: string
  accent: string
  gradient?: string
}

export interface SortOptionItem {
  value: SortOption
  label: string
}

export interface ClassStatus {
  isFull: boolean
  isAlmostFull: boolean
}

export interface ClassMetrics {
  enrolledPercent: number
  startDateShort: string
}

export type ClassItem = ClassEvent

export interface CategoryTabsProps {
  selectedCategory: CategoryFilter
  onSelect: (category: CategoryFilter) => void
}

export interface ClassCardProps {
  item: ClassItem
}

export interface DetailSectionProps {
  title: string
  children: ReactNode
}

export interface StatItem {
  icon: string
  value: string
  label: string
}

export interface StatsGridProps {
  items: StatItem[]
}

export interface DatesCardProps {
  colors: CategoryColors
  startDate: string
  endDate: string
  schedule: string
}

export interface DetailHeaderProps {
  item: ClassItem
  colors: CategoryColors
  isFull: boolean
  isAlmostFull: boolean
}

export type PricingOption = 'series' | 'session'

export interface DetailSidebarProps {
  isFull: boolean
  isAlmostFull: boolean
  colors: CategoryColors
  spotsAvailable: number
  spotsTotal: number
  priceSeries: number
  pricePerSession: number
  pricingOption: PricingOption
  onPricingChange: (option: PricingOption) => void
  onRegister: () => void
}

export interface EmptyStateProps {
  onReset: () => void
}

export interface FiltersBarProps {
  searchQuery: string
  sortBy: SortOption
  hasActiveFilters: boolean
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onClear: () => void
}

export interface HeroProps {
  totalPrograms: number
  openSpots: number
  waitlistOnly: number
}
