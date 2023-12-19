import { apiGetProducts } from '../apis/product'
import { useState, useEffect } from 'react'
import { Product } from './'
import Slider from "react-slick"
import banner2 from '../assets/banner2.avif'
import banner3 from '../assets/banner3.avif'

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
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
        if (response[0]?.success) {
            setBestSellers(response[0].products)
            setProducts(response[0].products)
        }
        if (response[1]?.success) setNewProducts(response[1].products)

    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(()=>{
        if(activedTab === 1) setProducts(bestSellers)
        if(activedTab === 2) setProducts(newProducts)
    },[activedTab])
    console.log({ bestSellers, newProducts });
    return (
        <div>
            <div className='flex uppercase text-xl border-b-4 pb-2 border-main'>
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
            <div className='mt-4 mx-[-8px]'>
                <Slider {...settings}>
                    {products?.map(el=>(
                        <Product
                        key={el._id}
                        productData = {el}
                        isNew={activedTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
            </div>
            <div className='w-full flex mt-4 gap-4'>
                <img src={banner2} alt="banner" className='flex-1 object-contain'/>
                <img src={banner3} alt="banner" className='flex-1 object-contain'/>
            </div>
        </div>
    )
}

export default BestSeller