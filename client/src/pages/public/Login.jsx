import React, {useState, useCallback} from "react"
import { InputField, Button } from "../../components"
import ImgLogin from '../../assets/login.webp'
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import path from "../../ultils/path"
import {register} from '../../store/user/userSlice'
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '', 
        mobile: ''
    })
    const [email, setEmail] = useState('')
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const resetPayload = () =>{
        setPayload({
            email: '',
            password: '',
            firstName: '',
            lastName: '', 
            mobile: ''
        })
    }
    const handleForgotPassword = async()=>{
        const response = await apiForgotPassword({email})
        console.log(response);
        if(response.success){
            Swal.fire('Notification!', `${response.mes}`, 'success').then(()=>setIsForgotPassword(false))

        }else{
            toast.error(response.mes)
        }
    }
    const handleSubmit = useCallback(async()=>{
        const {firstName, lastName, mobile, ...data} = payload
        if(isRegister){
            const response = await apiRegister(payload)
            if(response.success){
                Swal.fire('Congratulation!', response.mes, 'success')
                .then(()=>{
                    setIsRegister(false)
                    resetPayload()
                })
            }else{
                Swal.fire('Opps!', response.mes, 'error')
            }
        }else{
            const result = await apiLogin(data)
            if(result.success){
                dispatch(register({isLoggedIn: true, token: result.accessToken, userData: result.userData}))
                navigate(`/${path.HOME}`)
            }else{
                Swal.fire('Opps!', result.mes, 'error')
            }
        }
    },[payload, isRegister])
    return (
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 w-screen h-screen flex relative">
            {isForgotPassword && <div 
                className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-overlay flex items-center justify-center"
                onClick={(e)=>{
                    e.stopPropagation()
                    setIsForgotPassword(false)
                }}
                >
                <div className="flex flex-col bg-white rounded-md gap-4">
                    <label htmlFor="email" className="text-main font-semibold text-lg px-4 mt-4">Enter your email: </label>
                    <input 
                    type="text" 
                    id="email"
                    className="w-[800px] px-4 border-b outline-none mb-4 placeholder:text-sm placeholder:italic"
                    placeholder="Exp: email@gmail.com"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    onClick={e=> e.stopPropagation()}
                    />
                    <div className="flex items-center justify-center">
                    <Button
                        name='Submit'
                        handleOnClick={handleForgotPassword}
                    />
                    </div>
                </div> 
            </div>}
            <div className="w-1/2 flex flex-col items-center justify-center ">
                <h1 
                className="text-[40px] font-bold my-8 text-white ">DIGITAL WORLD</h1>
                <img src={ImgLogin} alt="image" className="w-[600px] h-[500px]" />
            </div>
            <div className="w-1/2 flex items-center justify-center ">
                <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
                    <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <div className="flex flex-col items-center gap-2 w-full">
                        <InputField
                    value={payload.firstName}
                    setValue={setPayload}
                    nameKey='firstName'
                    />
                    <InputField
                    value={payload.lastName}
                    setValue={setPayload}
                    nameKey='lastName'
                    />
                    <InputField
                    value={payload.mobile}
                    setValue={setPayload}
                    nameKey='mobile'
                    />
                        </div>}
                    <InputField
                    value={payload.email}
                    setValue={setPayload}
                    nameKey='email'
                    />
                    <InputField
                    value={payload.password}
                    setValue={setPayload}
                    nameKey='password'
                    type='password'
                    />
                    <Button
                    name={isRegister ? 'Register' : 'Login'}
                    handleOnClick={handleSubmit}
                    fw
                    />
                    <div className="flex items-center justify-between my-2 w-full text-sm">
                        {!isRegister && <span 
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={()=>setIsForgotPassword(true)}
                        >
                            Forgot your account?
                            </span>}
                        {!isRegister && <span 
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={()=>setIsRegister(true)}
                        >
                            Create account
                        </span>}
                        {isRegister && <span 
                        className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                        onClick={()=>setIsRegister(false)}
                        >
                            Go Login
                        </span>}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login