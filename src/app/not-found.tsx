export default function NotFound() {
  return (
    <div className='mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-5 py-14 text-center'>
      <div className='text-xs font-black uppercase tracking-widest text-gray-400'>404</div>
      <h1 className='mt-2 text-3xl font-black tracking-tight text-gray-900'>Page not found</h1>
      <p className='mt-2 text-sm text-gray-600'>The page you are looking for does not exist.</p>
    </div>
  )
}

