import React, { useState, useEffect, useRef } from 'react'
import generatePDF from 'react-to-pdf';
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
import { useToImage } from '@hcorta/react-to-image'
import EscapeRedirect from '../Wholesale/EscapeRedirect';
import Modal from '../Input/Modal';
import Pdf from '../Pdf/Pdf'
import ProductCardPdf from './ProductCardPdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const Product = ({ category = [], brand = [], shop = [], info = {} }) => {

    const [selectAll, setSelectAll] = useState(false);
    const targetRef = useRef();
    const outside = useRef(null)
    const option = { width: 950, backgroundColor: '#ffffff' };
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const { ref, getPng } = useToImage(option)
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [catId, setCatId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [comId, setComId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState(null)
    const [preview, setPreview] = useState(false)
    const [filter, setFilter] = useState({
        cate: false,
        cate_value: "Select a filter",
        bran: false,
        bran_value: 'Select a filter',
        war: false,
        war_value: 'Select a filter',
    })
    let entries = [{ id: 501, name: "20" }, { id: 502, name: "30" }, { id: 503, name: "40" }, { id: 504, name: "50" }]

    useEffect(() => {
        document.title = "Items"
        if (info?.role === "superadmin") {
            setComId(info?.compId)
        } else {
            setComId(null)
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
        if (name !== '') {
            const response = await fetch(`${BaseUrl}/api/get/product/search/with/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setData(data.items)
        } else {
            getProduct()
        }


    }


    const ModalOpen = (id) => {
        if (id === selected) {
            setSelected(null)
        } else {
            setSelected(id)
        }
    }

    EscapeRedirect()


    const TikBox = (id) => {
        setData(prev => {
            const newData = prev.map(item => {
                if (item.id === id) {
                    return { ...item, active: !item.active };
                } else {
                    return item;
                }
            });
            const allActive = newData.every(item => item.active === false);
            setSelectAll(allActive)

            return newData;
        });
    };


    const BulkDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/bulk/update/product`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ data: data }),
        });
        const result = await response.json();
        setMessage({ id: Date.now(), mgs: result?.message });
        getProduct()
    }


    const exportToExcel = () => {
        let filename = 'data.xlsx'
        if (!data || data.length === 0) {
            setMessage({ id: Date.now(), mgs: 'No items to export!' });
            return;
        }
        let excel = [];
        data.map((item) => {
            excel.push({
                name: item?.name,
                brand: item?.brand?.name,
                category: item?.category?.name,
                warehouse: item?.company?.name,
                price: item?.cost,
                qty: item?.qty,
                createdby: item?.creator,
                createdAt: item?.createdAt
            })
        })

        const worksheet = XLSX.utils.json_to_sheet(excel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    };


    const ImportItem = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/bulk/get/product/1/1000`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const result = await response.json();
        if (result && result?.status) {
            const uploaddata = await fetch(`http://localhost:8050/api/bulk/create/product`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ data: result?.items }),
            });
            const data = await uploaddata.json();
        }

    }


    return (
        <div className="pl-3 pt-5 pr-2 min-h-screen pb-12">
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Item List</h1>
                <NavLink to='/create' className={`border text-white rounded-lg font-thin shadow py-2 px-5 bg-blue-600`}>Create Item</NavLink>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <SelectionComponent options={brand} default_select={filter?.bran} default_value={filter?.bran_value}
                            onSelect={(v) => { setFilter({ ...filter, bran_value: v?.name }); setBrandId(v?.id) }} label={'Brand / Publishers'} />
                    </div>
                    <div>
                        <SelectionComponent options={category ? category : []} default_select={filter?.cate} default_value={filter?.cate_value}
                            onSelect={(v) => { setFilter({ ...filter, cate_value: v?.name }); setCatId(v?.id) }} label={'Categories'} />
                    </div>
                    {
                        info?.role === "superadmin" && <div>
                            <SelectionComponent options={shop ? shop : []} default_select={filter?.war} default_value={filter?.war_value}
                                onSelect={(v) => { setFilter({ ...filter, war_value: v?.name }); setComId(v?.id) }} label={'Warehouse'} />
                        </div>
                    }

                </div>



                <div className='flex justify-between items-center mb-3 mt-5'>
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel handeldelete={() => { BulkDelete() }} expotExcel={exportToExcel} onClick={() => setPreview(true)} Jpg={() => setPreview(true)} />
                        <Search SearchProduct={(e) => { SearchProduct(e) }} />
                    </div>
                </div>
                <div >
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" >
                        <table class="min-w-[700px] w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-md text-gray-900 z-10 bg-[#BCA88D]">
                                <tr className='border'>
                                    <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1"
                                                checked={selectAll}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setSelectAll(isChecked);
                                                    setData(prev => prev.map(item => ({ ...item, active: !isChecked })));
                                                }}
                                                type="checkbox" className="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                            Purchase Price
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            M.R.P
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
                                    <th scope="col" className="pl-2 pr-1 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, i) => (
                                    <ProductCard key={i} item={item} i={i} isChecked={!item?.active} TikBox={TikBox} info={info} getProduct={getProduct} modalOpen={ModalOpen} selected={selected} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                <Modal show={preview} handleClose={() => { setPreview(false) }} size={`1000px`} crosshidden={true}>
                    <div ref={ref}>
                        <div ref={targetRef} className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" >
                            <Pdf>
                                <table class="min-w-[700px] w-full text-sm text-left rtl:text-right text-gray-500 mt-4">
                                    <thead class="text-md text-gray-900 z-10 bg-[#BCA88D]">
                                        <tr className='border'>
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
                                            <th scope="col" className="px-2 py-2 text-right border-r">
                                                <div className="flex justify-between items-center">
                                                    M.R.P
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-right border-r">
                                                <div className="flex justify-between items-center">
                                                    Qty
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
                                            <ProductCardPdf key={i} item={item} i={i} isChecked={!item?.active} TikBox={TikBox} info={info} getProduct={getProduct} modalOpen={ModalOpen} selected={selected} />
                                        ))}
                                    </tbody>
                                </table>
                            </Pdf>
                        </div>
                    </div>
                    <div className='flex justify-end items-end pr-8 gap-2'>
                        <button onClick={getPng} className='border group border-red-500 text-red-500 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">JPG</span>
                        </button>

                        <button onClick={() => generatePDF(targetRef, { filename: `Products.pdf` })} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">PDF</span>
                        </button>
                    </div>
                </Modal>


                <div className="flex justify-between items-center pt-3  z-10">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + data?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page === 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50 dark:bg-[#040404] dark:text-white`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + data?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + data?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm dark:bg-[#040404] dark:text-white`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product


