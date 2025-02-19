import React, { useEffect, useState } from 'react';
import Search from '../../icons/Search';
import Invoice from '../Invoice/Invoice';
import BaseUrl from '../../Constant';

const SingleOrder = () => {
    const [data, setData] = useState([]);
    const [invoice_id, setInvoiceId] = useState('')

    const SingleOrder = async () => {
        const response = await fetch(`${BaseUrl}/api/get/order/${invoice_id}`);
        const data = await response.json();
        setData(data?.items)
    }


    return (
        <div className='relative'>
            <div className='flex justify-between items-center py-3 px-4'>
                <div>
                    <h1 className='font-semibold'>Sell Product</h1>
                </div>
                <div className='relative border rounded'>
                    <input type='text' placeholder='Enter invoice number' onChange={(e) => { setInvoiceId(e.target.value) }} className='px-2 py-1 rounded focus:outline-none' />
                    <Search className='absolute right-1 top-1.5' onClick={SingleOrder} />
                </div>
            </div>

            <Invoice data={data} isOrder={false} />
        </div>
    );
};

export default SingleOrder;