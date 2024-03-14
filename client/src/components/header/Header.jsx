import icons from '../../ultils/icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import path from '../../ultils/path'
import { memo } from 'react'

const { FaPhoneAlt, MdEmail, FaShoppingCart, FaUserCircle } = icons

const Header = () => {
  const { current } = useSelector(state => state.user)
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`${path.HOME}`}>
        {/* <img src={logo} alt="logo" className='w-[234px] object-contain' /> */}
        <span className='font-bold text-main text-[32px]'>HQC</span>
        <span className='font-semibold text-gray-800 text-[24px]'>STORE</span>
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col items-center px-4 border-r'>
          <span className='flex items-center gap-2'>
            <FaPhoneAlt color='red' />
            <span className='font-semibold'>(+84) 365892986</span>
          </span>
          <span>
            Mon-Sat: 9:00Am - 8:00PM
          </span>
        </div>
        <div className='flex flex-col items-center px-4 border-r'>
          <span className='flex items-center gap-2'>
            <MdEmail color='red' />
            <span className='font-semibold'>HOANGCHUNG.WORK@GMAIL.COM</span>
          </span>
          <span>
            Online Support 24/7
          </span>
        </div>
        {current && <>
          <div className='flex items-center gap-2 px-4 border-r cursor-pointer'>
            <FaShoppingCart color='red' />
            <span className=''>0 item(s)</span>
          </div>
          <Link
            to={current?.role === 0 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`
            }
            className='flex justify-center items-center px-4 gap-2 cursor-pointer'
          >
            <FaUserCircle size={24} color='red' />
            <span className=''>Profile</span>
          </Link>
        </>}
      </div>
    </div>
  )
}

export default memo(Header)