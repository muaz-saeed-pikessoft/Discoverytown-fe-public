export default function ActivityDetailLoading() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='grid gap-6 lg:grid-cols-[1.6fr_1fr]'>
        <div className='space-y-4'>
          <div className='aspect-[16/9] w-full animate-pulse rounded-2xl bg-base-300' />
          <div className='h-8 w-3/4 animate-pulse rounded bg-base-300' />
          <div className='h-4 w-2/3 animate-pulse rounded bg-base-300' />
          <div className='h-4 w-1/2 animate-pulse rounded bg-base-300' />
        </div>
        <div className='rounded-2xl border border-base-300 bg-base-100 p-4'>
          <div className='h-6 w-1/2 animate-pulse rounded bg-base-300' />
          <div className='mt-4 h-10 w-full animate-pulse rounded bg-base-300' />
          <div className='mt-2 h-10 w-full animate-pulse rounded bg-base-300' />
        </div>
      </div>
    </div>
  )
}

