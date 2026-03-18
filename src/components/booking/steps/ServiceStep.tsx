import BookingStepHeader from '../BookingStepHeader'
import ServiceTile from '../ServiceTile'
import type { BookingServiceStepProps } from '../types'
import { BookingStepIndex } from '../types'

export default function ServiceStep({ booking, services, update, setStep }: BookingServiceStepProps) {
  return (
    <div className='step-panel dt-surface rounded-[28px] p-6 lg:p-8'>
      <BookingStepHeader
        eyebrow="Let's get started"
        title='What brings you in today?'
        sub='Choose a service to see options, pricing, and availability.'
      />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {services.map((service, index) => (
          <ServiceTile
            key={service.id}
            service={service}
            selected={booking.service === service.id}
            delay={index * 50}
            onClick={() => {
              update({ service: service.id, option: null, addons: [] })
              setStep(BookingStepIndex.Package)
            }}
          />
        ))}
      </div>
    </div>
  )
}
