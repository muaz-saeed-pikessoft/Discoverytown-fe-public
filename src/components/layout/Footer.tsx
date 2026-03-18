import Link from 'next/link'

const accountLinks = [
  { label: 'My Account',     href: '/my-account' },
  { label: 'Sign In',        href: '/login' },
  { label: 'Create Account', href: '/register' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
]

const exploreLinks = [
  { label: 'Play',              href: '/play' },
  { label: 'Cafe & Food',       href: '/cafeAndfood' },
  { label: 'Events',            href: '/events' },
  { label: 'Gym & Learn',       href: '/gym' },
  { label: 'Book a Session',    href: '/book' },
]

const contactInfo = [
  { icon: '📍', text: '123 Discovery Lane, Suite 100' },
  { icon: '📞', text: '(555) 123-4567' },
  { icon: '✉️', text: 'hello@discoverytown.com' },
  { icon: '🕐', text: 'Mon–Fri 9am–7pm · Sat–Sun 9am–6pm' },
]

const whyUs = [
  { icon: '🛡️', text: 'Safe & Sanitized' },
  { icon: '👶', text: 'Ages 1–12 Welcome' },
  { icon: '🎓', text: 'Certified Instructors' },
  { icon: '⭐', text: '4.9 Star Rating' },
  { icon: '📱', text: 'Book Online 24/7' },
]

const FacebookIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
  </svg>
)

const InstagramIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
  </svg>
)

const TikTokIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' />
  </svg>
)

const YouTubeIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' />
  </svg>
)

const socials = [
  { label: 'Facebook',  href: '#', icon: <FacebookIcon />,  bg: 'bg-[#1877f2]' },
  { label: 'Instagram', href: '#', icon: <InstagramIcon />, bg: 'bg-[#e1306c]' },
  { label: 'TikTok',   href: '#', icon: <TikTokIcon />,    bg: 'bg-[#010101]' },
  { label: 'YouTube',  href: '#', icon: <YouTubeIcon />,   bg: 'bg-[#ff0000]' },
]

export default function Footer() {
  return (
    <footer className='relative bg-[var(--dt-footer-bg)] text-white pt-16 overflow-hidden dt-font-body'>

      {/* Top accent stripe */}
      <div className='absolute top-0 left-0 right-0 h-[2px] bg-[var(--dt-primary)] opacity-50' />

      <div className='dt-container'>

        {/* CTA Banner */}
        <div className='relative overflow-hidden bg-[var(--dt-primary)] rounded-3xl px-10 py-10 mb-16 flex items-center justify-between gap-6 flex-wrap shadow-[0_20px_60px_rgba(29,127,229,0.2)]'>
          <div className='relative z-10'>
            <div className='text-[1.75rem] font-black text-white mb-1.5 leading-tight dt-font-heading'>
              Ready for your next adventure?
            </div>
            <div className='text-sm text-white/80 font-semibold'>
              Book a session in under 2 minutes — no account required.
            </div>
          </div>
          <Link
            href='/book'
            className='relative z-10 bg-white text-[var(--dt-primary)] rounded-2xl px-8 py-3.5 text-sm font-black no-underline whitespace-nowrap transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
          >
            Book a Session Today →
          </Link>
        </div>

        {/* Main Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-14'>

          {/* Col 1 — Brand */}
          <div>
            <Link href='/' className='flex items-center gap-3 no-underline mb-5'>
              <div className='w-[44px] h-[44px] bg-[var(--dt-primary)] rounded-[13px] flex items-center justify-center text-[18px] font-black text-white shrink-0 shadow-[0_4px_12px_rgba(29,127,229,0.35)] dt-font-heading'>
                DT
              </div>
              <span className='text-[19px] font-black text-white'>
                Discovery<span className='text-[var(--dt-primary)]'>Town</span>
              </span>
            </Link>

            <p className='text-sm text-white/70 leading-relaxed mb-7 max-w-[270px] font-medium'>
              Where every visit is an adventure. The best indoor play and learning destination for families in the city.
            </p>

            <div className='space-y-3'>
              {contactInfo.map(item => (
                <div key={item.text} className='flex items-center gap-3 text-[13px] text-white/75'>
                  <div className='dt-icon-badge'>{item.icon}</div>
                  <span className='font-semibold'>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <div className='text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/50 mb-5'>Explore</div>
            <div className='space-y-1'>
              {exploreLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='flex items-center text-sm text-white/75 no-underline py-2 px-3 rounded-xl transition-all duration-150 font-semibold hover:text-[var(--dt-primary)] hover:bg-white/[0.05]'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Account + Socials */}
          <div>
            <div className='text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/50 mb-5'>My Account</div>
            <div className='space-y-1 mb-8'>
              {accountLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='flex items-center text-sm text-white/75 no-underline py-2 px-3 rounded-xl transition-all duration-150 font-semibold hover:text-[var(--dt-primary)] hover:bg-white/[0.05]'
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className='text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/50 mb-4'>Follow Us</div>
            <div className='flex gap-2'>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-white no-underline transition-all duration-200 hover:scale-110 shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${s.bg}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — Why Us */}
          <div>
            <div className='text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/50 mb-5'>Why Us</div>
            <div className='space-y-3'>
              {whyUs.map(item => (
                <div key={item.text} className='flex items-center gap-3 text-[13px] text-white/75'>
                  <div className='dt-icon-badge'>{item.icon}</div>
                  <span className='font-semibold'>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-white/[0.08] py-6 flex items-center justify-between gap-4 flex-wrap'>
          <div className='text-[13px] text-white/50 font-semibold'>
            © {new Date().getFullYear()} Discovery Town. All rights reserved. Made with ♥ for families.
          </div>
          <div className='flex gap-5'>
            {legalLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className='text-[13px] text-white/50 no-underline font-semibold transition-colors duration-150 hover:text-[var(--dt-primary)]'
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
