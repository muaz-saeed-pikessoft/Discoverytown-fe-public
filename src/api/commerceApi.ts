/**
 * Commerce API service.
 * Handles shop, gift, and rental operations.
 *
 * Currently returns mock data.
 * When backend is ready: replace mock returns with apiClient calls.
 */

import type { CommerceItem, CommerceCategory } from '@/modules/commerce/components/commerceData'
import { getCommerceItems as getMockItems } from '@/modules/commerce/components/commerceData'

// import apiClient from './client'

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

/** Commerce order response */
export interface OrderConfirmation {
  orderId: string
  status: 'received' | 'confirmed' | 'processing'
}

/**
 * Fetch commerce items by category.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.get<CommerceItem[]>(`/commerce/${category}/items`)
 *   return data
 */
export async function getCommerceItemsByCategory(category: CommerceCategory): Promise<CommerceItem[]> {
  return getMockItems(category)
}

/**
 * Submit a commerce order.
 *
 * API-READY: Replace mock with:
 *   const { data } = await apiClient.post<OrderConfirmation>('/commerce/orders', payload)
 *   return data
 */
export async function submitOrder(payload: SubmitOrderPayload): Promise<OrderConfirmation> {
  void payload

  return {
    orderId: `ORD-${Date.now()}`,
    status: 'received',
  }
}
