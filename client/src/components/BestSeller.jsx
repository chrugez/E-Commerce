import { apiGetProducts } from '../apis/product'
import { useState, useEffect } from 'react'
import { Product } from './'
import Slider from "react-slick"

const tabs = [
    { id: 1, name: 'best seller' },
    { id: 2, name: 'new arrivals' }
]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
}

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    const [activedTab, setActivedTab] = useState(1)

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
        if (response[0]?.success) setBestSellers(response[0].products)
        if (response[1]?.success) setNewProducts(response[1].products)

    }

    useEffect(() => {
        fetchProducts()
    }, [])
    console.log({ bestSellers, newProducts });
    return (
        <div>
            <div className='flex uppercase text-xl border-b-2 pb-2 border-main'>
                {tabs.map(el => (
                    <span
                        key={el.id}
                        className={`font-bold border-r px-3 text-gray-400 cursor-pointer ${activedTab === el.id ? 'text-gray-900' : ''}`}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-4'>
                <Slider {...settings}>
                    {bestSellers?.map(el=>(
                        <Product
                        key={el._id}
                        productData = {el}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller