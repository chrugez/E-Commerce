import React, { useEffect } from 'react'
import payment from '../../assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney, formatPrice } from '../../ultils/helper'
import { InputForm, Paypal } from '../../components'
import { useForm } from 'react-hook-form'

const Checkout = () => {
    const { currentCart, current } = useSelector(state => state.user)
    const { register, formState: { errors }, watch, setValue } = useForm()
    useEffect(() => {
        setValue('address', current?.address)
    }, [current.address])
    const address = watch('address')
    console.log(currentCart)
    return (
        <div className='p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6 '>
            <div className='w-full flex justify-center items-center col-span-4'>
                <img src={payment} alt="payment" className='h-[70%] object-contain' />
            </div>
            <div className='flex w-full flex-col justify-center gap-6 col-span-6'>
                <h2 className='text-2xl font-bold'>Checkout your order</h2>
                <div className='flex w-full gap-6 justify-between'>
                    <table className='table-auto w-full flex-1 overflow-y-auto'>
                        <thead>
                            <tr className='border bg-gray-200'>
                                <th className='text-left p-2 border-r border-white'>Product</th>
                                <th className='text-center p-2 border-r border-white'>Color</th>
                                <th className='text-center p-2 border-r border-white'>Quantity</th>
                                <th className='text-center p-2 border-r'>Price(VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCart?.map(el => (
                                <tr key={el._id} className='border'>
                                    <td className='text-left p-2 border-r'>{el?.product.title}</td>
                                    <td className='text-center p-2 border-r'>{el?.color}</td>
                                    <td className='text-center p-2 border-r'>{el?.quantity}</td>
                                    <td className='text-center p-2'>{`${formatMoney(el?.price)}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex-1 flex flex-col justify-between gap-[45px]'>
                        <div className='flex flex-col gap-4'>
                            <span className='flex gap-4 text-sm items-end'>
                                <span>Subtotal:</span>
                                <span className='text-main text-base font-bold'>{`${formatMoney(currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0))} VND`}</span>
                            </span>
                            <div>
                                <InputForm
                                    label='Address'
                                    register={register}
                                    errors={errors}
                                    id='address'
                                    validate={{
                                        required: 'Required field'
                                    }}
                                    placeholder='Please type your address for shipping'
                                    style='text-sm'
                                    f1
                                />
                            </div>
                        </div>
                        <div className='w-full '>
                            <Paypal
                                payload={{
                                    products: currentCart,
                                    total: Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500),
                                    address
                                }}
                                amount={Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout