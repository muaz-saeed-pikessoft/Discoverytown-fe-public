'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

interface AccountShellProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

const NAV_ITEMS = [
  { label: 'Overview', href: ROUTES.USER.MY_ACCOUNT, icon: '🏠' },
  { label: 'Profile', href: ROUTES.USER.MY_PROFILE, icon: '👤' },
  { label: 'Family', href: ROUTES.USER.MY_FAMILY, icon: '👨‍👩‍👧‍👦' },
  { label: 'Documents', href: ROUTES.USER.MY_DOCUMENTS, icon: '📝' },
  { label: 'Membership', href: ROUTES.USER.MY_MEMBERSHIP, icon: '🎟️' },
  { label: 'Credits', href: ROUTES.USER.MY_CREDITS, icon: '💳' },
  { label: 'Bookings', href: ROUTES.USER.MY_BOOKINGS, icon: '📅' },
] as const

export default function AccountShell({ title, subtitle, actions, children }: AccountShellProps) {
  const pathname = usePathname() ?? ''

  return (
    <div className='dt-container py-8 md:py-12'>
      {/* 
        Standard 12-column grid layout.
        Stack on mobile (grid-cols-1), sidebar layout on md+ (grid-cols-12).
      */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start'>
        {/* Sidebar - takes 3/12 columns (approx 25%) */}
        <aside className='md:sticky md:top-24 md:col-span-3'>
          <div className='rounded-[28px] border border-[var(--dt-border)] bg-[var(--dt-bg-card)] shadow-[0_18px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
            <div className='border-b border-[var(--dt-border)] px-5 py-5 md:px-6'>
              <div className='dt-eyebrow text-[var(--dt-text-muted)]'>My account</div>
              <div className='mt-2 text-[16px] font-black tracking-[-0.01em] text-[var(--dt-navy)]'>Navigation</div>
            </div>

            {/* Desktop: Vertical Sidebar List */}
            <nav className='hidden flex-col gap-1 p-2 md:flex md:p-3'>
              {NAV_ITEMS.map(item => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'flex items-center gap-2 rounded-[16px] px-3.5 py-3 text-[14px] font-bold no-underline transition-all',
                      active
                        ? 'bg-[var(--dt-primary-light)] text-[var(--dt-primary)] shadow-[0_14px_34px_rgba(47,111,237,0.14)]'
                        : 'text-[var(--dt-text-body)] hover:bg-white hover:text-[var(--dt-primary)]',
                    ].join(' ')}
                  >
                    <span aria-hidden className='flex h-9 w-9 items-center justify-center rounded-[14px] border border-[var(--dt-border)] bg-white/80 text-[16px]'>
                      {item.icon}
                    </span>
                    <span className='flex-1'>{item.label}</span>
                    <span aria-hidden className={active ? 'text-[var(--dt-primary)]' : 'text-[var(--dt-text-subtle)]'}>
                      →
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile: Horizontal scrollable tab bar */}
            <div className='overflow-x-auto px-4 py-3 md:hidden'>
              <div className='flex w-max items-center gap-2'>
                {NAV_ITEMS.map(item => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        'inline-flex items-center gap-2 rounded-[999px] border px-4 py-2 text-[12px] font-black uppercase tracking-[0.14em] no-underline transition',
                        active
                          ? 'border-[rgba(47,111,237,0.28)] bg-[var(--dt-primary-light)] text-[var(--dt-primary)]'
                          : 'border-[var(--dt-border)] bg-white/70 text-[var(--dt-text-body)] hover:text-[var(--dt-primary)]',
                      ].join(' ')}
                    >
                      <span aria-hidden className='text-[14px]'>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content - takes remaining 9/12 columns */}
        <div className='min-w-0 md:col-span-9'>
          <div className='rounded-[28px] border border-[var(--dt-border)] bg-[var(--dt-bg-card)] shadow-[0_18px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
            <div className='flex flex-col gap-4 border-b border-[var(--dt-border)] px-5 py-6 sm:px-7 sm:py-7 lg:flex-row lg:items-end lg:justify-between'>
              <div>
                <div className='dt-eyebrow text-[var(--dt-text-muted)]'>My account</div>
                <h1 className='mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-black tracking-[-0.02em] text-[var(--dt-navy)]'>
                  {title}
                </h1>
                {subtitle ? <p className='mt-2 max-w-[62ch] text-[15px] text-[var(--dt-text-body)]'>{subtitle}</p> : null}
              </div>
              {actions ? <div className='flex flex-wrap items-center gap-2'>{actions}</div> : null}
            </div>

            <section className='p-6 md:p-10'>{children}</section>
          </div>
        </div>
      </div>
    </div>
  )
}

