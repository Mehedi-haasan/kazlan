import React from 'react';

const Notification = ({ width = "25px", height = "25px" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={width} height={height} viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round"
                    strokeLinejoin="round" d="M6 19v-9a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v9M6 19h12M6 19H4m14 0h2m-9 3h2" />
                <circle cx="12" cy="3" r="1" />
            </g>
        </svg>
    );
};

export default Notification;