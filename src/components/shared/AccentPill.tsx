import type { AccentPillProps } from './types'
import type { ReactNode } from 'react'

export default function AccentPill({
  children,
  color = 'var(--dt-primary)',
  background = 'var(--dt-primary-light)',
  className = '',
}: AccentPillProps) {
  return (
    <span
      className={`dt-pill-accent ${className}`.trim()}
      style={{
        ['--dt-pill-color' as string]: color,
        ['--dt-pill-bg' as string]: background,
      }}
    >
      {children}
    </span>
  )
}
