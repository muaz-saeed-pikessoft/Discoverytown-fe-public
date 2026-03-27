'use client'

import type { CreditLedgerEntry } from '@/types/clients.shared'

interface CreditLedgerTableProps {
  entries: CreditLedgerEntry[]
}

export default function CreditLedgerTable({ entries }: CreditLedgerTableProps) {
  return (
    <div className='overflow-x-auto rounded-3xl border border-[var(--dt-border)] bg-white/85 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
      <table className='min-w-full text-left text-[14px]'>
        <thead className='bg-[var(--dt-bg-page)] text-[11px] uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>
          <tr>
            <th className='px-4 py-3'>Date</th>
            <th className='px-4 py-3'>Type</th>
            <th className='px-4 py-3'>Change</th>
            <th className='px-4 py-3'>Balance</th>
            <th className='px-4 py-3'>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id} className='border-t border-[rgba(15,29,53,0.06)]'>
              <td className='px-4 py-3 text-[13px] font-semibold text-[var(--dt-text-body)]'>{new Date(entry.createdAt).toLocaleDateString()}</td>
              <td className='px-4 py-3 text-[13px] font-black text-[var(--dt-navy)]'>{entry.transactionType}</td>
              <td className='px-4 py-3 text-[13px] font-black text-[var(--dt-navy)]'>
                {entry.creditsChange > 0 ? `+${entry.creditsChange}` : entry.creditsChange}
              </td>
              <td className='px-4 py-3 text-[13px] font-semibold text-[var(--dt-text-body)]'>{entry.balanceAfter}</td>
              <td className='px-4 py-3 text-[13px] font-semibold text-[var(--dt-text-body)]'>{entry.notes ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

