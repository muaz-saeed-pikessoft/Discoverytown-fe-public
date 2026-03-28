'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Intentionally minimal; logging/monitoring can be added later.
    void error
  }, [error])

  return (
    <div className='mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-5 py-14 text-center'>
      <div className='text-xs font-black uppercase tracking-widest text-gray-400'>Error</div>
      <h1 className='mt-2 text-3xl font-black tracking-tight text-gray-900'>Something went wrong</h1>
      <p className='mt-2 text-sm text-gray-600'>Please try again.</p>
      <button
        type='button'
        onClick={reset}
        className='mt-6 rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white'
      >
        Retry
      </button>
    </div>
  )
}

