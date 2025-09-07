import React from "react";
import Updown from "../../icons/Updown";

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
        } else if (type === "Opening") {
            saleType = "OP"
        } else {
            saleType = "MP"
        }

        return saleType
    }

    return (
        <div className="pt-3">
            <div className="w-full overflow-hidden overflow-x-auto">
                <table className="text-sm text-left text-gray-500 w-full min-w-[700px] rounded">
                    <thead className=" text-sm text-left  text-black rounded bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                        <tr className='border'>
                            {/* <th className="w-4 py-3 px-4 border-r ">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </th> */}
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
                                    Status
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
                                        goto(`/invoice/${item?.id}`)
                                    } else if (item?.type === "Sale Return" || item?.type === "Return Purchase") {
                                        goto(`/return/invoice/${item?.id}`)
                                    } else {
                                        goto(`/opening/invoice/${item?.id}`)
                                    }
                                }}>
                                {/* <th className="w-4 py-3 px-4 border-x">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th> */}
                                <th scope="col" className="px-3 py-3 border-x font-thin ">{formatDate(item?.createdAt)}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.customername}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.shopname}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.total}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.paidamount}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.due}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.creator}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.status}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.type}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.methodname}</th>
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
