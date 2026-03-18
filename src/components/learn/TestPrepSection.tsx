'use client'

import { TEST_PREP_GROUPS } from './constants'
import TestPrepCard from './TestPrepCard'
import SectionHeader from '../shared/SectionHeader'

export default function TestPrepSection() {
  return (
    <>
      <SectionHeader
        eyebrow='Test Preparation'
        title='Ace the Exam'
        desc='High-stakes tests require focused, strategic preparation. Our intensive courses are structured around what exams actually test - not just content review.'
      />

      {TEST_PREP_GROUPS.map(group => (
        <div key={group.label} className='mb-9 last:mb-0'>
          <div
            className='mb-4 inline-flex items-center gap-2 rounded-full border-[1.5px] px-[18px] py-2 text-sm font-extrabold'
            style={{ background: group.color.bg, color: group.color.text, borderColor: group.color.border }}
          >
            <img src={group.image} alt={group.label} className='w-[22px] h-[22px] object-cover rounded-full' />
            {group.label}
          </div>

          <div className='grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3'>
            {group.tests.map(test => (
              <TestPrepCard key={test.name} test={test} colorSet={group.color} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
