import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard';
import BaseUrl from '../../Constant';

const Notification = () => {
    const [data, setData] = useState([]);

    const getOrder = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/notification`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setData(data.items)
        console.log(data?.items)
    }
    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div>
            <h1 className='text-center font-semibold pb-1'>Notification</h1>
            <hr className='py-1'/>

            {data?.map((item) => {
                return <NotificationCard key={item?.id} item={item} />
            })}

        </div>
    );
};

export default Notification;