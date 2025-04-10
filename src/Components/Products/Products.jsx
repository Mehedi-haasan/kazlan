import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import Updown from '../../icons/Updown';
import ShowEntries from '../Input/ShowEntries';
import Loading from '../../icons/Loading';
import { NavLink } from 'react-router-dom';

const Product = ({ category = [], type = [], brand = [], entries = [], shop = [], user = [], info = {} }) => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)

    const getProduct = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/product/templete/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setData(data?.items)
        setIsLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [page, pageSize])


    const SearchProduct = async (e) => {
        e.preventDefault();
        const name = e.target.value
        const token = localStorage.getItem('token')
        if (name) {
            const response = await fetch(`${BaseUrl}/api/get/product/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setData(data.items)
        }
    }


    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen">
            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Item List</h1>
                    <NavLink to='/create' className={`border text-white rounded-lg shadow py-2 px-5 bg-blue-600`}>Create item</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <SelectionComponent options={type} onSelect={(v) => { }} label={'Item Type'} />
                    </div>
                    <div>
                        <SelectionComponent options={brand} onSelect={(v) => { }} label={'Brand'} />
                    </div>
                    <div>
                        <SelectionComponent options={category ? category : []} onSelect={(v) => { }} label={'Category'} />
                    </div>
                    <div>
                        <SelectionComponent options={user} onSelect={(v) => { }} label={'User'} />
                    </div>
                    {
                        info?.role === "superadmin" && <div>
                            <SelectionComponent options={shop} onSelect={(v) => { }} label={'Warehouse Stock'} />
                        </div>
                    }

                </div>

                <div className='flex justify-between items-center my-3'>
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-start items-center gap-1.5 mt-5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    SearchProduct()
                                }
                            }}
                            onChange={SearchProduct}
                            className="focus:outline-none border rounded p-1.5 " />
                    </div>
                </div>
                <div className="pt-3 w-full overflow-hidden overflow-x-auto">
                    <table class="min-w-[1000px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                <th scope="col" className="pl-4 pr-1 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, i) => (
                                <ProductCard key={i} item={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1>Showing 1 to 3 of 3 entries</h1>
                    <div className='flex justify-start'>
                        <button onClick={() => { page > 0 ? setPage(page - 1) : setPage(1) }} className="border-y border-l rounded-l py-1.5 px-3 bg-blue-50">
                            {isLoading ? <Loading className='h-6 w-7' /> : "Prev"}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">{page}</button>
                        <button onClick={() => { setPage(page + 1) }} className="border-y border-r rounded-r py-1.5 px-3 bg-blue-50">
                            {isLoading ? <Loading className='h-6 w-7' /> : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product


