import React, { memo } from 'react'

const Select = ({ label, options = [], register, errors, id, validate, style, fullWidth, defaultValue }) => {
    return (
        <div className='flex flex-col'>
            {label && <label htmlFor={id} className='capitalize'>{label}</label>}
            <select
                id={id}
                {...register(id, validate)}
                className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none'
                defaultValue={defaultValue}
            >
                <option value="">--Choose--</option>
                {options?.map(el => (
                    <option value={el.code} key={el.id}>{el.value}</option>
                ))}
            </select>
            {errors[id] && <span role="alert" className='text-red-500 text-xs'>{errors[id]?.message}</span>}
        </div>
    )
}

export default memo(Select)