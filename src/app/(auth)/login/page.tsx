'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { login } from '@/store/slices/authSlice'
import { loginUser } from '@/api/authApi'
import { signIn } from 'next-auth/react'
import type { LoginFormValues } from '@/types/form-types'

const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
})

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mode, setMode] = React.useState<'user' | 'staff'>('user')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      if (mode === 'staff') {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        })

        if (result?.error) {
          throw new Error(result.error)
        }

        toast.success('Welcome back!')
        router.push('/admin/dashboard')
      } else {
        const response = await loginUser({
          email: data.email,
          password: data.password,
        })

        dispatch(
          login({
            user: response.user,
            token: response.accessToken,
            refreshToken: response.refreshToken,
          })
        )

        toast.success('Welcome back!')
        router.push('/my-account')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.')
    }
  }

  const inputClass =
    'w-full rounded-xl border-[1.5px] bg-white px-4 py-3 text-sm text-[var(--dt-navy)] outline-none transition focus:border-[var(--dt-coral)] focus:ring-4 focus:ring-[var(--dt-coral)]/10'

  const errorInputClass =
    'w-full rounded-xl border-[1.5px] border-[#EF4444] bg-white px-4 py-3 text-sm text-[var(--dt-navy)] outline-none transition focus:ring-4 focus:ring-[#EF4444]/10'

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--dt-coral-soft)_0%,#FFF8F0_55%,#F0F4FF_100%)] px-5 py-10'>
      <div className='pointer-events-none absolute -right-[100px] -top-[100px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,107,107,0.1)_0%,transparent_70%)]' />
      <div className='pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(76,110,245,0.08)_0%,transparent_70%)]' />

      <div className='relative z-[1] w-full max-w-[440px]'>
        <Link href='/' className='mb-7 flex items-center justify-center gap-2.5 no-underline'>
          <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--dt-coral)] font-serif text-sm font-black tracking-[-0.5px] text-white shadow-[0_4px_12px_rgba(255,107,107,0.35)]'>
            DT
          </span>
          <span className='font-serif text-[1.35rem] font-black tracking-[-0.3px] text-[var(--dt-navy)]'>
            Discovery<span className='text-[var(--dt-coral)]'>Town</span>
          </span>
        </Link>

        <div className='mb-7 text-center'>
          <h1 className='mb-1.5 font-serif text-[1.8rem] font-black text-[var(--dt-navy)]'>Welcome back!</h1>
          <p className='text-sm font-semibold text-[#888]'>
            {mode === 'staff' ? 'Staff sign in to manage the platform' : 'Sign in to manage your bookings'}
          </p>
        </div>

        <div className='rounded-3xl border border-[#F0EDE8] bg-white px-8 py-9 shadow-[0_8px_40px_rgba(0,0,0,0.08)]'>
          <div className='mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-2'>
            <button
              type='button'
              onClick={() => setMode('user')}
              className={[
                'h-10 rounded-xl text-xs font-black transition',
                mode === 'user' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800',
              ].join(' ')}
            >
              Customer
            </button>
            <button
              type='button'
              onClick={() => setMode('staff')}
              className={[
                'h-10 rounded-xl text-xs font-black transition',
                mode === 'staff' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800',
              ].join(' ')}
            >
              Staff
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-5'>
              <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='email'>
                Email address
              </label>
              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                className={errors.email ? errorInputClass : inputClass}
                {...register('email')}
              />
              {errors.email ? (
                <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.email.message}</div>
              ) : null}
            </div>

            <div className='mb-0'>
              <div className='mb-1.5 flex items-center justify-between gap-2'>
                <label className='block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='password'>
                  Password
                </label>
                <Link
                  href='/forgot-password'
                  className='text-xs font-bold text-[var(--dt-coral)] no-underline hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id='password'
                type='password'
                placeholder='••••••••'
                className={errors.password ? errorInputClass : inputClass}
                {...register('password')}
              />
              {errors.password ? (
                <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.password.message}</div>
              ) : null}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-[14px] border-0 bg-[var(--dt-coral)] text-[15px] font-extrabold text-white shadow-[0_6px_20px_rgba(255,107,107,0.35)] transition hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(255,107,107,0.45)] disabled:cursor-not-allowed disabled:opacity-65 disabled:shadow-none'
            >
              {isSubmitting ? (
                <span className='h-[18px] w-[18px] animate-spin rounded-full border-[2.5px] border-white/35 border-t-white' />
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          <div className='my-6 flex items-center gap-3 text-xs font-bold text-[#CCC] before:h-px before:flex-1 before:bg-[#F0EDE8] after:h-px after:flex-1 after:bg-[#F0EDE8]'>
            or
          </div>

          <p className='text-center text-sm font-semibold text-[#888]'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='font-extrabold text-[var(--dt-coral)] no-underline hover:underline'>
              Create one for free
            </Link>
          </p>
        </div>

        <Link
          href='/'
          className='mt-5 block text-center text-xs font-semibold text-[#BBB] no-underline transition hover:text-[#666]'
        >
          ← Back to Discovery Town
        </Link>
      </div>
    </div>
  )
}
