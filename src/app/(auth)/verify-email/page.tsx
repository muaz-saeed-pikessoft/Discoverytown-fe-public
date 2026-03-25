'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') ?? ''

  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')

  useEffect(() => {
    async function run() {
      if (!token) return
      setStatus('verifying')
      try {
        // Placeholder until backend endpoint is wired.
        await new Promise(resolve => setTimeout(resolve, 400))
        setStatus('success')
        toast.success('Email verified.')
      } catch {
        setStatus('error')
        toast.error('Email verification failed.')
      }
    }

    void run()
  }, [token])

  return (
    <div className='relative flex min-h-screen items-center justify-center px-5 py-10'>
      <div className='w-full max-w-[440px] rounded-3xl border border-[#F0EDE8] bg-white px-8 py-9 shadow-[0_8px_40px_rgba(0,0,0,0.08)]'>
        <h1 className='font-serif text-[1.8rem] font-black text-[var(--dt-navy)]'>Verify email</h1>
        <p className='mt-1 text-sm font-semibold text-[#888]'>Confirming your email address.</p>

        {!token ? (
          <div className='mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-semibold text-yellow-800'>
            Missing verification token.
          </div>
        ) : null}

        {token ? (
          <div className='mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm font-semibold text-gray-700'>
            {status === 'verifying' ? 'Verifying…' : status === 'success' ? 'Verified.' : status === 'error' ? 'Failed.' : 'Ready.'}
          </div>
        ) : null}

        <div className='mt-6 text-center text-sm font-semibold text-[#888]'>
          <Link href='/login' className='font-extrabold text-[var(--dt-coral)] no-underline hover:underline'>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

