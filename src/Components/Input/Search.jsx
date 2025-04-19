import React, { useEffect, useState } from "react";

const Search = ({ SearchProduct }) => {
    const [value, setValue] = useState('');
    const [isCross, setIsCross] = useState(false);

    const handleChange = (e) => {
        e.preventDefault()
        setValue(e.target.value);
        SearchProduct(e.target.value)
    }

    useEffect(() => {
        if (value === "") {
            setIsCross(false)
        } else {
            setIsCross(true)
        }
    }, [value])

    return <div className="flex justify-start items-center gap-1.5 relative">
        <h1 className='font-thin text-sm'>Search : </h1>
        {
            isCross && <svg xmlns="http://www.w3.org/2000/svg" className='absolute top-2 right-1 font-thin cursor-pointer text-gray-500' width="15" height="15" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z" />
            </svg>
        }
        <input placeholder=""
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    SearchProduct(e.target.value)
                }
            }}
            onChange={handleChange}
            className="focus:outline-none border rounded p-1.5 font-thin text-sm" />
    </div>
}

export default Search