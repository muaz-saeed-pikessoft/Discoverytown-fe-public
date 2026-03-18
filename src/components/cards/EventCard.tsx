import type { EventCardProps } from './types'
import { formatCurrency } from '@/utils/formatters'

const EVENT_EMOJIS: Record<string, string> = {
  'spring-carnival': '🎡',
  'superhero-camp': '🦸',
  'dino-day': '🦕',
  'glow-night': '✨',
  'reading-party': '📚',
}

export default function EventCard({
  title,
  description,
  dateLabel,
  featured,
  tags,
  lowestPrice,
  imageSlug,
  onViewDetails,
}: EventCardProps) {
  const emoji = EVENT_EMOJIS[imageSlug] ?? '🎉'

  return (
    <div className='card card-bordered border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md'>
      <figure className='flex h-44 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10'>
        <span className='text-6xl'>{emoji}</span>
      </figure>

      <div className='card-body p-4'>
        <div className='flex flex-wrap items-start gap-2'>
          {featured && <span className='badge badge-secondary badge-sm'>Featured</span>}
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className='badge badge-ghost badge-sm'>
              {tag}
            </span>
          ))}
        </div>

        <h3 className='mt-1 text-base font-bold text-base-content'>{title}</h3>
        <p className='line-clamp-2 text-sm text-base-content/60'>{description}</p>

        <div className='mt-2 text-sm text-base-content/70'>
          <span className='font-medium'>📅</span> {dateLabel}
        </div>

        <div className='card-actions mt-3 items-center justify-between'>
          <span className='text-base font-bold text-primary'>From {formatCurrency(lowestPrice)}</span>
          <button className='btn btn-outline btn-primary btn-sm' onClick={onViewDetails} type='button'>
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
