import React, { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import { NavLink } from 'react-router-dom';
import Modal from '../Input/Modal';

const Notification = ({ data }) => {
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        document.title = `Notifications - Kazaland Brothers`;
    }, []);

    return (
        <div className='pt-5 px-2 min-h-screen pb-12'>
            <div className='flex justify-between items-center pb-2'>
                <h1 className='text-center font-semibold'>Announcement</h1>
                <NavLink onClick={() => { setEdit(true) }} className={`border px-5 py-1.5 rounded-md shadow bg-blue-500 text-white`}>Create Announcement</NavLink>
            </div>
            <hr className='py-1' />

            {data?.map((item) => {
                return <NotificationCard key={item?.id} item={item} />
            })}


            <Modal show={edit} handleClose={() => { setEdit(false) }} size={`800px`} className=''>
                Hello
            </Modal>

        </div>
    );
};

export default Notification;