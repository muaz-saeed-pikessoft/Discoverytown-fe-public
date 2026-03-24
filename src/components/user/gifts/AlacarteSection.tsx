import React from 'react'
import SectionHeader from '@/components/shared/SectionHeader'
import { ALACARTE_GROUPS } from './constants'

export default function AlacarteSection() {
  return (
    <>
      <SectionHeader
        eyebrow='À La Carte Enhancements'
        title='Boost the Joy'
        desc='Add finishing touches to any gift at checkout. High-value items that make your delivery extra special — select as many as you like.'
        accentColor='var(--dt-coral)'
      />

      {ALACARTE_GROUPS.map((group, index) => (
        <div key={group.title} className={index === ALACARTE_GROUPS.length - 1 ? '' : 'mb-7'}>
          <div className='mb-4 mt-8 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--dt-text-subtle)]'>
            <img src={group.image} alt={group.title} className='w-[18px] h-[18px] object-cover rounded-full' />
            <span>{group.title}</span>
            <span className='h-px flex-1 bg-[#F0EDE8]' />
          </div>
          <div className='grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4'>
            {group.items.map(item => (
              <div
                key={item.name}
                className='rounded-[18px] border-[1.5px] p-[18px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,0,0,0.08)]'
                style={{ borderColor: group.border, background: group.bg }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-[48px] h-[48px] mx-auto object-cover rounded-[14px] mb-2 shadow-sm'
                />
                <div className='mb-1 text-[13px] font-extrabold text-[var(--dt-navy)]'>{item.name}</div>
                <div className='mb-2.5 text-xs leading-[1.5] text-[var(--dt-text-muted)]'>{item.desc}</div>
                <div className='dt-font-heading text-sm font-black' style={{ color: group.text }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
