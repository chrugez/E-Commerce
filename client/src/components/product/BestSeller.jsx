import { apiGetProducts } from '../../apis/product'
import { useState, useEffect, memo } from 'react'
import { Product, CustomSlider } from '..'
import { getNewProducts } from '../../store/product/asyncActions'
import { useDispatch, useSelector } from 'react-redux'
import banner2 from '../../assets/banner2.avif'
import banner3 from '../../assets/banner3.avif'

const tabs = [
    { id: 1, name: 'best seller' },
    { id: 2, name: 'new arrivals' }
]

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null)
    const [activedTab, setActivedTab] = useState(1)
    const [products, setProducts] = useState(null)
    const dispatch = useDispatch()
    const { newProducts } = useSelector(state => state.products)

    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold' })
        if (response?.success) {
            setBestSellers(response.products)
            setProducts(response.products)
        }


    }

    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
    }, [])

    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers)
        if (activedTab === 2) setProducts(newProducts)
    }, [activedTab])
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
                <CustomSlider products={products} activedTab={activedTab} />
            </div>
            <div className='w-full flex mt-4 gap-4'>
                <img src={banner2} alt="banner" className='flex-1 object-contain' />
                <img src={banner3} alt="banner" className='flex-1 object-contain' />
            </div>
        </div>
    )
}

export default memo(BestSeller)