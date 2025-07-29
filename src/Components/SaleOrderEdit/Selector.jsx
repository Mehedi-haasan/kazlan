import React, { useState, useRef, useEffect } from 'react';
import RightArrow from '../../icons/RightArrow';

const Selector = ({ options,default_toggle=false,editi }) => {

    const inputRef = useRef(null);
    const outside = useRef(null);
    const [selectedId, setSelectedId] = useState(0);
    const [select, setSelect] = useState('');
    const [value, setValue] = useState('')
    const [hide, setHide] = useState(true);
    const [data, setData] = useState([])



    useEffect(() => {
        setData(options)
        setHide(default_toggle)
    }, [options,default_toggle])



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
        setSelect(e.target.value)
        const searchValue = e.target.value.toLowerCase();
        const filterData = options.filter(item =>
            item?.name?.toLowerCase().includes(searchValue)
        );
        setData(filterData);
    };



    return (
        <div className="text-left font-thin relative" ref={outside}>
            <input onChange={handleFilter} value={select} onClick={()=>setHide(!hide)} ref={editi} placeholder={select} className='w-full focus:outline-none h-[39px] pl-1' />
            {hide && <div className={`max-h-[150px] z-50 overflow-hidden shadow-md bg-white overflow-y-scroll hide-scrollbar border-x border-b rounded-b absolute top-10 w-full `}>
                {data?.map((opt, i) => {
                    return <div key={i} onMouseEnter={() => { }}
                        onClick={()=>{setHide(false); setSelect(opt?.name) }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {

                            }

                        }}
                        className={`font-thin text-sm cursor-pointer px-2 py-1.5 text-[#212529] `}>
                        {opt?.name}
                    </div>
                })
                }
            </div>}
        </div>
    );
};

export default Selector;
