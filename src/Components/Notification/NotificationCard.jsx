import React, { useState } from 'react';
import BaseUrl from '../../Constant';

const NotificationCard = ({ item }) => {
    const [isChecked, setIsChecked] = useState(item?.isSeen === 'true' ? true : false)

    const ReadNotification = async () => {
        setIsChecked(true);
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/update/notification`, {
            method: 'PATCH',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ id: item?.id })
        });
        const data = await response.json()
        alert(data?.message)
    }

    return (
        <div key={item?.id} onClick={ReadNotification} className={`${isChecked ? 'bg-white' : 'bg-gray-100'} p-2 cursor-pointer rounded-md m-1 flex justify-start gap-2`}>
            <div>
                <img src={item?.user?.image_url ? item?.user?.image_url : `https://cdn-icons-png.flaticon.com/128/149/149071.png`} className='h-10 w-10 rounded-full' alt='dgviusd' />
            </div>
            <div>
                <h1 className='font-semibold'>{item?.user?.first_name} {item?.user?.last_name}</h1>
                <h1 className='text-sm'><span className='font-bold text-black'>{item?.user?.first_name} {item?.user?.last_name}</span> has new order with invoice id # <span className='font-bold text-black'>{item?.invoiceId}</span></h1>
            </div>
        </div>
    );
};

export default NotificationCard;