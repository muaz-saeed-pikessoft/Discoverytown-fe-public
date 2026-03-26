import type { PartyPackage, PartyCardTheme } from '@/types/booking-types'

import type { PrivatePackageItem, VenuePackageItem } from './types'

const PRIVATE_THEME_STYLES: Record<
  PartyCardTheme,
  { accent: string; bg: string; border: string }
> = {
  primary: {
    accent: 'var(--dt-primary)',
    bg: 'var(--dt-primary-light)',
    border: 'var(--dt-border)',
  },
  teal: {
    accent: 'var(--dt-teal)',
    bg: 'var(--dt-teal-light)',
    border: 'var(--dt-border)',
  },
  teal_dark: {
    accent: 'var(--dt-teal-dark)',
    bg: 'var(--dt-teal-light)',
    border: 'var(--dt-border)',
  },
  navy: {
    accent: 'var(--dt-navy)',
    bg: 'var(--dt-bg-card)',
    border: 'var(--dt-border)',
  },
  dark: {
    accent: 'var(--dt-dark)',
    bg: 'var(--dt-bg-card)',
    border: 'var(--dt-border)',
  },
}

const VENUE_THEME_ACCENT: Record<PartyCardTheme, string> = {
  primary: 'var(--dt-primary)',
  teal: 'var(--dt-teal)',
  teal_dark: 'var(--dt-teal-dark)',
  navy: 'var(--dt-navy)',
  dark: 'var(--dt-dark)',
}

export function formatPartyPriceDisplay(pkg: PartyPackage): string {
  if (pkg.priceMin !== pkg.priceMax) {
    return `$${pkg.priceMin.toLocaleString('en-US')} – $${pkg.priceMax.toLocaleString('en-US')}`
  }
  return `$${pkg.priceMin.toLocaleString('en-US')}`
}

export function formatPartyDuration(minutes: number): string {
  const hours = minutes / 60
  if (Number.isInteger(hours)) {
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }
  const rounded = Math.round(hours * 10) / 10
  return `${rounded} hours`
}

export function mapPartyPackageToPrivateItem(pkg: PartyPackage): PrivatePackageItem {
  const styles = PRIVATE_THEME_STYLES[pkg.cardTheme] ?? PRIVATE_THEME_STYLES.primary
  const badge = pkg.badgeLabel ?? (pkg.popular ? 'Most Popular' : null)

  return {
    id: pkg.id,
    name: pkg.name,
    img: pkg.imageUrl || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80',
    price: formatPartyPriceDisplay(pkg),
    priceNote: null,
    accent: styles.accent,
    bg: styles.bg,
    border: styles.border,
    badge,
    children: pkg.guestsIncluded,
    adults: pkg.adultsIncluded,
    duration: formatPartyDuration(pkg.duration),
    extraChild: `$${pkg.pricePerExtraGuest} / extra child`,
    inclusions: pkg.features.map(text => ({ text })),
  }
}

export function mapPartyPackageToVenueItem(pkg: PartyPackage): VenuePackageItem {
  const accent = VENUE_THEME_ACCENT[pkg.cardTheme] ?? VENUE_THEME_ACCENT.primary
  const badge = pkg.badgeLabel ?? (pkg.popular ? 'Most Popular' : undefined)

  return {
    id: pkg.id,
    name: pkg.name,
    price: formatPartyPriceDisplay(pkg),
    deposit: pkg.depositNote,
    accent,
    guests: pkg.guestsIncluded,
    duration: formatPartyDuration(pkg.duration),
    staff: pkg.staffSummary,
    inclusions: pkg.features.map(text => ({ text })),
    badge,
  }
}
