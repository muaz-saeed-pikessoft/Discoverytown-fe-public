import type { ReactNode } from 'react'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  illustration?: ReactNode
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again. If the problem continues, contact support.',
  onRetry,
  illustration,
}: ErrorStateProps) {
  return (
    <div className='flex min-h-[240px] w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center'>
      {illustration ? <div className='mb-4'>{illustration}</div> : null}
      <h3 className='text-lg font-black text-gray-900'>{title}</h3>
      <p className='mt-1 max-w-[520px] text-sm text-gray-500'>{description}</p>
      {onRetry ? (
        <button
          type='button'
          onClick={onRetry}
          className='mt-6 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-black text-gray-700 transition hover:bg-gray-50'
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}

