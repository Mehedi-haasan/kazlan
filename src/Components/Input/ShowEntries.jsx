import React, { useState } from 'react';

const ShowEntries = ({ options, onSelect, className = 'rounded' }) => {
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
    <div className='w-full flex justify-start items-center gap-1.5'>
      <h1 className="mb-2 text-start text-sm text-gray-900 dark:text-white font-thin pt-2">Show :</h1>
      <select id={11111} value={selectedId} onChange={handleSelect}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:outline-none focus:border-blue-500 block py-1 px-3 ${className}`}
      >
        {options?.map(({ id, name }) => (
          <option key={id} value={id}> {name}</option>
        ))}
      </select>
      <h1 className="mb-2 text-start text-sm text-gray-900 font-normal dark:text-white pt-2">entries</h1>
    </div>
  );
};

export default ShowEntries;