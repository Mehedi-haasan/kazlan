import React, { useState, useEffect } from 'react'
import BaseUrl from '../../Constant';
import Updown from '../../icons/Updown';
import ShowEntries from '../Input/ShowEntries';
import Loading from '../../icons/Loading';
import { useParams } from 'react-router-dom';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import { useToImage } from '@hcorta/react-to-image'
import logo from '../Logo/userProfile.png'
import PayHisCard from './PayHisCard';


const PaymentHistory = ({ entries = [] }) => {

    const params = useParams()
    const [data, setData] = useState([]);
    const [values, setValues] = useState({})
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false)
    const options = {
        width: 1000,
        backgroundColor: '#ffffff'
    };
    const { ref, getPng } = useToImage(options)


    const GetProduct = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BaseUrl}/api/get/payment/history/${params?.id}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json()
        setValues(data?.items);
        setData(data?.history);
        console.log(data)
    }

    useEffect(() => {
        GetProduct()
    }, [])




    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-2 bg-[#FFFFFF] rounded shadow">
                <div className='border-r p-3'>
                    <img
                        src={values?.image_url ? values?.image_url : logo}
                        alt="image"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className='grid col-span-1 lg:col-span-2 p-3'>
                    <div className='text-[#4C5258] font-thin text-md'>
                        <h1 className='text-2xl py-3 font-semibold'>{values?.name}</h1>
                        <div className='flex justify-between items-center w-[350px]'>
                            <h1 className='py-2 font-semibold'>Due</h1>
                            <h1 className='py-2 '>{values?.balance}</h1>
                        </div>
                        <div className='flex justify-between items-center w-[350px]'>
                            <h1 className='py-2 font-semibold   '>Customer Type </h1>
                            <h1 className='py-2 '>{values?.usertype}</h1>
                        </div>
                        <div className='flex justify-between items-center w-[350px]'>
                            <h1 className='py-2 font-semibold'>Phone</h1>
                            <h1 className='py-2 '>{values?.phone}</h1>
                        </div>
                        <div className='flex justify-between items-center w-[350px]'>
                            <h1 className='py-2 font-semibold'>Email</h1>
                            <h1 className='py-2 '>{values?.email}</h1>
                        </div>
                        <div className='flex justify-between items-center w-[350px]'>
                            <h1 className='py-2 font-semibold'>Account Number</h1>
                            <h1 className='py-2 '>{values?.accountnumber}</h1>
                        </div>
                        <div className='flex justify-between items-center w-[350px]'>
                            <h1 className='py-2 font-semibold'>Address</h1>
                            <h1 className='py-2 '>{values?.address}</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center mb-3 mt-5'>
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => { }} Jpg={getPng} />
                        <Search SearchProduct={(e) => { }} />
                    </div>
                </div>
                <div className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" ref={ref}>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-md text-gray-900 ">
                            <tr className='border'>
                                <th className="w-4 py-2 px-4 border-r">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" onChange={() => { setIsChecked(!isChecked) }} type="checkbox" className="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 border-r ">
                                    <div className="flex justify-between items-center">
                                        Item Name
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Total 
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Paid
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Due
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Created by
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        Created at
                                        <Updown />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, i) => (
                                <PayHisCard key={i} item={item} i={i} isChecked={isChecked} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + data?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page === 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
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
    )
}

export default PaymentHistory


