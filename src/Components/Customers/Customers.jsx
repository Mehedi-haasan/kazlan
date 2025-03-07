import React from "react";
import Updown from '../../icons/Updown'
import Remove from '../../icons/Remove'
import ShowEntries from "../Input/ShowEntries";
import { NavLink } from "react-router-dom";
import Edit from "../../icons/Edit";

const Customers = () => {
    let entries = [{ id: 1, name: "10" }, { id: 2, name: "20" }]
    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen">
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Customer List</h1>
                <NavLink to={`/registration`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4`}>Create Customer</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={entries} />
                    </div>
                    <div className="flex justify-end items-center gap-1.5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name" className="focus:outline-none border rounded p-1" />
                    </div>
                </div>
                <div className="pt-3">
                    <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr className='border'>
                                <th className="w-4 py-2 px-4 border-r">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 border-r ">
                                    <div className="flex justify-between items-center">
                                        Name
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Mobile
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Email
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Whatsapp
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Address
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Balence
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        status
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="pl-4 pr-1 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                [1, 2, 3].map((item) => (
                                    <tr className='border-b'>
                                        <th className="w-4 py-2 px-4 border-x">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-2 border-r">Samsung</th>
                                        <th scope="col" className="px-2 py-2 border-r">0123456789</th>
                                        <th scope="col" className="px-2 py-2 border-r">example@gmail.com</th>
                                        <th scope="col" className="px-2 py-2 border-r">0123456789</th>
                                        <th scope="col" className="px-2 py-2 border-r">Dhaka Uttara</th>
                                        <th scope="col" className="px-2 py-2 border-r">250</th>
                                        <th scope="col" className="px-2 py-2 border-r">Paid</th>
                                        <th scope="col" className="px-2 py-2 flex justify-end items-center border-r gap-2">
                                            <Edit />
                                            <Remove />
                                        </th>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1>Showing 1 to 3 of 3 entries</h1>
                    <div>
                        <button className="border-y border-l rounded-l py-1.5 px-3">Prev</button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">1</button>
                        <button className="border-y border-r rounded-r py-1.5 px-3">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers