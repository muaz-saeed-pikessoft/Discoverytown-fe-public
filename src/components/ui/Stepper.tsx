/**
 * Stepper component.
 *
 * Orchestrates multi-step processes with indicator visualization
 * and step content management.
 *
 * Supports both numeric and horizontal iconography.
 */

import React, { memo } from 'react'

interface Step {
  /** Step identification */
  id: string | number

  /** Step label for users */
  label: string

  /** Step numeric indicator (optional) */
  icon?: string | number

  /** Custom data pointer for step state */
  completed?: boolean

  /** Whether the step can be accessed directly */
  navigable?: boolean
}

interface StepperProps {
  /** List of step definitions */
  steps: Step[]

  /** Current active step index (0-based) */
  current: number

  /** Color theme for active steps */
  accent?: string

  /** Orientation of the stepper */
  orientation?: 'horizontal' | 'vertical'

  /** Step click handler (for direct step navigation) */
  onStepClick?: (idx: number) => void
}

function StepperComponent({
  steps,
  current,
  accent = 'var(--dt-primary)',
  orientation = 'horizontal',
  onStepClick,
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={`relative flex ${isHorizontal ? 'flex-row items-center w-full justify-between' : 'flex-col gap-6'}`}
    >
      {/* Connector Lines (Horizontal only) */}
      {isHorizontal && <div className='absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 bg-gray-100 -z-1' />}

      {steps.map((step, idx) => {
        const isActive = idx === current
        const isCompleted = idx < current || step.completed
        const isLast = idx === steps.length - 1

        return (
          <div
            key={step.id}
            className={`relative flex items-center ${isHorizontal ? 'flex-col gap-3' : 'gap-4'}`}
            onClick={() => step.navigable && onStepClick && onStepClick(idx)}
          >
            {/* Step Indicator Ball */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 z-10 ${
                isActive
                  ? 'border-[var(--dt-primary)] bg-white text-[var(--dt-primary)] ring-4 ring-blue-50'
                  : isCompleted
                    ? 'border-[var(--dt-primary)] bg-[var(--dt-primary)] text-white'
                    : 'border-gray-200 bg-white text-gray-400'
              }`}
              style={{
                borderColor: isActive || isCompleted ? accent : undefined,
                backgroundColor: isCompleted ? accent : undefined,
                color: isActive ? accent : undefined,
              }}
            >
              {isCompleted ? <span className='text-xl'>✓</span> : (step.icon ?? idx + 1)}
            </div>

            {/* Label */}
            <div className={`${isHorizontal ? 'text-center' : 'text-left'}`}>
              <span
                className={`text-[11px] font-black uppercase tracking-widest block transition-colors ${
                  isActive ? 'text-[var(--dt-navy)]' : 'text-gray-400'
                }`}
              >
                Step {idx + 1}
              </span>
              <p
                className={`text-sm font-bold mt-0.5 transition-colors ${
                  isActive ? 'text-[var(--dt-primary)]' : 'text-[var(--dt-navy)]'
                }`}
              >
                {step.label}
              </p>
            </div>

            {/* Step Connector (Vertical only) */}
            {!isHorizontal && !isLast && <div className='absolute top-10 left-5 h-6 w-0.5 bg-gray-100' />}
          </div>
        )
      })}
    </div>
  )
}

const Stepper = memo(StepperComponent)
Stepper.displayName = 'Stepper'

export default Stepper
