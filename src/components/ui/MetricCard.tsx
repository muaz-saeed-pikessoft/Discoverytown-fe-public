/**
 * MetricCard component.
 *
 * High-density metric display with trend indicators, sparklines (placeholder),
 * and color-coded status badges. Used in the Admin Panel for KPI overviews.
 */

import React, { memo } from 'react'
import type { StatusVariant } from '@/types/common'

interface MetricCardProps {
  /** Metric label */
  label: string

  /** Metric current value */
  value: string | number

  /** Status variant for theme coloring */
  status?: StatusVariant

  /** Icon/emoji string */
  icon?: string

  /** Percentage change (e.g., +12.5) */
  change?: number

  /** Time frame for the change (e.g., "vs last week") */
  timeframe?: string

  /** Loading state */
  isLoading?: boolean
}

function MetricCardComponent({
  label,
  value,
  status = 'neutral',
  icon,
  change,
  timeframe = 'vs last period',
  isLoading = false,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <div className='animate-pulse rounded-xl border border-gray-200 bg-white p-6'>
        <div className='h-4 w-24 rounded bg-gray-100 mb-4' />
        <div className='h-8 w-16 rounded bg-gray-200' />
      </div>
    )
  }

  const isPositive = change && change > 0

  const statusColors = {
    success: 'bg-green-50 text-green-700 border-green-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    error: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    neutral: 'bg-gray-50 text-gray-700 border-gray-100',
  }[status]

  return (
    <div className='flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <span className='text-[11px] font-bold uppercase tracking-widest text-gray-400'>{label}</span>
          <h3 className='text-3xl font-black tracking-tight text-gray-900 mt-1'>{value}</h3>
        </div>
        {icon && (
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-xl border border-gray-100'>
            {icon}
          </div>
        )}
      </div>

      <div className='flex items-center gap-3'>
        {change !== undefined && (
          <div
            className={[
              'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-bold leading-none',
              statusColors,
            ].join(' ')}
          >
            {isPositive ? '+' : ''}
            {change}%
          </div>
        )}
        <span className='text-[11px] font-medium text-gray-400 italic'>{timeframe}</span>
      </div>
    </div>
  )
}

const MetricCard = memo(MetricCardComponent)
MetricCard.displayName = 'MetricCard'

export default MetricCard
