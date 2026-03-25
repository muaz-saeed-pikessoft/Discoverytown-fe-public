import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  illustration?: ReactNode
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ title, description, illustration, action }: EmptyStateProps) {
  return (
    <div className='flex min-h-[240px] w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center'>
      {illustration ? <div className='mb-4'>{illustration}</div> : null}
      <h3 className='text-lg font-black text-gray-900'>{title}</h3>
      <p className='mt-1 max-w-[520px] text-sm text-gray-500'>{description}</p>
      {action ? (
        <button
          type='button'
          onClick={action.onClick}
          className='mt-6 rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white transition hover:bg-blue-700'
        >
          {action.label}
        </button>
      ) : null}
    </div>
  )
}

