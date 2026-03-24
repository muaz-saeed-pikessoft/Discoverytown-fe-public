/**
 * StatCard component.
 *
 * Displays a single metric with label, value, icon, and accent color.
 * Used in admin dashboard and anywhere metrics are shown.
 */

import React, { memo } from 'react'

interface StatCardProps {
  /** Metric label */
  label: string

  /** Metric value (formatted string) */
  value: string

  /** Emoji or icon string */
  icon: string

  /** Accent color for icon background */
  color: string

  /** Background tint color */
  bgColor: string

  /** Optional trend indicator (e.g., "+12%") */
  trend?: string

  /** Whether trend is positive */
  trendPositive?: boolean
}

function StatCardComponent({ label, value, icon, color, bgColor, trend, trendPositive }: StatCardProps) {
  return (
    <div className='rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wider text-gray-500'>{label}</p>
          <p className='mt-2 text-2xl font-bold text-gray-900'>{value}</p>
          {trend && (
            <p className={['mt-1 text-xs font-semibold', trendPositive ? 'text-green-600' : 'text-red-500'].join(' ')}>
              {trendPositive ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div
          className='flex h-12 w-12 items-center justify-center rounded-xl text-xl'
          style={{ backgroundColor: bgColor, color }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

const StatCard = memo(StatCardComponent)
StatCard.displayName = 'StatCard'

export default StatCard
