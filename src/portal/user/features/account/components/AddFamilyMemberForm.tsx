'use client'

import { useForm } from 'react-hook-form'

interface AddFamilyMemberFormProps {
  onSubmit: (values: {
    firstName: string
    lastName: string
    dob: string
    allergies: string[]
    emergencyContact: { name: string; phone: string; relation: string }
    schoolName?: string
  }) => void
}

export default function AddFamilyMemberForm({ onSubmit }: AddFamilyMemberFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: { firstName: '', lastName: '', dob: '', allergies: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '', schoolName: '' },
  })

  return (
    <form
      className='space-y-4'
      onSubmit={handleSubmit(values =>
        onSubmit({
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          allergies: String(values.allergies)
            .split(',')
            .map(v => v.trim())
            .filter(Boolean),
          emergencyContact: {
            name: values.emergencyName,
            phone: values.emergencyPhone,
            relation: values.emergencyRelation,
          },
          schoolName: values.schoolName || undefined,
        })
      )}
    >
      <div className='grid gap-3 md:grid-cols-2'>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>First name</span>
          <input
            {...register('firstName')}
            placeholder='First name'
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Last name</span>
          <input
            {...register('lastName')}
            placeholder='Last name'
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
          />
        </label>
      </div>

      <div className='grid gap-3 md:grid-cols-2'>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Date of birth</span>
          <input
            type='date'
            {...register('dob')}
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
          />
        </label>
        <label className='grid gap-1'>
          <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>School (optional)</span>
          <input
            {...register('schoolName')}
            placeholder='School name'
            className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
          />
        </label>
      </div>

      <label className='grid gap-1'>
        <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Allergies (comma-separated)</span>
        <input
          {...register('allergies')}
          placeholder='Peanuts, dairy, etc.'
          className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
        />
      </label>

      <div className='rounded-2xl border border-[var(--dt-border)] bg-[var(--dt-bg-page)] p-4'>
        <div className='text-[13px] font-black text-[var(--dt-navy)]'>Emergency contact</div>
        <div className='mt-3 grid gap-3 md:grid-cols-2'>
          <label className='grid gap-1'>
            <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Name</span>
            <input
              {...register('emergencyName')}
              placeholder='Full name'
              className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            />
          </label>
          <label className='grid gap-1'>
            <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Phone</span>
            <input
              {...register('emergencyPhone')}
              placeholder='Phone number'
              className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            />
          </label>
          <label className='grid gap-1 md:col-span-2'>
            <span className='text-[11px] font-black uppercase tracking-[0.14em] text-[var(--dt-text-muted)]'>Relation</span>
            <input
              {...register('emergencyRelation')}
              placeholder='Parent, guardian, etc.'
              className='h-11 w-full rounded-xl border border-[var(--dt-border)] bg-white px-3 text-[15px] font-semibold text-[var(--dt-navy)] outline-none focus:ring-4 focus:ring-[rgba(47,111,237,0.16)]'
            />
          </label>
        </div>
      </div>

      <div className='flex justify-end'>
        <button type='submit' className='dt-btn-primary px-6 py-2.5'>
          Save family member
        </button>
      </div>
    </form>
  )
}

