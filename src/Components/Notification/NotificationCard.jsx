import React, { useState } from 'react';

const NotificationCard = ({ item }) => {
    const [isChecked, setIsChecked]=useState(false)
    return (
        <div key={item?.id} onClick={()=>{setIsChecked(true)}} className={`${isChecked ? 'bg-white':'bg-gray-100'} p-2 cursor-pointer rounded-md m-1 flex justify-start gap-2`}>
            <div>
                <img src='https://cdn-icons-png.flaticon.com/128/149/149071.png' className='h-10 w-10 rounded-full' alt='dgviusd' />
            </div>
            <div>
                <h1 className='font-semibold'>{item?.name}</h1>
                <h1 className='text-sm'>{item?.name} is orderd {item?.product_name}</h1>
            </div>
        </div>
    );
};

export default NotificationCard;