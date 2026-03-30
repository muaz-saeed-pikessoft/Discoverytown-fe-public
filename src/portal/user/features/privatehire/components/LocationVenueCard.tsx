import ActionLink from '@/components/shared/ActionLink'

export interface LocationVenueCardProps {
  title: string
  city: string | null
  capacity: number
  facilities: string[]
  imageUrl?: string | null
}

export default function LocationVenueCard({ title, city, capacity, facilities, imageUrl }: LocationVenueCardProps) {
  const fallbackImageUrl = '/images/stock/private-hire-venue.svg'
  const coverSrc = imageUrl ?? fallbackImageUrl
  return (
    <article className='dt-card-interactive rounded-[20px]'>
      <div className='relative aspect-[4/3] w-full overflow-hidden'>
        <img
          src={coverSrc}
          alt={title}
          loading='lazy'
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,59,0.05)_0%,rgba(20,35,59,0.55)_100%)]' aria-hidden />
      </div>
      <div className='p-6'>
        <h3 className='text-xl font-black text-[var(--dt-navy)]'>{title}</h3>
        <p className='mt-1 text-sm font-semibold text-[var(--dt-text-muted)]'>{city ?? 'Discovery Town'}</p>
        <p className='mt-3 text-sm text-[var(--dt-text-muted)]'>Capacity up to {capacity} guests</p>
        <ul className='mt-3 list-inside list-disc text-sm text-[var(--dt-text-muted)]'>
          {facilities.slice(0, 5).map(f => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <ActionLink href='#availability' accentColor='var(--dt-primary)' className='mt-4 w-full justify-center'>
          Check availability
        </ActionLink>
      </div>
    </article>
  )
}
