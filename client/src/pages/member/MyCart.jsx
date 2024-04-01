import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { BreadCrumbs, CartItem, Button } from '../../components'
import withBase from '../../hocs/withBase'
import { formatMoney } from '../../ultils/helper'
import icons from '../../ultils/icons'
import { updateCart } from '../../store/user/userSlice'
import path from '../../ultils/path'

const { ImBin } = icons

const MyCart = ({ location, dispatch, navigate }) => {
    // console.log(location.pathname)
    const { current, currentCart } = useSelector(state => state.user)

    const handleChangeQuantity = (pid, quantity, color) => {
        console.log({ pid, quantity, color })
        dispatch(updateCart({ pid, quantity, color }))
    }
    const handleOnClick = () => {
        navigate(`/${path.CHECKOUT}`)
    }

    console.log(currentCart)
    return (
        <div className=''>
            <div className='flex flex-col justify-start w-full px-4'>
                {/* <h3 className='text-2xl font-bold tracking-tight my-2'>MY CART</h3> */}
                <header className='text-3xl font-semibold py-4 border-b-2 border-black'>
                    My Cart
                </header>
                {/* <BreadCrumbs category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} /> */}
            </div>
            <div className='flex flex-col w-4/5 mx-auto my-8'>
                <div className='w-full mx-auto grid font-bold grid-cols-10 py-3 bg-white opacity-80 border'>
                    <div className='col-span-6 w-full text-center'>Product</div>
                    <div className='col-span-1 w-full text-center'>Quantity</div>
                    <div className='col-span-2 w-full text-center'>Price</div>
                    <div className='col-span-1 w-full text-center'>Action</div>
                </div>
                {currentCart.length === 0 && <span className='flex items-center justify-center font-bold text-lg'>Cart is empty!</span>}
                {currentCart?.map(el => (
                    <div key={el._id} >
                        {/* <div className='col-span-6 w-full'>
                        <div className='flex gap-2 pl-2'>
                            <img src={el.product?.thumb} alt="thumb" className='w-28 h-28 object-cover' />
                            <div className='flex flex-col gap-1'>
                                <span className=''>{el.product?.title}</span>
                                <span className='text-[14px]'>{el.color}</span>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1 w-full flex items-center justify-center'>
                        <div className='flex items-center justify-center'>
                            <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleMinus={handleMinus} handlePlus={handlePlus} />
                        </div>
                    </div>
                    <div className='col-span-2 w-full text-center flex items-center justify-center'>{formatMoney(el.product?.price)}</div>
                    <div className='col-span-1 w-full text-center flex items-center justify-center'>
                        <span className='hover:text-main cursor-pointer'>
                            <ImBin />
                        </span>
                    </div> */}
                        <CartItem
                            product={el}
                            handleChangeQuantity={handleChangeQuantity}
                            defaultQuantity={el.quantity} />
                    </div>
                ))}
            </div>
            {currentCart.length !== 0 && <div className='w-4/5 mx-auto flex flex-col mb-4 justify-center items-end gap-3 px-4'>
                <span className='flex items-center gap-4'>
                    <span>Subtotal:</span>
                    <span className='text-main font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0))}`}</span>
                </span>
                <Button name='Check out' handleOnClick={handleOnClick} />
            </div>}
        </div>
    )
}

export default withBase(MyCart)