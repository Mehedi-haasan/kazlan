import React from 'react'

const InputComponent = ({ onChange, label, placeholder, type, isRequered, value, className, readOnly = false }) => {

    const handleChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue);
    };
    return (
        <div className='py-1'>
            <h1 for={label} className={`${className} mb-2 text-start text-sm font-semibold text-gray-900`}>{label}</h1>
            <input type={type} value={value} required={isRequered} readOnly={readOnly} onChange={handleChange} className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2`} placeholder={placeholder} />
        </div>
    )
}

export default InputComponent
