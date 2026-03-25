/**
 * Commerce API service.
 *
 * Handles shop, gift, and rental operations via Axios.
 * MSW intercepts these calls in development; real backend handles them in production.
 *
 * API-READY: Only endpoint URLs need to change for production.
 */

import type { CommerceCategory, CommerceItem } from '@/modules/commerce/components/commerceData'
import {
  adaptCommerceItems,
  adaptOrderConfirmation,
} from '@/data/adapters/commerceAdapter'
import type {
  RawCommerceItemResponse,
  RawOrderConfirmationResponse,
  OrderConfirmation,
} from '@/data/adapters/commerceAdapter'

import apiClient from './client'

export type StorefrontCommerceCategory = 'cafe' | 'gifts' | 'rentals' | 'shop'

export interface StorefrontCommerceItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  tags: string[]
  popular?: boolean
  category: StorefrontCommerceCategory
}

/**
 * Fetch storefront commerce items (UI-facing catalog).
 *
 * Note: This is intentionally separate from the "API-ready" commerce
 * endpoints (`/api/commerce/...`) which mirror the backend contract.
 */
export async function getCommerceItems(
  category: StorefrontCommerceCategory,
): Promise<StorefrontCommerceItem[]> {
  const { data } = await apiClient.get<StorefrontCommerceItem[]>(
    `/api/storefront/commerce/${category}/items`,
  )

  return data
}

/** Commerce order submission payload */
export interface SubmitOrderPayload {
  itemSlug: string
  category: CommerceCategory
  quantity: number
  fulfillment: 'pickup' | 'delivery'
  date: string
  time: string
  address?: string
  notes?: string
  name: string
  email: string
  phone: string
}

/**
 * Fetch commerce items by category.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function getCommerceItemsByCategory(
  category: CommerceCategory,
): Promise<CommerceItem[]> {
  const { data } = await apiClient.get<RawCommerceItemResponse[]>(
    `/api/commerce/${category}/items`,
  )

  return adaptCommerceItems(data)
}

/**
 * Submit a commerce order.
 * API-READY: Only endpoint URL needs to change for production.
 */
export async function submitOrder(
  payload: SubmitOrderPayload,
): Promise<OrderConfirmation> {
  const { data } = await apiClient.post<RawOrderConfirmationResponse>(
    '/api/commerce/orders',
    {
      item_slug: payload.itemSlug,
      category: payload.category,
      quantity: payload.quantity,
      fulfillment: payload.fulfillment,
      date: payload.date,
      time: payload.time,
      address: payload.address,
      notes: payload.notes,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    },
  )

  return adaptOrderConfirmation(data)
}
