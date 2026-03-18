import Link from 'next/link';

export default function CtaBannerSection() {
  return (
    <section className='w-full'>
      <div className='mx-auto w-full max-w-[1300px] px-4 pb-14 sm:px-6 lg:px-8'>
        <div className='relative overflow-hidden rounded-[32px] bg-[linear-gradient(130deg,#0c1a2e_0%,#1a3a6e_50%,#1d4ed8_100%)] px-7 py-12 sm:px-10 lg:px-14 lg:py-14'>
          <div className='absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-blue-400/18 blur-[70px] pointer-events-none' />
          <div className='absolute top-0 left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-300/10 blur-[80px] pointer-events-none' />

          <div className='relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center'>
            <div>
              <p className='dt-eyebrow mb-3 text-white/50'>Ready to visit?</p>
              <h2 className='dt-font-heading text-[clamp(1.9rem,3.8vw,3.2rem)] font-black leading-[1.04] text-white max-w-[580px]'>
                Book a visit, grab a table, or start planning your family's next party.
              </h2>
              <p className='mt-4 text-[15px] leading-[1.85] text-white/65 max-w-[520px]'>
                Walk-ins welcome, but booking guarantees your spot. Takes less than 2 minutes online.
              </p>
            </div>
            <div className='flex flex-col gap-3 shrink-0'>
              <Link href='/book' className='dt-btn-primary text-center whitespace-nowrap'>
                Book a Visit Today
              </Link>
              <Link href='/events' className='dt-btn-hero-outline text-center whitespace-nowrap'>
                Plan a Party
              </Link>
              <Link
                href='/cafeAndfood'
                className='text-center text-[13px] font-bold text-white/55 hover:text-white/80 transition'
              >
                View Cafe Menu →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
