import React, { useEffect, useState } from 'react';
import BarCode from '../../icons/BarCode';
import OrderCard from './OrderCard';
import Search from '../../icons/Search';
import BaseUrl from '../../Constant';
import Edit from '../../icons/Edit';
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent';
import Updown from '../../icons/Updown';
import Remove from '../../icons/Remove';
import ShowEntries from '../Input/ShowEntries';

const Order = ({ category = [], type = [], brand = [], entries = [], shop = [], state = [], paytype = [], user = [] }) => {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([])


    const getOrder = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setData(data.items)
    }
    useEffect(() => {
        getOrder()
    }, [])


    const SearchProduct = async (e) => {
        e.preventDefault();
        const id = e.target.value
        const token = localStorage.getItem('token')
        if (id) {
            const response = await fetch(`${BaseUrl}/api/product/single/order/${id}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setData(data.items)
        } else {
            setData(searchData);
        }
    }

    return (
        <div className='bg-white relative pt-5 px-2'>
            {/* <div className='flex justify-center w-full pb-1.5'>
                <div className='border rounded-l py-1 px-3 cursor-pointer text-[#008CFF] flex justify-center items-center'>
                    <BarCode />
                </div>
                <div className='relative border-y border-r rounded-r text-black w-full'>
                    <input type='text' placeholder='স্ক্যান / পণ্যের নাম লিখুন' onChange={SearchProduct} className='p-1 my-auto rounded focus:outline-none w-full' />
                    <Search className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 rounded-full' />
                </div>
            </div> */}

            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Order List</h1>
                <Button name={'Create item'} />
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <SelectionComponent options={type} label={'Customer'} />
                    </div>
                    <div>
                        <SelectionComponent options={user} label={'User'} />
                    </div>
                    <div>
                        <SelectionComponent options={user} label={'From Date'} />
                    </div>
                    <div>
                        <SelectionComponent options={shop} label={'To Date'} />
                    </div>

                </div>

                <div className='flex justify-between items-center my-3'>
                    <div>
                        <ShowEntries options={entries} />
                    </div>
                    <div className="flex justify-start items-center gap-1.5 mt-5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name" className="focus:outline-none border rounded p-1.5 " />
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
                                        Item Code
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Category
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Purchase Price
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Sale price
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Quantity
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
                                data?.map((item) => (
                                    <OrderCard item={item}/>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-normal'>Showing 1 to 3 of 3 entries</h1>
                    <div>
                        <button className="border-y border-l rounded-l py-1.5 px-3 bg-blue-50">Prev</button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">1</button>
                        <button className="border-y border-r rounded-r py-1.5 px-3 bg-blue-50">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Order;