/**
 * DataTable component.
 *
 * Reusable, sortable, and selectable data table for admin panels and lists.
 * Integrates directly with the `useTable` hook.
 */

import React, { memo } from 'react'

import type { TableColumn, SortConfig } from '@/types/common'

interface DataTableProps<T> {
  /** Array of data objects */
  data: T[]

  /** Column definitions */
  columns: TableColumn<T>[]

  /** Current sort configuration */
  sortConfig?: SortConfig | null

  /** Function to handle column sort toggling */
  onSort?: (key: string) => void

  /** Function to handle row selection */
  onSelect?: (id: string) => void

  /** Function to handle select all */
  onSelectAll?: () => void

  /** Currently selected IDs */
  selectedIds?: Set<string>

  /** Whether selection is enabled */
  selectable?: boolean

  /** Loading state indicator */
  isLoading?: boolean

  /** Unique key extractor for rows */
  keyExtractor: (item: T) => string
}

function DataTableComponent<T extends { id: string }>({
  data,
  columns,
  sortConfig,
  onSort,
  onSelect,
  onSelectAll,
  selectedIds = new Set(),
  selectable = false,
  isLoading = false,
  keyExtractor,
}: DataTableProps<T>) {
  const isAllSelected = data.length > 0 && selectedIds.size === data.length

  if (isLoading) {
    return (
      <div className='flex h-48 w-full items-center justify-center rounded-xl border border-gray-200 bg-white'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-[var(--dt-primary)] border-t-transparent' />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className='flex h-48 w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500'>
        No data available.
      </div>
    )
  }

  return (
    <div className='w-full overflow-x-auto rounded-xl border border-gray-200 bg-white'>
      <table className='w-full text-left text-sm'>
        <thead className='bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500'>
          <tr>
            {selectable && (
              <th className='w-12 px-4 py-3 text-center'>
                <input
                  type='checkbox'
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={[
                  'px-4 py-3',
                  col.sortable ? 'cursor-pointer hover:bg-gray-100' : '',
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                ].join(' ')}
                style={{ width: col.width }}
                onClick={() => col.sortable && onSort && onSort(String(col.key))}
              >
                <div className='flex items-center gap-1'>
                  {col.label}
                  {col.sortable && sortConfig?.key === col.key && (
                    <span className='text-gray-900'>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100 bg-white'>
          {data.map(row => {
            const rowKey = keyExtractor(row)
            const isSelected = selectedIds.has(rowKey)

            return (
              <tr
                key={rowKey}
                className={['transition-colors hover:bg-gray-50', isSelected ? 'bg-blue-50/50' : ''].join(' ')}
              >
                {selectable && (
                  <td className='w-12 px-4 py-3 text-center'>
                    <input
                      type='checkbox'
                      checked={isSelected}
                      onChange={() => onSelect && onSelect(rowKey)}
                      className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                    />
                  </td>
                )}
                {columns.map(col => {
                  const val = row[col.key as keyof T]
                  const content = col.render ? col.render(val, row) : String(val ?? '')

                  return (
                    <td
                      key={`${rowKey}-${String(col.key)}`}
                      className={[
                        'px-4 py-3',
                        col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                      ].join(' ')}
                    >
                      {content}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** Memoized to prevent re-renders on generic table wrappers */
const DataTable: typeof DataTableComponent = memo(DataTableComponent) as any

export default DataTable
