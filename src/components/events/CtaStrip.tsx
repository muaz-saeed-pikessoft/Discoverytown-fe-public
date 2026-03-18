import type { CtaStripProps } from './types'
import Link from 'next/link'

export default function CtaStrip({
  title,
  subtitle,
  href,
  buttonText,
  gradientClassName,
  buttonTextColor,
}: CtaStripProps) {
  return (
    <div
      className={[
        'mt-7 flex items-center justify-between px-7 py-5 rounded-[14px] flex-wrap gap-4',
        gradientClassName ?? 'bg-[var(--dt-dark)]',
      ].join(' ')}
    >
      <div>
        <p className='text-[16px] font-extrabold text-white mb-1'>{title}</p>
        <p className='text-[13px] text-white/55'>{subtitle}</p>
      </div>
      <div className='flex gap-2.5'>
        <Link
          href={href}
          className='px-5 py-2.5 rounded-md bg-[var(--dt-teal)] text-white text-[13px] font-bold no-underline hover:bg-[var(--dt-teal-dark)] transition-colors duration-150'
          style={buttonTextColor ? { color: undefined } : {}}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}
