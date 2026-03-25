'use client'

import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import SearchInput from '@/components/shared/SearchInput'
import DataTable from '@/components/shared/DataTable'
import { useTable } from '@/hooks/useTable'
import { useModulePermissions } from '@/hooks/useModulePermissions'
import type { SortConfig, TableColumn } from '@/types/common'

interface AdminTablePageProps<T extends { id: string }> {
  title: string
  subtitle?: string
  module?: string
  /**
   * Prefer using this for "Add/Create" buttons so it can be hidden when the role lacks create permission.
   */
  createAction?: ReactNode
  /**
   * Additional header actions. If provided as a function, it receives module permission flags.
   */
  actions?: ReactNode | ((perms: { canView: boolean; canCreate: boolean; canEdit: boolean; canDelete: boolean }) => ReactNode)
  data: T[]
  columns: TableColumn<T>[]
  defaultSort?: SortConfig
  searchableKeys?: Array<keyof T>
  selectable?: boolean
  pageSize?: number
  isLoading?: boolean
}

function toSearchText(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return ''
}

export default function AdminTablePage<T extends { id: string }>({
  title,
  subtitle,
  module,
  createAction,
  actions,
  data,
  columns,
  defaultSort,
  searchableKeys,
  selectable = false,
  pageSize = 10,
  isLoading = false,
}: AdminTablePageProps<T>) {
  const [query, setQuery] = useState('')
  const perms = useModulePermissions(module ?? '')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    const keys = searchableKeys?.length ? searchableKeys : (['id'] as Array<keyof T>)

    return data.filter(row =>
      keys.some(k => {
        const text = toSearchText(row[k]).toLowerCase()
        return text.includes(q)
      })
    )
  }, [data, query, searchableKeys])

  const { processedData, handleSort, sortConfig, toggleSelect, selectedIds, selectAll, deselectAll } = useTable({
    data: filtered,
    defaultSort,
    multiSelect: selectable,
  })

  const headerActions = useMemo(() => {
    const extra = typeof actions === 'function' ? actions(perms) : actions
    const canShowCreate = !module || perms.canCreate

    if (!extra && (!createAction || !canShowCreate)) return undefined

    return (
      <div className='flex items-center gap-2'>
        {canShowCreate ? createAction : null}
        {extra}
      </div>
    )
  }, [actions, createAction, module, perms])

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} actions={headerActions} />

      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='w-full sm:max-w-[360px]'>
          <SearchInput value={query} onChange={setQuery} placeholder='Search…' />
        </div>
        {selectable && selectedIds.size > 0 ? (
          <div className='flex items-center gap-2'>
            <span className='rounded-lg border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-black text-blue-700'>
              {selectedIds.size} Selected
            </span>
          </div>
        ) : null}
      </div>

      <DataTable
        data={processedData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        selectable={selectable}
        onSelect={selectable ? toggleSelect : undefined}
        onSelectAll={selectable ? (selectedIds.size === filtered.length ? deselectAll : selectAll) : undefined}
        selectedIds={selectable ? selectedIds : undefined}
        keyExtractor={row => row.id}
        loading={isLoading}
        pageSize={pageSize}
      />
    </div>
  )
}

