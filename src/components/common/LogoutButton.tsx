'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { logout } from '@/store/slices/authSlice'
import { deleteCookie } from '@/utils/cookie-setting'

const LogoutBtn = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(logout())
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    router.push('/login')
  }

  // const getI18NS = useMemo(() => {
  //   return translationKeys.LOGIN
  // }, [])

  return (
    <button
      className='btn btn-outline w-32 mx-1'
      onClick={handleClick}
      type='button'
      data-testid='logout-btn'
      title='Logout'
    >
      Logout
    </button>
  )
}

export default LogoutBtn
