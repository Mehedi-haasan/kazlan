import React, { useEffect, useState, useRef } from "react";
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import { NavLink } from "react-router-dom";
import Updown from '../../icons/Updown'
import ShowEntries from "../Input/ShowEntries";
import BaseUrl from "../../Constant";
import SupplierCard from "./SupplierCard";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import Loading from "../../icons/Loading";

const Suppliers = ({ entries = [], state = [], info = {} }) => {

    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [supplier, setSupplier] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)

    const GetSupplier = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/suppliers/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        setSupplier(data?.items)
    }

    useEffect(() => {
        GetSupplier()
    }, [])

    useEffect(() => {
        document.title = `Suppliers - Kazaland Brothers`;
    }, []);

    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Suppliers List</h1>
                <NavLink to={`/create/supplier`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Create Supplier</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div ref={ref}>
                    <div ref={targetRef} className="pt-3  w-full overflow-hidden overflow-x-auto">
                        <table class="min-w-[1000px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-sm text-gray-900 dark:text-gray-400">
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
                                            Mobile
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Email
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Bank Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Account Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Account Number
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Address
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Balance
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
                                    {info?.role === "superadmin" && <th scope="col" className="py-2 text-center">Action</th>}
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    supplier?.map((item, i) => {
                                        return <SupplierCard item={item} key={i} state={state} info={info} />
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + supplier?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + supplier?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + supplier?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suppliers