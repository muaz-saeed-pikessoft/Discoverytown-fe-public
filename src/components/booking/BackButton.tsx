import type { BackButtonProps } from './types'

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='mb-6 flex items-center gap-1.5 border-none bg-transparent text-[13px] font-bold text-[var(--dt-text-muted)] transition-colors hover:text-[var(--dt-navy)]'
    >
      ← Back
    </button>
  )
}
