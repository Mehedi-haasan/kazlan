import React, { useState, useEffect, useRef } from 'react'
import BaseUrl from '../../Constant';
import Updown from '../../icons/Updown';
import ShowEntries from '../Input/ShowEntries';
import Loading from '../../icons/Loading';
import { NavLink, useParams } from 'react-router-dom';
import Excel from '../Input/Excel';
import Search from '../Input/Search';
import { useToImage } from '@hcorta/react-to-image'
import logo from '../Logo/photo.png'
import Calander from '../Wholesale/Calender'
import { ReturnSaleCode, handleDateConvert, formatDate, formatShortDate, convertToBengaliNumber } from '../Input/Time';
import Pdf from "../Pdf/Pdf";
import Modal from "../Input/Modal";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import generatePDF from 'react-to-pdf';
import PreviewInvoice from '../Invoice/PreviewInvoice';
import PreviewOpeningInvoice from '../Invoice/PreviewOpeningInvoice';
import PreviewReturnInvoice from '../Invoice/PreviewReturnInvoice';
import PreviewPurchaseInvoice from '../Invoice/PreviewPurchaseInvoice';
import PreviewPurchaseReturnInvoice from '../Invoice/PreviewPurchaseReturnInvoice';


const PaymentHistory = ({ entries = [], info = {}, prefix = "KB" }) => {

    const params = useParams()
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const targetRef = useRef();
    const [customertype, setCustomerType] = useState('customer')
    const [id, setId] = useState(1)
    const [type, setType] = useState('')
    const [preview, setPreview] = useState(false)
    const [invopreview, setInvoPreview] = useState(false);
    const [opening, setOpening] = useState({})
    const [calcu, setCalcu] = useState({
        total: 0,
        paid: 0,
        return_amount: 0
    })
    const [data, setData] = useState([]);
    const [values, setValues] = useState({})
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0)
    const [pageSize, setPageSize] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [time, setTime] = useState({});
    const [reverse, setReverse] = useState([])
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const [raw, setRaw] = useState({
        fromDate: sevenDaysAgo.toISOString(),
        toDate: today.toISOString()
    });
    const [sear, setScar] = useState({
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
            body: JSON.stringify(sear)
        });
        const data = await res.json()
        setValues(data?.items);
        if (data?.items?.usertype === "Supplier") {
            setCustomerType('supplier')
        } else {
            setCustomerType('customer')
        }
        setReverse([...data?.history]?.reverse());
        setData(data?.history);
        // setOpening(data?.opening)
        setIsLoading(false)
        setTotalItem(data?.count)
        const newCalcu = {
            total: 0,
            paid: 0,
            return_amount: 0,
        };

        data?.history?.forEach((item) => {
            newCalcu.total += Number(item?.total) || 0;
            newCalcu.paid += Number(item?.paidamount) || 0;
            newCalcu.return_amount += Number(item?.return) || 0;
        });
        // if (data?.opening) {
        //     newCalcu.total += Number(data?.opening?.total) || 0;
        //     newCalcu.paid += Number(data?.opening?.paidamount) || 0;
        //     newCalcu.return_amount += Number(data?.opening?.return) || 0;
        // }

        setCalcu(newCalcu);
    }

    useEffect(() => {
        document.title = `Payment History - Kazaland Brothers`;
        GetProduct()
    }, [raw])


    const exportToExcel = () => {
        let filename = 'customer.xlsx'
        if (!data || data.length === 0) {
            setMessage({ id: Date.now(), mgs: 'No customer to export!' });
            return;
        }
        let excel = [];
        data.map((item) => {
            excel.push({
                name: item?.name,
                mobile: item?.phone,
                email: item?.email,
                accountname: item?.accountname,
                bankname: item?.bankname,
                accountnumber: item?.accountnumber,
                thana: item?.state?.name,
                address: item?.address,
                balance: item?.balance,
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


    const SearchOrder = async (v) => {
        if (v === '') {
            GetProduct()
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
            setData(data?.items);
            setReverse([...data?.items]?.reverse());
            // setOpening(data?.opening)

            const newCalcu = {
                total: 0,
                paid: 0,
                return_amount: 0,
            };

            data?.items?.forEach((item) => {
                newCalcu.total += Number(item?.total) || 0;
                newCalcu.paid += Number(item?.paidamount) || 0;
                newCalcu.return_amount += Number(item?.return) || 0;
            });
            // if (data?.opening) {
            //     newCalcu.total += Number(data?.opening?.total) || 0;
            //     newCalcu.paid += Number(data?.opening?.paidamount) || 0;
            //     newCalcu.return_amount += Number(data?.opening?.return) || 0;
            // }

            setCalcu(newCalcu);
        }

    }



    const PrintInvoice = () => {
        const rows = reverse?.map(item => {
            return `
                        <tr style="border: 1px solid black">
                            <td style="padding: 4px; font-family: 'kalpurush'; font-size: 17px; border-left: 1px solid black; border-right: 1px solid black; border-bottom:1px solid black; font-size: 13px; width:40px;text-align:center;">
                            ${formatDate(item?.createdAt)}
                            </td>

                            <td style=${`${values?.usertype === "Supplier" ? "" : "display:none;"} padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;`}>
                            ${item?.sup_invo}
                            </td>
                            <td style="padding: 4px; border-left: 1px solid black; border-right: 1px solid black;  border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">
                            ${prefix}/${ReturnSaleCode(item?.type)}-${String(item?.id).padStart(5, '0')}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black;  border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:40px; text-align:center;">
                            ${item?.type}
                            </td>
                            <td style=${`${values?.usertype === "Supplier" ? "" : "display:none;"} padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:50px;text-align:center;`}>
                            ${convertToBengaliNumber(item?.total)}
                            </td>
                            <td style="padding: 4px; border-left: 1px solid black; border-right: 1px solid black; border-bottom:1px solid ; text-align:right; font-family: 'kalpurush'; font-size: 17px;">
                            ${convertToBengaliNumber(item?.total)}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">
                            ${convertToBengaliNumber(item?.paidamount)}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black;  border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">
                            ${convertToBengaliNumber(item?.return)}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black;  border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:40px; text-align:center;">
                            ${convertToBengaliNumber(item?.balance * -1)}
                            </td>
                        </tr>
                        `;
        }).join("");


        let invo_temp = opening ? `<tr style="border: 1px solid black">
                            <td style="padding: 4px; font-family: 'kalpurush'; font-size: 17px; border-left: 1px solid black; border-right: 1px solid black; border-bottom:1px solid black; font-size: 13px; width:40px;text-align:center;">
                            ${formatShortDate(opening?.createdAt)}
                            </td>

                            <td style=${`${values?.usertype === "Supplier" ? "" : "display:none;"} padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;`}>
                            ${opening?.sup_invo}
                            </td>
                            <td style="padding: 4px; border-left: 1px solid black; border-right: 1px solid black;  border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">
                            ${prefix}/${ReturnSaleCode(opening?.type)}-${String(opening?.id).padStart(5, '0')}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black;  border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:40px; text-align:center;">
                            ${opening?.type}
                            </td>
                            <td style=${`${values?.usertype === "Supplier" ? "" : "display:none;"} padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:50px;text-align:center;`}>
                            ${convertToBengaliNumber(opening?.total)}
                            </td>
                            <td style="padding: 4px; border-left: 1px solid black; border-right: 1px solid black; border-bottom:1px solid ; text-align:right; font-family: 'kalpurush'; font-size: 17px;">
                            ${convertToBengaliNumber(opening?.total)}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">
                            ${convertToBengaliNumber(opening?.paidamount)}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black;  border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">
                            ${convertToBengaliNumber(opening?.return)}
                            </td>
                            <td style="padding: 4px; border-right: 1px solid black;  border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:40px; text-align:center;">
                            ${convertToBengaliNumber(opening?.balance * -1)}
                            </td>
                        </tr>` : ``





        const invoiceContent = `
                                    <html>
                                    <head>
                                        <title style="">Invoice</title>
                                        <style>
                                        @font-face {
                                            font-family: 'kalpurush';
                                            src: url('/font/kalpurush.ttf') format('truetype');
                                            font-size: 1.25em;
                                        }
                                        body {
                                            font-family: Arial, sans-serif;
                                            padding: 40px;
                                        }
                                        .invoice {
                                            width: 850px;
                                            margin: auto;
                                            background: #fff;
                                            padding: 20px;
                                        }
                                        .header {
                                            text-align: center;
                                            font-size: 24px;
                                            font-weight: bold;
    
                                        }
                                        table {
                                            width: 100%;
                                        }
                                        .total {
                                            text-align: right;
                                            font-size: 18px;
                                            font-weight: bold;
                                        }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="invoice" style="padding-top: 50px;">
                                        <div style="font-family: 'kalpurush', sans-serif; font-size: 17px; padding: 4px;">
                                            <div style="text-align: center; padding: 4px;">
                                                <h3 style="margin: 0; text-align:center;">${values?.usertype} Ledger Report</h3>
                                            </div>

                                            <div style="display: flex; justify-content: space-evenly; align-items: center; padding: 4px 0;">
                                                <p style="margin: 0; font-weight: 300;">From Date : ${handleDateConvert(new Date(raw?.fromDate))}</p>
                                                <p style="margin: 0; font-weight: 300;">To Date : ${handleDateConvert(new Date(raw?.toDate))}</p>
                                            </div>

                                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0;">
                                                <p style="margin: 0; font-weight: 300;">Code : #${values?.id}</p>
                                                <p style="margin: 0; font-weight: 300;">Name : ${values?.name}</p>
                                                <p style="margin: 0; font-weight: 300;">Address : ${values?.address}</p>
                                            </div>
                                        </div>


                                        <table style="border-collapse: collapse; width: 100%;">
                                            <thead>
                                            <tr style="font-family: 'kalpurush'; font-size: 17px;">
                                                <td style="padding: 4px; border-left: 1px solid black; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; width:40px; text-align:center">Date</td>
                                                ${values?.usertype === "Supplier" ? `<td style="padding: 4px; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:left;">Challan No</td>` : ""}
                                                <td style="padding: 4px; border-right: 1px solid black; border-left:1px solid black;border-top:1px solid black; border-bottom:1px solid black; text-align:left; ">Invoice</td>
                                                <td style="padding: 4px; text-align: center; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:center;  width:40px;">Type</td>
                                                <td style="padding: 4px; text-align: right; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:right;"">${values?.usertype === "Supplier" ? "Purchase" : "Sale"} Amount</td>
                                                ${values?.usertype === "Supplier" ? `<td style="padding: 4px; text-align: right; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:right;">Net Mrp</td>` : ""}
                                                <td style="padding: 4px; border-left: 1px solid black; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:left; ">Paid</td>
                                                <td style="padding: 4px; text-align: center; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:center;  width:40px;">Return</td>
                                                <td style="padding: 4px; text-align: right; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:right;"">Balance</td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            ${rows}
                                            <tr style="border: 1px solid black">
                                                <td style="padding: 4px; font-family: 'kalpurush'; font-size: 17px; border-left: 1px solid black; border-right: 1px solid black; border-bottom:1px solid black; font-size: 13px; width:40px;text-align:center;">Total</td>                                                <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; border-left: 1px solid black; font-family: 'kalpurush'; font-size: 17px;"></td>
                                                ${values?.usertype === "Supplier" ? `<td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;"></td>` : ""}
                                                ${values?.usertype === "Supplier" ? `<td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;"></td>` : ""}
                                                <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:40px;text-align:center;">${convertToBengaliNumber(calcu?.total)}</td>
                                                <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid ; text-align:right; font-family: 'kalpurush'; font-size: 17px;">${convertToBengaliNumber(calcu?.total)}</td>
                                                <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">${convertToBengaliNumber(calcu?.paid)}</td>
                                                <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; font-family: 'kalpurush'; font-size: 17px;">${convertToBengaliNumber(calcu?.return_amount)}</td>
                                                <td style="padding: 4px; border-right: 1px solid black; border-bottom:1px solid black; text-align:right; font-family: 'kalpurush'; font-size: 17px; width:40px;text-align:center; ">${convertToBengaliNumber(values?.balance * -1)}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        
                                        </div>
                                    </body>
                                    </html>
      `;

        const printWindow = window.open('', '_blank', 'width=1600,height=2000');
        printWindow.document.open();
        printWindow.document.write(invoiceContent);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    };

    

    return (
        <div className="pl-3 pt-5 pr-2 min-h-screen pb-12">
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow flex justify-between">
                <div className='flex justify-start items-start gap-5 px-2 py-1.5 dark:bg-[#040404] dark:text-white'>
                    {
                        values?.image_url && <div className='p-2 border-r h-full'>
                            <img
                                src={values?.image_url ? values?.image_url : logo}
                                alt="image"
                                className="h-44 max-w-44 object-cover"
                            />
                        </div>
                    }
                    <div className='grid col-span-1 lg:col-span-2 p-2 '>
                        <div className='text-[#4C5258] font-thin text- dark:bg-[#040404] dark:text-white'>
                            <h1 className='text-xl py-1.5 font-semibold'>{values?.name}</h1>
                            <div className='flex justify-between items-center w-[400px]'>
                                <div>
                                    <h1 className='py-1.5 font-semibold'>Balance</h1>
                                </div>
                                <div>
                                    {values?.usertype === "Supplier" ? <button className={`border rounded-full px-4 mx-auto float-right block ${values?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${values?.balance > 0 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                                        {Math.abs(values?.balance)}
                                    </button> :
                                        <button className={`border rounded-full px-4 mx-auto float-right block ${values?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${values?.balance > 0 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                                            {Math.abs(values?.balance)}
                                        </button>}
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-[400px]'>
                                <h1 className='py-1.5 font-semibold'>{values?.usertype === "Customer" ? "Customer" : "Supplier"} Type</h1>
                                <h1 className='py-1.5'>{values?.customertype}</h1>
                            </div>
                            <div className='flex justify-between items-center w-[400px]'>
                                <h1 className='py-1.5 font-semibold'>{values?.usertype === "Customer" ? "Customer" : "Supplier"} Code</h1>
                                <h1 className='py-1.5 '>#{values?.id}</h1>
                            </div>
                            <div className='flex justify-between items-center w-[400px]'>
                                <h1 className='py-1.5 font-semibold'>Phone</h1>
                                <h1 className='py-1.5 '>{values?.phone}</h1>

                            </div>
                            <div className='flex justify-between items-center w-[400px]'>
                                <h1 className='py-1.5 font-semibold'>Email</h1>
                                <h1 className='py-1.5 '>{values?.email}</h1>
                            </div>
                            <div className='flex justify-between items-center w-[400px]'>
                                <h1 className='py-1.5 font-semibold'>Account Number</h1>
                                <h1 className='py-1.5'>{values?.accountnumber}</h1>
                            </div>
                            <div className='flex justify-between items-center w-[400px]'>
                                <h1 className='py-1.5 font-semibold'>Address</h1>
                                <h1 className='py-1.5 '>{values?.address}</h1>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='pt-8 w-[400px] mr-4'>
                    <div className='flex justify-end'>
                        <NavLink to={`/${customertype}/balance/${values?.id}`} className={`border text-white rounded-lg font-thin shadow py-1.5 px-4 bg-blue-600`}>Make Payment</NavLink>
                    </div>

                    <div className='pt-5 w-[400px]'>
                        <Calander label={"From Date"} value={handleDateConvert(new Date(raw?.fromDate))} getDate={(data) => { setTime({ ...time, from: data }) }} getTime={(ti) => {
                            const formatted = new Date(Date.UTC(ti.getFullYear(), ti.getMonth(), ti.getDate())).toISOString().slice(0, 10);
                            setScar({ ...sear, fromDate: formatted });
                            setRaw({ ...raw, fromDate: ti })
                        }} />
                    </div>
                    <div className='pt-5 w-[400px]'>
                        <Calander label={"To Date"} value={handleDateConvert(new Date(raw?.toDate))} getDate={(data) => { setTime({ ...time, to: data }) }} getTime={(ti) => {
                            const formatted = new Date(Date.UTC(ti.getFullYear(), ti.getMonth(), ti.getDate())).toISOString().slice(0, 10);
                            setScar({ ...sear, toDate: formatted });
                            setRaw({ ...raw, toDate: ti })
                        }} />
                    </div>
                </div>
            </div>


            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center mb-3 mt-5'>
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel is_delete={true} expotExcel={exportToExcel} handeldelete={() => { }} onClick={() => setPreview(true)} Jpg={() => setPreview(true)} />
                        <Search SearchProduct={(v) => SearchOrder(v)} />
                    </div>
                </div>
                <div className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:bg-[#040404] dark:text-white w-full min-w-[700px] ">
                        <thead className=" text-sm text-left rtl:text-right text-black bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
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
                                        Warehouse
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
                                        {values?.usertype === "Supplier" ? "Purchase" : "Sale"} Amount
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
                                        Return
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-3 py-3 text-center border-r ">
                                    <div className="flex justify-between items-center">
                                        Status
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-3 py-3 text-center border-r ">
                                    <div className="flex justify-between items-center">
                                        Balance
                                        {/* <Updown /> */}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, i) => (
                                <tr onClick={() => { setId(item?.id); setType(item?.type); setInvoPreview(true) }} className={`border cursor-pointer ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{formatDate(item?.created_date)}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{ }{item?.type}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.shopname}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.creator}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.total}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.paidamount}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.return}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">{item?.order_type}</th>
                                    <th scope="col" className="px-3 py-3 border-r font-thin ">
                                        {values?.usertype === "Supplier" ? <button className={`border rounded-full px-4 mx-auto block ${item?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${item?.balance > 0 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                                            {Math.abs(item?.balance)}
                                        </button> :
                                            <button className={`border rounded-full px-4 mx-auto block ${item?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${item?.balance > 0 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                                                {Math.abs(item?.balance)}
                                            </button>}
                                    </th>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* <Modal show={invopreview} handleClose={() => setInvoPreview(false)} size={`1000px`} crosshidden={true}>
                    {(type === "Sale" || type === "Purchase items") && <PreviewInvoice id={id} type={type} usertype={values?.usertype} />}
                    {(type === "Sale Return" || type === "Return Purchase") && <PreviewReturnInvoice id={id} type={type} usertype={values?.usertype} />}
                    {(type === "Opening" || type === "Make Payment" || type === "Yearly Bonus" || type === "Online Collection") && <PreviewOpeningInvoice usertype={values?.usertype} info={info} id={id} type={type} />}
                </Modal> */}

                <Modal show={invopreview} handleClose={() => setInvoPreview(false)} size={`1000px`} crosshidden={true}>
                    {/* Sale */}
                    {type === "Sale" && <PreviewInvoice info={info} id={id} type={type} usertype={values?.usertype} />}
                    {/* Purchase */}
                    {type === "Purchase items" && <PreviewPurchaseInvoice info={info} id={id} type={type} usertype={values?.usertype} />}
                     {/* Sale Return */}
                    {type === "Sale Return" && <PreviewReturnInvoice info={info} id={id} type={type} usertype={values?.usertype} />}
                     {/* Purchase Return */}
                    { type === "Return Purchase" && <PreviewPurchaseReturnInvoice info={info} id={id} type={type} usertype={values?.usertype} />}
                     {/* Opening */}
                    {(type === "Opening" || type === "Make Payment" || type === "Yearly Bonus" || type === "Online Collection") && <PreviewOpeningInvoice info={info} usertype={values?.usertype} id={id} type={type} />}
                </Modal>

                <Modal show={preview} handleClose={() => { setPreview(false) }} size={`1000px`} crosshidden={true}>
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" ref={ref}>
                        <div ref={targetRef}>
                            <Pdf>
                                <div className='flex justify-center items-center'>
                                    <h1>{values?.usertype} Ledger Report</h1>

                                </div>
                                <div className='flex justify-evenly items-center font-thin text-sm pb-2'>
                                    <h1>From Date : {handleDateConvert(new Date(raw?.fromDate))}</h1>
                                    <h1>To Date : {handleDateConvert(new Date(raw?.toDate))}</h1>
                                </div>
                                <div className='flex justify-between items-center font-thin text-sm pb-2'>
                                    <h1>Code : {values?.id}</h1>
                                    <h1>Name : {values?.name}</h1>
                                    <h1>Address : {values?.address}</h1>
                                </div>
                                <table className="text-sm text-left w-full min-w-[700px] ">
                                    <thead className=" text-sm text-left rtl:text-right text-black ">
                                        <tr className='border'>
                                            <th scope="col" className="px-2 py-2 border-r ">
                                                <div className="flex justify-between items-center">
                                                    Date
                                                    <Updown />
                                                </div>
                                            </th>
                                            {values?.usertype === "Supplier" && <th scope="col" className="px-2 py-2 border-r ">
                                                <div className="flex justify-between items-center">
                                                    Challan No
                                                    <Updown />
                                                </div>
                                            </th>}
                                            <th scope="col" className="px-2 py-2 border-r ">
                                                <div className="flex justify-between items-center">
                                                    Invoice
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r ">
                                                <div className="flex justify-between items-center">
                                                    Type
                                                    <Updown />
                                                </div>
                                            </th>
                                            {/* {values?.usertype === "Supplier" && <th scope="col" className="px-2 py-2 text-center border-r ">
                                                <div className="flex justify-between items-center">
                                                    Net MRP
                                                    <Updown />
                                                </div>
                                            </th>} */}
                                            <th scope="col" className="px-2 py-2 text-center border-r ">
                                                <div className="flex justify-center items-center">
                                                    {values?.usertype === "Supplier" ? "Purchase" : "Sale"} Amount
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r ">
                                                <div className="flex justify-center items-center">
                                                    Paid
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r ">
                                                <div className="flex justify-center items-center">
                                                    Return
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r ">
                                                <div className="flex justify-center items-center">
                                                    Balance
                                                    <Updown />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {opening && <tr className={`border cursor-pointer`}>
                                            <th scope="col" className="px-1 py-1 border-r font-thin ">{formatDate(opening?.createdAt)}</th>
                                            {values?.usertype === "Supplier" && <th scope="col" className="px-1 py-1 border-r font-thin ">{opening?.sup_invo}</th>}
                                            <th scope="col" className="px-1 py-1 border-r font-thin ">{prefix}/{ReturnSaleCode(opening?.type)}-{String(opening?.id).padStart(5, '0')}</th>
                                            <th scope="col" className="px-1 py-1 border-r font-thin ">{opening?.type}</th>
                                            {values?.usertype === "Supplier" && <th scope="col" className="px-1 py-1 border-r font-thin ">{opening?.total}</th>}
                                            <th scope="col" className="px-1 py-1 border-r font-thin text-center">{opening?.total}</th>
                                            <th scope="col" className="px-1 py-1 border-r font-thin text-center">{opening?.paidamount}</th>
                                            <th scope="col" className="px-1 py-1 border-r font-thin text-center">{opening?.return}</th>
                                            <th scope="col" className="px-1 py-1 border-r font-thin text-right">
                                                {values?.usertype === "Supplier" ? <button className={`border rounded-full px-4 mx-auto block ${opening?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${opening?.balance > 0 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                                                    {Math.abs(opening?.balance)}
                                                </button> :
                                                    <button className={`border rounded-full px-4 mx-auto block ${opening?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${opening?.balance > 0 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                                                        {Math.abs(opening?.balance)}
                                                    </button>}</th>
                                        </tr>} */}
                                        {reverse?.map((item, i) => (
                                            <tr className={`border cursor-pointer`}>
                                                <th scope="col" className="px-1 py-1 border-r font-thin ">{formatDate(item?.createdAt)}</th>
                                                {values?.usertype === "Supplier" && <th scope="col" className="px-1 py-1 border-r font-thin ">{item?.sup_invo}</th>}
                                                <th scope="col" className="px-1 py-1 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                                <th scope="col" className="px-1 py-1 border-r font-thin ">{item?.type}</th>
                                                {/* {values?.usertype === "Supplier" && <th scope="col" className="px-1 py-1 border-r font-thin ">{item?.total}</th>} */}
                                                <th scope="col" className="px-1 py-1 border-r font-thin text-center">{item?.total}.00</th>
                                                <th scope="col" className="px-1 py-1 border-r font-thin text-center">{item?.paidamount}.00</th>
                                                <th scope="col" className="px-1 py-1 border-r font-thin text-center">{item?.return}.00</th>
                                                <th scope="col" className="px-1 py-1 border-r font-thin text-center">{item?.balance * -1}.00</th>
                                            </tr>
                                        ))
                                        }
                                        <tr className={`border cursor-pointer`}>
                                            <th scope="col" className="px-1 py-1 border-r font-semibold ">Total</th>
                                            {values?.usertype === "Supplier" && <th scope="col" className="px-1 py-1 border-r font-thin "></th>}
                                            <th scope="col" className="px-1 py-1 border-r font-thin "></th>
                                            <th scope="col" className="px-1 py-1 border-r font-thin "></th>
                                            {/* {values?.usertype === "Supplier" && <th scope="col" className="px-1 py-1 border-r font-semibold">{calcu?.total}</th>} */}
                                            <th scope="col" className="px-1 py-1 border-r font-semibold text-center">{calcu?.total}.00</th>
                                            <th scope="col" className="px-1 py-1 border-r font-semibold text-center">{calcu?.paid}.00</th>
                                            <th scope="col" className="px-1 py-1 border-r font-semibold text-center">{calcu?.return_amount}.00</th>
                                            <th scope="col" className="px-1 py-1 border-r font-semibold text-center">{values?.balance ? values?.balance * -1 : reverse[0]?.balance * -1}.00</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </Pdf>
                        </div>

                    </div>
                    <div className='flex justify-end items-end pr-8 gap-2'>
                        <button onClick={() => generatePDF(targetRef, { filename: `Products.pdf` })} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">PDF</span>
                        </button>

                        <button onClick={PrintInvoice} className='border border-gray-500 text-gray-600 rounded-lg bg-[#FFFFFF] shadow-md hover:bg-gray-600 hover:text-white px-4 py-1.5 mr-1 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16.9 3a1.1 1.1 0 0 1 1.094.98L18 4.1V7h1a3 3 0 0 1 2.995 2.824L22 10v7a2 2 0 0 1-1.85 1.995L20 19h-2v1.9a1.1 1.1 0 0 1-.98 1.094L16.9 22H7.1a1.1 1.1 0 0 1-1.094-.98L6 20.9V19H4a2 2 0 0 1-1.995-1.85L2 17v-7a3 3 0 0 1 2.824-2.995L5 7h1V4.1a1.1 1.1 0 0 1 .98-1.094L7.1 3zM16 16H8v4h8zm3-7H5a1 1 0 0 0-.993.883L4 10v7h2v-1.9a1.1 1.1 0 0 1 .98-1.094L7.1 14h9.8a1.1 1.1 0 0 1 1.094.98l.006.12V17h2v-7a1 1 0 0 0-1-1m-2 1a1 1 0 0 1 .117 1.993L17 12h-2a1 1 0 0 1-.117-1.993L15 10zm-1-5H8v2h8z" /></g></svg>
                            Print</button>
                    </div>
                </Modal>
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


