'use client'

import { useMemo } from 'react'

interface CapacityRingProps {
  booked: number
  capacity: number
  size?: 'sm' | 'md'
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export default function CapacityRing({ booked, capacity, size = 'md' }: CapacityRingProps) {
  const safeCapacity = Math.max(0, capacity)
  const safeBooked = Math.max(0, booked)
  const pct = safeCapacity === 0 ? 0 : clamp((safeBooked / safeCapacity) * 100, 0, 999)

  const { ringColor, trackColor } = useMemo(() => {
    if (safeCapacity > 0 && safeBooked >= safeCapacity) return { ringColor: '#6b7280', trackColor: '#e5e7eb' } // FULL -> gray
    if (pct >= 90) return { ringColor: '#dc2626', trackColor: '#fee2e2' } // red
    if (pct >= 60) return { ringColor: '#d97706', trackColor: '#ffedd5' } // amber
    return { ringColor: '#16a34a', trackColor: '#dcfce7' } // green
  }, [pct, safeBooked, safeCapacity])

  const px = size === 'sm' ? 28 : 36
  const stroke = size === 'sm' ? 3 : 4
  const r = (px - stroke) / 2
  const c = 2 * Math.PI * r
  const progress = safeCapacity === 0 ? 0 : clamp(safeBooked / safeCapacity, 0, 1)
  const dashOffset = c * (1 - progress)

  return (
    <div className='inline-flex items-center gap-2'>
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} role='img' aria-label={`${safeBooked} of ${safeCapacity}`}>
        <circle cx={px / 2} cy={px / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill='none' />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke={ringColor}
          strokeWidth={stroke}
          fill='none'
          strokeLinecap='round'
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${px / 2} ${px / 2})`}
        />
      </svg>
      <span className='text-xs font-black tabular-nums text-gray-700'>
        {safeBooked}/{safeCapacity}
      </span>
    </div>
  )
}

