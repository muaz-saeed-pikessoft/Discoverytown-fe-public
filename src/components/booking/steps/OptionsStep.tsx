import BackButton from '../BackButton'
import BookingStepHeader from '../BookingStepHeader'
import NextButton from '../NextButton'
import OptionTile from '../OptionTile'
import type { BookingOptionsStepProps } from '../types'
import { BookingStepIndex } from '../types'

export default function OptionsStep({
  booking,
  service,
  accent,
  accentHex,
  update,
  setStep,
  toggleAddon,
}: BookingOptionsStepProps) {
  return (
    <div className='step-panel dt-surface rounded-[28px] p-6 lg:p-8'>
      <BackButton onClick={() => setStep(BookingStepIndex.Service)} />
      <BookingStepHeader
        eyebrow={service.label}
        title='Pick your package'
        sub='Select the option that best fits your needs — you can always update it later.'
        accentColor={accent}
      />

      <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {service.options.map(option => (
          <OptionTile
            key={option.slug}
            option={option}
            selected={booking.option === option.slug}
            accentColor={accent}
            accentHex={accentHex}
            onClick={() => update({ option: option.slug })}
          />
        ))}
      </div>

      {service.addons.length > 0 && (
        <div className='dt-surface mb-6 rounded-[22px] p-6'>
          <p className='mb-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--dt-text-subtle)]'>
            Optional Add-Ons
          </p>
          <div className='flex flex-wrap gap-2.5'>
            {service.addons.map(addon => {
              const selected = booking.addons.includes(addon)

              return (
                <button
                  key={addon}
                  type='button'
                  onClick={() => toggleAddon(addon)}
                  className='cursor-pointer rounded-full border-[1.5px] px-4 py-2 text-[13px] font-extrabold transition-all duration-150'
                  style={{
                    borderColor: selected ? accentHex : 'var(--dt-border)',
                    background: selected ? `${accentHex}14` : 'white',
                    color: selected ? accentHex : 'var(--dt-text-muted)',
                  }}
                >
                  {selected ? '✓ ' : '+ '}
                  {addon}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <NextButton
        label='Continue to Date & Time'
        disabled={!booking.option}
        accentHex={accentHex}
        onClick={() => setStep(BookingStepIndex.DateTime)}
      />
    </div>
  )
}
