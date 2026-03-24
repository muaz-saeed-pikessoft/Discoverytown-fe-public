/**
 * Commerce data adapter.
 *
 * Transforms raw API commerce responses into application-level types.
 */

import type { CommerceItem, CommerceCategory } from '@/modules/commerce/components/commerceData'

/** Raw API commerce item shape */
export interface RawCommerceItemResponse {
  id: string
  slug: string
  name: string
  price: string
  description: string
  image_url: string
  accent_color: string
  soft_bg: string
  border_color: string
  category: string
  section_label: string
}

/**
 * Transform a raw commerce item response into CommerceItem.
 */
export function adaptCommerceItem(raw: RawCommerceItemResponse): CommerceItem {
  return {
    slug: raw.slug,
    name: raw.name,
    price: raw.price,
    description: raw.description,
    image: raw.image_url,
    accent: raw.accent_color,
    softBg: raw.soft_bg,
    border: raw.border_color,
    category: raw.category as CommerceCategory,
    sectionLabel: raw.section_label,
  }
}

/**
 * Adapt a list of raw commerce items.
 */
export function adaptCommerceItems(raw: RawCommerceItemResponse[]): CommerceItem[] {
  return raw.map(adaptCommerceItem)
}
