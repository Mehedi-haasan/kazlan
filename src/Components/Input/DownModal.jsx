
import React from 'react';

const DownModal = ({ show, handleClose, children, size, className }) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={handleClose}></div>
            <div className={`bg-white rounded-lg shadow-lg p-6 z-10 w-[${size}] ${className} relative`}>
                <div className='pt-2'>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default DownModal;