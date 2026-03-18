import type { PartyPackageCardProps } from './types'
import { formatCurrency } from '@/utils/formatters'
import type { PartyPackage } from '@/types/booking-types'

const COLOR_MAP: Record<string, string> = {
  primary: 'border-primary ring-primary',
  secondary: 'border-secondary ring-secondary',
  accent: 'border-accent ring-accent',
}

const BTN_MAP: Record<string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
}

const BADGE_MAP: Record<string, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
}

export default function PartyPackageCard({ pkg, selected, onSelect }: PartyPackageCardProps) {
  const ringClass = selected ? `border-2 ${COLOR_MAP[pkg.color]} ring-2` : 'border border-base-300'

  return (
    <div
      className={`card bg-base-100 shadow-sm transition-all hover:shadow-md ${ringClass} relative`}
      onClick={() => onSelect(pkg.id)}
    >
      {pkg.popular && (
        <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
          <span className={`badge ${BADGE_MAP[pkg.color]} badge-lg shadow`}>Most Popular</span>
        </div>
      )}

      <div className='card-body p-5 pt-6'>
        <h3 className='text-xl font-bold text-base-content'>{pkg.name}</h3>
        <p className='text-sm text-base-content/60'>{pkg.tagline}</p>

        <div className='my-3'>
          <span className='text-3xl font-bold text-base-content'>{formatCurrency(pkg.price)}</span>
          <span className='ml-1 text-sm text-base-content/50'>base price</span>
        </div>

        <div className='flex flex-wrap gap-2 text-xs text-base-content/70'>
          <span className='badge badge-ghost'>{pkg.guestsIncluded} guests included</span>
          <span className='badge badge-ghost'>{pkg.duration / 60}h duration</span>
          <span className='badge badge-ghost'>Deposit: {formatCurrency(pkg.depositAmount)}</span>
        </div>

        <ul className='mt-3 space-y-1'>
          {pkg.features.map((f: string) => (
            <li key={f} className='flex items-start gap-2 text-sm text-base-content/80'>
              <span className='mt-0.5 shrink-0 text-success'>✓</span>
              {f}
            </li>
          ))}
        </ul>

        {pkg.addOns.length > 0 && (
          <p className='mt-3 text-xs text-base-content/50'>+{pkg.addOns.length} add-ons available</p>
        )}

        <div className='card-actions mt-4'>
          <button
            className={`btn ${BTN_MAP[pkg.color]} w-full ${selected ? '' : 'btn-outline'}`}
            type='button'
            onClick={() => onSelect(pkg.id)}
          >
            {selected ? '✓ Selected' : 'Select Package'}
          </button>
        </div>
      </div>
    </div>
  )
}
