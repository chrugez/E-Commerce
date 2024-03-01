import logo from '../assets/logo.png'
import icons from '../ultils/icons'
import {Link} from 'react-router-dom' 
import path from '../ultils/path'

const {FaPhoneAlt, MdEmail, FaShoppingCart, FaUserCircle} = icons

const Header = () => {
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`${path.HOME}`}>
      <img src={logo} alt="logo" className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col items-center px-4 border-r'>
          <span className='flex items-center gap-2'>
            <FaPhoneAlt color='red'/>
            <span className='font-semibold'>(+84) 365892986</span>
          </span>
          <span>
            Mon-Sat: 9:00Am - 8:00PM
          </span>
        </div>
        <div className='flex flex-col items-center px-4 border-r'>
          <span className='flex items-center gap-2'>
            <MdEmail color='red'/>
            <span className='font-semibold'>HOANGCHUNG.WORK@GMAIL.COM</span>
          </span>
          <span>
            Online Support 24/7
          </span>
        </div>
        <div className='flex items-center gap-2 px-4 border-r'>
          <FaShoppingCart color='red'/>
          <span className=''>0 item(s)</span>
        </div>
        <div className='flex justify-center items-center px-4'>
          <FaUserCircle size={24} color='red'/>
        </div>
      </div>
    </div>
  )
}

export default Header