import type { SectionHeaderProps } from './types'

export default function SectionHeader({
  eyebrow,
  title,
  desc,
  description,
  accentColor = 'var(--dt-teal)',
  dark = false,
}: SectionHeaderProps) {
  const displayDesc = desc || description

  const titleColorClass = dark ? 'text-white' : 'text-[var(--dt-text-heading)]'
  const descColorClass = dark ? 'text-white/70' : 'text-[var(--dt-text-muted)]'

  return (
    <div className='mb-9'>
      {eyebrow && (
        <p className='dt-eyebrow mb-2' style={{ color: accentColor }}>
          {eyebrow}
        </p>
      )}
      <h2 className={`${titleColorClass} dt-section-title mb-3`}>{title}</h2>
      {displayDesc && <p className={`${descColorClass} dt-section-desc max-w-[640px]`}>{displayDesc}</p>}
    </div>
  )
}
