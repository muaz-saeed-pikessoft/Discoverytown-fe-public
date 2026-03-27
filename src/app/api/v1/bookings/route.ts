import { NextResponse } from 'next/server'

import { myBookings, publicServices, publicSlots } from '@/app/api/v1/_publicMockDb'
import { BookingMode, BookingSource, BookingStatus, BookingType, PaymentGateway } from '@/types/scheduling.shared'
import type { Booking } from '@/types/scheduling.shared'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as {
    slotId?: string
    serviceId?: string
    locationId?: string
    startAt?: string
    endAt?: string
    guestCount?: number
  }

  const isOpenBooking = !body.slotId && !!(body.serviceId && body.locationId && body.startAt && body.endAt)

  if (isOpenBooking) {
    const svc = publicServices.find(s => s.id === body.serviceId)
    if (!svc) return NextResponse.json({ message: 'Invalid serviceId' }, { status: 400 })
    if ((svc.bookingMode ?? BookingMode.SCHEDULED) !== BookingMode.OPEN) {
      return NextResponse.json({ message: 'Service is not open-booking enabled' }, { status: 400 })
    }

    const created: Booking = {
      id: `bk-open-${Date.now()}`,
      tenantId: 'tenant-mock-1',
      bookingType: svc.serviceType === 'OPEN_PLAY' ? BookingType.OPEN_PLAY : BookingType.CLASS,
      serviceSlotId: null,
      serviceId: svc.id,
      service: {
        id: svc.id,
        tenantId: 'tenant-mock-1',
        locationId: body.locationId ?? null,
        categoryId: svc.categoryId,
        category: svc.category as any,
        serviceType: svc.serviceType as any,
        bookingMode: svc.bookingMode ?? BookingMode.OPEN,
        name: svc.name,
        description: svc.description ?? null,
        durationMinutes: svc.durationMinutes,
        capacity: 0,
        basePrice: svc.basePrice,
        subscriptionPrice: svc.subscriptionPrice ?? null,
        requiresWaiver: false,
        ageMin: svc.ageMin ?? null,
        ageMax: svc.ageMax ?? null,
        isActive: true,
        minDurationMinutes: (svc as any).minDurationMinutes ?? 60,
        maxDurationMinutes: (svc as any).maxDurationMinutes ?? null,
        slotIncrementMinutes: (svc as any).slotIncrementMinutes ?? 30,
        maxConcurrent: (svc as any).maxConcurrent ?? 10,
        minAdvanceHours: (svc as any).minAdvanceHours ?? 0,
        maxAdvanceHours: (svc as any).maxAdvanceHours ?? 720,
        metadata: svc.metadata ?? {},
        createdAt: new Date().toISOString(),
        deletedAt: null,
      },
      contactId: 'contact-1',
      contact: { id: 'contact-1', firstName: 'Test', lastName: 'User' },
      participantContactId: null,
      participantContact: null,
      locationId: body.locationId!,
      status: BookingStatus.CONFIRMED,
      startAt: body.startAt!,
      endAt: body.endAt!,
      guestCount: body.guestCount ?? 1,
      totalAmount: svc.basePrice,
      depositAmount: null,
      balanceDue: '0.00',
      paymentReferenceId: null,
      paymentGateway: PaymentGateway.CASH,
      cancelledAt: null,
      cancellationReason: null,
      checkedInAt: null,
      notes: null,
      metadata: {},
      source: BookingSource.ONLINE,
      addOns: [],
      internalNotes: null,
    }

    myBookings.unshift(created)
    return NextResponse.json(created, { status: 201 })
  }

  const slot = publicSlots.find(s => s.id === body.slotId)
  if (!slot) return NextResponse.json({ message: 'Invalid slotId' }, { status: 400 })

  const created: Booking = {
    id: `bk-public-${Date.now()}`,
    tenantId: 'tenant-mock-1',
    bookingType: BookingType.CLASS,
    serviceSlotId: slot.id,
    serviceId: slot.serviceId,
    service: myBookings[0]?.service ?? ({} as Booking['service']),
    contactId: 'contact-1',
    contact: { id: 'contact-1', firstName: 'Test', lastName: 'User' },
    participantContactId: null,
    participantContact: null,
    locationId: slot.locationId,
    status: BookingStatus.CONFIRMED,
    startAt: slot.startAt,
    endAt: slot.endAt,
    guestCount: 1,
    totalAmount: slot.effectivePrice,
    depositAmount: null,
    balanceDue: '0.00',
    paymentReferenceId: null,
    paymentGateway: PaymentGateway.CASH,
    cancelledAt: null,
    cancellationReason: null,
    checkedInAt: null,
    notes: null,
    metadata: {},
    source: BookingSource.ONLINE,
    addOns: [],
    internalNotes: null,
  }
  myBookings.unshift(created)
  return NextResponse.json(created, { status: 201 })
}

