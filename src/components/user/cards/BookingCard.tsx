import type { BookingCardProps } from './types'
import { formatCurrency, getAgeRangeLabel, getSpotsLabel } from '@/utils/formatters'

export default function BookingCard({
  title,
  subtitle,
  date,
  time,
  spotsAvailable,
  spotsTotal,
  price,
  ageMin,
  ageMax,
  onBook,
  variant = 'default',
}: BookingCardProps) {
  const isFull = spotsAvailable === 0
  const isAlmostFull = spotsAvailable <= 3 && spotsAvailable > 0
  const fillPercent = Math.round(((spotsTotal - spotsAvailable) / spotsTotal) * 100)

  const statusColor = isFull ? 'var(--dt-coral)' : isAlmostFull ? '#D97706' : '#0CA678'
  const statusBg = isFull ? 'var(--dt-coral-soft)' : isAlmostFull ? '#FFFBEB' : 'var(--dt-mint-soft)'
  const statusBorder = isFull ? '#FFD0D0' : isAlmostFull ? '#FDE68A' : '#96F2D7'
  const statusLabel = isFull ? 'Sold Out' : isAlmostFull ? 'Almost Full' : 'Available'
  const statusEmoji = isFull ? '🔴' : isAlmostFull ? '🟡' : '🟢'

  const cardClass =
    'overflow-hidden rounded-[20px] border border-[#F0EDE8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(0,0,0,0.09)]'

  const primaryButtonClass =
    'inline-flex items-center gap-1.5 rounded-xl border-none px-[22px] py-2.5 text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(255,107,107,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,107,0.42)]'

  const disabledButtonClass =
    'cursor-not-allowed rounded-xl border-none bg-[#F5F2EE] px-[22px] py-2.5 text-[13px] font-extrabold text-[#BBB]'

  if (variant === 'compact') {
    return (
      <div className={cardClass}>
        <div className='p-4 md:px-[18px]'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <div className='font-serif text-base font-bold text-[var(--dt-navy)]'>{title}</div>
              <div className='text-xs font-semibold text-[#AAA]'>{time}</div>
            </div>

            <div className='flex shrink-0 items-center gap-3.5'>
              <div>
                <div className='font-serif text-[1.4rem] font-black leading-none text-[var(--dt-coral)]'>
                  {formatCurrency(price)}
                </div>
                <span className='block text-[11px] font-semibold text-[#BBB]'>/ child</span>
              </div>
              <button
                className={isFull ? disabledButtonClass : primaryButtonClass}
                onClick={onBook}
                disabled={isFull}
                type='button'
              >
                {isFull ? 'Full' : 'Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cardClass}>
      <div className='flex items-start justify-between gap-2.5 px-[18px] pb-0 pt-[18px]'>
        <div>
          <div className='font-serif text-base font-bold text-[var(--dt-navy)]'>{title}</div>
          {subtitle && <div className='text-xs font-semibold text-[#AAA]'>{subtitle}</div>}
        </div>
        <div
          className='inline-flex shrink-0 items-center gap-1 rounded-full border-[1.5px] px-[11px] py-1 text-[11px] font-extrabold'
          style={{ color: statusColor, background: statusBg, borderColor: statusBorder }}
        >
          {statusEmoji} {statusLabel}
        </div>
      </div>

      <div className='px-[18px] py-[14px]'>
        <div className='mb-4 flex flex-col gap-[7px]'>
          <div className='flex items-center gap-2 text-[13px] font-semibold text-[#666]'>
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-[#F5F2EE] text-xs'>
              📅
            </div>
            {date}
          </div>
          <div className='flex items-center gap-2 text-[13px] font-semibold text-[#666]'>
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-[#F5F2EE] text-xs'>
              ⏰
            </div>
            {time}
          </div>
          <div className='flex items-center gap-2 text-[13px] font-semibold text-[#666]'>
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-[#F5F2EE] text-xs'>
              🧒
            </div>
            {getAgeRangeLabel(ageMin, ageMax)}
          </div>
        </div>

        <div className='mb-[18px]'>
          <div className='mb-[7px] flex items-center justify-between'>
            <span className='text-xs font-bold text-[#AAA]'>Capacity</span>
            <span className='text-xs font-extrabold' style={{ color: statusColor }}>
              {getSpotsLabel(spotsAvailable, spotsTotal)}
            </span>
          </div>
          <div className='h-1.5 w-full overflow-hidden rounded-full bg-[#F0EDE8]'>
            <div
              className='h-full rounded-full transition-[width] duration-300'
              style={{ width: `${fillPercent}%`, background: statusColor }}
            />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between border-t border-[#F0EDE8] bg-[var(--dt-cream)] px-[18px] py-[14px]'>
        <div>
          <div className='font-serif text-[1.4rem] font-black leading-none text-[var(--dt-coral)]'>
            {formatCurrency(price)}
          </div>
          <span className='block text-[11px] font-semibold text-[#BBB]'>per child</span>
        </div>

        <button
          className={isFull ? disabledButtonClass : primaryButtonClass}
          onClick={onBook}
          disabled={isFull}
          type='button'
        >
          {isFull ? 'Sold Out' : 'Book Now →'}
        </button>
      </div>
    </div>
  )
}
