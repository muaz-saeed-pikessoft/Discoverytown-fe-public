import type { PricingOption, DetailSidebarProps } from './types'
import type { FC } from 'react'

import { formatCurrency, getSpotsLabel } from '@/utils/formatters'

import type { CategoryColors } from './types'

const DetailSidebar: FC<DetailSidebarProps> = ({
  isFull,
  isAlmostFull,
  colors,
  spotsAvailable,
  spotsTotal,
  priceSeries,
  pricePerSession,
  pricingOption,
  onPricingChange,
  onRegister,
}) => {
  const enrolledPercent = ((spotsTotal - spotsAvailable) / spotsTotal) * 100

  return (
    <aside className='sticky top-6 rounded-[20px] border border-[#F0EDE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]'>
      <h3 className='mb-4 font-serif text-[1.2rem] font-bold text-[var(--dt-navy)]'>
        {isFull ? 'Join the Waitlist' : 'Register Now'}
      </h3>

      <div className='mb-4'>
        <div className='mb-1.5 flex items-center justify-between text-xs font-semibold text-[#888]'>
          <span>{getSpotsLabel(spotsAvailable, spotsTotal)}</span>
          <span>
            {spotsTotal - spotsAvailable}/{spotsTotal} enrolled
          </span>
        </div>
        <div className='h-2 overflow-hidden rounded-full bg-[#F0EDE8]'>
          <div
            className='h-full rounded-full transition-[width] duration-300'
            style={{
              width: `${enrolledPercent}%`,
              background: isFull ? 'var(--dt-coral)' : isAlmostFull ? '#D97706' : colors.accent,
            }}
          />
        </div>
        {isAlmostFull && (
          <div className='mt-2 text-xs font-bold text-[#D97706]'>
            Only {spotsAvailable} spot{spotsAvailable !== 1 ? 's' : ''} left!
          </div>
        )}
      </div>

      {!isFull && (
        <>
          <div className='mb-2.5 text-xs font-extrabold uppercase tracking-[0.1em] text-[#BBB]'>Pricing Option</div>
          <div className='mb-4 flex flex-col gap-2'>
            <button
              type='button'
              onClick={() => onPricingChange('series')}
              className='flex items-center gap-3 rounded-[14px] border-[1.5px] px-4 py-3 text-left transition'
              style={{
                borderColor: pricingOption === 'series' ? colors.accent : '#E5E0D8',
                background: pricingOption === 'series' ? colors.bg : 'white',
              }}
            >
              <span
                className='relative h-[17px] w-[17px] rounded-full border-2'
                style={{ borderColor: pricingOption === 'series' ? colors.accent : '#CCC' }}
              >
                {pricingOption === 'series' && (
                  <span className='absolute inset-[3px] rounded-full' style={{ background: colors.accent }} />
                )}
              </span>
              <span>
                <span className='block text-sm font-bold text-[var(--dt-navy)]'>Full Series</span>
                <span className='block text-xs text-[#888]'>{formatCurrency(priceSeries)} · Best value</span>
              </span>
            </button>

            <button
              type='button'
              onClick={() => onPricingChange('session')}
              className='flex items-center gap-3 rounded-[14px] border-[1.5px] px-4 py-3 text-left transition'
              style={{
                borderColor: pricingOption === 'session' ? colors.accent : '#E5E0D8',
                background: pricingOption === 'session' ? colors.bg : 'white',
              }}
            >
              <span
                className='relative h-[17px] w-[17px] rounded-full border-2'
                style={{ borderColor: pricingOption === 'session' ? colors.accent : '#CCC' }}
              >
                {pricingOption === 'session' && (
                  <span className='absolute inset-[3px] rounded-full' style={{ background: colors.accent }} />
                )}
              </span>
              <span>
                <span className='block text-sm font-bold text-[var(--dt-navy)]'>Per Session</span>
                <span className='block text-xs text-[#888]'>{formatCurrency(pricePerSession)} / class</span>
              </span>
            </button>
          </div>
        </>
      )}

      <div className='my-4 h-px bg-[#F0EDE8]' />

      <div className='mb-4 flex items-center justify-between'>
        <span className='text-sm font-semibold text-[#888]'>Total</span>
        <span className='font-serif text-[1.7rem] font-black' style={{ color: colors.accent }}>
          {isFull ? 'Free' : pricingOption === 'series' ? formatCurrency(priceSeries) : formatCurrency(pricePerSession)}
        </span>
      </div>

      <button
        type='button'
        onClick={onRegister}
        className='flex h-[50px] w-full items-center justify-center gap-2 rounded-[14px] text-[15px] font-extrabold text-white transition hover:-translate-y-0.5'
        style={{
          background: isFull ? 'var(--dt-coral)' : colors.accent,
          boxShadow: `0 4px 14px ${isFull ? 'rgba(255,107,107,0.35)' : `${colors.accent}55`}`,
        }}
      >
        {isFull ? '📋 Join Waitlist' : '✓ Register Now'}
      </button>
      <p className='mt-2.5 text-center text-xs font-semibold text-[#AAA]'>
        {isFull ? 'No payment required for waitlist' : 'Secure checkout · Cancel anytime'}
      </p>
    </aside>
  )
}

export default DetailSidebar
