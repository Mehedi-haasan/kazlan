import React, { useEffect, useRef, useState } from 'react';
import RightArrow from '../../icons/RightArrow';


const Calendar = ({ label, readOnly = true, getDate, getTime, value }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isFocus, setIsFocus] = useState(false)
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const [selectedDate, setSelectedDate] = useState(today);

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysArray = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
        i < firstDay ? null : i - firstDay + 1
    );

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();


    const handleDateSelection = (date) => {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        setSelectedDate(formatted);
        getDate(formatted);
    };

    useEffect(() => {
        handleDateSelection(new Date());
    }, []);

    const cal = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cal.current && !cal.current.contains(event.target)) {
                setIsFocus(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-full dark:bg-[#040404] dark:text-white' ref={cal}>
            <h1 className='pb-[5px] pt-1 text-[15px]'>{label}</h1>

            <div className='flex justify-start items-center relative w-full'>
                <div onClick={() => { setIsFocus(!isFocus) }} className='border-y border-l px-3 pt-[6px] pb-[5px] rounded-l cursor-pointer text-green-500 '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z" />
                    </svg>
                </div>

                <div className='w-full'>
                    <input readOnly={readOnly} onClick={() => setIsFocus(false)} className='focus:outline-none dark:bg-[#040404] dark:text-white border pt-[7px] pb-[6px] px-1.5 rounded-r w-full font-thin text-[15px]' value={value} onChange={(e) => { }} placeholder={value} />

                    {isFocus && <div className={`max-w-md mx-auto top-10 bg-white dark:bg-[#040404] dark:text-white rounded-xl shadow-md border overflow-hidden absolute z-40`}>
                        <div className="flex justify-between items-center bg-gray-100 dark:bg-[#040404] dark:text-white px-1 pt-2 pb-2">
                            <RightArrow className='rotate-180 cursor-pointer' onClick={handlePrevMonth} />
                            <h2 className="text-md font-semibold">{`${monthName} ${year}`}</h2>
                            <RightArrow className='cursor-pointer' onClick={handleNextMonth} />
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm font-thin border-b pb-1 px-2 bg-gray-100 dark:bg-[#040404] dark:text-white">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="text-black text-sm ">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium p-1">

                            {daysArray.map((day, index) => (
                                <div key={index}
                                    onClick={() => {
                                        if (day) {
                                            const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                            getTime(newSelectedDate)
                                            handleDateSelection(newSelectedDate);
                                            setIsFocus(false);
                                        }
                                    }}
                                    className={`h-8 flex text-xs hover:bg-blue-400 hover:text-white items-center text-black justify-center rounded ${day ? 'cursor-pointer' : ''}`}
                                > {day || ''}
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </div>
        </div>

    );
};

export default Calendar;
