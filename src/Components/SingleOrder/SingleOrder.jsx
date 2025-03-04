import React, { useEffect, useState } from 'react';
import Search from '../../icons/Search';
import BaseUrl from '../../Constant';
import InvoiceCard from '../Invoice/InvoiceCard';
import Caculation from './Caculation';
import Tabeheader from '../Invoice/Tableheader';

const SingleOrder = () => {
    const [data, setData] = useState([]);
    const [user, setUse] = useState({});
    const [invoice_id, setInvoiceId] = useState('')

    const SingleOrder = async () => {
        try {
            const response = await fetch(`${BaseUrl}/api/get/order/${invoice_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setData(data?.items || []);
            setUse(data?.user || null);
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    };

    console.log(user)
    return (
        <div className='relative px-4 pt-5'>
            {/* <div className='flex justify-between items-center py-3'>
                <div>
                    <h1 className='font-semibold'>Sell Product</h1>
                </div>
                <div className='relative border rounded'>
                    <input type='text' placeholder='Enter invoice number' onKeyDown={(e) => { if (e.key === "Enter") { SingleOrder() } }} onChange={(e) => { setInvoiceId(e.target.value) }} className='px-2 py-1 rounded focus:outline-none' />
                    <Search className='absolute right-1 top-1.5' onClick={SingleOrder} />
                </div>
            </div> */}

            <div className='flex justify-between pb-1'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='font-semibold w-[90px]'>ঠিকানা</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-semibold'>:</h1>
                        <input placeholder={user?.state} readOnly={true} className='border focus:outline-none rounded p-1 border-black text-black' />
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='font-semibold'>তারিখ</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-semibold'>:</h1>
                        <input placeholder={user?.date} readOnly={true} className='border focus:outline-none rounded p-1 border-black text-black' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between py-1'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='font-semibold w-[90px]'>নাম</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-semibold'>:</h1>
                        <input placeholder={user?.name} readOnly={true} className='border focus:outline-none rounded p-1 border-black text-black' />
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='font-semibold'>মেমো নং</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-semibold'>:</h1>
                        <input placeholder={user?.invoice_id} onKeyDown={(e) => { if (e.key === "Enter") { SingleOrder() } }} onChange={(e) => { setInvoiceId(e.target.value) }} className='border focus:outline-none rounded p-1 border-black text-black' />
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex justify-start gap-3 items-center py-1'>
                    <h1 className='font-semibold w-[90px]'>মোবাইল</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-semibold'>:</h1>
                        <input placeholder={user?.contact} readOnly={true} className='border focus:outline-none rounded p-1 border-black text-black' />
                    </div>
                </div>
                <div className='flex justify-end gap-3 items-center'>
                    <h1 className='font-semibold'>ডিসকাউন্ট</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-semibold'>:</h1>
                        <input placeholder={user?.discountType} readOnly={true} className='border focus:outline-none rounded p-1 border-black text-black' />
                    </div>
                </div>
            </div>

            <div className='relative overflow-x-auto my-5'>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Tabeheader />
                    <tbody>
                        {data?.map((item) => {
                            return <InvoiceCard key={item?.id} id={item?.id} name={item?.name} qty={item?.qty} cost={item?.cost} price={item?.price} />
                        })}
                        <Caculation
                            data={data}
                            discount={user?.discount}
                            discountType={user?.discount_type}
                            due={user?.due}
                            pay={500}
                        />

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleOrder;