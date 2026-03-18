import type { ActionLinkProps } from './types'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default function ActionLink({
  href,
  children,
  accentColor = 'var(--dt-primary)',
  variant = 'solid',
  className = '',
}: ActionLinkProps) {
  const baseClass = variant === 'solid' ? 'dt-btn-solid' : 'dt-btn-outline'

  return (
    <Link
      href={href}
      className={`${baseClass} ${className}`.trim()}
      style={{ ['--dt-btn-accent' as string]: accentColor }}
    >
      {children}
    </Link>
  )
}
