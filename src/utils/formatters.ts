export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getAgeRangeLabel(min: number, max: number): string {
  return `${min}–${max} years`
}

export function getSpotsLabel(available: number, total: number): string {
  if (available === 0) return 'Full'
  if (available <= 3) return `Only ${available} spots left!`

  return `${available} of ${total} spots available`
}
