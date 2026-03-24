/**
 * Admin panel sidebar navigation.
 * Renders the persistent left sidebar with nav links and branding.
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** Admin navigation items */
const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Users', href: '/users', icon: '👥' },
  { label: 'Bookings', href: '/bookings', icon: '📅' },
  { label: 'Services', href: '/services', icon: '🎯' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
] as const

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className='flex h-screen w-64 flex-col border-r border-gray-200 bg-white'>
      {/* Branding */}
      <div className='flex h-16 items-center gap-2 border-b border-gray-200 px-6'>
        <span className='text-lg font-black tracking-tight text-gray-900'>
          Discovery<span className='text-blue-600'>Town</span>
        </span>
        <span className='rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-600'>
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto px-3 py-4'>
        <ul className='space-y-1'>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold no-underline transition-colors',
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  ].join(' ')}
                >
                  <span className='text-base'>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className='border-t border-gray-200 px-4 py-3'>
        <p className='text-xs text-gray-400'>Discovery Town Admin v1.0</p>
      </div>
    </aside>
  )
}
