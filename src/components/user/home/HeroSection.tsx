import Link from 'next/link'
import { highlights } from './constants'

export default function HeroSection() {
  return (
    <section className='relative w-full overflow-hidden'>
      <div className='absolute inset-0 bg-[linear-gradient(130deg,#0c1a2e_0%,#1a3558_42%,#0f2a4a_68%,#7c3a1e_100%)]' />
      <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/12 blur-[120px] pointer-events-none' />
      <div className='absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-700/18 blur-[100px] pointer-events-none' />

      <div className='relative mx-auto w-full max-w-[1300px] px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16'>
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[0.88fr_1.12fr]'>
          {/* Copy */}
          <div className='flex flex-col justify-center py-2'>
            <h1 className='dt-font-heading text-[clamp(2.6rem,5.2vw,4.8rem)] font-black leading-[0.94] text-white'>
              Play,&nbsp;eat,&nbsp;learn,&nbsp;train,
              <br />
              and&nbsp;<em className='not-italic text-[#f5a855]'>celebrate.</em>
            </h1>
            <p className='mt-4 dt-font-heading text-[clamp(1.35rem,2.8vw,2.25rem)] font-bold leading-tight text-white/90'>
              Here or at your place.
            </p>

            <p className='mt-5 text-[15px] leading-[1.85] text-white/70 max-w-[400px] sm:text-[16px]'>
              Discovery Town is the favorite family destination — indoor play, a real cafe, enrichment classes, and
              unforgettable birthday parties all under one roof.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link href='/book' className='dt-btn-primary'>
                Book a Visit
              </Link>
              <Link
                href='/events'
                className='rounded-full border border-white/22 bg-white/8 px-6 py-2.5 text-[14px] font-bold text-white backdrop-blur-sm transition hover:bg-white/16'
              >
                Plan a Party →
              </Link>
            </div>

            <div className='mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4'>
              {highlights.map(item => (
                <div key={item.label}>
                  <p className='dt-font-heading text-[clamp(1.5rem,2.6vw,2.2rem)] font-black leading-none text-white'>
                    {item.value}
                  </p>
                  <p className='mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white'>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image mosaic */}
          <div className='flex flex-col gap-4'>
            <div className='relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)] min-h-[260px] sm:min-h-[340px] flex-1'>
              <img
                src='/home/image.webp'
                alt='Children exploring the Discovery Town indoor play area'
                className='absolute inset-0 h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[rgba(8,18,36,0.80)] via-[rgba(8,18,36,0.10)] to-transparent' />
              <div className='absolute bottom-0 inset-x-0 p-5 sm:p-6'>
                <p className='mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/50'>
                  Discovery Town · Main Play Floor
                </p>
                <p className='text-[1.1rem] font-black leading-[1.22] text-white sm:text-[1.3rem]'>
                  Adventure, creativity, and imagination.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-[55%_1fr] gap-4'>
              <div className='rounded-[22px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-md'>
                <p className='mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-white'>Today's Schedule</p>
                <div className='space-y-2.5'>
                  {[
                    { time: '9:00 AM', label: 'Doors open · Drop-in play' },
                    { time: '11:00 AM', label: 'Toddler gym session' },
                    { time: '2:00 PM', label: 'Birthday party · Room A' },
                  ].map(s => (
                    <div key={s.time} className='flex items-start gap-3'>
                      <span className='text-[11px] font-bold text-[#f5a855] shrink-0 mt-px'>{s.time}</span>
                      <span className='text-[12px] text-white/65 leading-[1.4]'>{s.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href='/book'
                  className='mt-5 block text-center rounded-full bg-[#f5a855] py-2 text-[12px] font-black text-[#0c1a2e] transition hover:opacity-90'
                >
                  Reserve Your Slot
                </Link>
              </div>

              <div className='overflow-hidden rounded-[22px] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.3)]'>
                <img
                  src='/home/hero2.jpeg'
                  alt='Family celebrating a birthday at Discovery Town'
                  className='h-full w-full object-cover min-h-[160px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
