import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import Search from '../../icons/Search';
import BaseUrl from '../../Constant';

const Practice = () => {



    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([])


    const getOrder = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/product/templete`, {
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
        <div className='bg-white relative'>
            <div className='flex justify-between items-center py-3 px-4'>
                <div>
                    <h1 className='font-semibold'>Order</h1>
                </div>
                <div className='flex justify-start items-center gap-3'>
                    <input type='number' placeholder='Enter your order id' onChange={SearchProduct} className='px-2 py-1 rounded focus:outline-none border' />
                    <button onClick={SearchProduct} className='border rounded px-4 py-[5px]'>
                        <Search />
                    </button>
                </div>
            </div>

            <div className='w-full overflow-x-auto'>
                <table className="min-w-[1550px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                               S - Price
                            </th>
                            <th scope="col" className="px-4 py-3">
                                QTy
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Status
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
                            data.map((product) => {
                                return <ProductCard key={product?.id} product={product} />
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Practice


