import type { HeroProps } from './types'
import type { ReactNode, CSSProperties } from 'react'

export default function Hero({
  bgUrl,
  bgStyle,
  bgClassName,
  minHeight = 'min-h-[400px]',
  containerClassName = 'relative dt-container-play py-16 pb-14',
  title,
  description,
  eyebrow,
  actions,
  children,
  hasGrain = false,
}: HeroProps) {
  const finalBgStyle = bgStyle || (bgUrl ? { backgroundImage: `url('${bgUrl}')` } : undefined)
  const finalBgClassName = bgClassName || 'absolute inset-0 bg-cover bg-[center_30%]'

  return (
    <div className={`relative overflow-hidden border-b border-black/5 ${minHeight}`}>
      <div className={finalBgClassName} style={finalBgStyle} />

      <div className='absolute inset-0 bg-[var(--dt-hero-overlay)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,168,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(47,111,237,0.16),transparent_28%)]' />

      {hasGrain && (
        <div className='absolute inset-0 opacity-[0.03] bg-[url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")]' />
      )}

      <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--dt-bg-page)]/95 to-transparent' />

      <div className={containerClassName}>
        <div className='max-w-[760px] rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(16,27,47,0.84),rgba(16,27,47,0.62))] px-7 py-8 shadow-[0_24px_60px_rgba(8,15,30,0.28)] backdrop-blur-md lg:px-9 lg:py-10'>
          {eyebrow && <div className='mb-2'>{eyebrow}</div>}
          <h1 className='dt-font-heading mb-4 max-w-[660px] text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.08] text-white'>
            {title}
          </h1>

          <div className='mb-9 max-w-[560px] text-[15px] font-medium leading-[1.85] text-white'>{description}</div>

          {actions && <div className='mb-5 flex flex-wrap gap-3'>{actions}</div>}

          {children}
        </div>
      </div>
    </div>
  )
}
