import React from 'react'

const InputComponent = ({ onChange, label, placeholder, type, isRequered, value, className, readOnly = false }) => {

    const handleChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue);
    };
    return (
        <div className='py-1'>
            <h1 for={label} className={`${className} mb-2 text-start text-[16px] font-bold text-gray-900`}>{label}</h1>
            <input type={type} value={value} required={isRequered} readOnly={readOnly} onChange={handleChange} className={`${className} font-thin border [text-[#6B7280] text-[16px] rounded  focus:outline-none block w-full p-1.5`} placeholder={placeholder} />
        </div>
    )
}

export default InputComponent
