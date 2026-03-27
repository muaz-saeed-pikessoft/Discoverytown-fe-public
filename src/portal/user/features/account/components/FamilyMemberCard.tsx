'use client'

interface FamilyMemberCardProps {
  name: string
  subtitle: string
  onEdit?: () => void
  onRemove?: () => void
}

export default function FamilyMemberCard({ name, subtitle, onEdit, onRemove }: FamilyMemberCardProps) {
  return (
    <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-5 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='text-[16px] font-black tracking-[-0.01em] text-[var(--dt-navy)]'>{name}</div>
          <div className='mt-1 text-[13px] font-semibold text-[var(--dt-text-muted)]'>{subtitle}</div>
        </div>
        <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--dt-primary-light)] text-[18px]'>👤</div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {onEdit ? (
          <button
            type='button'
            onClick={onEdit}
            className='rounded-[999px] border border-[var(--dt-border)] bg-white px-4 py-2 text-[13px] font-bold text-[var(--dt-text-body)] transition hover:border-[var(--dt-primary)] hover:text-[var(--dt-primary)]'
          >
            Edit
          </button>
        ) : null}
        {onRemove ? (
          <button
            type='button'
            onClick={onRemove}
            className='rounded-[999px] bg-[var(--dt-coral)] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[var(--dt-coral-dark)]'
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

