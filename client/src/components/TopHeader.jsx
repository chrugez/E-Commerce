import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
import { getCurrent } from '../store/user/asyncActions'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../ultils/icons'
import { logout } from '../store/user/userSlice'

const { FiLogOut } = icons

const TopHeader = () => {

  const dispatch = useDispatch()
  const { isLoggedIn, current } = useSelector(state => state.user)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent())
    }, 300)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [dispatch, isLoggedIn])
  return (
    <div className='h-[38px] bg-main w-full flex justify-center items-center'>
      <div className='w-main flex items-center justify-between text-xs text-white'>
        <span>ORDER ONLINE OR CALL US (+84) 365892986</span>
        {isLoggedIn
          ? <div className='flex items-center gap-2'>
            <span>Welcome</span>
            <span className='font-semibold text-[14px]'>{current?.lastName} {current?.firstName}</span>
            <span
              className='hover:bg-white hover:text-main hover:rounded-md cursor-pointer p-2'
              onClick={() => dispatch(logout())}
            >
              <FiLogOut size={18} />
            </span>
          </div>
          : <Link to={`/${path.LOGIN}`} className='hover:text-black'>Sign In Or Create Account</Link>}
      </div>
    </div>
  )
}

export default memo(TopHeader)