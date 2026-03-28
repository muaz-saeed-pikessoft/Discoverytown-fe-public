'use client'

interface TagPillProps {
  name: string
  color: string
  onRemove?: () => void
}

export default function TagPill({ name, color, onRemove }: TagPillProps) {
  return (
    <span
      className='inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-800'
      style={{ backgroundColor: `${color}1A` }}
    >
      <span
        className='h-2 w-2 rounded-full'
        style={{ backgroundColor: color }}
        aria-hidden='true'
      />
      {name}
      {onRemove ? (
        <button
          type='button'
          onClick={onRemove}
          className='ml-1 text-[10px] text-gray-500 hover:text-gray-800'
          aria-label={`Remove tag ${name}`}
        >
          ×
        </button>
      ) : null}
    </span>
  )
}

