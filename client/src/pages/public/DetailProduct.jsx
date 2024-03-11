import React, {useState, useEffect}from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis/product'
import {BreadCrumbs} from '../../components'

const DetailProduct = () => {
  const {pid, title, category} = useParams()
  const [product, setProduct] = useState(null)
  const fetchProductData = async()=>{
    const response = await apiGetProduct(pid)
    if(response.success) setProduct(response?.productData)
  }
  useEffect(() => {
    if(pid) fetchProductData()
  }, [pid])
  
  return (
    <div>
      <div className='h-[80px] '>
        <h3 className='font-semibold text-[14px] mb-2'>{title}</h3>
        <BreadCrumbs title={title} category={category}/>
      </div>
    </div>
  )
}

export default DetailProduct