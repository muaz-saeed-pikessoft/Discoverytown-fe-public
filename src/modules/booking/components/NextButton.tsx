import type { NextButtonProps } from './types'

export default function NextButton({ label, disabled, accentHex, onClick }: NextButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className='mt-2 w-full rounded-xl border-none py-3.5 text-[15px] font-black text-white transition-all duration-150'
      style={{
        background: disabled ? 'var(--dt-border)' : accentHex,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {label} →
    </button>
  )
}
