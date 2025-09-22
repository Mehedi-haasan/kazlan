import React from "react";
import { ReturnSaleCode } from "../Input/Time";

const PdfHeader = ({ user, params, prefix = 'KB' }) => {


    return (
        <div className="text-[14px] font-thin">
            <div className='flex justify-between pb-1 pt-2'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900 w-[80px]'>নাম</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1>{user?.name}</h1>
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900'>মেমো নং</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1>{prefix}/{ReturnSaleCode(user?.type)}-{String(params?.id).padStart(5, '0')}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='w-[80px] text-gray-900'>ঠিকানা</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1>{`${user?.address}, ${user?.state}`}</h1>
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900'>তারিখ</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1>{user?.date}</h1>
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex justify-start gap-3 items-center py-1'>
                    <h1 className='text-gray-900 w-[80px]'>মোবাইল</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <h1>{user?.phone}</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PdfHeader