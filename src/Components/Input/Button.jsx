import React from 'react';

const Button = ({ isDisable,name,onClick,className='bg-blue-500 hover:bg-blue-600 text-white' }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${isDisable ? "cursor-not-allowed":""} ${className} focus:ring-4 my-2 focus:ring-blue-300 font-medium rounded-md px-5 py-2 me-2 mb-2  focus:outline-none `}
            disabled={isDisable}
        >
            {name}
        </button>
    );
};

export default Button;
