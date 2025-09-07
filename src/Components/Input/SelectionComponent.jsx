import React, { useState, useRef, useEffect } from 'react';
import RightArrow from '../../icons/RightArrow';

const SelectionComponent = ({ options, onSelect, label, className = 'rounded', default_select = false, default_value = "Select a filter" }) => {

  const inputRef = useRef(null);
  const outside = useRef(null);
  const [selectedId, setSelectedId] = useState(0);
  const [select, setSelect] = useState('Select a filter');
  // const [value, setValue] = useState('')
  const [hide, setHide] = useState(default_select);
  const [data, setData] = useState([])



  useEffect(() => {
    setData(options)
  }, [options])

  useEffect(() => {
    setHide(default_select);
    setSelect(default_value)
  }, [default_select])

  useEffect(() => {
    setSelect(default_value);
    // setValue('')
  }, [default_value])


  useEffect(() => {
    inputRef.current?.focus();
  }, [hide]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outside.current && !outside.current.contains(event.target)) {
        setHide(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilter = (e) => {
    setSelectedId(0)
    const searchValue = e.target.value.toLowerCase();
    const filterData = options.filter(item =>
      item?.name?.toLowerCase().includes(searchValue)
    );
    setData(filterData);
  };



  return (
    <div className='w-full bg-white dark:bg-[#040404] dark:text-white'>
      <h1 className="mb-2 text-start text-sm font-semibold dark:text-white">{label}</h1>
      <div ref={outside} className={`${hide ? 'border-t border-x pr-[1px]' : 'border '} rounded-l relative bg-white dark:bg-[#040404] dark:text-white h-[39px] z-10`}>
        <RightArrow onClick={() => { setHide(!hide) }} className='rotate-90 absolute top-1.5 right-1 font-thin cursor-pointer' />
        {default_value !== "Select a filter" && default_value !== '' && <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { onSelect({ id: null, name: "Select a filter" }); setSelect('Select a filter') }} className='absolute z-10 top-2 right-6 font-thin cursor-pointer' width="17" height="17" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z" />
        </svg>}

        <div className={`font-thin p-1.5 cursor-pointer ${select === "Select a filter" ? 'text-[#6B7280] dark:text-white' : 'text-black dark:text-white'} z-0 text-md`} onClick={() => { setHide(!hide) }}>{default_value}</div>
        <div className={` ${hide ? '' : 'hidden'} absolute left-[-1px] right-[-1px] border-x border-b rounded-b bg-white dark:bg-[#040404]`}>
          <div className='px-2'>
            <input type='text' ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  if (selectedId === data?.length - 1) {
                    setSelectedId(0)
                  } else {
                    setSelectedId(selectedId + 1)
                  }

                } else if (e.key === "ArrowUp") {
                  if (selectedId === 0) {
                    setSelectedId(data?.length - 1)
                  } else {
                    setSelectedId(selectedId - 1)
                  }
                } else if (e.key === "Enter") {
                  onSelect({ id: data[selectedId]?.id, name: data[selectedId]?.name });
                  setSelect(data[selectedId]?.name);
                  setHide(false);
                }
              }}
              className='border rounded-l focus:outline-none w-full p-2 font-thin text-sm dark:bg-[#040404] dark:text-white' onChange={handleFilter} />
          </div>
          <div className={`px-0 max-h-[150px] overflow-hidden overflow-y-scroll hide-scrollbar bg-white dark:bg-[#040404] dark:text-white ${className} pt-1 `}>
            {
              data?.map((opt, i) => {
                return <div onMouseEnter={() => { setSelectedId(i) }}
                  ref={el => selectedId === i && el?.scrollIntoView({ block: 'nearest' })}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      setSelectedId(i + 2)
                    }
                  }}

                  onClick={() => { onSelect({ id: opt.id, name: opt.name }); setSelect(opt?.name); setHide(false); }}
                  className={`font-thin text-sm cursor-pointer px-2 py-1.5 text-[#212529] dark:text-white ${i === selectedId ? 'bg-gray-100 dark:bg-[#040404]' : ''}`}>
                  {opt?.name}
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionComponent;
