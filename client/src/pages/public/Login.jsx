import React, {useState, useCallback} from "react"
import { InputField, Button } from "../../components"
import ImgLogin from '../../assets/login.webp'

const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [isRegister, setIsRegister] = useState(false)
    
    const handleSubmit = useCallback(()=>{
        console.log(payload);
    },[payload])
    return (
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 w-screen h-screen flex">
            <div className="w-1/2 flex flex-col items-center justify-center ">
                <h1 
                className="text-[40px] font-bold my-8 text-white ">DIGITAL WORLD</h1>
                <img src={ImgLogin} alt="image" className="w-[600px] h-[500px]" />
            </div>
            <div className="w-1/2 flex items-center justify-center ">
                <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
                    <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <InputField
                    value={payload.name}
                    setValue={setPayload}
                    nameKey='name'
                    />}
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
                        {!isRegister && <span className="text-blue-500 hover:underline cursor-pointer">Forgot your account?</span>}
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