import type { FC } from 'react'
import Link from 'next/link'

const NotFoundState: FC = () => {
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[var(--dt-cream)] px-5 text-center'>
      <span className='text-[56px]'>🔍</span>
      <p className='text-lg font-bold text-[#888]'>Class not found.</p>
      <Link
        href='/classes'
        className='rounded-xl bg-[#4C6EF5] px-7 py-3 text-sm font-extrabold text-white shadow-[0_4px_14px_rgba(76,110,245,0.35)] transition hover:-translate-y-0.5'
      >
        ← Back to Classes
      </Link>
    </div>
  )
}

export default NotFoundState
