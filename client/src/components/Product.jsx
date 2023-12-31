import { useState } from 'react'
import label1 from '../assets/trending.png'
import label2 from '../assets/new.png'
import { renderStarFromNumber, formatMoney } from "../ultils/helper"
import {SelectOption} from './'
import icons from '../ultils/icons'

const {FaEye, FiMenu, FaHeart} = icons

const Product = ({ productData, isNew }) => {

    const [isShowOption, setIsShowOption] = useState(false)

    return (
        <div className="w-full text-base px-2">
            <div 
            className="w-full border p-[15px] flex flex-col items-center"
            onMouseEnter={e=>{
                e.stopPropagation()
                setIsShowOption(true)
            }}
            onMouseLeave={e=>{
                e.stopPropagation()
                setIsShowOption(false)
            }}
            >
                <div className="w-full relative">
                    {isShowOption && <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                        <SelectOption icon={<FaHeart/>}/>
                        <SelectOption icon={<FiMenu/>}/>
                        <SelectOption icon={<FaEye/>}/>
                    </div>}
                    <img
                    src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt="thumb_product"
                    className="w-[243px] h-[243px] object-contain"
                    />
                <img src={isNew ? label2 : label1} alt="label" className="absolute w-[70px] h-[25px] top-[-15px] right-[-18px] object-cover"/>
                </div>
                <div className="flex flex-col gap-1 items-start w-full mt-[15px]">
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRating)}</span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product