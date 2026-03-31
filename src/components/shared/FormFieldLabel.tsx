import type { ReactNode } from 'react'

interface FormFieldLabelProps {
  htmlFor: string
  children: ReactNode
  className?: string
}

export default function FormFieldLabel({ htmlFor, children, className = '' }: FormFieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={['dt-sub-label', className].filter(Boolean).join(' ')}>
      {children}
    </label>
  )
}

