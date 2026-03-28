import type { StatusVariant } from '@/types/common'

type StatusBadgeVariant = 'booking' | 'payment' | 'membership' | 'lead'

interface StatusBadgeProps {
  status: string
  variant?: StatusBadgeVariant
}

const baseClass = 'inline-flex rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-widest'

const VARIANT_MAP: Record<StatusBadgeVariant, Record<string, StatusVariant>> = {
  booking: {
    confirmed: 'success',
    completed: 'info',
    cancelled: 'error',
    waitlisted: 'warning',
  },
  payment: {
    paid: 'success',
    pending: 'warning',
    failed: 'error',
    refunded: 'info',
  },
  membership: {
    active: 'success',
    paused: 'warning',
    cancelled: 'error',
    expired: 'neutral',
  },
  lead: {
    new: 'info',
    contacted: 'warning',
    won: 'success',
    lost: 'error',
  },
}

function getVariant(statusVariant: StatusVariant): string {
  switch (statusVariant) {
    case 'success':
      return 'bg-green-100 text-green-700'
    case 'warning':
      return 'bg-yellow-100 text-yellow-700'
    case 'error':
      return 'bg-red-100 text-red-700'
    case 'info':
      return 'bg-blue-100 text-blue-700'
    case 'neutral':
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function StatusBadge({ status, variant = 'booking' }: StatusBadgeProps) {
  const normalized = status.trim().toLowerCase()
  const mapped = VARIANT_MAP[variant][normalized] ?? 'neutral'

  return <span className={[baseClass, getVariant(mapped)].join(' ')}>{status}</span>
}

