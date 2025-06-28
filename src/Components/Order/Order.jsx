import React, { useEffect, useState,useRef } from 'react';
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import ShowEntries from '../Input/ShowEntries';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import Loading from '../../icons/Loading';
import Calendar from '../Wholesale/Calender';
import { handleDateConvert } from '../Input/Time'
import InvoiceTemp from '../RecentInvoice/InvoiceTemp'

const Order = ({ user = [], info = {} }) => {

    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const [raw, setRaw] = useState({
        fromDate: sevenDaysAgo.toISOString(),
        toDate: today.toISOString()
    });
    const [values, setValues] = useState({
        pay: 0,
        paking: 0,
        delivary: 0,
        pay_type: 'Cash',
        lastdiscount: 0,
        lastdiscounttype: "Fixed",
        deliverydate: ''
    })



    const GetOrder = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        const res = await fetch(`${BaseUrl}/api/get/user/recent/order/from/to`, {
            method: 'POST',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(raw)
        });
        const data = await res.json()
        setData(data?.items);
        setTotalItem(data?.items?.length)
        setIsLoading(false)
    }


    useEffect(() => {
        document.title = "Orders"
        GetOrder()
    }, [raw])



    return (
        <div className='bg-white relative pt-5 px-2 min-h-screen pb-12' >

            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Order List</h1>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className='pt-1'>
                        <SelectionComponent options={[{ id: 1, name: "Physical" }, { id: 2, name: "Digital" }]} label={'Customer'} />
                    </div>
                    <div className='pt-1'>
                        <SelectionComponent options={user} label={'User'} />
                    </div>
                    <div>
                        <Calendar label={"From Date"} value={handleDateConvert(new Date(raw?.fromDate))} getDate={(date) => { setValues({ ...values, deliverydate: date }) }} getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                    </div>
                    <div>
                        <Calendar label={"To Date"} value={handleDateConvert(new Date(raw?.toDate))} getDate={(date) => { setValues({ ...values, deliverydate: date }) }} getTime={(ti) => { setRaw({ ...raw, toDate: ti }) }} />
                    </div>

                </div>

                <div className='flex justify-between items-center my-3'>
                    <div>
                        <ShowEntries options={[{ id: 501, name: "10" }, { id: 502, name: "20" }, { id: 503, name: "30" }, { id: 504, name: "50" }]} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div ref={ref}>
                    <div ref={targetRef} className="w-full overflow-hidden overflow-x-auto">
                        <InvoiceTemp invoices={data} prefix={info?.shopcode} />
                    </div>
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
    );
};

export default Order;