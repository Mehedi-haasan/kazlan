import { useEffect, useState, useRef } from 'react';
import InvoiceCard from './InvoiceCard';

const ExpenseCard = ({ data, name }) => {



    return (
        <div>
            <h1 className='p-2 text-center'>{name}</h1>
            <div className='border grid grid-cols-3 text-black'>
                <h1 className="p-2">Name</h1>
                <h1 className="p-2 border-l">Invoice No</h1>
                <h1 className="p-2 border-l text-right">Amount</h1>
            </div>
            {
                data?.map((item) => {
                    return <InvoiceCard key={item?.id} item={item} />
                })
            }
            <div className='grid grid-cols-2 text-[14px] font-thin'>
                <h1 className='border-x border-b p-2'>Total</h1>
                <h1 className='border-r border-b p-2 text-right'>{500}</h1>
            </div>
        </div>
    );
}

export default ExpenseCard;