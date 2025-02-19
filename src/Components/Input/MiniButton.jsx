import React from 'react';

const MiniButton = ({name,onClick}) => {
    return <button type="button" onClick={onClick} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs px-2 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">{name}</button>

};

export default MiniButton;