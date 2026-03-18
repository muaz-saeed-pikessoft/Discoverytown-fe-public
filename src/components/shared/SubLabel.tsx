import type { SubLabelProps } from './types'

export default function SubLabel({ text }: SubLabelProps) {
  return (
    <div className='flex items-center gap-3 mb-4 mt-7'>
      <span className='dt-sub-label'>{text}</span>
      <div className='flex-1 h-px bg-[var(--dt-border)]' />
    </div>
  )
}
