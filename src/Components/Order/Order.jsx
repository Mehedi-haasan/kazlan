import React, { useEffect, useState } from 'react';
import BarCode from '../../icons/BarCode';
import OrderCard from './OrderCard';
import Search from '../../icons/Search';
import BaseUrl from '../../Constant';

const Order = () => {
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
            <div className='flex justify-center w-full pb-1.5'>
                <div className='border rounded-l py-1 px-3 cursor-pointer text-[#008CFF] flex justify-center items-center'>
                    <BarCode />
                </div>
                <div className='relative border-y border-r rounded-r text-black w-full'>
                    <input type='text' placeholder='স্ক্যান / পণ্যের নাম লিখুন' onChange={SearchProduct} className='p-1 my-auto rounded focus:outline-none w-full' />
                    <Search className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 rounded-full' />
                </div>
            </div>

            <div className='w-full overflow-x-auto'>
                <table className="min-w-[1600px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='shadow'>
                            <th scope="col" className="pl-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="pl-1 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-4 py-3">
                                QTy
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Customer Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Payment
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Note
                            </th>
                            <th scope="col" className="px-4 py-3 text-right pr-5">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(({ id, name, price, qty, contact, product }) => {
                                return <OrderCard key={id} id={id} name={name} price={price} contact={contact} qty={qty} product={product} />
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Order;