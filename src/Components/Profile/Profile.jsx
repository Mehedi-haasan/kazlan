import React, { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';

const Profile = () => {
    const [user, setUser] = useState({});
    const [select, setSelect] = useState('Profile')

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
        document.title = `Profile - Kazaland Brothers`;
        GetUser()
    }, [])


    const UpdateUser = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BaseUrl}/api/update/single/users`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(user)
        });
        const data = await response.json()
    }

    const ChangePassword = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BaseUrl}/api/update/user/password`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(user)
        });
        const data = await response.json()
    }

    return (
        <div className='min-h-screen pb-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-3 py-5'>
                <div className='grid col-span-1 '>
                    <div className='p-3 md:p-4 lg:p-5 bg-[#FFFFFF] rounded border shadow'>
                        <h1 className='py-2 text-lg'>Options</h1>
                        <button onClick={() => { setSelect("Profile") }} className={`flex justify-start items-center gap-2 p-2 ${select === "Profile" ? 'bg-blue-500 text-white' : ''} hover:bg-blue-500 hover:text-white rounded w-full`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                            <h1>Profile</h1>
                        </button>
                        <button onClick={() => { setSelect("Password") }} className={`flex justify-start items-center gap-2 mt-1 p-2 ${select === "Password" ? 'bg-blue-500 text-white' : ''} hover:bg-blue-500 hover:text-white rounded w-full`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M5 10h14v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" opacity="0.16" /><path stroke="currentColor" strokeLinecap="round" stroke-width="2" d="M8 10V7a4 4 0 0 1 7.874-1" /><path stroke="currentColor" stroke-linejoin="round" strokeWidth="2" d="M5 10h14v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" /><path stroke="currentColor" stroke-linejoin="round" stroke-width="3" d="M14.5 15.5h.01v.01h-.01z" /></g></svg>
                            <h1>Change Password</h1>
                        </button>
                    </div>
                </div>

                {select === "Profile" && <div className='grid col-span-1 lg:col-span-2 xl:col-span-3 '>
                    <div className='p-3 md:p-4 lg:p-5 bg-[#FFFFFF] rounded border shadow'>
                        <h1 className='py-1'>Profile Picture</h1>
                        <div className='border h-[120px] w-[120px] flex justify-center items-center rounded-md'>
                            <img src={user?.image_url ? user?.image_url : `https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt='fjgkfd' className='h-[100px] w-[100px] rounded-s-none' />
                        </div>
                        <InputComponent label={'Full Name'} onChange={(v) => { setUser({ ...user, name: v }) }} placeholder={user?.name} />
                        <InputComponent label={'Mobile'} onChange={(v) => { setUser({ ...user, username: v }) }} placeholder={user?.username} />
                        <InputComponent label={'Email'} onChange={(v) => { setUser({ ...user, email: v }) }} placeholder={user?.email} />
                        <InputComponent label={'Bank Name'} onChange={(v) => { setUser({ ...user, bankname: v }) }} placeholder={user?.bankname} />
                        <InputComponent label={'Account Name'} onChange={(v) => { setUser({ ...user, accountname: v }) }} placeholder={user?.accountname} />
                        <InputComponent label={'Account Name'} onChange={(v) => { setUser({ ...user, accountnumber: v }) }} placeholder={user?.accountnumber} />
                        <InputComponent label={'Address'} onChange={(v) => { setUser({ ...user, address: v }) }} placeholder={user?.address} />
                        <InputComponent label={'State'} onChange={(v) => { setUser({ ...user, stateId: v }) }} placeholder={user?.state?.name} readOnly={true} />
                        <div className='py-3'>
                            <Button onClick={UpdateUser} name={'Submit'} />
                            <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                        </div>
                    </div>
                </div>}

                {select === "Password" && <div className='grid col-span-1 lg:col-span-2 xl:col-span-3 '>
                    <div className='p-3 md:p-4 lg:p-5 bg-[#FFFFFF] rounded border shadow'>
                        <h1 className='pb-5 pt-1'>Change Password</h1>

                        <InputComponent label={'New Password'} onChange={(v) => { setUser({ ...user, password: v }) }} placeholder={"Enter new password"} />
                        <InputComponent label={'Confirm Password'} onChange={(v) => { setUser({ ...user, password: v }) }} placeholder={"Enter Confirm password"} />

                        <div className='py-3'>
                            <Button onClick={ChangePassword} name={'Change Password'} />
                            <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                        </div>
                    </div>
                </div>}


            </div>





        </div>
    );
};

export default Profile;