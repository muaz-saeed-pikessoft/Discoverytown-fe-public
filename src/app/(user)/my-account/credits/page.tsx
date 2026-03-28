'use client'

import { useState } from 'react'

import AccountShell from '@/portal/user/features/account/components/AccountShell'
import AvailablePacksModal from '@/portal/user/features/account/components/AvailablePacksModal'
import CreditLedgerTable from '@/portal/user/features/account/components/CreditLedgerTable'
import CreditPackCard from '@/portal/user/features/account/components/CreditPackCard'
import { useAvailableCreditPacks, useMyCreditLedger, useMyCredits, usePurchaseMyPack } from '@/portal/user/features/account/hooks/useMyCredits'

export default function MyAccountCreditsPage() {
  const [open, setOpen] = useState(false)
  const creditsQuery = useMyCredits()
  const ledgerQuery = useMyCreditLedger()
  const packsQuery = useAvailableCreditPacks()
  const purchase = usePurchaseMyPack()

  const credits = creditsQuery.data
  const ledger = ledgerQuery.data?.data ?? []
  const packs = packsQuery.data ?? []

  return (
    <AccountShell
      title='Credits'
      subtitle='Track your credit balance, active packs, and purchase history.'
      actions={
        <button type='button' onClick={() => setOpen(true)} className='dt-btn-primary px-5 py-2.5'>
          Buy class pack
        </button>
      }
    >
      <div className='space-y-5'>
        <div className='rounded-3xl border border-[var(--dt-border)] bg-white/85 p-5 shadow-[0_16px_44px_rgba(15,29,53,0.08)] backdrop-blur-xl'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <div className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Current balance</div>
              <div className='mt-2 text-[28px] font-black tracking-[-0.02em] text-[var(--dt-navy)]'>{credits?.balance ?? '0'}</div>
            </div>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--dt-primary-light)] text-[22px]'>💳</div>
          </div>
        </div>

        <div className='grid gap-3 sm:grid-cols-2'>
          {(credits?.packs ?? []).map(pack => (
            <CreditPackCard key={pack.id} pack={pack} />
          ))}
        </div>

        <CreditLedgerTable entries={ledger} />

        <AvailablePacksModal
          open={open}
          onOpenChange={setOpen}
          packs={packs}
          onPurchase={packDefinitionId => {
            purchase.mutate({ packDefinitionId, input: { paymentMethodId: 'pm_mock_1' } })
            setOpen(false)
          }}
        />
      </div>
    </AccountShell>
  )
}

