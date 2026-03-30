import type { ReactNode } from 'react'

export type StatusChipVariant = 'success' | 'warning' | 'error' | 'neutral'

interface StatusChipProps {
  variant: StatusChipVariant
  children: ReactNode
  className?: string
}

const VARIANT_STYLES: Record<StatusChipVariant, { bg: string; color: string }> = {
  success: { bg: 'color-mix(in srgb, var(--dt-status-success) 16%, white)', color: 'var(--dt-status-success)' },
  warning: { bg: 'color-mix(in srgb, var(--dt-status-warning) 16%, white)', color: 'var(--dt-status-warning)' },
  error: { bg: 'color-mix(in srgb, var(--dt-status-error) 14%, white)', color: 'var(--dt-status-error)' },
  neutral: { bg: 'var(--dt-bg-soft)', color: 'var(--dt-text-muted)' },
}

export default function StatusChip({ variant, children, className = '' }: StatusChipProps) {
  const v = VARIANT_STYLES[variant]
  return (
    <span
      className={['dt-pill-accent', className].filter(Boolean).join(' ')}
      style={{
        ['--dt-pill-bg' as string]: v.bg,
        ['--dt-pill-color' as string]: v.color,
      }}
    >
      {children}
    </span>
  )
}

