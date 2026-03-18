'use client'

import React from 'react'
import Link from 'next/link'

import { ENRICHMENT_GROUPS } from './constants'
import EnrichmentCard from './EnrichmentCard'
import SectionHeader from '../shared/SectionHeader'

export default function EnrichmentSection() {
  return (
    <>
      <SectionHeader
        eyebrow='Enrichment & Specialized Skills'
        title='Go Beyond the Textbook'
        desc='Programs that build real-world skills, ignite passions, and keep kids engaged long after school ends. These are the classes families come back for year after year.'
      />

      {ENRICHMENT_GROUPS.map(group => (
        <div key={group.label} className='mb-9 last:mb-0'>
          <div className='mb-4 mt-9 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#AAA]'>
            <img src={group.image} alt={group.label} className='w-[18px] h-[18px] object-cover rounded-full' />
            <span>{group.label}</span>
            <span className='h-px flex-1 bg-[#F0EDE8]' />
          </div>

          <div className='grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3'>
            {group.courses.map(course => (
              <EnrichmentCard key={course.name} course={course} colorSet={group.color} />
            ))}
          </div>
        </div>
      ))}

      {/* CTA strip matching Play/Gym */}
      <div className='mt-7 flex items-center justify-between px-7 py-5 rounded-[14px] bg-[var(--dt-dark)] flex-wrap gap-4'>
        <div>
          <p className='text-[16px] font-extrabold text-white mb-1'>Ready to start learning?</p>
          <p className='text-[13px] text-white/55'>
            Browse class availability, enroll, and reserve your spot today.
          </p>
        </div>
        <div className='flex gap-2.5'>
          <Link
            href='/classes'
            className='px-5 py-2.5 rounded-md text-white text-[13px] font-bold no-underline transition-colors duration-150'
            style={{ background: '#0CA678' }}
          >
            Enroll Now
          </Link>
          <Link
            href='/book'
            className='px-5 py-2.5 rounded-md bg-transparent text-white text-[13px] font-bold no-underline border-[1.5px] border-white/25 hover:border-white/50 transition-colors duration-150'
          >
            Learn More
          </Link>
        </div>
      </div>
    </>
  )
}
