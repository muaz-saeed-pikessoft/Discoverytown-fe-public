'use client'

import { useState } from 'react'
import { CORE_GROUPS } from './constants'
import SubjectCard from './SubjectCard'
import SectionHeader from '../shared/SectionHeader'

export default function CoreAcademicSection() {
  const [activeCoreTab, setActiveCoreTab] = useState('elementary')
  const selectedGroup = CORE_GROUPS.find(group => group.id === activeCoreTab) ?? CORE_GROUPS[0]

  return (
    <>
      <SectionHeader
        eyebrow='Core Academic'
        title='K-12 Tutoring Menu'
        desc='Your bread-and-butter subjects. Consistent, structured support across every grade level - from early literacy all the way to AP Calculus.'
      />

      <div className='mb-7 flex flex-wrap gap-2.5'>
        {CORE_GROUPS.map(group => {
          const active = activeCoreTab === group.id

          return (
            <button
              key={group.id}
              type='button'
              onClick={() => setActiveCoreTab(group.id)}
              className={`inline-flex items-center gap-2 rounded-[14px] border-[1.5px] px-5 py-2.5 text-[13px] font-extrabold transition ${
                active
                  ? 'text-white'
                  : 'border-[var(--dt-border)] bg-[var(--dt-bg-card)] text-[var(--dt-text-muted)] hover:border-[#CCC] hover:text-[var(--dt-dark)]'
              }`}
              style={active ? { background: group.color.accent, borderColor: group.color.accent } : undefined}
            >
              <img src={group.image} alt={group.label} className='w-5 h-5 object-cover rounded-full' />
              <span>
                {group.label}
                <span className='ml-1 block text-[11px] font-bold opacity-75'>{group.range}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className='overflow-hidden rounded-[24px] border-[1.5px] border-[#F0EDE8] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)]'>
        <div className='border-b border-[#F0EDE8] px-5 pb-[22px] pt-[26px] sm:px-8'>
          <div className='mb-2 flex items-center gap-4'>
            <img
              src={selectedGroup.image}
              alt={selectedGroup.label}
              className='w-12 h-12 object-cover rounded-full shadow-sm'
            />
            <div>
              <div className='dt-font-heading text-[22px] font-black text-[var(--dt-navy)] leading-[1.3]'>{selectedGroup.label}</div>
              <span
                className='inline-block rounded-full border-[1.5px] px-3.5 py-[3px] text-xs font-extrabold mt-1.5'
                style={{
                  background: selectedGroup.color.bg,
                  color: selectedGroup.color.text,
                  borderColor: selectedGroup.color.border,
                }}
              >
                {selectedGroup.range}
              </span>
            </div>
          </div>
          <div className='text-[13px] leading-[1.6] text-[#666] mt-1'>{selectedGroup.desc}</div>
        </div>

        <div className='px-5 pb-7 pt-6 sm:px-8 bg-[#FDFDFC]'>
          <div className='grid grid-cols-1 gap-3.5 sm:grid-cols-2'>
            {selectedGroup.subjects.map(subject => (
              <SubjectCard key={subject.name} subject={subject} colorSet={selectedGroup.color} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
