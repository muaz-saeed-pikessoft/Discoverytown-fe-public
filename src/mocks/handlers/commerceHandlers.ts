/**
 * Commerce MSW request handlers.
 *
 * Simulates backend commerce endpoints with snake_case responses.
 */

import { http, HttpResponse, delay } from 'msw'

import {
  MOCK_RAW_COMMERCE_ITEMS,
  MOCK_RAW_ORDER_CONFIRMATION,
  MOCK_STOREFRONT_COMMERCE_ITEMS,
} from '@/mocks/data/mockApiData'

const SIMULATED_DELAY_MS = 300

export const commerceHandlers = [
  /** GET /api/storefront/commerce/:category/items */
  http.get('/api/storefront/commerce/:category/items', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)

    const { category } = params

    const items = MOCK_STOREFRONT_COMMERCE_ITEMS.filter(
      (item) => item.category === category,
    )

    return HttpResponse.json(items)
  }),

  /** GET /api/commerce/:category/items */
  http.get('/api/commerce/:category/items', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)

    const { category } = params

    const items = MOCK_RAW_COMMERCE_ITEMS.filter(
      (item) => item.category === category,
    )

    return HttpResponse.json(items)
  }),

  /** POST /api/commerce/orders */
  http.post('/api/commerce/orders', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json({
      ...MOCK_RAW_ORDER_CONFIRMATION,
      order_id: `ORD-${Date.now()}`,
    })
  }),
]
