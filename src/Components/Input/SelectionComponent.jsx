import React, { useState } from 'react';

const SelectionComponent = ({ options, onSelect, label, className = 'rounded' }) => {
  const [selectedId, setSelectedId] = useState(1);

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
      <h1 className="mb-2 text-start text-sm font-thin text-black"> {label} </h1>
      <select id={label} value={selectedId} onChange={handleSelect}
        className={`bg-gray-50 border text-black w-full min-w-[205px] border-gray-300 text-sm focus:ring-blue-500 focus:outline-none font-thin focus:border-blue-500 block p-2 ${className} `}
      >
        {options?.map(({ id, name }) => (
          <option key={id} value={id} className='text-black'> {name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectionComponent;
