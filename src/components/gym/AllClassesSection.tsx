import type { AllClassesSectionProps } from './types'
import ClassCard from './ClassCard'
import type { AgeGroup } from './types'

export default function AllClassesSection({ groups }: AllClassesSectionProps) {
  return (
    <>
      {groups.map(group => (
        <div key={group.id} className='mb-10 last:mb-0'>
          {/* Group label pill */}
          <div
            className='mb-5 inline-flex items-center gap-2 rounded-full border-[1.5px] px-[18px] py-2 text-[13px] font-black'
            style={{ background: group.color.bg, borderColor: group.color.border, color: group.color.text }}
          >
            {group.label}
            <span className='opacity-70 font-bold'>· {group.range}</span>
          </div>

          <div className='grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-md:grid-cols-1'>
            {group.classes.map(gymClass => (
              <ClassCard
                key={`${group.id}-${gymClass.name}`}
                gymClass={gymClass}
                accent={group.color.accent}
                border={group.color.border}
                bg={group.color.bg}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
