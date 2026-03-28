'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = Boolean(token && password && confirmPassword && password === confirmPassword)

  async function onSubmit() {
    setIsSubmitting(true)
    try {
      // Placeholder until backend endpoint is wired.
      await new Promise(resolve => setTimeout(resolve, 400))
      toast.success('Password updated. You can now sign in.')
    } catch {
      toast.error('Failed to reset password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center px-5 py-10'>
      <div className='w-full max-w-[440px] rounded-3xl border border-[#F0EDE8] bg-white px-8 py-9 shadow-[0_8px_40px_rgba(0,0,0,0.08)]'>
        <h1 className='font-serif text-[1.8rem] font-black text-[var(--dt-navy)]'>Reset password</h1>
        <p className='mt-1 text-sm font-semibold text-[#888]'>Choose a new password for your account.</p>

        {!token ? (
          <div className='mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-semibold text-yellow-800'>
            Missing reset token. Please use the link from your email.
          </div>
        ) : null}

        <div className='mt-6'>
          <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='password'>
            New password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='••••••••'
            className='h-12 w-full rounded-xl border-[1.5px] bg-white px-4 py-3 text-sm text-[var(--dt-navy)] outline-none transition focus:border-[var(--dt-coral)] focus:ring-4 focus:ring-[var(--dt-coral)]/10'
          />
        </div>

        <div className='mt-4'>
          <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='confirmPassword'>
            Confirm new password
          </label>
          <input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder='••••••••'
            className='h-12 w-full rounded-xl border-[1.5px] bg-white px-4 py-3 text-sm text-[var(--dt-navy)] outline-none transition focus:border-[var(--dt-coral)] focus:ring-4 focus:ring-[var(--dt-coral)]/10'
          />
        </div>

        <button
          type='button'
          disabled={isSubmitting || !canSubmit}
          onClick={() => void onSubmit()}
          className='mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-[14px] border-0 bg-[var(--dt-coral)] text-[15px] font-extrabold text-white shadow-[0_6px_20px_rgba(255,107,107,0.35)] transition hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(255,107,107,0.45)] disabled:cursor-not-allowed disabled:opacity-65 disabled:shadow-none'
        >
          {isSubmitting ? (
            <span className='h-[18px] w-[18px] animate-spin rounded-full border-[2.5px] border-white/35 border-t-white' />
          ) : (
            'Update password'
          )}
        </button>

        <div className='mt-6 text-center text-sm font-semibold text-[#888]'>
          <Link href='/login' className='font-extrabold text-[var(--dt-coral)] no-underline hover:underline'>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

