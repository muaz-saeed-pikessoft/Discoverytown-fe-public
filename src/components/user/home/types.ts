import type { ReactNode } from 'react'

export interface CategoryCard {
  title: string
  description: string
  href: string
  actionHref: string
  actionLabel: string
  image: string
  accentHex: string
}

export interface Highlight {
  value: string
  label: string
}

export interface Reason {
  title: string
  body: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  text?: string
  stars?: number
  avatar: string
  color: string
}

export interface FAQ {
  q: string
  a: string
}

export interface ExperienceItem {
  name: string
  title: string
  desc: string
  description: string
  href: string
  image: string
  badge?: string
  bg?: string
  emoji?: string
  color?: string
  accentHex: string
}

export interface ExperienceCardProps {
  item: ExperienceItem
}

export interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  center?: boolean
  dark?: boolean
}

export interface StarRatingProps {
  count: number
}

export interface HighlightCardProps {
  highlight: Highlight
}

export interface ReasonCardProps {
  reason: Reason
}

export interface TestimonialCardProps {
  testimonial?: Testimonial
  item?: TestimonialItem
}

export interface FAQItemProps {
  faq: FAQ
}

export interface TestimonialItem {
  name: string
  role: string
  quote: string
  text?: string
  stars?: number
  avatar: string
  color: string
}
