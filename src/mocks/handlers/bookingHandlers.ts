/**
 * Booking MSW request handlers.
 *
 * Simulates backend booking endpoints: bookings, time slots,
 * classes, events, and party packages with snake_case responses.
 */

import { delay, http, HttpResponse } from 'msw'

import { MOCK_RAW_BOOKINGS, MOCK_RAW_CLASSES, MOCK_RAW_EVENTS, MOCK_RAW_TIME_SLOTS } from '@/mocks/data/mockApiData'
import { MOCK_PARTY_PACKAGES_API_RESPONSE } from '@/mocks/data/partyPackagesEnvelope'
import type { RawBookingResponse } from '@/data/adapters/bookingAdapter'

const SIMULATED_DELAY_MS = 300

export const bookingHandlers = [
  /** GET /api/bookings */
  http.get('/api/bookings', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)

    const url = new URL(request.url)
    const status = url.searchParams.get('status')

    let result = [...MOCK_RAW_BOOKINGS]

    if (status) {
      result = result.filter((booking) => booking.status === status)
    }

    return HttpResponse.json(result)
  }),

  /** POST /api/bookings */
  http.post('/api/bookings', async ({ request }) => {
    await delay(SIMULATED_DELAY_MS)

    const body = await request.json() as Partial<RawBookingResponse> & {
      guests?: RawBookingResponse['guests']
    }

    const now = new Date()
    const isoDate = now.toISOString().slice(0, 10)

    const response: RawBookingResponse = {
      id: `bk-${Date.now()}`,
      booking_type: body.booking_type ?? 'drop-in',
      title: body.title ?? 'Booking Request',
      scheduled_date: body.scheduled_date ?? isoDate,
      time_range: body.time_range ?? '10:00 AM – 12:00 PM',
      status: body.status ?? 'confirmed',
      total_amount: body.total_amount ?? 0,
      confirmation_code:
        body.confirmation_code ?? `DT-${now.getFullYear()}-${String(Date.now()).slice(-4)}`,
      guests: body.guests ?? [],
    }

    return HttpResponse.json(response, { status: 201 })
  }),

  /** PATCH /api/bookings/:id/cancel */
  http.patch('/api/bookings/:id/cancel', async ({ params }) => {
    await delay(SIMULATED_DELAY_MS)

    const { id } = params
    const booking = MOCK_RAW_BOOKINGS.find((b) => b.id === id)

    if (!booking) {
      return HttpResponse.json(
        { message: 'Booking not found' },
        { status: 404 },
      )
    }

    return HttpResponse.json({
      ...booking,
      status: 'cancelled',
    })
  }),

  /** GET /api/time-slots */
  http.get('/api/time-slots', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_RAW_TIME_SLOTS)
  }),

  /** GET /api/classes */
  http.get('/api/classes', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_RAW_CLASSES)
  }),

  /** GET /api/events */
  http.get('/api/events', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_RAW_EVENTS)
  }),

  /** GET /api/party-packages */
  http.get('/api/party-packages', async () => {
    await delay(SIMULATED_DELAY_MS)

    return HttpResponse.json(MOCK_PARTY_PACKAGES_API_RESPONSE)
  }),
]
