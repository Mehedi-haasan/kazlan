

import React, { useState } from 'react';

const SelectionComp = ({ options, onSelect, label }) => {
    const [selectedId, setSelectedId] = useState(1); // Default to first option ID

    const handleSelect = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedItem = options.find(option => option.id === selectedId); // Find the object
        if (selectedItem) {
            setSelectedId(selectedItem.id);
            onSelect({ id: selectedItem.id, name: selectedItem.name }); // Pass both ID & Name
        }
    };

    return (
        <div className='py-1 w-full'>
            <label htmlFor={label} className="block text-sm font-thin mb-1"> {label} </label>
            <select id={label} value={selectedId} onChange={handleSelect}
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 border font-thin"
            >
                {options.map(({ id, name }) => (
                    <option key={id} value={id} className='text-black hover:text-white font-thin'> {name}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectionComp;
