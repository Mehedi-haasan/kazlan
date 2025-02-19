import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard';
import BaseUrl from '../../Constant';
import ImageGenarate from '../Image/ImageGenarate'

const Notification = () => {
    const [data, setData] = useState([
        {
            id:1,
            name:"Mehedi Hasan",
            product_name:"Book"
        }
    ]);
    const getOrder = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setData(data.items)
    }
    useEffect(() => {
        // getOrder()
    }, [])

    return (
        <div>
            <h1 className='text-center font-semibold pb-1'>Notification</h1>
            <hr className='py-1'/>

            {data?.map((item) => {
                return <NotificationCard key={item?.id} item={item} />
            })}

            <ImageGenarate/>
        </div>
    );
};

export default Notification;