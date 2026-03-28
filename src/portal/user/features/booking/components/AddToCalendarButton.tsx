'use client'

import { useMemo, useState } from 'react'

import type { Booking } from '@/types/scheduling.shared'

interface AddToCalendarButtonProps {
  booking: Booking
  className?: string
}

function formatIcsDate(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(
    d.getUTCSeconds(),
  )}Z`
}

function escapeIcsText(value: string): string {
  // RFC5545 text escaping: backslash, comma, semicolon, newline
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll('\r\n', '\n')
    .replaceAll('\n', '\\n')
    .replaceAll(',', '\\,')
    .replaceAll(';', '\\;')
}

export default function AddToCalendarButton({ booking, className }: AddToCalendarButtonProps) {
  const [downloading, setDownloading] = useState(false)

  const ics = useMemo(() => {
    const start = booking.startAt ?? new Date().toISOString()
    const rawEnd = booking.endAt ?? new Date().toISOString()
    const end =
      new Date(rawEnd).getTime() > new Date(start).getTime()
        ? rawEnd
        : new Date(new Date(start).getTime() + 60 * 60_000).toISOString()
    const dtStart = formatIcsDate(start)
    const dtEnd = formatIcsDate(end)
    const summary = escapeIcsText(booking.service.name)
    const description = escapeIcsText(booking.notes ?? '')
    const uid = `${booking.id}@discoverytown.local`

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DiscoveryTown//Booking//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR',
      '',
    ].join('\r\n')
  }, [booking])

  return (
    <button
      type='button'
      className={className ?? 'h-11 rounded-xl border border-base-300 bg-base-100 px-4 text-sm font-black text-base-content transition hover:bg-base-200'}
      disabled={downloading}
      onClick={() => {
        if (downloading) return
        setDownloading(true)
        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `booking-${booking.id}.ics`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.setTimeout(() => {
          URL.revokeObjectURL(url)
          setDownloading(false)
        }, 750)
      }}
    >
      {downloading ? 'Preparing…' : 'Add to calendar'}
    </button>
  )
}

