import type { ServiceTileProps } from './types'
import type { BookingService } from './types'

export default function ServiceTile({ service, selected, delay = 0, onClick }: ServiceTileProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='dt-card-interactive text-left w-full rounded-[22px] overflow-hidden cursor-pointer'
      style={{
        animationDelay: `${delay}ms`,
        outline: selected ? `2.5px solid ${service.colorHex}` : '2.5px solid transparent',
      }}
    >
      <div className='relative w-full' style={{ paddingBottom: '60%' }}>
        <img src={service.photoUrl} alt={service.label} className='absolute inset-0 w-full h-full object-cover' />

        {/* Color indicator dot — top-left */}
        <span
          className='absolute top-3 left-3 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm'
          style={{ background: service.colorHex }}
        />

        {/* Selected checkmark badge */}
        {selected && (
          <span
            className='absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] font-black shadow-md'
            style={{ background: service.colorHex }}
          >
            ✓
          </span>
        )}
      </div>

      <div className='px-4 pt-4 pb-4 flex flex-col gap-3'>
        <p className='dt-font-heading text-[15px] font-extrabold text-[var(--dt-navy)] leading-[1.3]'>
          {service.label}
        </p>

        <p className='text-[12px] text-[var(--dt-text-muted)] leading-[1.65] -mt-1'>{service.desc}</p>

        <div
          className='w-full py-2.5 rounded-xl text-white text-[13px] font-extrabold text-center transition-opacity duration-150 shadow-[0_10px_24px_rgba(20,35,59,0.12)]'
          style={{
            background: selected
              ? service.colorHex
              : `linear-gradient(135deg, ${service.colorHex}CC, ${service.colorHex})`,
          }}
        >
          {selected ? '✓ Selected' : `Select ${service.label} →`}
        </div>
      </div>
    </button>
  )
}
