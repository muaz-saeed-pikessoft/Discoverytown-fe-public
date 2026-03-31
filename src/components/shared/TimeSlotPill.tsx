interface TimeSlotPillProps {
  label: string
  selected: boolean
  onSelect: () => void
}

export default function TimeSlotPill({ label, selected, onSelect }: TimeSlotPillProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      className={[
        'rounded-full border px-4 py-2 text-sm font-black transition',
        selected
          ? 'border-[var(--dt-teal)] bg-[var(--dt-teal)] text-white'
          : 'border-[color-mix(in_srgb,var(--dt-teal)_30%,transparent)] bg-[var(--dt-teal-light)] text-[var(--dt-teal-dark)] hover:brightness-[0.98]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

