import React, { useEffect, useState } from "react";
import Updown from "../../icons/Updown";
import BaseUrl from "../../Constant";


const Invoice = () => {

    const [invoices, setInvoices] = useState([]);
    const RecentInvoice = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/user/recent/order/${1}/${15}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();
        setInvoices(data?.items)
    }

    useEffect(() => {
        RecentInvoice(invoices)
    }, [])


    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    return (
        <div className="pt-3">
            <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-sm text-gray-900 dark:text-gray-400">
                    <tr className='border'>
                        <th className="w-4 py-3 px-4 border-r ">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
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
                                Assigned Person
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
                                Piroty
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


                    {
                        invoices?.map((item) => (
                            <tr className='border-b'>
                                <th className="w-4 py-3 px-4 border-x">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">#{item?.id}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.customername}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.shopname}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.total}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.paidamount}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.due}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.creator}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.status}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{'Argent'}</th>
                                <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    )
}

export default Invoice
