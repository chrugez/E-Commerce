import React, { memo } from 'react'
import usePagination from '../../hooks/usePagination'
import { PaginItem } from '..'

const Pagination = ({ totalCount }) => {
    const pagination = usePagination(totalCount, 2)
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

