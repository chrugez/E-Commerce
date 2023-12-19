/* eslint-disable react/prop-types */
import { formatMoney } from "../ultils/helper"
import label1 from '../assets/label1.png'
import label2 from '../assets/label2.png'

const Product = ({ productData, isNew }) => {
    return (
        <div className="w-full text-base px-2">
            <div className="w-full border p-[15px] flex flex-col items-center">
                <div className="w-full relative">
                    <img
                    src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'}
                    alt="thumb_product"
                    className="w-[243px] h-[243px] object-contain"
                />
                <img src={isNew ? label2 : label1} alt="label" className="absolute w-[100px] h-[35px] object-cover top-[-15px] left-[-18px]"/>
                <span className="font-semibold absolute top-[-10px] left-0 text-white">{isNew ? 'New' : 'Trending'}</span>
                </div>
                <div className="flex flex-col gap-1 items-start w-full mt-[15px]">
                    <span className="line-clamp-1">{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VND`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product