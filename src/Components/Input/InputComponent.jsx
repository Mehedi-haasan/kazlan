import React, { useEffect, useRef, useState } from 'react'

const InputComponent = ({ onChange, label, placeholder, type, isRequered, value, className, readOnly = false, handleEnter, handleTab, input_focus = false }) => {

    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(null)

    useEffect(() => {
        if (input_focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [input_focus]);

    useEffect(() => {
        if (type === 'number') {
            setInputValue(parseInt(value))
        } else {
            setInputValue(value)
        }

    }, [value])

    return (
        <div className='py-1'>
            <h1 for={label} className={`${className} mb-2 text-start text-[15px] font-bold text-gray-900 dark:text-white`}>{label}</h1>
            <input ref={inputRef} type={type} value={inputValue} required={isRequered} readOnly={readOnly} onChange={(e)=>{onChange(e.target.value)}} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleEnter(e.target.value)
                } else if (e.key === "Tab") {
                    e.preventDefault();
                    handleTab()
                }else if(e.key === "ArrowRight"){
                   handleEnter(e.target.value) 
                }
            }} className={`${className} font-thin border text-[#6B7280] dark:bg-[#040404] dark:text-white text-[15px] rounded  focus:outline-none block w-full px-1.5 pt-[6px] pb-[7px]`} placeholder={placeholder} />
        </div>
    )
}

export default InputComponent
