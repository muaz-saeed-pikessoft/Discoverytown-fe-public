import React, { memo, useEffect } from 'react'

// import Sidebar from './sidebar'
// import { useRouter } from 'next/router'
// import { useDispatch, useSelector } from 'react-redux'
// import { useQuery } from '@tanstack/react-query'
// import { meAuth } from '@/api/users'
// import { logout } from '@/store/slices/authSlice'

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter()
  // const dispatch = useDispatch()
  // const { isAuthenticated } = useSelector((state: any) => state.auth)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isAuthenticated, router])

  // const { isLoading, isError } = useQuery({
  //   queryKey: ['meAuth'],
  //   queryFn: meAuth,
  //   retry: false,
  // })
  // useEffect(() => {
  //   if (isError) {
  //     dispatch(logout())
  //     router.push('/login')
  //   }
  // }, [isError, dispatch, router])

  // return <div>Loading...</div>

  // return <Sidebar>{children}</Sidebar>
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>{children}</main>
    </div>
  )
}

export default memo(Layout)
