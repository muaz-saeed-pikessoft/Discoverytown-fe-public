import { reasons } from './constants'

// Sample shape if you need to update your constants:
// export const reasons = [
//   { title: "Safe & Spotless", body: "Every surface is cleaned and sanitised between sessions so you can relax.", icon: "✦" },
//   { title: "All Ages Welcome", body: "Zones crafted for babies, toddlers, and big kids — no one gets left out.", icon: "◈" },
//   { title: "Café On-Site", body: "Grab a proper coffee and a bite while the kids burn off energy nearby.", icon: "◉" },
//   { title: "Easy Booking", body: "Reserve your spot in seconds online — no phone calls, no waiting.", icon: "◇" },
// ]

export default function WhyFamiliesLoveUsSection() {
  return (
    <section className='relative w-full overflow-hidden bg-[#f0f4fa] py-20 lg:py-28'>
      {/* Background texture */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: `radial-gradient(circle, #1d7fe5 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Decorative blobs */}
      <div className='pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#1d7fe5] opacity-[0.07] blur-[80px]' />
      <div className='pointer-events-none absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-[#4f8fe8] opacity-[0.08] blur-[80px]' />

      <div className='relative mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-14 flex flex-col items-center text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-[#1d7fe5]/20 bg-[#1d7fe5]/8 px-4 py-1.5'>
            <span className='h-1.5 w-1.5 rounded-full bg-[#1d7fe5]' />
            <span
              className='text-[11px] font-black uppercase tracking-[0.18em] text-[#1d7fe5]'
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Why Families Love Us
            </span>
          </div>

          <h2
            className='max-w-[520px] text-[2.6rem] font-black leading-[1.05] text-[#0f1d35] lg:text-[3.2rem]'
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.02em' }}
          >
            More than a{' '}
            <span
              className='relative inline-block'
              style={{
                background: 'linear-gradient(135deg, #1d7fe5 0%, #4f8fe8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              play centre.
            </span>
          </h2>

          <p
            className='mt-4 max-w-[480px] text-[15px] leading-[1.85] text-[#5a6a82]'
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We've thought through every detail so your family can relax, have fun, and actually enjoy being out
            together.
          </p>
        </div>

        {/* Cards grid */}
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className='group relative overflow-hidden rounded-[28px] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(29,127,229,0.14)]'
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Top accent bar */}
              <div
                className='h-1 w-full transition-all duration-300 group-hover:h-[3px]'
                style={{
                  background: 'linear-gradient(90deg, #1d7fe5 0%, #7fb3f5 100%)',
                  opacity: 0.85,
                }}
              />

              {/* Hover glow overlay */}
              <div
                className='pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(29,127,229,0.04) 0%, transparent 70%)' }}
              />

              <div className='relative p-6 pt-5'>
                <h3
                  className='mb-2.5 text-[1.2rem] font-black leading-[1.15] text-[#0f1d35]'
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em' }}
                >
                  {r.title}
                </h3>
                <p
                  className='text-[13.5px] leading-[1.8] text-[#6b7a91]'
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {r.body}
                </p>

                {/* Bottom link affordance */}
                <div
                  className='mt-5 flex items-center gap-1.5 text-[12px] font-bold tracking-wide text-[#1d7fe5] opacity-0 transition-all duration-300 group-hover:opacity-100'
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Learn more
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    className='translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5'
                  >
                    <path
                      d='M2 6h8M6.5 3l3 3-3 3'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className='mt-12 flex flex-col items-center justify-between gap-4 rounded-[24px] px-8 py-6 sm:flex-row'
          style={{ background: 'linear-gradient(135deg, #1d7fe5 0%, #3b8fe8 100%)' }}
        >
          <div>
            <p
              className='text-[13px] font-bold uppercase tracking-[0.12em] text-white/60'
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Ready to visit?
            </p>
            <p className='text-[1.15rem] font-black text-white' style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Book your session in under 60 seconds.
            </p>
          </div>
          <button
            className='shrink-0 rounded-[14px] bg-white px-7 py-3 text-[14px] font-black text-[#1d7fe5] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em' }}
          >
            Book Now →
          </button>
        </div>
      </div>

      {/* Font imports via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@400;500;700;900&display=swap');
      `}</style>
    </section>
  )
}
