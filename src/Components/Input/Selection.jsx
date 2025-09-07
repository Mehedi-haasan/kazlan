import React, { useState } from 'react';

const Selection = ({ options, onSelect, label, className = 'rounded', text = false,value }) => {

    const [selectedId, setSelectedId] = useState(0);

    const handleSelect = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedItem = options.find(option => option.id === selectedId);
        if (selectedItem) {
            setSelectedId(selectedItem.id);
            onSelect({ id: selectedItem.id, name: selectedItem.name });
        }
    };



    return (
        <div className='w-full'>
            <h1 className="mb-1.5 text-start text-[15px] font-semibold text-black"> {label} </h1>
            <select id={selectedId} value={selectedId} onChange={handleSelect}
                className={`border ${text ? "text-[#6B7280]" : "text-black"} w-full min-w-[205px] border-gray-300 dark:bg-[#040404] dark:text-white text-sm focus:ring-blue-500 focus:outline-none  font-thin focus:border-blue-500 block p-2 ${className} `}>
                {options?.map(({ id, name }) => (
                    <option key={id} value={id} className='text-[#6B7280] dark:text-white'>{name}</option>
                ))}
            </select>
        </div>
    );
};

export default Selection;
