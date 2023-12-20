import React, { memo, useState, useEffect } from 'react'
import { ProductCard } from './'
import { apiGetProducts } from '../apis'
import Pbanner1 from '../assets/Pbanner1.webp'
import Pbanner2 from '../assets/Pbanner2.avif'
import Pbanner3 from '../assets/Pbanner3.avif'
import Pbanner4 from '../assets/Pbanner4.webp'

const FeatureProduct = () => {

    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRating: 5 })
        if (response.success) setProducts(response.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>FEATURED PRODUCTS</h3>
            <div className='flex flex-wrap mt-[15px] mx-[-10px]'>
                {products?.map(el => (
                    <ProductCard
                        key={el._id}
                        image={el.thumb}
                        title={el.title}
                        totalRating={el.totalRating}
                        price={el.price}
                    />
                ))}
            </div>
            <div className='flex justify-between'>
                <img src={Pbanner1} alt="banner" className='w-[50%] object-contain'/>
                <div className='flex flex-col justify-between gap-4 w-[24%]'>
                    <img src={Pbanner2} alt="banner" />
                    <img src={Pbanner3} alt="banner" />
                </div>
                <img src={Pbanner4} alt="banner" className='w-[24%] object-contain'/>
            </div>
        </div>
    )
}

export default memo(FeatureProduct)