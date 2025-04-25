import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import Selection from '../Input/Selection';
import Updown from '../../icons/Updown';
import ShowEntries from '../Input/ShowEntries';
import Loading from '../../icons/Loading';
import { NavLink } from 'react-router-dom';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToImage } from '@hcorta/react-to-image'


const Product = ({ category = [], brand = [], shop = [], info = {} }) => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [catId, setCatId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comId, setComId] = useState(null);
    const [isChecked, setIsChecked] = useState(false)
    let entries = [{ id: 501, name: "20" }, { id: 502, name: "30" }, { id: 503, name: "40" }, { id: 504, name: "50" }]
    const options = {
        width: 1000,
        backgroundColor: '#ffffff'
    };
    const { ref, getPng } = useToImage(options)
    const [isPdf, setPdf] = useState(false);


    useEffect(() => {
        if (info?.role === "superadmin") {
            setComId(null)
        } else {
            setComId(info?.compId)
        }
    }, [info])

    const getProduct = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/product/templete/${page}/${pageSize}/${brandId}/${catId}/${comId}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setData(data?.items)
        setTotalItem(data?.count)
        setIsLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [page, pageSize, brandId, catId, comId])


    const SearchProduct = async (e) => {
        const name = e
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



    const downloadPDF = () => {
        const capture = document.querySelector('.actual-receipt');
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('receipt.pdf');
        })
        setPdf(false)
    }


    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Item List</h1>
                <NavLink to='/create' className={`border text-white rounded-lg font-thin shadow py-2 px-5 bg-blue-600`}>Create Item</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <SelectionComponent options={brand} onSelect={(v) => { setBrandId(v?.id) }} label={'Brand / Publishers'} />
                    </div>
                    <div>
                        <SelectionComponent options={category ? category : []} onSelect={(v) => { setCatId(v?.id) }} label={'Categories'} />
                    </div>
                    {
                        info?.role === "superadmin" && <div>
                            <Selection options={shop} onSelect={(v) => { setComId(v?.id) }} label={'Warehouse'} />
                        </div>
                    }

                </div>



                <div className='flex justify-between items-center mb-3 mt-5'>
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => { downloadPDF() }} Jpg={getPng} />
                        <Search SearchProduct={(e) => { SearchProduct(e) }} />
                    </div>
                </div>
                <div className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" ref={ref}>
                    <table class="min-w-[700px] w-full text-sm text-left rtl:text-right text-gray-500 ">
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
                                        Brand
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
                                        Warehouse
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        M.R.P
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
                                {
                                    info?.role === "superadmin" && <th scope="col" className="pl-2 pr-1 py-2 text-center">Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, i) => (
                                <ProductCard key={i} item={item} i={i} isChecked={isChecked} info={info} getProduct={getProduct}/>
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

export default Product


