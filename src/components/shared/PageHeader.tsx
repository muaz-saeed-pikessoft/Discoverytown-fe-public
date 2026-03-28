import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
      <div>
        <h1 className='text-2xl font-black tracking-tight text-gray-900'>{title}</h1>
        {subtitle ? <p className='mt-1 text-sm text-gray-500'>{subtitle}</p> : null}
      </div>
      {actions ? <div className='flex items-center gap-2 sm:mt-1'>{actions}</div> : null}
    </div>
  )
}

