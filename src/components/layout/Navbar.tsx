'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { ROUTES } from '@/constants/routes'
import type { RootState } from '@/store/store'

const links = [
  { label: 'Play', href: ROUTES.USER.PLAY },
  { label: 'Cafe & Food', href: ROUTES.USER.CAFE },
  { label: 'Events', href: ROUTES.USER.EVENTS },
  { label: 'Gym', href: ROUTES.USER.GYM },
  { label: 'Learn', href: ROUTES.USER.LEARN },
  { label: 'Rentals', href: ROUTES.USER.RENTALS },
  { label: 'Gifts', href: ROUTES.USER.GIFTS },
  { label: 'Shop', href: ROUTES.USER.SHOP },
]

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isActive = (href: string) => pathname === href

  useEffect(() => {
    setMounted(true)
  }, [])

  const accountHref = useMemo(() => {
    if (!mounted) return ROUTES.USER.LOGIN
    return isAuthenticated ? ROUTES.USER.MY_ACCOUNT : ROUTES.USER.LOGIN
  }, [isAuthenticated, mounted])

  const accountLabel = useMemo(() => {
    if (!mounted) return 'Sign In'
    return isAuthenticated ? 'My Account' : 'Sign In'
  }, [isAuthenticated, mounted])

  return (
    <header className='sticky top-0 z-50 border-b border-black/[0.05] bg-[var(--dt-bg-navbar)] backdrop-blur-xl shadow-[0_8px_28px_rgba(20,35,59,0.06)] dt-font-body'>
      <div className='dt-container'>
        <div className='flex items-center h-[74px] gap-7'>

          <Link
            href='/'
            className='flex-shrink-0 text-[21px] font-black tracking-[-0.02em] text-[var(--dt-navy)] no-underline dt-font-heading'
          >
            Discovery<span className='text-[var(--dt-primary)]'>Town</span>
          </Link>

          <nav className='hidden md:flex items-center gap-1 flex-1'>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-3.5 py-2.5 rounded-[999px] text-[length:var(--dt-fs-nav)] font-bold no-underline transition-all duration-150',
                  isActive(link.href)
                    ? 'bg-[var(--dt-primary-light)] text-[var(--dt-primary)]'
                    : 'text-[var(--dt-text-body)] hover:bg-white hover:text-[var(--dt-primary)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='hidden md:flex items-center gap-2 ml-auto'>
            <Link
              href={accountHref}
              className='rounded-[999px] border border-[var(--dt-border)] bg-white px-4 py-2.5 text-[length:var(--dt-fs-nav)] font-bold text-[var(--dt-text-body)] no-underline transition-all duration-150 hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
            >
              {accountLabel}
            </Link>

            <Link
              href={ROUTES.USER.BOOK}
              className='dt-btn-primary px-5 py-2.5'
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label='Toggle menu'
            className='md:hidden ml-auto flex h-10 w-10 items-center justify-center rounded-[14px] border border-[var(--dt-border)] bg-white cursor-pointer text-[var(--dt-navy)]'
          >
            {mobileOpen ? (
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className='md:hidden border-t border-[var(--dt-border-light)] bg-[rgba(255,255,255,0.96)] px-4 pt-3 pb-5 backdrop-blur-xl'>
          <div className='flex flex-col gap-0.5 mb-3'>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-3 py-2.5 rounded-[14px] text-[14px] font-bold no-underline',
                  isActive(link.href) ? 'bg-[var(--dt-primary-light)] text-[var(--dt-primary)]' : 'text-[var(--dt-text-body)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='dt-divider mb-3' />

          <div className='flex flex-col gap-2'>
            <Link
              href={accountHref}
              className='flex items-center gap-2 rounded-[14px] bg-[var(--dt-bg-page)] px-3 py-2.5 text-[14px] font-bold text-[var(--dt-text-body)] no-underline'
            >
              👤 {accountLabel}
            </Link>
            {isAuthenticated ? (
              <Link
                href={ROUTES.USER.MY_BOOKINGS}
                className='flex items-center gap-2 rounded-[14px] bg-[var(--dt-bg-page)] px-3 py-2.5 text-[14px] font-bold text-[var(--dt-text-body)] no-underline'
              >
                📅 My Bookings
              </Link>
            ) : null}
            <Link
              href={ROUTES.USER.BOOK}
              className='dt-btn-primary flex items-center justify-center gap-1.5 px-3 py-3 text-[14px]'
            >
              ✨ Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
