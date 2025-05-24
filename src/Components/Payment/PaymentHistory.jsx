import React, { useState, useEffect } from 'react'
import BaseUrl from '../../Constant';
import Updown from '../../icons/Updown';
import ShowEntries from '../Input/ShowEntries';
import Loading from '../../icons/Loading';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import { useToImage } from '@hcorta/react-to-image'
import logo from '../Logo/photo.png'
import Calander from '../Wholesale/Calender'


const PaymentHistory = ({ entries = [] }) => {

    const goto = useNavigate()
    const params = useParams()
    const [data, setData] = useState([]);
    const [values, setValues] = useState({})
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [time, setTime] = useState({});
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const [raw, setRaw] = useState({
        fromDate: sevenDaysAgo.toISOString(),
        toDate: today.toISOString()
    });
    const options = {
        width: 1000,
        backgroundColor: '#ffffff'
    };
    const { ref, getPng } = useToImage(options)


    const GetProduct = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        const res = await fetch(`${BaseUrl}/api/get/payment/history/${params?.id}`, {
            method: 'POST',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(raw)
        });
        const data = await res.json()
        setValues(data?.items);
        setData(data?.history);
        setIsLoading(false)
        setTotalItem(4)
    }

    useEffect(() => {
        GetProduct()
    }, [raw])

    const handleDateConvert = (date) => {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formatted
    };


    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">


            <div className="bg-[#FFFFFF] rounded shadow flex justify-between">
                <div className='flex justify-start items-start gap-5 px-4 py-2'>
                    <div className=' p-3'>
                        <img
                            src={values?.image_url ? values?.image_url : logo}
                            alt="image"
                            className="h-56 w-56 object-cover"
                        />
                    </div>
                    <div className='grid col-span-1 lg:col-span-2 p-3 border-l'>
                        <div className='text-[#4C5258] font-thin text-md'>
                            <h1 className='text-2xl py-3 font-semibold'>{values?.name}</h1>
                            <div className='flex justify-between items-center w-[350px]'>
                                <h1 className='py-2 font-semibold'>Balance</h1>
                                <h1 className='py-2 '>{values?.balance}</h1>
                            </div>
                            <div className='flex justify-between items-center w-[350px]'>
                                <h1 className='py-2 font-semibold'>Customer Type </h1>
                                <h1 className='py-2 '>{values?.customertype}</h1>
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
                <div className='pt-5 w-[270px]'>
                    <Calander label={"From Date"} value={handleDateConvert(new Date(raw?.fromDate))} getDate={(data) => { setTime({ ...time, from: data }) }} getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                </div>
                <div className='pt-5 w-[270px]'>
                    <Calander label={"To Date"} value={handleDateConvert(new Date(raw?.toDate))} getDate={(data) => { setTime({ ...time, to: data }) }} getTime={(ti) => { setRaw({ ...raw, toDate: ti }) }} />
                </div>

                <div className='pt-10'>
                    <NavLink to={`/customer/balance/${values?.id}`} className={`border text-white rounded-lg font-thin shadow py-2 px-5 bg-blue-600`}>Make Payment</NavLink>
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

                    <table className="text-sm text-left rtl:text-right text-gray-500 w-full min-w-[700px] ">
                        <thead className=" text-sm text-left rtl:text-right text-gray-500">
                            <tr className='border'>
                                <th scope="col" className="px-3 py-3 border-r ">
                                    <div className="flex justify-between items-center">
                                        Date
                                        <Updown />
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
                                        Type
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

                                <th scope="col" className="px-3 py-3 text-right border-r ">
                                    <div className="flex justify-between items-center">
                                        Delivery Date
                                        <Updown />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr className='border-b border-x cursor-pointer' onClick={() => { goto(`/invoice/${item?.id}`) }}>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">11 May 2025</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">#{item?.id}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.type}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.shopname}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.total}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.paidamount}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.due}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.creator}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.status}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin text-[#212529]">{item?.deliverydate}</th>
                                </tr>
                            ))
                            }
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


