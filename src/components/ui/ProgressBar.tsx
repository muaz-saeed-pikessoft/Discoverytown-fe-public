/**
 * ProgressBar component.
 *
 * A visual indicator for multi-step flows or completion percentage.
 * Supports custom labels, accent colors, and animated transitions.
 */

import React, { memo } from 'react'

interface ProgressBarProps {
  /** Current step index (0-based) or percentage (0-100) */
  current: number

  /** Total number of steps or 100 if using percentage */
  total: number

  /** Optional labels for each step */
  labels?: string[]

  /** Accent color for the progress bar (hex or CSS var) */
  color?: string

  /** Background track color */
  trackColor?: string

  /** Label to show alongside percentage (e.g., "Step 2 of 5") */
  showLabel?: boolean

  /** Height of the progress bar */
  size?: 'sm' | 'md' | 'lg'
}

function ProgressBarComponent({
  current,
  total,
  labels,
  color = 'var(--dt-primary)',
  trackColor = 'var(--dt-border)',
  showLabel = false,
  size = 'md',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100))

  const heightClass = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  }[size]

  return (
    <div className='w-full'>
      {/* Progress Track */}
      <div className={`w-full overflow-hidden rounded-full ${heightClass}`} style={{ backgroundColor: trackColor }}>
        <div
          className='h-full transition-all duration-500 ease-out'
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Optional Metadata */}
      {(showLabel || labels) && (
        <div className='mt-4 flex justify-between'>
          {labels ? (
            labels.map((label, idx) => (
              <div
                key={label}
                className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  idx <= current ? 'text-[var(--dt-navy)]' : 'text-[var(--dt-text-subtle)]'
                }`}
              >
                {label}
              </div>
            ))
          ) : showLabel ? (
            <span className='text-sm font-medium text-[var(--dt-text-secondary)]'>
              {Math.round(percentage)}% Complete
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}

const ProgressBar = memo(ProgressBarComponent)
ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
