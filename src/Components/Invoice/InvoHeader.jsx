import React from "react";

const InvoHeader = ({ user, params, prefix = 'KB' }) => {
 

    const ReturnSaleCode = (type) => {
        let saleType = "SL"
        if (type === "Sale") {
            saleType = "SL"
        } else if (type === "Sale Return") {
            saleType = "SR"
        } else if (type === "Return Purchase") {
            saleType = "PR"
        } else if (type === "Purchase items") {
            saleType = "PO"
        }

        return saleType
    }

    return (
        <div>
            <div className='flex justify-between pb-1 pt-2'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900 w-[80px]'>নাম</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.name} value={user?.name} readOnly={true} className='border focus:outline-none rounded p-1 font-thin w-[220px]' />
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900'>মেমো নং</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={`${prefix}/${ReturnSaleCode(user?.type)}-00${params?.id}`} value={`${prefix}/${ReturnSaleCode(user?.type)}-000${params?.id}`} readOnly={true} className='border focus:outline-none rounded p-1 font-thin' />
                    </div>
                </div>
            </div>
            <div className='flex justify-between '>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='w-[80px] text-gray-900'>ঠিকানা</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={`${user?.address}, ${user?.state}`} value={`${user?.address}, ${user?.state}`} readOnly={true} className='border focus:outline-none rounded p-1 font-thin  w-[220px]' />
                    </div>
                </div>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='text-gray-900'>তারিখ</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.date} value={user?.date} readOnly={true} className='border focus:outline-none rounded p-1 font-thin' />
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='flex justify-start gap-3 items-center py-1'>
                    <h1 className='text-gray-900 w-[80px]'>মোবাইল</h1>
                    <div className='flex justify-start items-center gap-3'>
                        <h1 className='font-thin'>:</h1>
                        <input placeholder={user?.phone} value={user?.phone} readOnly={true} className='border focus:outline-none rounded p-1 font-thin  w-[220px]' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InvoHeader