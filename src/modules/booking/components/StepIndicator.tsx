import type { Step, StepIndicatorProps } from './types'

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className='flex w-full items-center'>
      {steps.map((step, index) => {
        const isDone = index < currentStep
        const isActive = index === currentStep

        const circleClass = isDone
          ? 'border-none bg-[var(--dt-coral)] text-white shadow-[0_3px_10px_rgba(255,107,107,0.35)]'
          : isActive
            ? 'border-[2.5px] border-[var(--dt-coral)] bg-white text-[var(--dt-coral)] shadow-[0_0_0_4px_rgba(255,107,107,0.12)]'
            : 'border-2 border-[#E5E0D8] bg-[#F5F2EE] text-[#CCC]'

        const labelClass = isDone || isActive ? 'text-[var(--dt-coral)]' : 'text-[#CCC]'

        return (
          <div key={step.label} className='flex flex-1 items-start'>
            {index > 0 && (
              <div
                className={`mt-[-22px] h-0.5 flex-1 ${isDone || isActive ? 'bg-[var(--dt-coral)]' : 'bg-[#E5E0D8]'}`}
              />
            )}

            <div className='relative z-[1] flex flex-1 flex-col items-center'>
              <div
                className={`relative z-[2] flex h-[34px] w-[34px] items-center justify-center rounded-full text-[13px] font-extrabold transition ${circleClass}`}
              >
                {isDone ? (
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div
                className={`mt-2 whitespace-nowrap text-center text-[11px] font-bold transition ${labelClass} ${isActive ? 'font-extrabold' : ''}`}
              >
                {step.label}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className={`mt-[-22px] h-0.5 flex-1 ${isDone ? 'bg-[var(--dt-coral)]' : 'bg-[#E5E0D8]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
