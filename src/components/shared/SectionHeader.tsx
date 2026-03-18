import type { SectionHeaderProps } from './types'

export default function SectionHeader({
  eyebrow,
  title,
  desc,
  description,
  accentColor = 'var(--dt-teal)',
}: SectionHeaderProps) {
  const displayDesc = desc || description

  return (
    <div className='mb-9'>
      {eyebrow && (
        <p className='dt-eyebrow mb-2' style={{ color: accentColor }}>
          {eyebrow}
        </p>
      )}
      <h2 className='dt-section-title mb-3'>{title}</h2>
      {displayDesc && <p className='dt-section-desc max-w-[640px]'>{displayDesc}</p>}
    </div>
  )
}
