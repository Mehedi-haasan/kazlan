import React, { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';

const Profile = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const GetUser = async () => {
            const token = localStorage.getItem('token')
            const response = await fetch(`${BaseUrl}/api/get/single/users`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });
            const data = await response.json()
            setUser(data?.items || {})
        }

        GetUser()
    }, [])

    return (
        <div className='min-h-screen'>
            <h1 className='font-semibold text-center py-5 text-xl '>My Profile</h1>
            <div className='border-t-[1px] p-6'>
                <img src={user?.image_url ? user?.image_url : `https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt='fjgkfd' className='h-[120px] w-[120px] mx-auto rounded-s-none' />
                <h1 className='font-semibold text-center pt-4 pb-1'>Name : {user?.first_name} {user?.last_name}</h1>
                <h1 className='font-semibold text-center py-1'>Email : {user?.email}</h1>
                <h1 className='font-semibold text-center py-1'>Mobile : {user?.username}</h1>
            </div>
        </div>
    );
};

export default Profile;