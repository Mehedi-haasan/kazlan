import React from "react";
import Updown from "../../icons/Updown";


const Invoice = ({ item }) => {
    return (
        <div className="pt-3">
        <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr className='border'>
                    <th className="w-4 py-3 px-4 border-r">
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
                    <th scope="col" className="px-3 py-3 text-center border-r">
                        <div className="flex justify-between items-center">
                            Task
                            <Updown />
                        </div>
                    </th>
                    <th scope="col" className="px-3 py-3 text-center border-r">
                        <div className="flex justify-between items-center">
                            Assigned Person
                            <Updown />
                        </div>
                    </th>
                    <th scope="col" className="px-3 py-3 text-center border-r">
                        <div className="flex justify-between items-center">
                            Status
                            <Updown />
                        </div>
                    </th>
                    <th scope="col" className="px-3 py-3 text-center border-r">
                        <div className="flex justify-between items-center">
                            Piroty
                            <Updown />
                        </div>
                    </th>
                    <th scope="col" className="px-3 py-3 text-right border-r">
                        <div className="flex justify-between items-center">
                            Delivery Date
                            <Updown />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>


                {
                    [1, 2, 3].map((item) => (
                        <tr className='border-b'>
                            <th className="w-4 py-3 px-4 border-x">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 border-r">Samsung</th>
                            <th scope="col" className="px-3 py-3 border-r">0123456789</th>
                            <th scope="col" className="px-3 py-3 border-r">example@gmail.com</th>
                            <th scope="col" className="px-3 py-3 border-r">Paid</th>
                            <th scope="col" className="px-3 py-3 border-r">Dhaka Uttara</th>
                            <th scope="col" className="px-3 py-3 border-r">250</th>
                        </tr>
                    ))
                }


            </tbody>
        </table>
    </div>
    )
}

export default Invoice
