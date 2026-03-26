/** Estimated checkout math for the booking review step (preview until backend pricing exists). */

export const ESTIMATED_TAX_RATE = 0.08

export const CARD_PROCESSING_RATE = 0.03

export interface CheckoutBreakdown {
  packageSubtotal: number
  discountAmount: number
  afterDiscount: number
  tax: number
  tip: number
  donation: number
  cardFee: number
  total: number
}

export function parseListedPrice(priceLabel: string): number {
  if (!priceLabel || priceLabel.toLowerCase().includes('custom')) return 0
  const cleaned = priceLabel.replace(/,/g, '')
  const match = cleaned.match(/\$(\d+)/)

  return match ? Number(match[1]) : 0
}

/** Uses the first dollar amount in an add-on label (flat fees only; excludes per-child math). */
export function parseAddonFlatPrice(addonLabel: string): number {
  const match = addonLabel.match(/\$(\d+)/)

  return match ? Number(match[1]) : 0
}

export function parseDiscountPercent(code: string): number {
  const normalized = code.trim().toLowerCase()
  if (normalized === 'save10') return 10
  if (normalized === 'party5') return 5

  return 0
}

export function computeCheckoutTotals(input: {
  packageBase: number
  addonLabels: string[]
  discountCode: string
  tipPercent: number
  donationDollars: string
  passCardFee: boolean
}): CheckoutBreakdown {
  const addonSum = input.addonLabels.reduce((sum, label) => sum + parseAddonFlatPrice(label), 0)
  const packageSubtotal = input.packageBase + addonSum
  const discountPct = parseDiscountPercent(input.discountCode)
  const discountAmount = packageSubtotal * (discountPct / 100)
  const afterDiscount = Math.max(0, packageSubtotal - discountAmount)
  const tax = afterDiscount * ESTIMATED_TAX_RATE
  const tipBase = afterDiscount + tax
  const tip = input.tipPercent > 0 ? tipBase * (input.tipPercent / 100) : 0
  const donation = Math.max(0, Number.parseFloat(input.donationDollars) || 0)
  const preCard = afterDiscount + tax + tip + donation
  const cardFee = input.passCardFee ? preCard * CARD_PROCESSING_RATE : 0
  const total = preCard + cardFee

  return {
    packageSubtotal,
    discountAmount,
    afterDiscount,
    tax,
    tip,
    donation,
    cardFee,
    total,
  }
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`
}
