import { useEffect, useState, useRef } from "react"
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import BaseUrl from '../../Constant';
import Updown from "../../icons/Updown";
import ShowEntries from "../Input/ShowEntries";
import WarehouseCard from "./WarehouseCard";
import { NavLink } from "react-router-dom";
import Loading from "../../icons/Loading";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import EscapeRedirect from "../Wholesale/EscapeRedirect";

const Warehouse = ({ entries }) => {

    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [shop, setShop] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false);
    const [totalItem, setTotalItem] = useState(0)


    const FetchShop = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/shop/list/with/info/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        });
        const data = await response.json();
        setShop(data?.items)
        setTotalItem(data?.count)
        setIsLoading(false)
    }


    useEffect(() => {
        document.title = "Warehouses - Kazaland Brothers";
        FetchShop()
    }, [page, pageSize])


    EscapeRedirect()
    return (
        <div className="px-2 pt-5 min-h-screen pb-12">

            <div className="flex justify-between items-center p-4 bg-[#FFFFFF] rounded-md shadow-md">
                <h1 className="font-semibold text-lg">Warehouse List</h1>
                <NavLink to='/company' className={`border px-4 py-1.5 rounded-md bg-blue-500 text-white font-thin`}>Create Warehouse</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-4">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div ref={ref}>
                    <div ref={targetRef} className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="min-w-[1000px] w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead class="text-sm text-gray-900 bg-[#BCA88D]">
                                <tr className='border'>
                                    {/* <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th> */}
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center">
                                            Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Total items
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Available Stock
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Worth (Cost)
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Worth (Sale)
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Worth Profit
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Number of Employee
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Created by
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="pl-4 pr-2 py-2 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {shop?.map((item, i) => (
                                    <WarehouseCard item={item} i={i} FetchShop={FetchShop} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + shop?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page === 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + shop?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + shop?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Warehouse