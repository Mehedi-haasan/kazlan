import React, { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import { NavLink } from 'react-router-dom';
import Modal from '../Input/Modal';
import Button from '../Input/Button'
import BaseUrl from '../../Constant';

const Notification = ({ data, info = {} }) => {

    const [edit, setEdit] = useState(false)
    const [mgs, setMgs] = useState('')

    useEffect(() => {
        document.title = `Notifications - Kazaland Brothers`;
    }, []);

    const Announcement = async () => {
        if (mgs === '') {
            return
        }
        const token = localStorage.getItem('token')
        const res = await fetch(`${BaseUrl}/api/create/announcement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify({ mgs: mgs, shop: '' })
        })
        const data = await res.json();
    }

    return (
        <div className='pt-5 px-2 min-h-screen pb-12'>
            <div className='flex justify-between items-center pb-2'>
                <h1 className='text-center font-semibold'>Announcement</h1>
                {info?.role === "superadmin" && <NavLink onClick={() => { setEdit(true) }} className={`border px-5 py-1.5 rounded-md shadow bg-blue-500 text-white`}>Create Announcement</NavLink>}
            </div>
            <hr className='py-1' />

            {data?.map((item) => {
                return <NotificationCard key={item?.id} item={item} />
            })}


            <Modal show={edit} handleClose={() => { setEdit(false) }} size={`800px`} className=''>
                <div>
                    <h1 className='pb-1'>Create Announcement</h1>
                    <textarea onChange={(e) => { setMgs(e.target.value) }} placeholder='Enter your announcment' className='border w-full focus:outline-none rounded p-1 text-black font-thin' />
                    <Button name={'Submit'} onClick={Announcement} />
                </div>
            </Modal>

        </div>
    );
};

export default Notification;