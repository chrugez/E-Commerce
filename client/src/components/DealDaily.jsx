import { memo, useState, useEffect } from "react"
import icons from "../ultils/icons"
import { apiGetProducts } from "../apis"
import { renderStarFromNumber, formatMoney, secondToHms } from "../ultils/helper"
import {CountDown} from './'
import moment from 'moment'

const { MdStar, FiMenu } = icons
let idInterval

const DealDaily = () => {
    const [dealdaily, setDealdaily] = useState(null)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [expireTime, setExpireTime] = useState(false)

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random()*5), totalRating: 5 })
        if (response.success){
            setDealdaily(response.products[0])
            // const h = 23 - new Date().getHours()
            // const m = 60 - new Date().getMinutes()
            // const s = 60 - new Date().getSeconds()
            // setHour(h)
            // setMinute(m)
            // setSecond(s)
            const today = `${moment().format('MM/DD/YYYY')} 00:00:00`
            const second = new Date(today).getTime() - new Date().getTime() + 24*60*60*1000
            const number = secondToHms(second)
            setHour(number.h)
            setMinute(number.m)
            setSecond(number.s)
        }else{
            setHour(0)
            setMinute(9)
            setSecond(59)
        }
    }

    useEffect(() => {
        idInterval && clearInterval(idInterval)
        fetchDealDaily()
    }, [expireTime])

    useEffect(()=>{
        idInterval = setInterval(()=>{
            if(second > 0) setSecond(prev=>prev-1)
            else{
                if(minute > 0){
                    setMinute(prev=>prev-1)
                    setSecond(59)
                }else{
                    if(hour>0){
                        setHour(prev=>prev-1)
                        setMinute(59)
                        setSecond(59)
                    }else{
                        setExpireTime(!expireTime)
                    }
                }
            }
        },1000)
        return ()=>{
            clearInterval(idInterval)
        }
    },[hour, minute, second, expireTime])

    return (
        <div className="w-full border flex-auto">
            <div className="flex items-center justify-between p-4 w-full">
                <span className="flex-2 flex justify-center"><MdStar size={20} color="#DD1111" /></span>
                <span className="flex-6 text-[20px] font-semibold text-center text-gray-700">DAILY DEAL</span>
                <span className="flex-2"></span>
            </div>
            <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
                <img
                    src={dealdaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt="thumb_product"
                    className="w-full object-contain"
                />
            </div>
            <div className="flex flex-col gap-1 items-center w-full mt-[15px] text-xl">
                <span className="line-clamp-1">{dealdaily?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(dealdaily?.totalRating)}</span>
                <span>{`${formatMoney(dealdaily?.price)} VND`}</span>
            </div>
            <div className="px-4 mt-4">
                <div className="flex justify-center items-center gap-2 mb-8">
                    <CountDown unit={'Hours'} number={hour}/>
                    <CountDown unit={'Minutes'} number={minute}/>
                    <CountDown unit={'Seconds'} number={second}/>
                </div>
                <button
                type="button"
                className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white py-2 font-medium"
                >
                    <FiMenu/>
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)