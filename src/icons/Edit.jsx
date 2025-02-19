import React from 'react';

const Edit = ({ size = '20px', color = 'currentColor'}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            className='hover:text-red-300 cursor-pointer'
            width="20px" height="20px"
            viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
            </g>
        </svg>
    );
}

export default Edit;
