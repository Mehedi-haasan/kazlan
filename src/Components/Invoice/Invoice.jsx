import { useEffect, useState, useRef } from 'react';
import InvoiceCard from './InvoiceCard';
import DownModal from '../Input/DownModal';
import PaymentTotal from './PaymentTotal';
import BaseUrl from '../../Constant';
import Tabeheader from './Tableheader';
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import { useNavigate, useParams } from 'react-router-dom';
import InvoHeader from './InvoHeader';



const Invoice = ({ isOrder = true, info = {}, prefix = 'KB' }) => {

    const goto = useNavigate()
    const params = useParams();
    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [isGen, setIsGen] = useState(false)
    const [user, setUser] = useState({});
    const [allData, setAllData] = useState([]);
    const [total, setTotal] = useState(0)


    const GetReturnProduct = async (id) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${BaseUrl}/api/get/order/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();
        let amount = data?.items?.reduce((acc, item) => {
            return acc + parseInt(item?.sellprice)
        }, 0);
        setTotal(amount || 0)
        setAllData(data?.items);
        setUser(data?.user)
    }

    useEffect(() => {
        document.title = "Invoice "
        GetReturnProduct(params?.id)
    }, [params?.id])

    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const CalculateSale = (item) => {
        let sale = 0;

        if (item?.discount_type === "Fixed") {
            sale = parseInt(item?.discount)
        } else if (item?.discount_type === "Percentage") {
            let discount = parseInt(parseInt(item?.price) * parseInt(item?.discount) / 100);
            sale = discount
        }
        return parseInt(item?.price) - parseInt(sale)
    }


    const ReturnSaleCode = (type) => {
        let saleType = "SL"
        if (type === "Sale") {
            saleType = "SL"
        } else if (type === "Sale Return") {
            saleType = "SR"
        } else if (type === "Return Purchase") {
            saleType = "PR"
        } else if (type === "Purchase items") {
            saleType = "PO"
        }

        return saleType
    }

    const Calculate = () => {

        let sum = 0
        let due = parseInt(user?.previousdue);

        if (due < 0) {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - Math.abs(user?.previousdue)
        } else {
            sum = Math.abs(user?.previousdue) + total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount)
        }
        return sum
    }

    const TotalDue = () => {
        let amount = Calculate()
        return amount - parseInt(user?.paidamount)
    }

    const PrintInvoice = () => {
        const rows = allData?.map(item => {
            return `
                    <tr style="border: 1px solid black">
                        <th style="padding: 8px; border-left: 1px solid black; border-right: 1px solid black; border-bottom:1px solid black">
                        ${convertToBengaliNumber(item?.qty)}
                        </th>
                        <td style="padding: 8px; border-right: 1px solid black; border-bottom:1px solid black">
                        ${item?.name}-[${item?.product?.category?.name}]
                        </td>
                        <td style="padding: 8px; border-right: 1px solid black;  border-bottom:1px solid black">
                        ${item?.product?.brand?.name}
                        </td>
                        <td style="padding: 8px; border-right: 1px solid black;  border-bottom:1px solid black; text-align:right">
                        ${convertToBengaliNumber(parseInt(item?.price))}.০
                        </td>
                        <td style="padding: 8px; border-right: 1px solid black; border-bottom:1px solid black; text-align:right">
                        ${convertToBengaliNumber(CalculateSale(item))}.০
                        </td>
                        <td style="padding: 8px;  border-right: 1px solid black; border-bottom:1px solid ; text-align:right">
                        ${convertToBengaliNumber(item?.sellprice)}.০
                        </td>
                    </tr>
                    `;
        }).join("");

        const UserInfo = `
                        <div>
                            <div style="display: flex; justify-content: space-between; paddind-bottom:0px">
                                <div style="display: flex; justify-content: flex-start; gap: 12px; paddind-bottom:0px">
                                    <p style="color: black; width: 80px;">নাম</p>
                                    <p style="color: black;"> : ${user?.name}</p>
                                </div>

                                <div style="display: flex; justify-content: flex-start; gap: 12px;">
                                    <p style="color: black;">মেমো নং</p>
                                    <p style="color: black; "> : ${prefix}/${ReturnSaleCode(user?.type)}-00${params?.id}</p>
                                </div>
                            </div>

                            <div style="display: flex; justify-content: space-between;">
                                <div style="display: flex; justify-content: flex-start; gap: 12px;">
                                    <p style="width: 80px; color: black;">ঠিকানা</p>
                                    <p style="color: black;"> : ${user?.state}</p>
                                </div>

                                <div style="display: flex; justify-content: flex-start; gap: 12px;">
                                    <p style="color: black;">তারিখ</p>
                                    <p style="color: black;"> : ${user?.date}</p>
                                </div>
                            </div>

                            <div style="display: flex; justify-content: space-between;">
                                <div style="display: flex; justify-content: flex-start; gap: 12px;">
                                    <p style="color: black; width: 80px;">মোবাইল</p>
                                    <p style="color: black;"> : ${user?.phone}</p>
                                </div>
                            </div>
                        </div>
                        `;


        const footerContent = `
                                    <tr style="background: white;">
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;">মোট</td>
                                        <td style="padding: 8px; text-align: right;">${convertToBengaliNumber(total)}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;">প্যাকিং</td>
                                        <td style="padding: 8px; text-align: right;">${convertToBengaliNumber(parseInt(user?.packing) || 0)}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px; border-bottom: 1px solid black">ডেলিভারী</td>
                                        <td style="padding: 8px; border-bottom: 1px solid black; text-align: right;">${convertToBengaliNumber(parseInt(user?.delivery) || 0)}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px;"></th>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;">সর্বমোট</td>
                                        <td style="padding: 8px; text-align: right;">${convertToBengaliNumber(total + (parseInt(user?.packing) || 0) + (parseInt(user?.delivery) || 0))}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px 24px 8px 8px;"></th>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;">ডিসকাউন্ট</td>
                                        <td style="padding: 8px; text-align: right;">${convertToBengaliNumber(parseInt(user?.lastdiscount || 0))}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px 24px 8px 8px;"></th>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px; border-bottom: 1px solid black">পুর্বের বকেয়া</td>
                                        <td style="padding: 8px; border-bottom: 1px solid black; text-align: right;">${convertToBengaliNumber(parseInt(user?.previousdue) || 0)}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px 24px 8px 8px;"></th>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;">অবশিষ্ট</td>
                                        <td style="padding: 8px; text-align: right;">${convertToBengaliNumber(Calculate())}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px 24px 8px 8px;"></th>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px; border-bottom: 1px solid black">জমা</td>
                                        <td style="padding: 8px; border-bottom: 1px solid black; text-align: right;">${convertToBengaliNumber(parseInt(user?.paidamount || 0))}.০</td>
                                    </tr>
                                    <tr style="background: white;">
                                        <th style="padding: 8px; ">বিতরনকারী</th>
                                        <th style="padding: 8px;"></th>
                                        <td style="padding: 8px;"> ম্যানেজার</td>
                                        <td style="padding: 8px;"></td>
                                        <td style="padding: 8px;">মোট বাকি</td>
                                        <td style="padding: 8px; text-align: right;">${convertToBengaliNumber(TotalDue())}.০</td>
                                    </tr>
                                `;

        const invoiceContent = `
                                <html>
                                <head>
                                    <title>Invoice</title>
                                    <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        padding: 40px;
                                    }
                                    .invoice {
                                        width: 750px;
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
                                    <div class="invoice">
                                    <h2 style="text-align:center">${info?.shopname}</h2>
                                    ${UserInfo}
                                    <table style="border-collapse: collapse; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th style="padding: 8px; border-left: 1px solid black; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black">পরিমাণ</th>
                                            <th style="padding: 8px; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:left">বইয়ের নাম এবং শ্রেণি</th>
                                            <th style="padding: 8px; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:left">প্রকাশনি</th>
                                            <th style="padding: 8px; text-align: center; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:right">মূল্য</th>
                                            <th style="padding: 8px; text-align: center; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:right">বিক্রয় মূল্য</th>
                                            <th style="padding: 8px; text-align: right; border-right: 1px solid black; border-top:1px solid black; border-bottom:1px solid black; text-align:right">মোট মূল্য</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        ${rows}
                                        ${footerContent}
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
        <div className="min-h-screen">

            <div className='w-full mx-auto border rounded py-4 px-2'>
                <div className="bg-[#FFFFFF] rounded p-4">

                    <InvoHeader user={user} params={params} />



                    <div className='relative overflow-x-auto my-5'>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <Tabeheader />
                            <tbody>

                                {allData?.map((item) => {
                                    return <InvoiceCard key={item?.id} item={item} />
                                })}
                                <PaymentTotal user={user} total={total} />

                            </tbody>
                        </table>
                    </div>
                </div>

                <DownModal show={isGen} handleClose={() => { setIsGen(false) }} className={`w-[800px] overflow-hidden overflow-y-auto`}>
                    <div className='max-h-[700px] '>
                        <div ref={ref} className=''>
                            <div ref={targetRef} className='bg-white w-[750px]'>
                                <div className="p-8">
                                    <InvoHeader user={user} params={params} />

                                    <div className='relative overflow-x-auto py-5'>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                            <Tabeheader />
                                            <tbody>
                                                {allData?.map((item) => {
                                                    return <InvoiceCard key={item?.id} item={item} />
                                                })}
                                                <PaymentTotal user={user} total={total} />

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end items-end pr-8 gap-2'>
                            <button onClick={getPng} className='border rounded px-4 py-1.5 font-thin'>Download JPG</button>
                            <button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} className='border rounded px-4 py-1.5 font-thin'>Download PDF</button>
                        </div>
                    </div>
                </DownModal>



                <div className="flex justify-end my-3 mr-2">
                    <button onClick={() => { goto(`/sale/order/edit/${params?.id}`) }} className='border border-green-500 rounded-lg px-4 py-1.5 ml-3 font-thin'>Edit</button>
                    <button onClick={() => { setIsGen(true) }} className='border border-green-500 rounded-lg px-4 py-1.5 mx-3 font-thin'>PDF/PNG</button>
                    <button onClick={PrintInvoice} className='border border-green-500 rounded-lg px-4 py-1.5 mr-1 font-thin'>Print</button>

                </div>
            </div>



        </div>
    );
}

export default Invoice;