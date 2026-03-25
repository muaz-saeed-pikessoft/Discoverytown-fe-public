'use client'

import { useQuery } from '@tanstack/react-query'
import type { AccountTab } from './types'
import { getBookings } from '@/api/bookingApi'
import { MOCK_BOOKINGS, MOCK_PROFILE } from '@/data/mockData'
import type { RootState } from '@/store/store'
import type { BookingRecord } from '@/types/booking-types'
import type { ProfileEditValues } from '@/types/form-types'
import { formatShortDate } from '@/utils/formatters'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import BookingTable from './BookingTable'

const profileSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
})

export default function MyAccountPageClient() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState<AccountTab>('upcoming')
  const [cancelTarget, setCancelTarget] = useState<BookingRecord | null>(null)
  const cancelModalRef = useRef<HTMLDialogElement>(null)
  const profileModalRef = useRef<HTMLDialogElement>(null)

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['user', 'bookings'],
    queryFn: () => getBookings({ order: 'desc' }),
    enabled: isAuthenticated
  })

  // Extract first/last from name for the form
  const nameParts = (user?.name || '').split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileEditValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: firstName || MOCK_PROFILE.firstName,
      lastName: lastName || MOCK_PROFILE.lastName,
      email: user?.email || MOCK_PROFILE.email,
      phone: MOCK_PROFILE.phone,
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'waitlisted')
  const historyBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  function openCancelModal(booking: BookingRecord) {
    setCancelTarget(booking)
    cancelModalRef.current?.showModal()
  }

  function confirmCancel() {
    cancelModalRef.current?.close()
    toast.info(`Booking ${cancelTarget?.confirmationCode} has been cancelled.`)
    setCancelTarget(null)
  }

  function onProfileSave() {
    profileModalRef.current?.close()
    toast.success('Profile updated successfully!')
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='bg-base-100 border-b border-base-300 py-8'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-4'>
              <div className='avatar placeholder'>
                <div className='w-16 rounded-full bg-primary text-primary-content'>
                   <span className='text-xl font-bold'>
                    {user?.name?.[0] || 'U'}
                  </span>
                </div>
              </div>
              <div>
                <h1 className='text-2xl font-bold text-base-content'>
                  {user?.name || 'User Profile'}
                </h1>
                <div className='flex items-center gap-2 mt-0.5'>
                  <span
                    className={`badge badge-sm ${MOCK_PROFILE.membershipType === 'vip' ? 'badge-secondary' : MOCK_PROFILE.membershipType === 'member' ? 'badge-primary' : 'badge-ghost'}`}
                  >
                    {MOCK_PROFILE.membershipType === 'vip'
                      ? '⭐ VIP Member'
                      : MOCK_PROFILE.membershipType === 'member'
                        ? 'Member'
                        : 'Standard'}
                  </span>
                  <span className='text-xs text-base-content/50'>
                    Since {formatShortDate(MOCK_PROFILE.memberSince)}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <Link href='/book' className='btn btn-primary btn-sm'>
                + Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='tabs tabs-boxed mb-6 bg-base-100'>
          {[
            { id: 'upcoming' as AccountTab, label: `Upcoming (${upcomingBookings.length})` },
            { id: 'history' as AccountTab, label: 'History' },
            { id: 'profile' as AccountTab, label: 'Profile' },
            { id: 'guests' as AccountTab, label: 'Family' },
          ].map(tab => (
            <button
              key={tab.id}
              type='button'
              className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id as AccountTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className='card card-bordered border-base-300 bg-base-100 shadow-sm'>
          <div className='card-body p-0 sm:p-4'>
            {isLoading ? (
               <div className='flex items-center justify-center py-20'>
                  <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
               </div>
            ) : (
               <>
                  {activeTab === 'upcoming' && (
                    <BookingTable bookings={upcomingBookings} activeTab={activeTab} openCancelModal={openCancelModal} />
                  )}
                  {activeTab === 'history' && <BookingTable bookings={historyBookings} activeTab={activeTab} />}

                  {activeTab === 'profile' && (
                    <div className='p-4 sm:p-0'>
                      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <div>
                          <h2 className='mb-4 text-lg font-bold text-base-content'>Personal Information</h2>
                          <div className='space-y-3 text-sm'>
                            <div className='flex justify-between border-b border-base-200 pb-2'>
                              <span className='text-base-content/60'>Name</span>
                              <span className='font-medium'>
                                {user?.name}
                              </span>
                            </div>
                            <div className='flex justify-between border-b border-base-200 pb-2'>
                              <span className='text-base-content/60'>Email</span>
                              <span className='font-medium'>{user?.email}</span>
                            </div>
                            <div className='flex justify-between border-b border-base-200 pb-2'>
                              <span className='text-base-content/60'>Phone</span>
                              <span className='font-medium'>{MOCK_PROFILE.phone}</span>
                            </div>
                            <div className='flex justify-between border-b border-base-200 pb-2'>
                              <span className='text-base-content/60'>Membership</span>
                              <span className='font-medium capitalize'>{MOCK_PROFILE.membershipType}</span>
                            </div>
                          </div>
                          <button
                            className='btn btn-outline btn-sm mt-4'
                            type='button'
                            onClick={() => profileModalRef.current?.showModal()}
                          >
                            Edit Profile
                          </button>
                        </div>

                        <div>
                          <h2 className='mb-4 text-lg font-bold text-base-content'>Account Statistics</h2>
                          <div className='grid grid-cols-2 gap-3'>
                            <div className='stat rounded-xl bg-base-200 p-4'>
                              <div className='stat-title text-xs'>Total Bookings</div>
                              <div className='stat-value text-2xl'>{bookings.length}</div>
                            </div>
                            <div className='stat rounded-xl bg-base-200 p-4'>
                              <div className='stat-title text-xs'>Upcoming</div>
                              <div className='stat-value text-2xl'>{upcomingBookings.length}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
               </>
            )}

            {activeTab === 'guests' && (
              <div className='p-4 sm:p-0'>
                <div className='mb-4 flex items-center justify-between'>
                  <h2 className='text-lg font-bold text-base-content'>My Children</h2>
                  <button
                    className='btn btn-outline btn-sm'
                    type='button'
                    onClick={() => toast.info('Add child feature coming soon!')}
                  >
                    + Add Child
                  </button>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {MOCK_PROFILE.children.map(child => {
                    const age = Math.floor(
                      (new Date().getTime() - new Date(child.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
                    )

                    return (
                      <div key={child.id} className='rounded-xl border border-base-300 bg-base-200 p-4'>
                        <div className='flex items-center gap-3'>
                          <div className='avatar placeholder'>
                            <div className='w-10 rounded-full bg-accent text-accent-content text-sm font-bold'>
                              <span>{child.name[0]}</span>
                            </div>
                          </div>
                          <div>
                            <p className='font-bold text-base-content'>{child.name}</p>
                            <p className='text-xs text-base-content/60'>
                              Age {age} · Born {formatShortDate(child.dob)}
                            </p>
                          </div>
                        </div>
                        <div className='mt-3 space-y-1 text-sm'>
                          <p className='text-base-content/60'>
                            <span className='font-medium'>Allergies:</span> {child.allergies || 'None'}
                          </p>
                          {child.notes && (
                            <p className='text-base-content/60'>
                              <span className='font-medium'>Notes:</span> {child.notes}
                            </p>
                          )}
                        </div>
                        <button
                          className='btn btn-ghost btn-xs mt-3'
                          type='button'
                          onClick={() => toast.info('Edit child feature coming soon!')}
                        >
                          Edit
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <dialog ref={cancelModalRef} className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold text-error'>Cancel Booking</h3>
          {cancelTarget && (
            <p className='mt-2 text-base-content/70'>
              Are you sure you want to cancel <strong>{cancelTarget.title}</strong> on{' '}
              {formatShortDate(cancelTarget.date)}? This action cannot be undone.
            </p>
          )}
          <div className='modal-action'>
            <button className='btn btn-ghost' type='button' onClick={() => cancelModalRef.current?.close()}>
              Keep Booking
            </button>
            <button className='btn btn-error' type='button' onClick={confirmCancel}>
              Yes, Cancel
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button type='submit'>close</button>
        </form>
      </dialog>

      <dialog ref={profileModalRef} className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='mb-4 text-lg font-bold'>Edit Profile</h3>
          <form onSubmit={handleSubmit(onProfileSave)} noValidate>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='form-control'>
                <label className='label' htmlFor='prof-firstName'>
                  <span className='label-text text-sm font-medium'>First name</span>
                </label>
                <input
                  id='prof-firstName'
                  type='text'
                  className={`input input-bordered input-sm w-full ${errors.firstName ? 'input-error' : ''}`}
                  {...register('firstName')}
                />
                {errors.firstName && <span className='mt-0.5 text-xs text-error'>{errors.firstName.message}</span>}
              </div>
              <div className='form-control'>
                <label className='label' htmlFor='prof-lastName'>
                  <span className='label-text text-sm font-medium'>Last name</span>
                </label>
                <input
                  id='prof-lastName'
                  type='text'
                  className={`input input-bordered input-sm w-full ${errors.lastName ? 'input-error' : ''}`}
                  {...register('lastName')}
                />
                {errors.lastName && <span className='mt-0.5 text-xs text-error'>{errors.lastName.message}</span>}
              </div>
              <div className='form-control sm:col-span-2'>
                <label className='label' htmlFor='prof-email'>
                  <span className='label-text text-sm font-medium'>Email</span>
                </label>
                <input
                  id='prof-email'
                  type='email'
                  className={`input input-bordered input-sm w-full ${errors.email ? 'input-error' : ''}`}
                  {...register('email')}
                />
                {errors.email && <span className='mt-0.5 text-xs text-error'>{errors.email.message}</span>}
              </div>
              <div className='form-control sm:col-span-2'>
                <label className='label' htmlFor='prof-phone'>
                  <span className='label-text text-sm font-medium'>Phone</span>
                </label>
                <input
                  id='prof-phone'
                  type='tel'
                  className={`input input-bordered input-sm w-full ${errors.phone ? 'input-error' : ''}`}
                  {...register('phone')}
                />
                {errors.phone && <span className='mt-0.5 text-xs text-error'>{errors.phone.message}</span>}
              </div>
            </div>

            <div className='modal-action'>
              <button className='btn btn-ghost' type='button' onClick={() => profileModalRef.current?.close()}>
                Cancel
              </button>
              <button className='btn btn-primary' type='submit' disabled={isSubmitting}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button type='submit'>close</button>
        </form>
      </dialog>
    </div>
  )
}
