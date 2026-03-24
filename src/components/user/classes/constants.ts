import type { ClassCategory } from '@/types/booking-types'

import type { CategoryColors, CategoryFilter, SortOptionItem } from './types'

export const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All',
  art: 'Art',
  music: 'Music',
  movement: 'Movement',
  stem: 'STEM',
  language: 'Language',
}

export const CATEGORY_EMOJIS: Record<ClassCategory, string> = {
  art: '🎨',
  music: '🎵',
  movement: '🤸',
  stem: '🔬',
  language: '🗣️',
}

export const CATEGORY_COLORS: Record<ClassCategory, CategoryColors> = {
  art: {
    bg: 'var(--dt-coral-soft)',
    text: 'var(--dt-coral)',
    border: '#FFD0D0',
    accent: 'var(--dt-coral)',
    gradient: 'linear-gradient(135deg, var(--dt-coral-soft) 0%, #FFF8F0 60%, #FFF0FB 100%)',
  },
  music: {
    bg: '#F0F4FF',
    text: '#4C6EF5',
    border: '#C5D0FF',
    accent: '#4C6EF5',
    gradient: 'linear-gradient(135deg, #F0F4FF 0%, #EEF2FF 60%, #F5F0FF 100%)',
  },
  movement: {
    bg: 'var(--dt-mint-soft)',
    text: '#0CA678',
    border: '#96F2D7',
    accent: '#0CA678',
    gradient: 'linear-gradient(135deg, var(--dt-mint-soft) 0%, #ECFDF5 60%, #F0FFF4 100%)',
  },
  stem: {
    bg: '#F3F0FF',
    text: '#7950F2',
    border: '#D0BFFF',
    accent: '#7950F2',
    gradient: 'linear-gradient(135deg, #F3F0FF 0%, #EDE9FE 60%, #F0F0FF 100%)',
  },
  language: {
    bg: '#FFFBEB',
    text: '#D97706',
    border: '#FDE68A',
    accent: '#D97706',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 60%, #FFFDF5 100%)',
  },
}

export const SORT_OPTIONS: SortOptionItem[] = [
  { value: 'upcoming', label: 'Start Date (Soonest)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'availability', label: 'Most Available' },
]

export const HERO_BADGES = [
  { key: 'programs', label: 'programs', className: 'border-[#C5D0FF] bg-[#F0F4FF] text-[#4C6EF5]' },
  { key: 'open-spots', label: 'open spots', className: 'border-[#96F2D7] bg-[var(--dt-mint-soft)] text-[#0CA678]' },
  { key: 'waitlist', label: 'waitlist only', className: 'border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]' },
] as const
