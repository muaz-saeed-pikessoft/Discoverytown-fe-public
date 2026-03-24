'use client'

import type { ClassCardProps } from './types'

import type { FC } from 'react'
import { useRouter } from 'next/navigation'

import { formatCurrency, getAgeRangeLabel } from '@/utils/formatters'

import { CATEGORY_COLORS, CATEGORY_EMOJIS, CATEGORY_LABELS } from './constants'
import { getClassMetrics, getClassStatus } from './helpers'
import type { ClassItem } from './types'

const ClassCard: FC<ClassCardProps> = ({ item }) => {
  const router = useRouter()
  const colors = CATEGORY_COLORS[item.category]
  const { isFull, isAlmostFull } = getClassStatus(item.spotsAvailable)
  const { enrolledPercent, startDateShort } = getClassMetrics(item)

  return (
    <article className='flex flex-col overflow-hidden rounded-[20px] border border-[#F0EDE8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)]'>
      <div className='h-[5px] w-full' style={{ background: colors.accent }} />
      <div className='flex flex-1 flex-col p-5'>
        <div className='flex flex-wrap gap-1.5'>
          <span
            className='inline-flex items-center gap-1 rounded-full border-[1.5px] px-3 py-1 text-xs font-bold'
            style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
          >
            {CATEGORY_EMOJIS[item.category]} {CATEGORY_LABELS[item.category]}
          </span>
          {isFull && (
            <span className='inline-flex rounded-full border-[1.5px] border-[#FFD0D0] bg-[var(--dt-coral-soft)] px-3 py-1 text-xs font-bold text-[var(--dt-coral)]'>
              Waitlist
            </span>
          )}
          {isAlmostFull && (
            <span className='inline-flex rounded-full border-[1.5px] border-[#FDE68A] bg-[#FFFBEB] px-3 py-1 text-xs font-bold text-[#D97706]'>
              Almost Full
            </span>
          )}
        </div>

        <h2 className='mt-3 font-serif text-[1.15rem] font-bold leading-[1.25] text-[var(--dt-navy)]'>{item.title}</h2>
        <p className='mt-1 text-[13px] font-semibold text-[#888]'>with {item.instructor}</p>
        <p className='mt-2.5 line-clamp-3 flex-1 text-[13px] leading-[1.65] text-[#666]'>{item.description}</p>

        <div className='mt-3.5 flex flex-col gap-1.5'>
          <div className='flex items-start gap-2.5 text-[13px] text-[#666]'>
            <span
              className='mt-0.5 inline-flex h-[22px] w-[22px] items-center justify-center rounded-md text-[11px]'
              style={{ background: colors.bg }}
            >
              🗓
            </span>
            <span>{item.schedule}</span>
          </div>
          <div className='flex items-start gap-2.5 text-[13px] text-[#666]'>
            <span
              className='mt-0.5 inline-flex h-[22px] w-[22px] items-center justify-center rounded-md text-[11px]'
              style={{ background: colors.bg }}
            >
              👧
            </span>
            <span>Ages {getAgeRangeLabel(item.ageMin, item.ageMax)}</span>
          </div>
          <div className='flex items-start gap-2.5 text-[13px] text-[#666]'>
            <span
              className='mt-0.5 inline-flex h-[22px] w-[22px] items-center justify-center rounded-md text-[11px]'
              style={{ background: colors.bg }}
            >
              📚
            </span>
            <span>
              {item.sessionsTotal} sessions · Starts {startDateShort}
            </span>
          </div>
        </div>

        <div className='mt-3.5'>
          <div className='mb-1.5 flex items-center justify-between text-xs font-semibold text-[#888]'>
            <span>{isFull ? 'Class full' : `${item.spotsAvailable} spots left`}</span>
            <span>
              {item.spotsTotal - item.spotsAvailable}/{item.spotsTotal} enrolled
            </span>
          </div>
          <div className='h-1.5 overflow-hidden rounded-full bg-[#F0EDE8]'>
            <div
              className='h-full rounded-full transition-[width] duration-300'
              style={{
                width: `${enrolledPercent}%`,
                background: isFull ? 'var(--dt-coral)' : isAlmostFull ? '#D97706' : colors.accent,
              }}
            />
          </div>
        </div>

        <div className='mt-3.5 flex items-end justify-between gap-3 border-t border-[#F0EDE8] pt-3.5'>
          <div>
            <div className='font-serif text-[1.3rem] font-black' style={{ color: colors.accent }}>
              {formatCurrency(item.priceSeries)}
            </div>
            <div className='text-[11px] font-semibold text-[#AAA]'>
              series · {formatCurrency(item.pricePerSession)}/session
            </div>
          </div>

          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => router.push(`/classes/${item.id}`)}
              className='rounded-xl border-[1.5px] border-[#E5E0D8] px-4 py-2 text-[13px] font-bold text-[#888] transition hover:border-[var(--dt-navy)] hover:text-[var(--dt-navy)]'
            >
              Details
            </button>
            <button
              type='button'
              onClick={() => router.push(`/classes/${item.id}`)}
              className='rounded-xl px-4 py-2 text-[13px] font-extrabold text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5'
              style={{
                background: isFull ? 'var(--dt-coral)' : colors.accent,
                boxShadow: `0 4px 14px ${isFull ? 'rgba(255,107,107,0.35)' : `${colors.accent}55`}`,
              }}
            >
              {isFull ? 'Waitlist' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ClassCard
