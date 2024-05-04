import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import { apiGetProducts, apiGetUsers, apiGetOrders } from '../../apis'
import { formatMoney } from '../../ultils/helper'
import moment from 'moment'

const Dashboard = () => {

    const [users, setUsers] = useState(null)
    const [products, setProducts] = useState(null)
    const [orders, setOrders] = useState(null)
    const navigate = useNavigate()

    const fetchUsers = async () => {
        const response = await apiGetUsers()
        // console.log(response)
        if (response.success) setUsers(response)
    }

    const fetchProducts = async () => {
        const response = await apiGetProducts()
        // console.log(response)
        if (response.success) setProducts(response)
    }

    const fetchOrders = async () => {
        const response = await apiGetOrders()
        // console.log(response)
        if (response.success) setOrders(response)
    }

    useEffect(() => {
        fetchUsers()
        fetchProducts()
        fetchOrders()
    }, [])
    console.log(orders)

    return (
        <div className='p-2'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b-2'>
                <span>Dashboard</span>
            </h1>
            <div className='grid grid-cols-3 h-[300px] mt-4 gap-6'>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                    onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_USER}`)}
                >
                    <div className='flex flex-col text-black'>
                        <div className='text-2xl'>Number of users</div>
                        <div className='text-center mt-4 text-xl'>{users?.counts}</div>
                    </div>
                </div>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                    onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT}`)}
                >
                    <div className='flex flex-col text-black'>
                        <div className='text-2xl'>Number of products</div>
                        <div className='text-center mt-4 text-xl'>{products?.counts}</div>
                    </div>
                </div>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                    onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_ORDER}`)}
                >
                    <div className='flex flex-col text-black'>
                        <div className='text-2xl'>Number of orders</div>
                        <div className='text-center mt-4 text-xl'>{orders?.counts}</div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <table className='table-auto mb-6 text-center w-full'>
                    <thead className='font-bold bg-white text-black'>
                        <tr className='border border-white'>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>OrderId</th>
                            <th className='px-4 py-2'>Products</th>
                            <th className='px-4 py-2'>Total Price(VND)</th>
                            <th className='px-4 py-2'>Status</th>
                            {/* <th className='px-4 py-2'>Order By</th> */}
                            <th className='px-4 py-2'>Address</th>
                            <th className='px-4 py-2'>Payment</th>
                            <th className='px-4 py-2'>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.orders?.map((el, index) => (
                            <tr key={el._id} className='border border-white'>
                                <td className='px-4 py-2 border-r'>{index + 1}</td>
                                <td className='px-4 py-2 border-r'>{el._id}</td>
                                <td className='px-4 py-2 border-r'>
                                    <ul className='list-disc pl-2'>
                                        {el?.products?.map((item, index) => (
                                            <li className='text-left' key={index}>{item?.title}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className='px-4 py-2 border-r'>{formatMoney(el.total)}</td>
                                <td className='px-4 py-2 border-r'>{el.status}</td>
                                {/* <td className='px-4 py-2 border-r'>{el.orderBy}</td> */}
                                <td className='px-4 py-2 border-r'>{el.address}</td>
                                <td className='px-4 py-2 border-r'>{el.payment}</td>
                                <td className='px-4 py-2 border-r'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard