// import React, { useState } from 'react'

// const SelectionComponent = ({ options, onSelect, label }) => {
//   const [selectedOption, setSelectedOption] = useState("");

//   return (
//     <div className='py-1 w-full'>
//       <h1 for={label} className="mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">{label}</h1>
//       <select value={selectedOption} onChange={(e) => { onSelect(e.target.value); setSelectedOption(e.target.value);console.log(e); }} className="bg-gray-50 border w-full min-w-[205px] border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//         {options.map(({ id, name }) => {
//           return <option key={id} value={name} className=''>{name}</option>
//         })}
//       </select>
//     </div>
//   )
// }

// export default SelectionComponent


import React, { useState } from 'react';

const SelectionComponent = ({ options, onSelect, label, className = 'rounded' }) => {
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
    <div className='w-full'>
      <h1 className="mb-2 text-start text-sm font-semibold text-gray-900 dark:text-white "> {label} </h1>
      <select id={label} value={selectedId} onChange={handleSelect}
        className={`bg-gray-50 border w-full min-w-[205px] border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:outline-none focus:border-blue-500 block p-2 ${className} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      >
        {options.map(({ id, name }) => (
          <option key={id} value={id}> {name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectionComponent;
