import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import { apiGetProducts, apiGetUsers, apiGetOrders } from '../../apis'
import { formatMoney } from '../../ultils/helper'
import moment from 'moment'
import { LineChart } from '../../components'
import icons from '../../ultils/icons'

const { FaUser, FaProductHunt, FaClipboardList, FaMoneyCheckAlt } = icons

const Dashboard = () => {

    const [users, setUsers] = useState(null)
    const [products, setProducts] = useState(null)
    const [orders, setOrders] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(0)
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
    // console.log(`${formatMoney(orders?.orders?.reduce((sum, el) => +el?.total + sum, 0))} VND`)

    return (
        <div className='p-2'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b-2'>
                <span>Dashboard</span>
            </h1>
            <div className='grid grid-cols-4 h-[280px] mt-4 gap-6'>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                    onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_USER}`)}
                >
                    <FaUser size={64} />
                    <div className='flex flex-col text-black pl-2'>
                        <div className='text-xl font-semibold'>Number of users:</div>
                        <div className='text-center mt-2 text-xl'>{users?.counts}</div>
                    </div>
                </div>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                    onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_PRODUCT}`)}
                >
                    <FaProductHunt size={64} />
                    <div className='flex flex-col text-black pl-2'>
                        <div className='text-xl font-semibold'>Number of products:</div>
                        <div className='text-center mt-2 text-xl'>{products?.counts}</div>
                    </div>
                </div>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                    onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_ORDER}`)}
                >
                    <FaClipboardList size={64} />
                    <div className='flex flex-col text-black pl-2'>
                        <div className='text-xl font-semibold'>Number of orders:</div>
                        <div className='text-center mt-2 text-xl'>{orders?.counts}</div>
                    </div>
                </div>
                <div className='bg-gray-300 rounded-lg col-span-1 flex items-center justify-center cursor-pointer'
                // onClick={() => navigate(`/${path.ADMIN}/${path.MANAGE_ORDER}`)}
                >
                    <FaMoneyCheckAlt size={64} />
                    <div className='flex flex-col text-black pl-2'>
                        <div className='text-xl font-semibold'>Total Revenue:</div>
                        <div className='text-center mt-2 text-xl'>{formatMoney(orders?.orders?.reduce((sum, el) => +el?.total + sum, 0))} VND</div>
                    </div>
                </div>
            </div>
            <div className='mt-4 font-bold text-2xl'>Total price of each order:</div>
            <div className="mt-4 bg-white w-[99%]">
                <LineChart />
            </div>
        </div>
    )
}

export default Dashboard