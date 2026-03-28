import { NextResponse } from 'next/server'

import { publicServices } from '@/app/api/v1/_publicMockDb'
import type { AvailableWindow, AvailableWindowsResponse } from '@/types/scheduling.shared'

function parseDate(value: string | null): string | null {
  if (!value) return null
  // Expect YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  return value
}

function formatIso(date: Date): string {
  return date.toISOString()
}

function atLocal(dateYmd: string, hhmm: string): Date {
  const [y, m, d] = dateYmd.split('-').map(Number)
  const [hh, mm] = hhmm.split(':').map(Number)
  return new Date(y, m - 1, d, hh, mm, 0, 0)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const serviceId = searchParams.get('serviceId')
  const date = parseDate(searchParams.get('date'))

  if (!serviceId || !date) {
    return NextResponse.json({ message: 'Missing serviceId or invalid date' }, { status: 400 })
  }

  const service = publicServices.find(s => s.id === serviceId)
  if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 })

  const increment = (() => {
    const maybe = (service as any).slotIncrementMinutes
    return typeof maybe === 'number' && maybe > 0 ? maybe : 30
  })()

  const maxConcurrent = (() => {
    const maybe = (service as any).maxConcurrent
    return typeof maybe === 'number' && maybe > 0 ? maybe : 10
  })()

  const minDuration = (() => {
    const maybe = (service as any).minDurationMinutes
    return typeof maybe === 'number' && maybe > 0 ? maybe : 60
  })()

  // Mock operating hours (can be moved into location settings later)
  const operatingHours = { open: '09:00', close: '18:00' }
  const openAt = atLocal(date, operatingHours.open)
  const closeAt = atLocal(date, operatingHours.close)

  const windows: AvailableWindow[] = []
  for (let t = openAt.getTime(); t + minDuration * 60_000 <= closeAt.getTime(); t += increment * 60_000) {
    const startAt = new Date(t)
    const endAt = new Date(t + minDuration * 60_000)
    // Deterministic-ish availability: fewer spots later in the day.
    const hoursFromOpen = Math.floor((t - openAt.getTime()) / 3_600_000)
    const spotsRemaining = Math.max(0, Math.min(maxConcurrent, maxConcurrent - Math.max(0, hoursFromOpen - 3)))
    windows.push({ startAt: formatIso(startAt), endAt: formatIso(endAt), spotsRemaining })
  }

  const response: AvailableWindowsResponse = {
    date,
    serviceId,
    windows,
    operatingHours,
  }

  return NextResponse.json({ data: response })
}

