/**
 * User MSW request handlers.
 *
 * Simulates backend user/profile endpoints with snake_case responses.
 */

import { http, HttpResponse, delay } from 'msw'

import { MOCK_RAW_PROFILE } from '@/mocks/data/mockApiData'

const SIMULATED_DELAY_MS = 300

export const userHandlers = [
  /** GET /api/users/profile */
  http.get('/api/users/profile', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_RAW_PROFILE)
  }),

  /** PUT /api/users/profile */
  http.put('/api/users/profile', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)

    const body = await request.json() as Record<string, unknown>

    return HttpResponse.json({
      ...MOCK_RAW_PROFILE,
      ...body,
    })
  }),

  /** GET /api/users/children */
  http.get('/api/users/children', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_RAW_PROFILE.children)
  }),

  /** POST /api/users/children */
  http.post('/api/users/children', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)

    const body = await request.json() as Record<string, unknown>

    return HttpResponse.json({
      id: `child-${Date.now()}`,
      ...body,
    })
  }),
]
