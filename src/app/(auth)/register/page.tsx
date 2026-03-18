'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { login } from '@/store/reducers/authSlice'
import type { RegisterFormValues } from '@/types/form-types'

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup.string().default(''),
  agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms').required(),
})

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    await new Promise<void>(resolve => setTimeout(resolve, 800))
    dispatch(login({ email: data.email, name: `${data.firstName} ${data.lastName}` }))
    toast.success('Account created! Welcome to Discovery Town!')
    router.push('/my-account')
  }

  const inputClass =
    'w-full rounded-xl border-[1.5px] bg-white px-4 py-3 text-sm text-[var(--dt-navy)] outline-none transition focus:border-[var(--dt-coral)] focus:ring-4 focus:ring-[var(--dt-coral)]/10'

  const errorInputClass =
    'w-full rounded-xl border-[1.5px] border-[#EF4444] bg-white px-4 py-3 text-sm text-[var(--dt-navy)] outline-none transition focus:ring-4 focus:ring-[#EF4444]/10'

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#F0F4FF_0%,#FFF8F0_50%,#FFF0FB_100%)] px-5 py-10'>
      <div className='pointer-events-none absolute -right-[100px] -top-[100px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(76,110,245,0.09)_0%,transparent_70%)]' />
      <div className='pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,107,107,0.07)_0%,transparent_70%)]' />

      <div className='relative z-[1] w-full max-w-[500px]'>
        <Link href='/' className='mb-7 flex items-center justify-center gap-2.5 no-underline'>
          <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--dt-coral)] font-serif text-sm font-black tracking-[-0.5px] text-white shadow-[0_4px_12px_rgba(255,107,107,0.35)]'>
            DT
          </span>
          <span className='font-serif text-[1.35rem] font-black tracking-[-0.3px] text-[var(--dt-navy)]'>
            Discovery<span className='text-[var(--dt-coral)]'>Town</span>
          </span>
        </Link>

        <div className='mb-7 text-center'>
          <h1 className='mb-1.5 font-serif text-[1.8rem] font-black text-[var(--dt-navy)]'>Create your account</h1>
          <p className='text-sm font-semibold text-[#888]'>Join thousands of families enjoying Discovery Town</p>
        </div>

        <div className='rounded-3xl border border-[#F0EDE8] bg-white px-8 py-9 shadow-[0_8px_40px_rgba(0,0,0,0.08)]'>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-3.5 mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#BBB]'>
              Your name
            </div>
            <div className='mb-[18px] grid grid-cols-1 gap-4 xs:grid-cols-2'>
              <div>
                <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='firstName'>
                  First name
                </label>
                <input
                  id='firstName'
                  type='text'
                  placeholder='Sarah'
                  className={errors.firstName ? errorInputClass : inputClass}
                  {...register('firstName')}
                />
                {errors.firstName ? (
                  <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.firstName.message}</div>
                ) : null}
              </div>

              <div>
                <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='lastName'>
                  Last name
                </label>
                <input
                  id='lastName'
                  type='text'
                  placeholder='Johnson'
                  className={errors.lastName ? errorInputClass : inputClass}
                  {...register('lastName')}
                />
                {errors.lastName ? (
                  <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.lastName.message}</div>
                ) : null}
              </div>
            </div>

            <div className='mb-3.5 mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#BBB]'>
              Contact details
            </div>
            <div className='mb-[18px]'>
              <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='reg-email'>
                Email address
              </label>
              <input
                id='reg-email'
                type='email'
                placeholder='you@example.com'
                className={errors.email ? errorInputClass : inputClass}
                {...register('email')}
              />
              {errors.email ? (
                <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.email.message}</div>
              ) : null}
            </div>

            <div className='mb-[18px]'>
              <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='reg-phone'>
                Phone number <span className='ml-1 text-xs font-medium text-[#AAA]'>optional</span>
              </label>
              <input
                id='reg-phone'
                type='tel'
                placeholder='(555) 000-0000'
                className={inputClass}
                {...register('phone')}
              />
            </div>

            <div className='mb-3.5 mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#BBB]'>
              Set a password
            </div>
            <div className='mb-[18px]'>
              <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='reg-password'>
                Password
              </label>
              <input
                id='reg-password'
                type='password'
                placeholder='Min 8 characters'
                className={errors.password ? errorInputClass : inputClass}
                {...register('password')}
              />
              {errors.password ? (
                <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.password.message}</div>
              ) : null}
            </div>

            <div className='mb-[18px]'>
              <label className='mb-1.5 block text-[13px] font-bold text-[var(--dt-navy)]' htmlFor='confirmPassword'>
                Confirm password
              </label>
              <input
                id='confirmPassword'
                type='password'
                placeholder='Repeat your password'
                className={errors.confirmPassword ? errorInputClass : inputClass}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword ? (
                <div className='mt-1 text-xs font-semibold text-[#EF4444]'>{errors.confirmPassword.message}</div>
              ) : null}
            </div>

            <div className='mt-1.5 rounded-[14px] border-[1.5px] border-[#FDE68A] bg-[#FFFBEB] px-[18px] py-4'>
              <div className='flex items-start gap-3'>
                <input
                  id='agreeToTerms'
                  type='checkbox'
                  className='mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[var(--dt-coral)]'
                  {...register('agreeToTerms')}
                />
                <label htmlFor='agreeToTerms' className='text-[13px] leading-[1.6] text-[#666]'>
                  I agree to the{' '}
                  <a href='#' className='font-bold text-[var(--dt-coral)] no-underline hover:underline'>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href='#' className='font-bold text-[var(--dt-coral)] no-underline hover:underline'>
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms ? (
                <div className='mt-1.5 text-xs font-semibold text-[#EF4444]'>{errors.agreeToTerms.message}</div>
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
                'Create Account →'
              )}
            </button>
          </form>

          <p className='mt-5 text-center text-sm font-semibold text-[#888]'>
            Already have an account?{' '}
            <Link href='/login' className='font-extrabold text-[var(--dt-coral)] no-underline hover:underline'>
              Sign in
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
