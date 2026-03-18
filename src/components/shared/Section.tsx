import type { SectionProps } from './types'

import type { PropsWithChildren } from 'react'

export default function Section({  id, children }: SectionProps) {

  return (
    <section
      id={id}
      className='dt-surface mb-10 scroll-mt-[120px] rounded-[28px] px-7 py-8 lg:px-9 lg:py-10'
    >
      {children}
    </section>
  )
}
