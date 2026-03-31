'use client'

import Link from 'next/link'

interface AccountDashboardCardProps {
  label: string
  value: string
  href: string
  icon?: string
}

export default function AccountDashboardCard({ label, value, href, icon }: AccountDashboardCardProps) {
  return (
    <Link
      href={href}
      className={[
        'dt-card-interactive group relative overflow-hidden rounded-[20px] bg-[var(--dt-bg-card)] p-5 no-underline',
        'focus:outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]',
      ].join(' ')}
    >
      <div
        aria-hidden
        className='pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(47,111,237,0.10)] blur-2xl transition group-hover:bg-[rgba(47,111,237,0.16)]'
      />
      <div className='flex items-start justify-between gap-3'>
        <div>
          <div className='dt-eyebrow'>{label}</div>
          <div className='mt-2 text-[20px] font-black tracking-[-0.01em] text-[var(--dt-navy)]'>{value}</div>
        </div>
        {icon ? (
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] text-[18px]'>
            {icon}
          </div>
        ) : null}
      </div>
    </Link>
  )
}

