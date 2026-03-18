import React from 'react'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col items-center justify-center'>
        {children}
        <label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>
          Open drawer
        </label>
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
        <div className='flex flex-col gap-2 p-4 w-80 min-h-full bg-base-200 text-base-content '>
          {/* Sidebar content here */}
          {/* <LangBtn />
          <ThemeBtn /> */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
