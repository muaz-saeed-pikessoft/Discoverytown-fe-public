'use client'

import type { PnoItem, PNOSectionProps } from './types'
import Link from 'next/link'
import React from 'react'

export default function PNOSection({ details, images }: PNOSectionProps) {
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className='rounded-[20px] overflow-hidden grid grid-cols-2 border-[1.5px] border-[var(--dt-border)] min-h-[380px]'>
      {/* Left panel */}
      <div className='bg-[var(--dt-dark)] px-8 py-9 flex flex-col justify-center'>
        <p className='text-[11px] font-black tracking-[0.16em] uppercase text-[var(--dt-teal-dark)] mb-2.5'>
          Parents' Night Out
        </p>
        <h3 className='dt-font-heading text-[26px] font-black text-white leading-[1.2] mb-3'>
          You Deserve
          <br />a Night Off
        </h3>
        <p className='text-[14px] text-white/60 leading-[1.7] mb-6'>
          Drop off the kids and enjoy your evening. We&apos;ve got a safe, supervised experience ready.
        </p>
        <Link
          href='/book?service=pno'
          className='self-start px-5 py-2.5 rounded-md bg-[var(--dt-teal-dark)] text-white text-[14px] font-bold no-underline hover:bg-[var(--dt-teal)] transition-colors duration-150'
        >
          Reserve a Spot
        </Link>
      </div>

      {/* Right — slideshow */}
      <div className='relative overflow-hidden'>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`pno-${i}`}
            className={[
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out',
              i === current ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        ))}

        {/* Prev arrow */}
        <button
          type='button'
          onClick={() => setCurrent(prev => (prev - 1 + images.length) % images.length)}
          className='absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 border-none text-white text-[16px] cursor-pointer flex items-center justify-center'
        >
          ‹
        </button>

        {/* Next arrow */}
        <button
          type='button'
          onClick={() => setCurrent(prev => (prev + 1) % images.length)}
          className='absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 border-none text-white text-[16px] cursor-pointer flex items-center justify-center'
        >
          ›
        </button>

        {/* Dots */}
        <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
          {images.map((_, i) => (
            <button
              key={i}
              type='button'
              onClick={() => setCurrent(i)}
              className={[
                'h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300',
                i === current ? 'w-[18px] bg-[var(--dt-teal-dark)]' : 'w-1.5 bg-white/50',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
