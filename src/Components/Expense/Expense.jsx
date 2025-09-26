import { useEffect, useState, useRef } from 'react';
import InvoiceCard from './InvoiceCard';
import DownModal from '../Input/DownModal';
import BaseUrl from '../../Constant';
import Tabeheader from './TableHeader';
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import Pdf from '../Pdf/Pdf';
import Calendar from '../Wholesale/Calender';
import { handleDateConvert, ReturnSaleCode } from '../Input/Time'
import ExpenseCard from './ExpenseCard';
import Button from '../Input/Button';
import Modal from '../Input/Modal'

const Expense = ({ prefix = 'KB' }) => {

    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [isGen, setIsGen] = useState(false)
    const [allData, setAllData] = useState([]);
    const [allSale, setAllSale] = useState([])
    const [handCash, setHandCash] = useState(0)
    const [paidSales, setPaidSale] = useState([])
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 2);
    const [grandTotal, setGrandtotal] = useState(0)
    const [raw, setRaw] = useState({
        fromDate: sevenDaysAgo.toISOString(),
        toDate: today.toISOString(),
        userId: null,
        type: null
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

    function handleDateConv(date) {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }


    const GetReturnProduct = async (id) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify({ date: handleDateConv(new Date(raw?.toDate)) })
        });
        const data = await response.json();
        setAllData(data?.final_data);
        setGrandtotal(data?.grand_total)
        const allSales = data?.items?.filter(item => item.type === "Sale");
        setAllSale(allSales)
        const paidSale = data?.items?.filter(item => item.type === "Sale" && item.paidamount > 0);
        setPaidSale(paidSales);
        setHandCash(data?.hand_cash)
    }



    useEffect(() => {
        document.title = "Daily Report"
        GetReturnProduct()
    }, [raw])





    const PrintInvoice = () => {
        const rows = `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border:0px">
                            ${allData?.map(data => {
            let groupHtml = `<div>`; // start group container

            // Group title
            groupHtml += `<p style="padding: 4px; text-align:center; font-weight:bold;">${data?.name}</p>`;

            // Decide number of columns based on group name
            const gridColumns = data?.name === "Income" ? "1fr 1fr" : "1fr 1fr 1fr";

            // Header row
            groupHtml += `
                                <div style="border: 1px solid black; display: grid; grid-template-columns: ${gridColumns}; font-weight: bold; background:#f0f0f0;">
                                    <div style="padding: 4px; border-right: 1px solid black; font-size: 13px;">Name</div>
                                    ${data?.name !== "Income" ? `<div style="padding: 4px; ${data?.name !== "Income" ? "border-right: 1px solid black;" : ""} font-size: 13px;">Invoice No</div>` : ``}
                                    <div style="padding: 4px; text-align: right; font-size: 13px;">Amount</div>
                                </div>
                                `;

            // Data rows
            groupHtml += data?.items?.map(item => `
                                <div style="border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black; display: grid; grid-template-columns: ${gridColumns};">
                                    <div style="padding: 4px; border-right: 1px solid black; font-size: 13px;">
                                        ${item?.customername}
                                    </div>
                                    ${data?.name !== "Income" ? `<div style="padding: 4px; ${data?.name !== "Income" ? "border-right: 1px solid black; " : ""} font-size: 13px;">
                                        ${prefix}/${ReturnSaleCode(item?.type)}-${String(item?.id).padStart(5, '0')}
                                    </div>`: ``}
                                    <div style="padding: 4px; text-align: right; font-size: 13px;">${item?.paidamount}</div>
                                </div>
                                `).join("");

            // Total row
            groupHtml += `
                                                    <div style="border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black; display: grid; grid-template-columns: 1fr 1fr;">
                                                        <div style="padding: 4px; font-weight:bold;">Total</div>
                                                        <div style="padding: 4px; text-align: right; font-weight:bold;">${data?.paidamount}</div>
                                                    </div>
                                                `;

            groupHtml += `</div>`; // end group container
            return groupHtml;
        }).join("")}
                        </div>
                        `;

        const invoiceContent = `
                                <html>
                                <head>
                                    <title>Invoice</title>
                                    <style>
                                    @font-face {
                                        font-family: 'SutonnyMJ';
                                        src: url('./SutonnyMJ/SutonnyMJ.ttf') format('truetype');
                                    }
                                    body {
                                        font-family: Arial, sans-serif;
                                        padding: 0px;
                                        margin:0px
                                    }
                                    .invoice {
                                        width: 750px;
                                        margin: auto;
                                        background: #fff;
                                        padding: 20px;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div class="invoice" style="padding-top: 50px;">
                                    <div>
                                      <div>
                                      <h3 style="text-align: center; margin:0px; padding:0px;">Cash In Hand : ${handCash} Tk</h3>
                                      ${rows}
                                      </div>
                                    
                                    </div>
                                    
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

    function getFormattedDate(date) {
        if (!date) return "";
        const d = new Date(date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    }

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const [opening, setOpening] = useState({
        amount: 0,
        date: getFormattedDate(nextDay)
    });
    useEffect(() => {
        setOpening({ ...opening, date: getFormattedDate(nextDay) })
    }, [nextDay])
    const [openModal, setOpenModal] = useState(false)

    const handleSubmit = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/post/opening/balance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(opening)
        });
        const data = await response.json();
        setOpenModal(false)
    }

    return (
        <div className="min-h-screen">
            <div className='w-full mx-auto rounded py-4 px-2'>
                <div className='border-b px-5 flex justify-between items-center bg-white dark:bg-[#040404] dark:text-white rounded shadow-md '>
                    <h1 className='text-2xl font-semibold py-5'>Daily Report</h1>
                    <div className='flex justify-end items-start gap-5'>
                        <div className='flex justify-end items-center gap-3'>
                            <h1 className='mt-1.5'>Date : </h1>
                            <div className='w-[280px]'> <Calendar value={handleDateConvert(new Date(raw?.toDate))}
                                getDate={(date) => { setValues({ ...values, deliverydate: date }) }}
                                getTime={(ti) => { setRaw({ ...raw, toDate: ti }) }} /></div>
                        </div>
                        <div>
                            <Button onClick={() => { setOpenModal(true) }} name={'Opening'} />
                        </div>
                    </div>
                </div>
                <div>
                    <Modal show={openModal} handleClose={() => { setOpenModal(false) }} size={`500px`} crosshidden={false}>
                        <h1 className='pt-2'>Post Opening Balance</h1>
                        <div className='flex justify-end items-center gap-3'>
                            <div className='w-[280px]'>
                                <Calendar label={"Date"} value={opening?.date}
                                    getDate={(date) => {
                                        setOpening({ ...opening, date: getFormattedDate(date) })
                                    }}
                                    getTime={(ti) => { }} />
                            </div>
                        </div>
                        <div className='w-full pt-1'>
                            <h1 className='text-[15px] pb-1.5'>Amount</h1>
                            <input
                                type="text"
                                value={opening?.amount}
                                placeholder="Amount"
                                onChange={(e) => setOpening({ ...opening, amount: e.target.value })}
                                className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit()
                                    }
                                }}
                            />

                        </div>
                        <Button onClick={handleSubmit} name={'Submit'} />
                    </Modal>
                </div>
                <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded p-4 shadow mt-3">
                    <div className='relative overflow-x-auto my-5'>
                        <div className=' grid grid-cols-2 gap-5'>
                            <div className='grid col-span-2'>
                                <h1 className='text-center'>Cash In Hand : {handCash} Tk</h1>
                            </div>
                            {allData?.map((data, i) => {
                                return <div key={i}>
                                    <h1 className='p-2 text-center'>{data?.name}</h1>
                                    <div className={`border grid ${data?.name === "Income" ? "grid-cols-2" : "grid-cols-3"}  text-black`}>
                                        <h1 className="p-2">Name</h1>
                                        <h1 className={`p-2 border-l ${data?.name === "Income" ? "hidden" : ""}`}>Invoice No</h1>
                                        {/* <h1 className="p-2 border-l text-right">Paid Amount</h1> */}
                                        <h1 className="p-2 border-l text-right">Total</h1>
                                    </div>
                                    {
                                        data?.items?.map((item, i) => {
                                            return <InvoiceCard key={i} item={item} name={data?.name} />
                                        })
                                    }
                                    <div className={`grid ${data?.name === "Income" ? "grid-cols-2" : "grid-cols-3"} text-[14px] font-thin`}>
                                        <h1 className='border-l border-b p-2'>Total</h1>
                                        <h1 className={`border-l border-b p-2  ${data?.name === "Income" ? "hidden" : ""}`}></h1>
                                        <h1 className='border-x border-b p-2 text-right'>{data?.paidamount}</h1>
                                        {/* <h1 className='border-x border-b p-2 text-right'>{data?.total}</h1> */}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {/* <DownModal show={isGen} handleClose={() => { setIsGen(false) }} className={`w-[800px] overflow-hidden overflow-y-auto`}>
                    <div className='max-h-[700px] '>
                        <div ref={ref} className=''>
                            <div ref={targetRef} className='bg-white w-[760px]'>
                                <Pdf>
                                    <table class="w-full text-sm text-left mt-4">
                                        <Tabeheader />
                                        <tbody>
                                            {allData?.map((data,i) => {
                                                return <>
                                                    <tr key={i}>
                                                        <td colSpan={4} className='border p-2'>{data?.name}</td>
                                                    </tr>
                                                    {
                                                        data?.items?.map((item,i) => {
                                                            return <InvoiceCard key={i} item={item} />
                                                        })
                                                    }
                                                    <tr key={i+1}>
                                                        <td colSpan={2} className='border p-2'>Total</td>
                                                        <td colSpan={2} className='border p-2 text-right'>{data?.total}</td>
                                                    </tr>
                                                </>
                                            })}
                                        </tbody>
                                    </table>
                                </Pdf>
                            </div>
                        </div>
                        <div className='flex justify-end items-end pr-8 gap-2'>
                            <button onClick={getPng} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                                <span className="group-hover:text-white transition duration-200">JPG</span>
                            </button>

                            <button onClick={() => generatePDF(targetRef, { filename: `DailyExpense.pdf` })} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                                <span className="group-hover:text-white transition duration-200">PDF</span>
                            </button>
                        </div>
                    </div>
                </DownModal> */}

                <div className="flex justify-end my-3 mr-2 pb-8">
                    <button onClick={() => { setIsGen(true) }} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 mx-3 font-thin flex justify-start items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                        <span className="group-hover:text-white transition duration-200">PDF</span>
                    </button>
                    <button onClick={PrintInvoice} className='border border-gray-500 text-gray-600 rounded-lg bg-[#FFFFFF] shadow-md hover:bg-gray-600 hover:text-white px-4 py-1.5 mr-1 font-thin flex justify-start items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16.9 3a1.1 1.1 0 0 1 1.094.98L18 4.1V7h1a3 3 0 0 1 2.995 2.824L22 10v7a2 2 0 0 1-1.85 1.995L20 19h-2v1.9a1.1 1.1 0 0 1-.98 1.094L16.9 22H7.1a1.1 1.1 0 0 1-1.094-.98L6 20.9V19H4a2 2 0 0 1-1.995-1.85L2 17v-7a3 3 0 0 1 2.824-2.995L5 7h1V4.1a1.1 1.1 0 0 1 .98-1.094L7.1 3zM16 16H8v4h8zm3-7H5a1 1 0 0 0-.993.883L4 10v7h2v-1.9a1.1 1.1 0 0 1 .98-1.094L7.1 14h9.8a1.1 1.1 0 0 1 1.094.98l.006.12V17h2v-7a1 1 0 0 0-1-1m-2 1a1 1 0 0 1 .117 1.993L17 12h-2a1 1 0 0 1-.117-1.993L15 10zm-1-5H8v2h8z" /></g></svg>
                        Print</button>

                </div>
            </div>



        </div>
    );
}

export default Expense;