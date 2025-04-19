import React, { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent';
import ShowEntries from '../Input/ShowEntries';
import InputComponent from '../Input/InputComponent';
import Invoice from '../RecentInvoice/Invoice';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import Loading from '../../icons/Loading';

const Order = ({ type = [], entries = [], user = [] }) => {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    const getOrder = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order/${page}/${pageSize}`, {
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
        document.title = "Orders - KazalandBrothers";
        // getOrder()
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
        <div className='bg-white relative pt-5 px-2 min-h-screen pb-12'>

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
                        <InputComponent placeholder={"From Date"} label={"From Date"} />
                    </div>
                    <div>
                        <InputComponent placeholder={"To Date"} label={"To Date"} />
                    </div>

                </div>

                <div className='flex justify-between items-center my-3'>
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div className="w-full overflow-hidden overflow-x-auto">
                    <Invoice />
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + data?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + data?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + data?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Order;