interface LoadingSkeletonProps {
  variant: 'table' | 'card' | 'form' | 'page'
  rows?: number
}

function SkeletonLine({ className }: { className: string }) {
  return <div className={['animate-pulse rounded-lg bg-gray-100', className].join(' ')} />
}

export default function LoadingSkeleton({ variant, rows = 6 }: LoadingSkeletonProps) {
  if (variant === 'table') {
    return (
      <div className='w-full overflow-hidden rounded-xl border border-gray-200 bg-white'>
        <div className='border-b border-gray-100 bg-gray-50 px-4 py-3'>
          <SkeletonLine className='h-3 w-40' />
        </div>
        <div className='divide-y divide-gray-100'>
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} className='flex items-center gap-4 px-4 py-3'>
              <SkeletonLine className='h-3 w-24' />
              <SkeletonLine className='h-3 w-40' />
              <SkeletonLine className='h-3 w-28' />
              <div className='ml-auto'>
                <SkeletonLine className='h-3 w-16' />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className='rounded-xl border border-gray-200 bg-white p-6'>
        <SkeletonLine className='h-4 w-40' />
        <SkeletonLine className='mt-3 h-3 w-full' />
        <SkeletonLine className='mt-2 h-3 w-3/4' />
        <SkeletonLine className='mt-8 h-10 w-32' />
      </div>
    )
  }

  if (variant === 'form') {
    return (
      <div className='rounded-xl border border-gray-200 bg-white p-6'>
        <SkeletonLine className='h-4 w-48' />
        <div className='mt-6 space-y-4'>
          <SkeletonLine className='h-10 w-full' />
          <SkeletonLine className='h-10 w-full' />
          <SkeletonLine className='h-10 w-full' />
        </div>
        <SkeletonLine className='mt-8 h-10 w-40' />
      </div>
    )
  }

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-8'>
      <SkeletonLine className='h-5 w-56' />
      <SkeletonLine className='mt-3 h-4 w-80' />
      <SkeletonLine className='mt-10 h-64 w-full' />
    </div>
  )
}

