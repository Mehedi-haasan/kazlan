import React from "react";
import { ReturnSaleCode, formatDate } from "../Input/Time";
const InvoHeader = ({ user, params, state, prefix = 'KB', invoice }) => {

    return (
        <div className="text-[15px]">
            <div className='flex justify-between pb-1'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-black w-[60px]' id="kalpurush">নাম</h1>
                    <div className='flex justify-start items-center gap-3 align-top' id="kalpurush">
                        <h1 className='font-thin'>:</h1>
                        <h1 className="font-thin">{user?.name}</h1>
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-black' id="kalpurush">মেমো নং</h1>
                    <div className='flex justify-start items-center gap-3 align-top'>
                        <h1 className='font-thin'>:</h1>
                        <h1 className="w-[170px] font-thin">{`${prefix}/${ReturnSaleCode(invoice?.type)}-000${invoice?.id}`}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='w-[60px] text-black ' id="kalpurush">ঠিকানা</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1 className="font-thin" id="kalpurush">{`${user?.address}${user?.usertype === "Supplier" ? '' : `, ${user?.state}`}`}</h1>
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-black' id="kalpurush">তারিখ</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1 className="w-[170px] font-thin">{formatDate(invoice?.createdAt)}</h1>

                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex justify-start gap-3 items-center py-1'>
                    <h1 className='text-black w-[60px]' id="kalpurush">মোবাইল</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1 id="kalpurush" className="font-thin">{user?.phone}</h1>
                    </div>
                </div>

                <div>
                    {
                        invoice?.sup_invo && <div className='flex justify-end gap-2 items-center py-1'>
                            <h1 className='text-black w-[80px] text-right' id="kalpurush">চালান নং</h1>
                            <div className='flex justify-end items-center gap-3'>
                                <h1 className='font-thin'>:</h1>
                                <h1 id="kalpurush" className="w-[170px] font-thin">{invoice?.sup_invo}</h1>

                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default InvoHeader