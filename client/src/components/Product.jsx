/* eslint-disable react/prop-types */


const Product = ({productData}) => {
  return (
    <div className="w-1/3">
        <img src={productData?.thumb || ''} alt="" className="w-full h-[243px] object-contain"/>
    </div>
  )
}

export default Product