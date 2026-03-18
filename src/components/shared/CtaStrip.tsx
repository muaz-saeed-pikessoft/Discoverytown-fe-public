import type { CtaStripProps } from './types'
import Link from 'next/link'

/**
 * Reusable dark bottom-of-section CTA strip.
 * Used consistently across Play, Events, Gym, Rentals, Gifts, Shop, Learn pages.
 */
export default function CtaStrip({
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  primaryColor = 'var(--dt-teal)',
  secondaryHref,
  secondaryLabel,
}: CtaStripProps) {
  return (
    <div className='dt-glass-dark mt-7 flex items-center justify-between rounded-[20px] px-6 py-6 flex-wrap gap-4'>
      <div>
        <p className='text-[18px] font-extrabold text-white mb-1'>{title}</p>
        {subtitle && (
          <p className='text-[13px] text-white/64'>{subtitle}</p>
        )}
      </div>

      <div className='flex gap-2.5'>
        <Link
          href={primaryHref}
          className='inline-flex items-center justify-center rounded-xl px-5 py-3 text-[13px] font-black text-white no-underline transition-all duration-150 hover:-translate-y-px'
          style={{ background: primaryColor }}
        >
          {primaryLabel}
        </Link>

        {secondaryHref && secondaryLabel && (
          <Link
            href={secondaryHref}
            className='inline-flex items-center justify-center rounded-xl bg-transparent px-5 py-3 text-[13px] font-bold text-white no-underline border-[1.5px] border-white/22 hover:border-white/45 transition-colors duration-150'
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
