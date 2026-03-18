import SectionHeader from '../shared/SectionHeader'

const HIGHLIGHTS = ['Guided activity stations', 'Lunch add-ons available', 'Flexible group scheduling']

export default function FieldTrips() {
  return (
    <>
      <SectionHeader
        eyebrow='Field Trips'
        title='Play-Filled Learning Days'
        desc='Bring your class, daycare, or community group for a safe, structured outing with hands-on fun.'
      />

      <div className='rounded-[16px] border border-[var(--dt-border)] bg-[var(--dt-bg-card)] p-6 grid grid-cols-[1.3fr_1fr] gap-5 max-md:grid-cols-1'>
        <div>
          <h3 className='dt-font-heading text-[24px] font-black text-[var(--dt-dark)] leading-[1.2] mb-2.5'>
            Perfect for Schools, Camps & Daycares
          </h3>
          <p className='text-[var(--dt-text-muted)] text-[14px] leading-[1.7]'>
            Our field trips combine active play with social development, imaginative stations, and age-appropriate
            challenges.
          </p>
          <ul className='mt-4 pl-5 text-[var(--dt-text-body)] text-[14px] leading-[1.8] list-disc'>
            {HIGHLIGHTS.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Info box */}
        <div className='rounded-[14px] p-4 bg-[var(--dt-dark)] text-white flex flex-col justify-between gap-3.5'>
          <div>
            <p className='text-[11px] tracking-[0.12em] uppercase opacity-80 m-0'>Group Booking</p>
            <p className='mt-2 text-[24px] font-black'>Starting at $10 / child</p>
          </div>
          <a
            href='/book?service=field-trips'
            className='inline-flex justify-center items-center rounded-[10px] px-4 py-3 no-underline font-bold text-[13px] bg-[var(--dt-teal-dark)] text-white hover:bg-[var(--dt-teal)] transition-colors duration-150'
          >
            Request Availability
          </a>
        </div>
      </div>
    </>
  )
}
