import type { WeBringServicesGridProps } from './types'

export default function WeBringServicesGrid({ services, images }: WeBringServicesGridProps) {
  return (
    <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2'>
      {services.map((label, i) => (
        <div key={label} className='relative rounded-[16px] overflow-hidden h-[170px] border border-white/10'>
          <img src={images[i]} alt={label} className='w-full h-full object-cover block' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/75 to-transparent' />
          <span className='absolute left-2.5 right-2.5 bottom-2 text-[13px] font-bold text-white leading-[1.35]'>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
