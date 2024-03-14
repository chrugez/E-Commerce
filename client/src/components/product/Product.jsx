import { memo, useState } from 'react'
import label1 from '../../assets/trending.png'
import label2 from '../../assets/new.png'
import { renderStarFromNumber, formatMoney } from "../../ultils/helper"
import { SelectOption } from '..'
import icons from '../../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../../ultils/path'

const { FaEye, FiMenu, FaHeart } = icons

const Product = ({ productData, isNew, normal }) => {

    const [isShowOption, setIsShowOption] = useState(false)

    return (
        <div className="w-full text-base px-2">
            <Link
                to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
                className="w-full border p-[15px] flex flex-col items-center"
                onMouseEnter={e => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className="w-full flex items-center justify-center relative">
                    {isShowOption && <div className='absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                        <SelectOption icon={<FaHeart />} />
                        <SelectOption icon={<FiMenu />} />
                        <SelectOption icon={<FaEye />} />
                    </div>}
                    <img
                        src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                        alt="thumb_product"
                        className="w-[243px] h-[243px] object-contain"
                    />
                    {!normal && <img src={isNew ? label2 : label1} alt="label" className="absolute w-[70px] h-[25px] top-[-15px] right-[-18px] object-cover" />}
                </div>
                <div className="flex flex-col gap-1 items-start w-full mt-[15px]">
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRating)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </Link>
        </div>
    )
}

export default memo(Product)