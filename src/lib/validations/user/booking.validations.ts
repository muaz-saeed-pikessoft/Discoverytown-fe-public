import * as yup from 'yup'

export const createBookingSchema = yup.object({
  slotId: yup.string().uuid('Invalid slot').required('Slot is required'),
  participantContactId: yup.string().uuid('Invalid participant').optional(),
  notes: yup.string().max(1000).optional(),
  addOns: yup
    .array(
      yup.object({
        addOnId: yup.string().uuid('Invalid add-on').required('Add-on is required'),
        quantity: yup.number().integer().min(1).required('Quantity is required'),
      }),
    )
    .optional(),
  couponCode: yup.string().max(60).optional(),
  useCredits: yup.boolean().optional(),
  acceptedWaiver: yup.boolean().optional(),
})

export const openBookingSchema = yup
  .object({
    serviceId: yup.string().min(1, 'Service is required').required('Service is required'),
    locationId: yup.string().min(1, 'Location is required').required('Location is required'),
    startAt: yup.string().required('Select a start time'),
    endAt: yup.string().required('Select an end time'),
    guestCount: yup.number().integer().min(1).optional(),
    participantContactId: yup.string().optional(),
    notes: yup.string().max(1000).optional(),
    addOns: yup
      .array(
        yup.object({
          addOnId: yup.string().min(1).required('Add-on is required'),
          quantity: yup.number().integer().min(1).required('Quantity is required'),
        }),
      )
      .optional(),
    couponCode: yup.string().max(60).optional(),
    useCredits: yup.boolean().optional(),
    acceptedWaiver: yup.boolean().optional(),
  })
  .test('end-after-start', 'End time must be after start time', value => {
    if (!value?.startAt || !value?.endAt) return true
    return new Date(value.endAt).getTime() > new Date(value.startAt).getTime()
  })

export const cancelBookingSchema = yup.object({
  reason: yup.string().min(1, 'Please provide a reason').max(1000).required('Please provide a reason'),
})

export const privateHireInquirySchema = yup.object({
  firstName: yup.string().min(1).max(100).required('First name is required'),
  lastName: yup.string().min(1).max(100).required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().max(30).required('Phone is required'),
  preferredDate: yup.string().required('Preferred date is required'),
  alternateDate: yup.string().optional(),
  guestCount: yup.number().integer().min(1).required('Guest count is required'),
  notes: yup.string().max(1000).optional(),
  serviceId: yup.string().uuid('Invalid service').required('Service is required'),
  locationId: yup.string().uuid('Invalid location').required('Location is required'),
})

