import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../ultils/path'
import { useSelector } from 'react-redux'
import { AdminSidebar } from '../../components'

const AdminLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current || current.role !== 0) <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='flex w-full bg-zinc-900 min-h-screen relative text-white'>
            <div className='w-[300px] flex-none fixed top-0 bottom-0'>
                <AdminSidebar />
            </div>
            <div className='w-[300px] flex-none'></div>
            <div className='flex-auto '>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout