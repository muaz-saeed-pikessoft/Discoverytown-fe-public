/**
 * Auth MSW request handlers.
 *
 * Simulates backend authentication endpoints with realistic
 * latency and snake_case response bodies.
 */

import { http, HttpResponse, delay } from 'msw'

import {
  MOCK_LOGIN_RESPONSE,
  MOCK_REGISTER_RESPONSE,
  MOCK_REFRESH_RESPONSE,
} from '@/mocks/data/mockApiData'

const SIMULATED_DELAY_MS = 300

export const authHandlers = [
  /** POST /api/auth/login */
  http.post('/api/auth/login', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)

    const body = await request.json() as {
      email?: string
      password?: string
    }

    if (!body?.email || !body?.password) {
      return HttpResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      )
    }

    return HttpResponse.json({
      ...MOCK_LOGIN_RESPONSE,
      user: {
        ...MOCK_LOGIN_RESPONSE.user,
        email: body.email,
      },
    })
  }),

  /** POST /api/auth/register */
  http.post('/api/auth/register', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)

    const body = await request.json() as {
      first_name?: string
      last_name?: string
      email?: string
    }

    if (!body?.email) {
      return HttpResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      )
    }

    const name = [body.first_name, body.last_name]
      .filter(Boolean)
      .join(' ')

    return HttpResponse.json({
      ...MOCK_REGISTER_RESPONSE,
      user: {
        ...MOCK_REGISTER_RESPONSE.user,
        email: body.email,
        name: name || 'New User',
      },
    })
  }),

  /** POST /api/auth/refresh */
  http.post('/api/auth/refresh', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_REFRESH_RESPONSE)
  }),

  /** POST /api/auth/logout */
  http.post('/api/auth/logout', async () => {
    await delay(100)

    return HttpResponse.json({ success: true })
  }),
]
