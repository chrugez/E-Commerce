import React, { memo } from 'react'
import usePagination from '../../hooks/usePagination'
import { PaginItem } from '..'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams()
    const pagination = usePagination(totalCount, params.get('page') || 1)
    return (
        <div className='flex items-center'>
            {pagination?.map(el => (
                <PaginItem key={el}>
                    {el}
                </PaginItem>
            ))}
        </div>
    )
}

export default memo(Pagination)

