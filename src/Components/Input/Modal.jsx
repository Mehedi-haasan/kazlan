
import React from 'react';

const Modal = ({ show, handleClose, children, size,className }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={handleClose}></div>
      <div className={`bg-white rounded-lg shadow-lg p-6 z-10 w-[${size}] ${className} relative`}>
        <button type="button" className="mt-4 text-red-500 float-right right-3 top-0 absolute  py-1 px-2 rounded hover:text-red-600" onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em" viewBox="0 0 36 36">
            <path fill="#dd2e44" d="M21.533 18.002L33.768 5.768a2.5 2.5 0 0 0-3.535-3.535L17.998 14.467L5.764 2.233a2.498 2.498 0 0 0-3.535 0a2.498 2.498 0 0 0 0 3.535l12.234 12.234L2.201 30.265a2.498 2.498 0 0 0 1.768 4.267c.64 0 1.28-.244 1.768-.732l12.262-12.263l12.234 12.234a2.493 2.493 0 0 0 1.768.732a2.5 2.5 0 0 0 1.768-4.267z" />
          </svg>
        </button>
        <div className='pt-2'>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
