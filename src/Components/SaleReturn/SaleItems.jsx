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
import { handleDateConvert } from '../Input/Time'
import SelectionComponent from "../Input/SelectionComponent";
import Calendar from '../Wholesale/Calender';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Modal from "../Input/Modal";
import Pdf from "../Pdf/Pdf";
import Notification from "../Input/Notification";


const SaleItems = ({ info = {} }) => {

    const targetRef = useRef();
    const [preview, setPreview] = useState(false)
    const [user, setUser] = useState([])
    const option = { backgroundColor: '#ffffff' };
    const [message, setMessage] = useState({})
    const { ref, getPng } = useToImage(option)
    const [invoices, setInvoices] = useState([]);
    const [totalItem, setTotalItem] = useState(0)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const [raw, setRaw] = useState({
        fromDate: sevenDaysAgo.toISOString(),
        toDate: today.toISOString(),
        userId: null,
        type: "Sale"
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
    const [comId, setComId] = useState(null);
    const [filter, setFilter] = useState({
        cate: false,
        cate_value: "Select a filter",
        bran: false,
        bran_value: 'Select a filter',
        war: false,
        war_value: 'Select a filter',
    })


    const GetCustomer = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/customers/1/300/Customer`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        setUser(data?.items)
        setIsLoading(false)
    }

    const RecentInvoice = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/user/recent/order/from/to/${page}/${pageSize}`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raw)
        });
        const data = await response.json();
        setIsLoading(false)
        setInvoices(data?.items);
        setTotalItem(data?.count)
    }

    useEffect(() => {
        document.title = "Sale items"
        GetCustomer()
    }, [])

    useEffect(() => {
        RecentInvoice()
    }, [pageSize, page, raw])



    const exportToExcel = () => {
        let filename = 'saleitems.xlsx'
        if (!invoices || invoices.length === 0) {
            setMessage({ id: Date.now(), mgs: 'No Sale items to export!' });
            return;
        }
        let excel = [];
        invoices.map((item) => {
            excel.push({
                date: item?.date,
                invoice: item?.invoice_id,
                customer: item?.customername,
                warehouse: item?.shopname,
                total: item?.total,
                paid: item?.paidamount,
                due: item?.due,
                status: item?.status,
                balance: item?.balance,
                saletype: item?.type,
                createdby: item?.creator,
                createdAt: item?.createdAt,
                deliverydate: item?.deliverydate
            })
        })

        const worksheet = XLSX.utils.json_to_sheet(excel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    };


    const SearchOrder = async (v) => {
        if (v === '') {
            RecentInvoice()
        } else {
            const token = localStorage.getItem('token')
            const response = await fetch(`${BaseUrl}/api/search/data/${v}`, {
                method: 'GET',
                headers: {
                    "authorization": token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await response.json();
            setInvoices(data?.items);
        }

    }


    return (
        <div className="px-3 pt-5 rounded-md min-h-screen">
            <Notification message={message} />
            <div className='flex justify-between items-center p-4 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white shadow-md rounded-lg'>
                <h1 className=''>Recent Sales</h1>
                <NavLink to={`/sale/order`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Create Sale</NavLink>
            </div>


            <div className='rounded-xl overflow-hidden p-4 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white shadow-lg mt-4 pb-20'>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 pb-3">
                    <div className='pt-1'>
                        <SelectionComponent options={user}
                            default_select={filter?.bran} default_value={filter?.bran_value}
                            onSelect={(v) => { setFilter({ ...filter, bran_value: v?.name }); setRaw({ ...raw, userId: v?.id }) }}
                            label={'Customer'} />
                    </div>
                    {info?.role === "superadmin" && <div className="w-full pb-3">
                        <SelectionComponent options={[]} default_select={filter?.war} default_value={filter?.war_value}
                            onSelect={(v) => { setFilter({ ...filter, war_value: v?.name }); setComId(v?.id) }} label={'Warehouse'} />
                    </div>}
                    <div>
                        <Calendar label={"From Date"} value={handleDateConvert(new Date(raw?.fromDate))} getDate={(date) => {
                            setValues({ ...values, deliverydate: date })
                        }} getTime={(ti) => {
                            const formatted = new Date(Date.UTC(ti.getFullYear(), ti.getMonth(), ti.getDate())).toISOString().slice(0, 10);
                            setRaw({ ...raw, fromDate: formatted })
                        }} />
                    </div>
                    <div>
                        <Calendar label={"To Date"} value={handleDateConvert(new Date(raw?.toDate))} getDate={(date) => { setValues({ ...values, deliverydate: date }) }}

                            getTime={(ti) => {
                                const formatted = new Date(Date.UTC(ti.getFullYear(), ti.getMonth(), ti.getDate())).toISOString().slice(0, 10);
                                setRaw({ ...raw, toDate: formatted })
                            }} />
                    </div>

                </div>
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={[{ id: 501, name: "10" }, { id: 502, name: "20" }, { id: 503, name: "30" }, { id: 504, name: "50" }]} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel expotExcel={exportToExcel} onClick={() => setPreview(true)} Jpg={() => setPreview(true)} is_delete={true} />
                        <Search SearchProduct={(v) => SearchOrder(v)} />
                    </div>
                </div>
                <InvoiceTemp invoices={invoices} />

                <Modal show={preview} handleClose={() => { setPreview(false) }} size={`1100px`} crosshidden={true}>
                    <div ref={ref}>
                        <div ref={targetRef} className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt max-h-[80vh] overflow-y-auto" >
                            <Pdf>
                                <InvoiceTemp invoices={invoices} />
                            </Pdf>
                        </div>
                    </div>
                    <div className='flex justify-end items-end pr-8 gap-2'>
                        <button onClick={getPng} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">JPG</span>
                        </button>

                        <button onClick={() => generatePDF(targetRef, { filename: `Products.pdf` })} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">PDF</span>
                        </button>
                    </div>
                </Modal>

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

export default SaleItems
