'use client'

import { useMemo } from 'react'

import { ADMIN_MODULES } from '@/constants/permissions'
import type { PermissionAction, PermissionMap } from '@/types/permissions.types'

interface PermissionMatrixProps {
  value: PermissionMap
  onChange: (next: PermissionMap) => void
  disabled?: boolean
}

function hasAction(value: PermissionMap, module: string, action: PermissionAction): boolean {
  const actions = value[module] ?? []
  return actions.includes(action)
}

function toggleAction(
  value: PermissionMap,
  module: string,
  action: PermissionAction,
  allowedActions: PermissionAction[]
): PermissionMap {
  const current = value[module] ?? []
  const isEnabled = current.includes(action)

  const nextActions = isEnabled ? current.filter(a => a !== action) : [...current, action]

  // if view is off, force other actions off
  const nextWithViewRule = action === 'view' && isEnabled ? [] : nextActions

  // also ensure we never store actions that are not valid for that module
  const sanitized = nextWithViewRule.filter(a => allowedActions.includes(a))

  return { ...value, [module]: sanitized }
}

export default function PermissionMatrix({ value, onChange, disabled = false }: PermissionMatrixProps) {
  const rows = useMemo(() => ADMIN_MODULES, [])

  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
      <div className='border-b border-gray-200 bg-gray-50 px-5 py-3'>
        <div className='text-xs font-black uppercase tracking-widest text-gray-600'>Permissions</div>
        <div className='mt-1 text-sm text-gray-500'>Choose what this role can do in each admin section.</div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[720px] text-left text-sm'>
          <thead className='bg-white'>
            <tr className='border-b border-gray-200 text-xs font-black uppercase tracking-widest text-gray-500'>
              <th className='px-5 py-3'>Module</th>
              <th className='px-5 py-3 text-center'>View</th>
              <th className='px-5 py-3 text-center'>Create</th>
              <th className='px-5 py-3 text-center'>Edit</th>
              <th className='px-5 py-3 text-center'>Delete</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {rows.map(row => {
              const canView = hasAction(value, row.module, 'view')

              const cells: Array<{ action: PermissionAction; enabled: boolean; supported: boolean }> = [
                { action: 'view', enabled: canView, supported: row.actions.includes('view') },
                { action: 'create', enabled: hasAction(value, row.module, 'create'), supported: row.actions.includes('create') },
                { action: 'edit', enabled: hasAction(value, row.module, 'edit'), supported: row.actions.includes('edit') },
                { action: 'delete', enabled: hasAction(value, row.module, 'delete'), supported: row.actions.includes('delete') },
              ]

              return (
                <tr key={row.module} className='bg-white'>
                  <td className='px-5 py-4'>
                    <div className='font-black text-gray-900'>{row.label}</div>
                    <div className='text-xs text-gray-500'>{row.module}</div>
                  </td>
                  {cells.map(cell => {
                    const cellDisabled =
                      disabled ||
                      !cell.supported ||
                      (cell.action !== 'view' && !canView) // require view before other actions

                    return (
                      <td key={cell.action} className='px-5 py-4 text-center'>
                        <input
                          type='checkbox'
                          checked={cell.enabled}
                          disabled={cellDisabled}
                          onChange={() => onChange(toggleAction(value, row.module, cell.action, row.actions))}
                          className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50'
                          aria-label={`${row.label} ${cell.action}`}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

