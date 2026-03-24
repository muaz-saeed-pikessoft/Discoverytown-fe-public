/**
 * FormWrapper component.
 *
 * Reusable container for complex forms. Provides:
 * - Title and Description context
 * - Loading state UI overlay
 * - Error/Success message box
 * - Standardized responsive grid layouts
 */

import React, { memo } from 'react'

interface FormWrapperProps {
  /** Form title */
  title?: string

  /** Form helper description */
  description?: string

  /** Submit handler */
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void

  /** Inner content (fields) */
  children: React.ReactNode

  /** Main call-to-action button text */
  submitLabel?: string

  /** Loading state indicator */
  isLoading?: boolean

  /** Optional error message */
  error?: string | null

  /** Optional success message */
  success?: string | null

  /** Optional secondary button */
  secondaryAction?: React.ReactNode

  /** Use a two-column grid layout on desktop */
  twoColumn?: boolean
}

function FormWrapperComponent({
  title,
  description,
  onSubmit,
  children,
  submitLabel = 'Submit',
  isLoading = false,
  error = null,
  success = null,
  secondaryAction,
  twoColumn = false,
}: FormWrapperProps) {
  return (
    <div className='relative rounded-2xl border border-[var(--dt-border)] bg-white p-6 shadow-sm sm:p-8'>
      {/* Loading Overlay */}
      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm'>
          <div className='flex flex-col items-center'>
            <div className='h-10 w-10 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
            <p className='mt-3 font-semibold text-[var(--dt-navy)]'>Processing...</p>
          </div>
        </div>
      )}

      {/* Header */}
      {(title || description) && (
        <div className='mb-8 border-b border-[var(--dt-border)] pb-6'>
          {title && <h2 className='text-2xl font-bold text-[var(--dt-navy)]'>{title}</h2>}
          {description && <p className='mt-2 text-[var(--dt-text-secondary)]'>{description}</p>}
        </div>
      )}

      {/* Feedback Messages */}
      {error && (
        <div className='mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100'>
          <span className='mr-2'>⚠️</span> {error}
        </div>
      )}

      {success && (
        <div className='mb-6 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-100'>
          <span className='mr-2'>✅</span> {success}
        </div>
      )}

      {/* Form Form */}
      <form onSubmit={onSubmit}>
        <div className={['gap-6', twoColumn ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'].join(' ')}>
          {children}
        </div>

        {/* Footer Actions */}
        <div className='mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-[var(--dt-border)] pt-6 sm:flex-row'>
          <div className='w-full sm:w-auto'>{secondaryAction}</div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full rounded-xl bg-[var(--dt-primary)] px-8 py-3.5 text-base font-bold text-white shadow hover:bg-blue-600 disabled:opacity-50 sm:w-auto transition-colors focus:ring-4 focus:ring-blue-100'
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}

const FormWrapper = memo(FormWrapperComponent)
FormWrapper.displayName = 'FormWrapper'

export default FormWrapper
