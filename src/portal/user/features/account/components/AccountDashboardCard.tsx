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
        'group relative overflow-hidden rounded-2xl border border-[var(--dt-border)] bg-white/80 p-5 no-underline',
        'shadow-[0_14px_38px_rgba(15,29,53,0.08)] backdrop-blur-xl transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-[rgba(47,111,237,0.28)] hover:shadow-[0_20px_52px_rgba(47,111,237,0.14)]',
        'focus:outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]',
      ].join(' ')}
    >
      <div
        aria-hidden
        className='pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(47,111,237,0.10)] blur-2xl transition group-hover:bg-[rgba(47,111,237,0.16)]'
      />
      <div className='flex items-start justify-between gap-3'>
        <div>
          <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>{label}</div>
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

