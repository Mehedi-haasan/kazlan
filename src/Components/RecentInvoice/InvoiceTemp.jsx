import React from "react";
import Updown from "../../icons/Updown";
import { ReturnSaleCode } from "../Input/Time";

import { useNavigate } from "react-router-dom";


const InvoiceTemp = ({ invoices = [], prefix = "KB" }) => {
    const goto = useNavigate()

    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }



    return (
        <div className="pt-3">
            <div className="w-full overflow-hidden overflow-x-auto">
                <table className="text-sm text-left text-gray-500 w-full min-w-[700px] rounded">
                    <thead className="text-sm text-left  text-black rounded bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                        <tr className='border'>
                            <th scope="col" className="px-3 py-3 border-r ">
                                <div className="flex justify-between items-center">
                                    Date
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 border-r ">
                                <div className="flex justify-between items-center">
                                    Invoice
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Customer
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Warehouse
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Total
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Paid
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Due
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Created by
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Edited
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Sale Type
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Order Type
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-right border-r ">
                                <div className="flex justify-between items-center">
                                    Delivery Date
                                    <Updown />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((item, i) => (
                            <tr key={i} className={`border-b cursor-pointer ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}
                                onClick={() => {
                                    if (item?.type === "Sale" || item?.type === "Purchase items") {
                                        goto(`/invoice/${item?.id}/${item?.type}`)
                                    } else if (item?.type === "Sale Return" || item?.type === "Return Purchase") {
                                        goto(`/return/invoice/${item?.id}/${item?.type}`)
                                    } else {
                                        goto(`/opening/invoice/${item?.id}/${item?.type}`)
                                    }
                                }}>
                                <th scope="col" className="px-3 py-3 border-x font-thin ">{formatDate(item?.createdAt)}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.customername}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.shopname}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.total}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.paidamount}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.due}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.creator}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin flex justify-center items-center">
                                    {item?.is_edit && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd" />
                                    </svg>}
                                </th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.type}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.order_type}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{formatDate(item?.deliverydate)}</th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InvoiceTemp
