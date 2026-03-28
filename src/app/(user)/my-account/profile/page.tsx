'use client'

import FormWrapper from '@/components/ui/FormWrapper'
import AccountShell from '@/portal/user/features/account/components/AccountShell'
import { useMyProfile, useUpdateMyProfile } from '@/portal/user/features/account/hooks/useMyProfile'
import { useForm } from 'react-hook-form'
import { CommunicationChannel } from '@/types/clients.shared'

export default function MyAccountProfilePage() {
  const profileQuery = useMyProfile()
  const updateProfile = useUpdateMyProfile()
  const profile = profileQuery.data
  const { register, handleSubmit } = useForm({
    values: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
      gender: profile?.gender ?? '',
      preferredChannel: profile?.preferredChannel ?? CommunicationChannel.EMAIL,
      marketingOptIn: profile?.marketingOptIn ?? false,
    },
  })

  return (
    <AccountShell title='Profile' subtitle='Keep your contact details and preferences up to date.'>
      <FormWrapper
        title='Profile details'
        description='This information helps us personalize updates and reach you if we need to.'
        submitLabel={updateProfile.isPending ? 'Saving…' : 'Save changes'}
        isLoading={updateProfile.isPending}
        onSubmit={e => {
          e.preventDefault()
          void handleSubmit(values => {
            updateProfile.mutate({
              firstName: values.firstName,
              lastName: values.lastName,
              phone: values.phone || null,
              address: values.address || null,
              gender: values.gender || null,
              preferredChannel: values.preferredChannel as CommunicationChannel,
              marketingOptIn: !!values.marketingOptIn,
            })
          })(e)
        }}
        twoColumn
      >
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>First name</span>
          <input
            {...register('firstName')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            placeholder='First name'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Last name</span>
          <input
            {...register('lastName')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            placeholder='Last name'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Phone</span>
          <input
            {...register('phone')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            placeholder='Phone'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Address</span>
          <input
            {...register('address')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            placeholder='Address'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Gender</span>
          <input
            {...register('gender')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            placeholder='Optional'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Preferred channel</span>
          <select
            {...register('preferredChannel')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
          >
            {Object.values(CommunicationChannel).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className='md:col-span-2'>
          <label className='flex items-center justify-between gap-4 rounded-xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] px-4 py-3'>
            <div>
              <div className='text-[13px] font-black text-[var(--dt-navy)]'>Marketing updates</div>
              <div className='text-[13px] text-[var(--dt-text-body)]'>Get occasional emails about new programs and offers.</div>
            </div>
            <input
              type='checkbox'
              {...register('marketingOptIn')}
              className='h-5 w-5 accent-[var(--dt-primary)]'
              aria-label='Marketing opt-in'
            />
          </label>
        </div>
      </FormWrapper>
    </AccountShell>
  )
}

