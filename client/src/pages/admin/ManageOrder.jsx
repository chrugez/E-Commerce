import React, { useEffect, useState, useCallback } from 'react'
import { apiGetUsers, apiDeleteUser } from '../../apis/user'
import moment from 'moment'
import { InputField, Pagination, InputForm, FormUser, FormOrder, CustomSelect } from '../../components'
import useDebounce from '../../hooks/useDebounce'
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { showModal } from '../../store/app/appSlice'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import icons from '../../ultils/icons'
import { apiGetOrders } from '../../apis'
import { formatMoney } from '../../ultils/helper'
import { statusOrder } from '../../ultils/constants'

const { FiEdit, ImBin } = icons

const ManageOrder = () => {
    const { register, formState: { errors }, handleSubmit, reset, watch, setValue } = useForm()
    const status = watch('status')
    const [data, setData] = useState(null)
    const [queries, setQueries] = useState({
        q: ''
    })
    const [isEdit, setIsEdit] = useState(false)
    const [render, setRender] = useState(false)
    const [editEl, setEditEl] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [params] = useSearchParams()
    const queriesDebounce = useDebounce(queries.q, 1000)

    const fetchData = async (params) => {
        const response = await apiGetOrders({ ...params, limit: +import.meta.env.VITE_LIMIT })
        if (response.success) setData(response)
    }

    useEffect(() => {
        const query = Object.fromEntries([...params])
        if (queriesDebounce) query.q = queriesDebounce
        fetchData(query)
    }, [queriesDebounce, params, isEdit, render])

    // const handleDelete = async (el) => {
    //     if (el.role === 0) {
    //         toast.warning('You cannot delete Admin!')
    //     } else {
    //         Swal.fire({
    //             title: "Do you want to delete this user?",
    //             showCancelButton: true,
    //             confirmButtonText: "Delete",
    //             icon: 'question'
    //         }).then(async (result) => {
    //             /* Read more about isConfirmed, isDenied below */
    //             if (result.isConfirmed) {
    //                 const response = await apiDeleteUser(el._id)
    //                 setRender(!render)
    //                 toast.success(response.mes)
    //             }
    //         })
    //     }
    // }

    const reRender = useCallback(() => {
        setIsEdit(!isEdit)
    }, [isEdit])

    const handleSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status: value }).toString()
        })
    }

    console.log(data)

    return (
        <div className='w-full'>
            {isEdit && <div
                onClick={(e) => setIsEdit(false)}
                className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-overlay flex flex-col items-center justify-center">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white text-black w-[500px] rounded-md p-8">
                    <FormOrder editEl={editEl} reRender={reRender} />
                </div>
            </div>}
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b-2'>
                <span>Manage Order</span>
            </h1>
            <div className='flex w-full justify-end items-center px-4 my-4'>
                <form className='w-[45%]  flex justify-end items-center gap-4'>
                    {/* <div className='col-span-1'>
                        <InputForm
                            id='q'
                            register={register}
                            errors={errors}
                            style={'w-full text-black'}
                            placeholder='Search orders by status, ...'
                        />
                    </div> */}
                    <div className=' flex items-center'>
                        <CustomSelect
                            options={statusOrder}
                            value={status}
                            onChange={val => handleSearchStatus(val)}
                            wrapClassname='w-full'
                        />
                    </div>
                </form>
            </div>
            <div className='w-full p-4 '>
                {/* <div className='flex justify-end'>
                    <InputField
                        nameKey={'q'}
                        value={queries.q}
                        setValue={setQueries}
                        style='w-[500px] text-black'
                        placeholder='Search name or email user'
                        isHideLabel
                    />
                </div> */}
                <table className='table-auto mb-6 text-center w-full'>
                    <thead className='font-bold bg-white text-black'>
                        <tr className='border border-white'>
                            <th className='px-4 py-2'>#</th>
                            {/* <th className='px-4 py-2'>OrderId</th> */}
                            <th className='px-4 py-2'>Products</th>
                            <th className='px-4 py-2'>Total Price(VND)</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Order By</th>
                            <th className='px-4 py-2'>Mobile</th>
                            <th className='px-4 py-2'>Address</th>
                            <th className='px-4 py-2'>Payment</th>
                            <th className='px-4 py-2'>Created At</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.orders?.reverse()?.map((el, index) => (
                            <tr key={el._id} className='border border-white bg-gray-500'>
                                <td className='px-4 py-2 border-r'>{index + 1}</td>
                                {/* <td className='px-4 py-2 border-r'>{el._id}</td> */}
                                <td className='px-4 py-2 border-r'>
                                    <ul className='list-disc pl-2'>
                                        {el?.products?.map((item, index) => (
                                            <li className='text-left' key={index}>{item?.title}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className='px-4 py-2 border-r'>{formatMoney(el.total)}</td>
                                <td className='px-4 py-2 border-r'>{el.status}</td>
                                <td className='px-4 py-2 border-r'>{`${el.orderBy.lastName} ${el.orderBy.firstName}`}</td>
                                <td className='px-4 py-2 border-r'>{el.orderBy.mobile}</td>
                                <td className='px-4 py-2 border-r'>{el.address}</td>
                                <td className='px-4 py-2 border-r'>{el.payment}</td>
                                <td className='px-4 py-2 border-r'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='px-4 py-2'>
                                    <div className='flex items-center justify-center'>
                                        <span onClick={() => {
                                            setIsEdit(true)
                                            setEditEl(el)

                                            // dispatch(showModal({
                                            //     isShowModal: true,
                                            //     modalChildren: <FormUser
                                            //         editEl={editEl}
                                            //         reRender={reRender}
                                            //     />
                                            // }))
                                        }} className='px-2 hover:text-blue-600 hover:underline cursor-pointer'>
                                            <FiEdit />
                                        </span>
                                        {/* <span
                                            onClick={() => handleDelete(el)}
                                            className='px-2 hover:text-main hover:underline cursor-pointer'>
                                            <ImBin />
                                        </span> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    totalCount={data?.counts}
                    name='orders'
                />
            </div>
        </div>
    )
}

export default ManageOrder