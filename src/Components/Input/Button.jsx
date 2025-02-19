import React from 'react';

const Button = ({ isDisable,name,onClick,className }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`text-white ${isDisable ? "cursor-not-allowed":""} ${className} bg-blue-700 hover:bg-blue-800 focus:ring-4 my-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
            disabled={isDisable}
        >
            {name}
        </button>
    );
};

export default Button;
