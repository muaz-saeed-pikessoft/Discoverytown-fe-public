'use client'

import type { FormEvent, ReactNode } from 'react'
import { useMemo, useState } from 'react'

import PermissionMatrix from '@/portal/admin/features/roles/components/PermissionMatrix'
import type { RoleDefinition } from '@/types/permissions.types'
import type { RoleFormValues } from '@/portal/admin/features/roles/types'
import { useAppSelector } from '@/store/hooks'

interface RoleFormProps {
  initialRole?: RoleDefinition
  readOnly?: boolean
  footerActions?: ReactNode
  onSubmit?: (values: RoleFormValues) => Promise<void> | void
}

export default function RoleForm({ initialRole, readOnly = false, footerActions, onSubmit }: RoleFormProps) {
  const currentRoleId = useAppSelector(state => state.permission.roleId)

  const initialValues = useMemo<RoleFormValues>(
    () => ({
      name: initialRole?.name ?? '',
      description: initialRole?.description ?? '',
      permissions: initialRole?.permissions ?? {},
    }),
    [initialRole]
  )

  const [values, setValues] = useState<RoleFormValues>(initialValues)
  const [isSaving, setIsSaving] = useState(false)

  const selfRoleEditWarning = useMemo(() => {
    if (!initialRole) return null
    if (!currentRoleId) return null
    if (initialRole.id !== currentRoleId) return null
    const rolesView = (values.permissions.roles ?? []).includes('view')
    const rolesEdit = (values.permissions.roles ?? []).includes('edit')
    if (rolesView && rolesEdit) return null
    return 'You are editing your own role. Removing Roles permissions could lock you out of this page.'
  }, [currentRoleId, initialRole, values.permissions.roles])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (readOnly) return
    if (!onSubmit) return

    setIsSaving(true)
    try {
      await onSubmit(values)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {selfRoleEditWarning ? (
        <div className='rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900'>
          {selfRoleEditWarning}
        </div>
      ) : null}

      <div className='grid gap-4 rounded-2xl border border-gray-200 bg-white p-6'>
        <div>
          <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='role-name'>
            Role name
          </label>
          <input
            id='role-name'
            value={values.name}
            onChange={e => setValues(v => ({ ...v, name: e.target.value }))}
            placeholder='e.g. Front Desk'
            disabled={readOnly}
            className='mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50'
          />
        </div>

        <div>
          <label className='text-xs font-black uppercase tracking-widest text-gray-500' htmlFor='role-description'>
            Description
          </label>
          <textarea
            id='role-description'
            value={values.description}
            onChange={e => setValues(v => ({ ...v, description: e.target.value }))}
            placeholder='Describe what this role is for…'
            disabled={readOnly}
            className='mt-2 min-h-[90px] w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50'
          />
        </div>
      </div>

      <PermissionMatrix value={values.permissions} onChange={next => setValues(v => ({ ...v, permissions: next }))} disabled={readOnly} />

      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
        {footerActions}
        {onSubmit ? (
          <button
            type='submit'
            disabled={readOnly || isSaving}
            className='h-11 rounded-xl bg-blue-600 px-5 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isSaving ? 'Saving…' : 'Save role'}
          </button>
        ) : null}
      </div>
    </form>
  )
}

