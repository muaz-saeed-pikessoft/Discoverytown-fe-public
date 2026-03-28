/**
 * Admin panel header bar.
 * Displays page title, user info, and logout action.
 */

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Ensure client-side values (like 'Developer Bypass' from bypass keys) 
  // only render after the component has mounted to prevent hydration errors.
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className='flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6'>
      <h1 className='text-lg font-bold text-gray-900'>Admin Panel</h1>

      <div className='flex items-center gap-4'>
        <div className='text-right'>
          <p className='text-sm font-semibold text-gray-900'>
            {mounted ? (user?.name ?? 'Admin') : 'Admin'}
          </p>
          <p className='text-xs text-gray-500'>
            {mounted ? (user?.email ?? '') : ''}
          </p>
        </div>

        <button
          type='button'
          onClick={logout}
          className='rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-red-600'
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}
