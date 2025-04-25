import React, { useState } from 'react';
import BaseUrl from '../../Constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast(data?.message)
    }

    return (
        <div key={item?.id} onClick={ReadNotification} className={`${isChecked ? 'bg-white' : 'bg-gray-100'} p-2 cursor-pointer rounded-md m-1 flex justify-start gap-2`}>
            <div>
                <ToastContainer />
                <img src={`https://cdn-icons-png.flaticon.com/128/149/149071.png`} className='h-10 w-10 rounded-full' alt='dgviusd' />
            </div>

            <div>
                <h1 className='font-semibold'>{item?.creator}</h1>
                <h1 className='text-sm'><span className='font-bold text-black'>{item?.shop}</span> has new order with invoice id # <span className='font-bold text-black'>{item?.invoiceId}</span></h1>
            </div>
        </div>
    );
};

export default NotificationCard;