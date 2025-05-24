import React, { useEffect, useState, useRef } from "react";
import BaseUrl from "../../Constant";
import InvoiceTemp from "../RecentInvoice/InvoiceTemp";
import Loading from "../../icons/Loading";
import ShowEntries from "../Input/ShowEntries";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import { NavLink } from "react-router-dom";


const ReturnPurchaseItem = ({ }) => {

    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [invoices, setInvoices] = useState([]);
    const [totalItem, setTotalItem] = useState(0)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)

    const RecentInvoice = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/user/recent/purchase/${page}/${pageSize}`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: "Return Purchase" })
        });
        const data = await response.json();
        setIsLoading(false)
        setInvoices(data?.items);
        setTotalItem(data?.totalItems)
    }

    useEffect(() => {
        document.title = "Purchase Return Items"
        RecentInvoice(invoices)
    }, [])


    return (
        <div className="px-3 pt-5 rounded-md min-h-screen">
            <div className='rounded-xl overflow-hidden bg-[#FFFFFF] p-4 shadow-lg'>
                <div className='flex justify-between items-center py-3'>
                    <h1 className='pb-2'>Purchase Return Items</h1>
                    <NavLink to={`/purchase/return`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Purchase Return</NavLink>
                </div>
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={[{ id: 501, name: "10" }, { id: 502, name: "20" }, { id: 503, name: "30" }, { id: 504, name: "50" }]} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <InvoiceTemp invoices={invoices} />

                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + invoices?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + invoices?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + invoices?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReturnPurchaseItem
