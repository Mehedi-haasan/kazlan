import React from "react";
import { ReturnSaleCode, formatDate } from "../Input/Time";
const InvoHeader = ({ user, params, state, prefix = 'KB', invoice }) => {

    return (
        <div className="text-[15px]">
            <div className='flex justify-between pb-1 pt-2'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900 w-[60px]' id="kalpurush">নাম</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.name} value={user?.name} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[220px]' id="kalpurush"/>
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900' id="kalpurush">মেমো নং</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={`${prefix}/${ReturnSaleCode(invoice?.type)}-00${invoice?.id}`} value={`${prefix}/${ReturnSaleCode(invoice?.type)}-000${invoice?.id}`} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[170px]' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='w-[60px] text-gray-900 ' id="kalpurush">ঠিকানা</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={`${user?.address}, ${user?.state}`} value={`${user?.address}${user?.usertype === "Supplier" ? '' : `, ${user?.state}`}`} readOnly={true} className='border focus:outline-none rounded p-1 font-thin  w-[220px]' id="kalpurush"/>
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900' id="kalpurush">তারিখ</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={formatDate(invoice?.createdAt)} value={formatDate(invoice?.createdAt)} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[170px]' />
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex justify-start gap-3 items-center py-1'>
                    <h1 className='text-gray-900 w-[60px]' id="kalpurush">মোবাইল</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.phone} value={user?.phone} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[220px]' id="kalpurush"/>
                    </div>
                </div>

                <div>
                    {
                        invoice?.sup_invo && <div className='flex justify-end gap-2 items-center py-1'>
                            <h1 className='text-gray-900 w-[80px] text-right' id="kalpurush">চালান নং</h1>
                            <div className='flex justify-end items-center gap-3'>
                                <h1 className='font-thin'>:</h1>
                                <input placeholder={invoice?.sup_invo} value={invoice?.sup_invo} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[170px]' id="kalpurush"/>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default InvoHeader