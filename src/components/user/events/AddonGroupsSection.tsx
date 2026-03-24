import type { AddonGroupsSectionProps } from './types'
import AddonCard from './AddonCard'
import type { AddonGroup } from './types'

export default function AddonGroupsSection({ groups }: AddonGroupsSectionProps) {
  return (
    <>
      {groups.map(group => (
        <div key={group.title} id={group.anchor} className='mb-8 scroll-mt-[140px] last:mb-0'>
          <div className='flex items-center gap-3 mb-4 mt-7'>
            <span className='dt-sub-label'>{group.title}</span>
            <div className='flex-1 h-px bg-[var(--dt-border)]' />
          </div>
          <div className='grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-sm:grid-cols-1'>
            {group.items.map(item => (
              <AddonCard
                key={item.name}
                item={item}
                border={group.border}
                bg={group.bg}
                priceBg={group.priceBg}
                priceColor={group.priceColor}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
