import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import Search from '../../icons/Search';
import BaseUrl from '../../Constant';
import Add from '../../icons/Add';
import Modal from '../Input/Modal';
import CreactProduct from '../ProductCreate/CreactProduct';

const Practice = () => {

    const [isCreate, setIsCreate] = useState(false)
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
        <div className='bg-white relative px-2 pt-3'>
            <div className='flex justify-between items-center py-3 px-4 border-b  border-blue-300 shadow-lg'>
                <div>
                    <h1 className='font-semibold'>Item List</h1>
                </div>
                <div className='relative border rounded text-black'>
                    <input type='text' placeholder='স্ক্যান / পণ্যের নাম লিখুন' onChange={SearchProduct} className='p-1 my-auto rounded focus:outline-none ' />
                    <Search className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 rounded-full' />
                </div>
                <div className='flex justify-start items-center gap-3' onClick={() => { setIsCreate(true) }}>
                    <button className="border rounded-full px-2 py-1 border-red-500 flex float-start text-md items-center gap-1 text-red-500"><Add /> Add New Item</button>
                </div>
            </div>

            <div className='w-full overflow-x-auto'>
                <table className="min-w-[1840px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='shadow font-semibold'>
                            <th scope="col" className="pl-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="pl-1 py-3">
                                <h1 className='font-semibold text-[16px] text-black'>Product name</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                                <h1 className='font-semibold text-[16px] text-black'>Category</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                                <h1 className='font-semibold text-[16px] text-black'>Price</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                                <h1 className='font-semibold text-[16px] text-black'>S - Price</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                                <h1 className='font-semibold text-[16px] text-black'>Qty</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                                <h1 className='font-semibold text-[16px] text-black'>Status</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 font-semibold">
                                <h1 className='font-semibold text-[16px] text-black'>Note</h1>
                            </th>
                            <th scope="col" className="px-4 py-3 text-right pr-5 font-semibold">                            
                                <h1 className='font-semibold text-[16px] text-black'>Action</h1>
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
            <Modal show={isCreate} handleClose={() => { setIsCreate(false) }} className={`w-[800px]`}>
                <CreactProduct />
            </Modal>
        </div>
    )
}

export default Practice


