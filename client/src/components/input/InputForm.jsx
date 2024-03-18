import React, { memo } from 'react'

const InputForm = ({ label, disable, register, errors, id, validate, type = 'text', placeholder, defaultValue }) => {
    return (
        <div className='flex flex-col h-[80px]'>
            {label && <label htmlFor={id} className='capitalize'>{label}</label>}
            <input
                id={id}
                {...register(id, validate)}
                type={type}
                disabled={disable}
                placeholder={placeholder}
                className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none'
                defaultValue={defaultValue}
            />
            {errors[id] && <span role="alert" className='text-red-500 text-xs'>{errors[id]?.message}</span>}
        </div>
    )
}

export default memo(InputForm)