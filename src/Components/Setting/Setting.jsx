import React, { useState, useEffect } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";

const Setting = () => {
    const [user, setUser] = useState({});
    const [select, setSelect] = useState('General')

    useEffect(() => {
        document.title = `${select} Setting - Kazaland Brothers`;
    }, [select]);
    
    return (
        <div className='min-h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-3 py-5'>
                <div className='grid col-span-1 '>
                    <div className='p-3 md:p-4 lg:p-5 bg-[#FFFFFF] rounded border shadow'>
                        <h1 className='py-2 text-lg'>Setting</h1>
                        <button onClick={() => setSelect('General')} className="flex justify-start items-center gap-2 p-2 hover:bg-blue-500 hover:text-white rounded w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                            <h1>General</h1>
                        </button>
                        <button onClick={() => setSelect('App')} className="flex justify-start items-center gap-2 p-2 hover:bg-blue-500 hover:text-white rounded w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zm1-2h12l-3.75-5l-3 4L9 13zm-1 2V5z" /></svg>
                            <h1>App Logo</h1>
                        </button>
                        <button onClick={() => setSelect('Email')} className="flex justify-start items-center gap-2 p-2 hover:bg-blue-500 hover:text-white rounded w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z" /></svg>
                            <h1>Email Setting</h1>
                        </button>
                        <button onClick={() => setSelect('SMS')} className="flex justify-start items-center gap-2 p-2 hover:bg-blue-500 hover:text-white rounded w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6 18l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-.85-2H20V4H4v13.125zM4 16V4zm4-5q.425 0 .713-.288T9 10t-.288-.712T8 9t-.712.288T7 10t.288.713T8 11m4 0q.425 0 .713-.288T13 10t-.288-.712T12 9t-.712.288T11 10t.288.713T12 11m4 0q.425 0 .713-.288T17 10t-.288-.712T16 9t-.712.288T15 10t.288.713T16 11" /></svg>
                            <h1>SMS Setting</h1>
                        </button>
                    </div>
                </div>
                <div className={`grid col-span-1 lg:col-span-2 xl:col-span-3 ${select === "General" ? '' : 'hidden'}`}>
                    <div >

                        <div className='px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 bg-[#FFFFFF] rounded-t border-b shadow'>
                            <h1 className='pt-1 pb-3'>Genarel</h1>
                        </div>
                        <div className='px-3 md:px-4 lg:px-5 pv-3 md:pv-4 lg:pv-5 bg-[#FFFFFF] rounded-b shadow'>
                            <InputComponent label={'Application Name'} placeholder={user?.first_name} />
                            <InputComponent label={'Footer text'} placeholder={user?.last_name} />
                            <InputComponent label={'Email'} placeholder={user?.email} />
                            <InputComponent label={'Mobile'} placeholder={user?.username} />
                            <InputComponent label={'Address'} placeholder={user?.address} />
                            <InputComponent label={'State'} placeholder={user?.stateId} />
                            <div className='py-3'>
                                <Button onClick={() => { }} name={'Submit'} />
                                <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`grid col-span-1 lg:col-span-2 xl:col-span-3 ${select === "App" ? '' : 'hidden'}`}>
                    <div >

                        <div className='px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 bg-[#FFFFFF] rounded-t border-b shadow'>
                            <h1 className='pt-1 pb-3'>Genarel</h1>
                        </div>
                        <div className='px-3 md:px-4 lg:px-5 pv-3 md:pv-4 lg:pv-5 bg-[#FFFFFF] rounded-b shadow'>
                            <h1 className="pt-3 pb-1">Favicon</h1>
                            <div className='border h-[120px] w-[120px] flex justify-center items-center rounded-md'>
                                <img src={`https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt='fjgkfd' className='h-[100px] w-[100px] rounded-s-none' />
                            </div>
                            <h1 className="pt-3 pb-1">Colored Logo</h1>
                            <div className='border h-[120px] w-[120px] flex justify-center items-center rounded-md'>
                                <img src={`https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt='fjgkfd' className='h-[100px] w-[100px] rounded-s-none' />
                            </div>
                            <div className='py-3'>
                                <Button onClick={() => { }} name={'Submit'} />
                                <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                            </div>
                        </div>
                    </div>
                </div>




                <div className={`grid col-span-1 lg:col-span-2 xl:col-span-3 ${select === "Email" ? '' : 'hidden'}`}>
                    <div >

                        <div className='px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 bg-[#FFFFFF] rounded-t border-b shadow'>
                            <h1 className='pt-1 pb-3'>SMTP Settings</h1>
                        </div>
                        <div className='px-3 md:px-4 lg:px-5 pv-3 md:pv-4 lg:pv-5 bg-[#FFFFFF] rounded-b shadow'>
                            <InputComponent label={'Host'} placeholder={user?.first_name} />
                            <InputComponent label={'Port'} placeholder={user?.last_name} />
                            <InputComponent label={'Username'} placeholder={user?.email} />
                            <InputComponent label={'Password'} placeholder={user?.username} />
                            <InputComponent label={'Encryption'} placeholder={user?.address} />
                            <InputComponent label={'Status'} placeholder={user?.stateId} />
                            <div className='py-3'>
                                <Button onClick={() => { }} name={'Submit'} />
                                <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`grid col-span-1 lg:col-span-2 xl:col-span-3 ${select === "SMS" ? '' : 'hidden'}`}>
                    <div >

                        <div className='px-3 md:px-4 lg:px-5 pt-3 md:pt-4 lg:pt-5 bg-[#FFFFFF] rounded-t border-b shadow'>
                            <h1 className='pt-1 pb-3'>SMS Setting</h1>
                        </div>
                        <div className='px-3 md:px-4 lg:px-5 pv-3 md:pv-4 lg:pv-5 bg-[#FFFFFF] rounded-b shadow pt-2'>
                            <InputComponent label={'Application Name'} placeholder={user?.first_name} />
                            <InputComponent label={'Footer text'} placeholder={user?.last_name} />
                            <InputComponent label={'Email'} placeholder={user?.email} />
                            <InputComponent label={'Mobile'} placeholder={user?.username} />
                            <InputComponent label={'Address'} placeholder={user?.address} />
                            <InputComponent label={'State'} placeholder={user?.stateId} />
                            <div className='py-3'>
                                <Button onClick={() => { }} name={'Submit'} />
                                <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default Setting