import React, { memo } from 'react'
import { renderStarFromNumber, formatMoney } from "../ultils/helper"

const ProductCard = ({ title, totalRating, image, price }) => {
    return (
        <div className='w-1/3 flex-auto flex px-[10px] mb-[20px]'>
            <div className='border w-full flex'>
                <img src={image} alt="thumb" className='w-[120px] object-contain p-4' />
            <div className="flex flex-col gap-1 items-start w-full mt-[15px] text-xs">
                <span className="line-clamp-1 text-sm capitalize">{title?.toLowerCase()}</span>
                <span className='flex h-4'>{renderStarFromNumber(totalRating)}</span>
                <span>{`${formatMoney(price)} VND`}</span>
            </div>
            </div>
        </div>
    )
}

export default memo(ProductCard)