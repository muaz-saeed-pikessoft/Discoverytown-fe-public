/**
 * Admin panel sidebar navigation (portal version).
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

import { toggleSidebarCollapsed } from '@/store/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { PermissionMap } from '@/types/permissions.types'

type NavItem = { label: string; href: string; icon: string }

type NavGroup = {
  id: string
  label: string
  icon: string
  requiredModule: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    requiredModule: 'dashboard',
    items: [{ label: 'Overview', href: '/admin/dashboard', icon: '📊' }],
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    icon: '📅',
    requiredModule: 'scheduling',
    items: [
      { label: 'Sessions', href: '/admin/scheduling', icon: '🎫' },
      { label: 'Calendar', href: '/admin/scheduling/calendar', icon: '🗓️' },
      { label: 'Availability', href: '/admin/scheduling/availability', icon: '🟩' },
      { label: 'Private hire', href: '/admin/scheduling/private-hire', icon: '🔒' },
      { label: 'Services', href: '/admin/scheduling/services', icon: '🧩' },
      { label: 'Add-ons', href: '/admin/scheduling/add-ons', icon: '➕' },
      { label: 'Locations', href: '/admin/scheduling/locations', icon: '📍' },
    ],
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: '👨‍👩‍👧‍👦',
    requiredModule: 'clients',
    items: [
      { label: 'Families', href: '/admin/clients', icon: '👨‍👩‍👧‍👦' },
      { label: 'Waivers', href: '/admin/clients/waivers', icon: '📝' },
      { label: 'Documents', href: '/admin/clients/documents', icon: '📄' },
      { label: 'Memberships', href: '/admin/clients/memberships', icon: '🎟️' },
      { label: 'Class Packs', href: '/admin/clients/class-packs', icon: '📦' },
      { label: 'Tags', href: '/admin/clients/tags', icon: '🏷️' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📈',
    requiredModule: 'reports',
    items: [
      { label: 'Overview', href: '/admin/reports', icon: '📈' },
      { label: 'Revenue', href: '/admin/reports/revenue', icon: '💰' },
      { label: 'Clients', href: '/admin/reports/clients', icon: '👥' },
      { label: 'Invoices', href: '/admin/reports/invoices', icon: '🧾' },
    ],
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: '🧲',
    requiredModule: 'leads',
    items: [
      { label: 'Pipeline', href: '/admin/leads', icon: '🧲' },
      { label: 'Smart Lists', href: '/admin/leads/smart-lists', icon: '🧠' },
      { label: 'Templates', href: '/admin/leads/templates', icon: '📄' },
      { label: 'Campaigns', href: '/admin/leads/campaigns', icon: '📣' },
    ],
  },
  {
    id: 'staff',
    label: 'Staff',
    icon: '🧑‍💼',
    requiredModule: 'staff',
    items: [
      { label: 'Directory', href: '/admin/staff', icon: '🧑‍💼' },
      { label: 'Time Clock', href: '/admin/staff/time-clock', icon: '⏱️' },
      { label: 'Payroll', href: '/admin/staff/payroll', icon: '💸' },
      { label: 'Leave', href: '/admin/staff/leave', icon: '🏖️' },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: '📦',
    requiredModule: 'inventory',
    items: [
      { label: 'Products', href: '/admin/inventory/products', icon: '🛍️' },
      { label: 'Orders', href: '/admin/inventory/orders', icon: '📦' },
      { label: 'Coupons', href: '/admin/inventory/coupons', icon: '🏷️' },
      { label: 'POS', href: '/admin/inventory/pos', icon: '🧾' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: '🔌',
    requiredModule: 'integrations',
    items: [
      { label: 'Connections', href: '/admin/integrations', icon: '🔌' },
      { label: 'Notifications', href: '/admin/integrations/notifications', icon: '🔔' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    requiredModule: 'settings',
    items: [{ label: 'Settings', href: '/admin/settings', icon: '⚙️' }],
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    icon: '🛡️',
    requiredModule: 'roles',
    items: [{ label: 'Roles', href: '/admin/roles', icon: '🛡️' }],
  },
] as const

export default function AdminSidebar() {
  const pathname = usePathname() ?? ''
  const dispatch = useAppDispatch()
  const sidebarCollapsed = useAppSelector(state => state.ui.sidebarCollapsed)
  const permissions = useAppSelector(state => state.permission.permissions)

  const can = useMemo(() => {
    const hasAction = (map: PermissionMap, resource: string, action: 'view' | 'create' | 'edit' | 'delete'): boolean => {
      const direct = map[resource]
      if (direct) return direct.includes(action)
      const idx = resource.lastIndexOf('.')
      if (idx <= 0) return false
      const parent = resource.slice(0, idx)
      const inherited = map[parent]
      if (!inherited) return false
      return inherited.includes(action)
    }

    return {
      view: (resource: string) => hasAction(permissions, resource, 'view'),
    }
  }, [permissions])

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    NAV_GROUPS.forEach(g => {
      initial[g.id] = true
    })
    return initial
  })

  const activeGroupId = useMemo(() => {
    const group = NAV_GROUPS.find(g => g.items.some(i => pathname === i.href || pathname.startsWith(`${i.href}/`)))
    return group?.id ?? null
  }, [pathname])

  return (
    <aside
      className={[
        'flex h-screen flex-col border-r border-gray-200 bg-white',
        sidebarCollapsed ? 'w-20' : 'w-64',
      ].join(' ')}
    >
      <div className='flex h-16 items-center justify-between gap-2 border-b border-gray-200 px-4'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='truncate text-lg font-black tracking-tight text-gray-900'>
            {sidebarCollapsed ? (
              'DT'
            ) : (
              <>
                Discovery<span className='text-blue-600'>Town</span>
              </>
            )}
          </span>
          {!sidebarCollapsed ? (
            <span className='rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-blue-600'>
              Admin
            </span>
          ) : null}
        </div>
        <button
          type='button'
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => dispatch(toggleSidebarCollapsed())}
          className='rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-black text-gray-600 hover:bg-gray-50'
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className='flex-1 overflow-y-auto px-2 py-4'>
        <ul className='space-y-2'>
          {NAV_GROUPS.map(group => {
            if (!can.view(group.requiredModule)) return null

            const isOpen = openGroups[group.id]
            const isActiveGroup = activeGroupId === group.id

            return (
              <li key={group.id}>
                <button
                  type='button'
                  onClick={() => setOpenGroups(prev => ({ ...prev, [group.id]: !prev[group.id] }))}
                  className={[
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-black uppercase tracking-widest transition',
                    isActiveGroup ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
                  ].join(' ')}
                  title={sidebarCollapsed ? group.label : undefined}
                >
                  <span className='flex items-center gap-2'>
                    <span className='text-sm'>{group.icon}</span>
                    {sidebarCollapsed ? null : <span>{group.label}</span>}
                  </span>
                  {sidebarCollapsed ? null : <span className='text-[10px]'>{isOpen ? '−' : '+'}</span>}
                </button>

                {sidebarCollapsed ? null : isOpen ? (
                  <ul className='mt-1 space-y-1 pl-2'>
                    {group.items.map(item => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={[
                              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold no-underline transition-colors',
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
                ) : null}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className='border-t border-gray-200 px-4 py-3'>
        <p className='text-xs text-gray-400'>{sidebarCollapsed ? 'DT Admin' : 'Discovery Town Admin'}</p>
      </div>
    </aside>
  )
}

