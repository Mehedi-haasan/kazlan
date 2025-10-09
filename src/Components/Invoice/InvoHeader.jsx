import React from "react";
import { ReturnSaleCode } from "../Input/Time";
const InvoHeader = ({ user, params, prefix = 'KB', invoice }) => {



    return (
        <div >
            <div className='flex justify-between pb-1 pt-2'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900 w-[80px]' id="bnc-unicode-textarea">নাম</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.name} value={user?.name} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[220px]' />
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900' id="bnc-unicode-textarea">মেমো নং</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={`${prefix}/${ReturnSaleCode(user?.type)}-00${params?.id}`} value={`${prefix}/${ReturnSaleCode(user?.type)}-000${params?.id}`} readOnly={true} className='border focus:outline-none rounded p-1 font-thin' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='w-[80px] text-gray-900' id="bnc-unicode-textarea">ঠিকানা</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={`${user?.address}, ${user?.state}`} value={`${user?.address}, ${user?.state}`} readOnly={true} className='border focus:outline-none rounded p-1 font-thin  w-[220px]' />
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900' id="bnc-unicode-textarea">তারিখ</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.date} value={user?.date} readOnly={true} className='border focus:outline-none rounded p-1 font-thin' />
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex justify-start gap-3 items-center py-1'>
                    <h1 className='text-gray-900 w-[80px]' id="bnc-unicode-textarea">মোবাইল</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.phone} value={user?.phone} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[220px]' />
                    </div>
                </div>

                <div>
                    {
                        invoice?.sup_invo && <div className='flex justify-start gap-3 items-center py-1'>
                            <h1 className='text-gray-900 w-[80px]' id="bnc-unicode-textarea">চালান নং</h1>
                            <div className='flex justify-start items-center gap-3'>
                                <h1 className='font-thin'>:</h1>
                                <input placeholder={invoice?.sup_invo} value={invoice?.sup_invo} readOnly={true} className='border focus:outline-none rounded p-1 font-thin' />
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default InvoHeader