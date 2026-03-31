'use client'

import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

interface PrivateHireSuccessCardProps {
  referenceId: string
}

export default function PrivateHireSuccessCard({ referenceId }: PrivateHireSuccessCardProps) {
  return (
    <div className='rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center'>
      <p className='text-sm font-black uppercase tracking-widest text-emerald-800'>Thank you</p>
      <h2 className='mt-2 text-2xl font-black text-emerald-950'>We&apos;ll be in touch within 24 hours</h2>
      <p className='mt-3 text-sm font-semibold text-emerald-900/80'>
        Your reference: <span className='font-black'>{referenceId}</span>
      </p>
      <p className='mt-2 text-sm text-emerald-900/70'>
        Our team will confirm details, deposit, and any add-ons by email.
      </p>
      <Link
        href={ROUTES.USER.HOME}
        className='mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[var(--dt-primary)] px-8 text-sm font-black text-white no-underline transition hover:opacity-95'
      >
        Return home
      </Link>
    </div>
  )
}
