import type { ReactNode, PropsWithChildren, CSSProperties } from 'react'

export interface AccentPillProps {
  children: ReactNode
  color?: string
  background?: string
  className?: string
}

export interface ActionLinkProps {
  href: string
  children: ReactNode
  accentColor?: string
  variant?: 'solid' | 'outline'
  className?: string
}

export interface CtaStripProps {
  title: string
  subtitle?: string
  primaryHref: string
  primaryLabel: string
  primaryColor?: string // CSS color string, e.g. 'var(--dt-teal)'
  secondaryHref?: string
  secondaryLabel?: string
}

export interface FlowStep {
  title: string
  description: string
}

export interface FlowStepsProps {
  eyebrow: string
  title: string
  description: string
  accentColor: string
  steps: FlowStep[]
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
}

export interface HeroProps {
  bgUrl?: string
  bgStyle?: CSSProperties
  bgClassName?: string
  minHeight?: string
  containerClassName?: string
  title: ReactNode
  description: ReactNode
  eyebrow?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  hasGrain?: boolean
}

export interface SectionProps extends PropsWithChildren {
  id: string
}

export interface SectionHeaderProps {
  eyebrow?: string
  title: string
  desc?: string // for play/gym/events
  description?: string // for cafeFood compatibility
  accentColor?: string // e.g. 'var(--dt-coral)', overrides default teal
  dark?: boolean
}

export interface NavItem {
  id: any
  label: string
}

export interface SectionNavProps {
  active: any
  onNav: (id: any) => void
  items: NavItem[]
}

export interface SubLabelProps {
  text: string
}
