import type { AgeGroupPanelProps } from './types'
import ClassCard from './ClassCard'
import type { AgeGroup } from './types'

export default function AgeGroupPanel({ group }: AgeGroupPanelProps) {
  const tracks = Array.from(new Set(group.classes.map(c => c.track).filter(Boolean))) as string[]

  return (
    <div className='overflow-hidden rounded-[20px] border-[1.5px] border-[var(--dt-border)] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)]'>
      {/* Header with image */}
      <div className='grid grid-cols-[1fr_280px] max-md:grid-cols-1 border-b border-[var(--dt-border)]'>
        <div className='px-7 py-7 flex flex-col justify-center'>
          <div className='flex items-center gap-3 mb-3'>
            <span
              className='inline-block rounded-full px-3.5 py-[4px] text-[11px] font-black uppercase tracking-[0.1em]'
              style={{
                background: group.color.bg,
                color: group.color.text,
                border: `1.5px solid ${group.color.border}`,
              }}
            >
              {group.range}
            </span>
          </div>
          <h3 className='dt-font-heading text-[26px] font-black text-[var(--dt-dark)] mb-2'>{group.label}</h3>
          <p className='text-[13px] font-semibold text-[var(--dt-text-muted)] mb-0'>Focus: {group.focus}</p>

          {group.note && (
            <div className='mt-4 flex items-start gap-2.5 rounded-[12px] border border-[var(--dt-border)] bg-[var(--dt-bg-page)] px-4 py-3 text-[13px] font-bold text-[var(--dt-text-muted)]'>
              <span className='mt-[2px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--dt-teal-dark)]' />
              {group.note}
            </div>
          )}
        </div>

        <div className='h-[200px] max-md:h-[180px] overflow-hidden'>
          <img src={group.img} alt={group.label} className='w-full h-full object-cover' />
        </div>
      </div>

      {/* Classes */}
      <div className='px-7 py-7'>
        {tracks.length > 0 ? (
          tracks.map(track => (
            <div key={track} className='mb-7 last:mb-0'>
              <div className='flex items-center gap-3 mb-4'>
                <span className='dt-sub-label'>{track}</span>
                <div className='flex-1 h-px bg-[var(--dt-border)]' />
              </div>
              <div className='grid grid-cols-2 gap-3.5 max-md:grid-cols-1'>
                {group.classes
                  .filter(c => c.track === track)
                  .map(gymClass => (
                    <ClassCard
                      key={gymClass.name}
                      gymClass={gymClass}
                      accent={group.color.accent}
                      border={group.color.border}
                      bg={group.color.bg}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className='grid grid-cols-2 gap-3.5 max-md:grid-cols-1'>
            {group.classes.map(gymClass => (
              <ClassCard
                key={gymClass.name}
                gymClass={gymClass}
                accent={group.color.accent}
                border={group.color.border}
                bg={group.color.bg}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
