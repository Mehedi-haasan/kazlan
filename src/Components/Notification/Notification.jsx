import React, { useEffect } from 'react';
import NotificationCard from './NotificationCard';

const Notification = ({ data }) => {
    useEffect(() => {
        document.title = `Notifications - Kazaland Brothers`;
    }, []);

    return (
        <div className='pt-5 px-2 min-h-screen pb-12'>
            <h1 className='text-center font-semibold pb-1'>Notification</h1>
            <hr className='py-1' />

            {data?.map((item) => {
                return <NotificationCard key={item?.id} item={item} />
            })}

        </div>
    );
};

export default Notification;