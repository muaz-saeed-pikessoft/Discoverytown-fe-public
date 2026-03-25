/**
 * Commerce data adapter.
 *
 * Transforms raw API commerce responses (snake_case) into
 * application-level types (camelCase).
 */

import type {
  CommerceItem,
  CommerceCategory,
} from '@/modules/commerce/components/commerceData'

/** Raw API commerce item shape — Source: backend /api/commerce/:category/items */
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

/** Raw order confirmation shape — Source: backend /api/commerce/orders */
export interface RawOrderConfirmationResponse {
  order_id: string
  status: string
}

/** App-level order confirmation type */
export interface OrderConfirmation {
  orderId: string
  status: 'received' | 'confirmed' | 'processing'
}

/**
 * Transform a single raw commerce item response into CommerceItem.
 */
export function adaptCommerceItem(
  raw: RawCommerceItemResponse,
): CommerceItem {
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
 * Transform a list of raw commerce items.
 */
export function adaptCommerceItems(
  raw: RawCommerceItemResponse[],
): CommerceItem[] {
  return raw.map(adaptCommerceItem)
}

/**
 * Transform a raw order confirmation response.
 */
export function adaptOrderConfirmation(
  raw: RawOrderConfirmationResponse,
): OrderConfirmation {
  return {
    orderId: raw.order_id,
    status: raw.status as OrderConfirmation['status'],
  }
}
