import {Route, Routes} from 'react-router-dom'
import {Home, Login, Public, FAQ, Services, Blog, DetailProduct, Products, FinalRegister, ResetPassword} from './pages/public'
import path from './ultils/path'
import { getCategories } from './store/app/asyncActions'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  return (
    <div className='min-h-screen font-main'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.PRODUCTS} element={<Products/>}/>
          <Route path={path.BLOGS} element={<Blog/>}/>
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct/>}/>
          <Route path={path.FAQ} element={<FAQ/>}/>
          <Route path={path.OUR_SERVICES} element={<Services/>}/>
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister/>}/>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword/>}/>
        <Route path={path.LOGIN} element={<Login/>}/>
      </Routes>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
{/* Same as */}
<ToastContainer />
    </div>
  )
}

export default App
