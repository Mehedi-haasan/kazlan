import React from 'react';

const Remove = ({ size = '20px', color = 'currentColor', onClick,className }) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg"
            className={`${className} hover:text-red-500 cursor-pointer text-[#212529] font-thin `}
            width="16px" height="16px" viewBox="0 0 16 16">
            <path fill="currentColor" fillRule="evenodd"
                d="M5.75 3V1.5h4.5V3zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462z"
                clipRule="evenodd" />
        </svg>
    );
}

export default Remove;
