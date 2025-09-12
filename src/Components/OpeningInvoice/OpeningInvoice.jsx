import { useEffect, useState, useRef } from 'react';
import InvoiceCard from '../Invoice/InvoiceCard';
import DownModal from '../Input/DownModal';
import PaymentTotal from './PaymentTotal';
import BaseUrl from '../../Constant';
import Tabeheader from '../Invoice/Tableheader';
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import { useNavigate, useParams } from 'react-router-dom';
import InvoHeader from './InvoHeader';
import Edit from '../../icons/Edit'
import Pdf from '../Pdf/Pdf';
import PdfHeader from '../Invoice/PdfHeader';
import PdfBottom from '../Invoice/PdfBottom'
import { numberToWords } from '../Input/Time'


const OpeningInvoice = ({ isOrder = true, info = {}, prefix = 'KB' }) => {

    const goto = useNavigate()
    const params = useParams();
    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [isGen, setIsGen] = useState(false)
    const [user, setUser] = useState({});
    const [allData, setAllData] = useState([]);
    const [invoice, setInvoice] = useState({})
    const [total, setTotal] = useState(0);
    const [state, setState] = useState({})
    const [pevNext, setPrevNext] = useState({
        prev: null,
        next: null
    })


    const GetReturnProduct = async (id, type) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${BaseUrl}/api/get/invo/order/${id}/${type}`, {
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
        setUser(data?.user);
        setInvoice(data?.invoice)
        setState(data?.state)
        setPrevNext({
            ...pevNext,
            prev: data?.prevInvo,
            next: data?.nextInvo,
            last: data?.lastInvo
        })
    }

    useEffect(() => {
        document.title = "Invoice"
        GetReturnProduct(params?.id, params?.type)
    }, [params?.id])



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

        const UserInfo = `
                        <div style="padding-bottom: 15px; font-size: 13px; color:black">
                            <div style="">
                                 <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style=" padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">তারিখ</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;">${invoice?.date}</p>
                                    </div>
                                </div>


                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style=" padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">নাম</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;">${user?.name}</p>
                                    </div>
                                </div>


                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style=" padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Payment Type</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;">${invoice?.type}</p>
                                    </div>
                                </div>


                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style=" padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Cheqe No</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;"></p>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style=" padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Cheqe Date</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;">${invoice?.date}</p>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style=" padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Bank Name</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;"></p>
                                    </div>
                                </div>


                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style="padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Branch Name</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;"></p>
                                    </div>
                                </div>


                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style="padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Receipt No</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;">${prefix}/${ReturnSaleCode(user?.type)}-${String(params?.id).padStart(5, '0')}</p>
                                    </div>
                                </div>


                                <div style="display: flex; justify-content: flex-start; padding-bottom:5px">
                                    <div style="padding:5px; width: 130px">
                                      <p style="color: black;  margin: 0px;">Amount</p>
                                    </div>
                                     <div style="display: flex; justify-content: center; align-items: center; width:30px">:</div> 

                                    <div style="border: 1px solid black; padding:5px; width: 250px">
                                      <p style="color: black; margin: 0px;">${invoice?.balance}</p>
                                    </div>
                                </div>


                        </div>
                        `;

        const invoiceContent = `
                                <html>
                                <head>
                                    <title style="font-family: 'SutonnyMJ', sans-serif;">Invoice</title>
                                    <style>
                                    @font-face {
                                        font-family: 'SutonnyMJ';
                                        src: url('./SutonnyMJ/SutonnyMJ.ttf') format('truetype');
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div style="padding-top: 50px; font-family: 'SutonnyMJ', sans-serif;">
                                    
                                        <div style="display: flex; justify-content: center; align-items: center;">
                                            ${UserInfo}
                                        </div>

                                    </div>
                                    <div>
                                       <p style="text-align: center">${numberToWords(invoice?.paidamount)}</p>
                                    </div>
                                    <div style="display:flex; justify-content: space-around; align-items: center;">
                                        <p style="text-decoration: overline;">Recieved By</p>
                                        <p style="text-decoration: overline;">Authorized Signature</p>
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

    const Redirect = (value) => {
        if (value?.type === "Sale") {
            goto(`/invoice/${value?.id}/${value?.type}`)
        } else if (value?.type === "Sale Return") {
            goto(`/return/invoice/${value?.id}/${value?.type}`)
        } else if (value?.type === "Return Purchase") {
            goto(`/return/invoice/${value?.id}/${value?.type}`)
        } else if (value?.type === "Purchase items") {
            goto(`/invoice/${value?.id}/${value?.type}`)
        } else {
            goto(`/opening/invoice/${value?.id}/${value?.type}`)
        }
    }

    return (
        <div className="min-h-screen">

            <div className='w-full mx-auto border rounded py-4 px-2'>
                <div className="bg-[#FFFFFF] rounded p-4">

                    <InvoHeader user={user} invoice={invoice} params={params} state={state} />



                    <div className='relative overflow-x-auto my-5'>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            {/* <Tabeheader /> */}
                            <tbody>

                                {/* {allData?.map((item) => {
                                    return <InvoiceCard key={item?.id} item={item} />
                                })} */}
                                <PaymentTotal user={user} total={total} invoice={invoice} />

                            </tbody>
                        </table>
                    </div>
                </div>

                <DownModal show={isGen} handleClose={() => { setIsGen(false) }} className={`w-[800px] overflow-hidden overflow-y-auto`}>
                    <div className='max-h-[700px] '>
                        <div ref={ref} className=''>
                            <div ref={targetRef} className='bg-white w-[760px]'>
                                <Pdf>
                                    <div className="">
                                        <PdfHeader user={user} params={params} />

                                        <div className='relative overflow-x-auto py-5'>
                                            <table className="w-full text-[14px] text-left">
                                                <Tabeheader />
                                                <tbody>
                                                    {allData?.map((item) => {
                                                        return <InvoiceCard key={item?.id} item={item} />
                                                    })}
                                                    <PdfBottom user={user} total={total} />

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </Pdf>
                            </div>
                        </div>
                        <div className='flex justify-end items-end pr-8 gap-2'>
                            <button onClick={getPng} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                                <span className="group-hover:text-white transition duration-200">JPG</span>
                            </button>

                            <button onClick={() => generatePDF(targetRef, { filename: `${user?.name}.pdf` })} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                                <span className="group-hover:text-white transition duration-200">PDF</span>
                            </button>
                        </div>
                    </div>
                </DownModal>



                <div className='flex justify-between'>
                    <div className="flex justify-end my-3 mr-2">
                        <button
                            onClick={() => { Redirect(pevNext?.prev) }}
                            className={`group border bg-[#FFFFFF] border-green-500 flex shadow-md ${pevNext?.prev ? '' : 'hidden'} justify-start items-center gap-1 text-green-500 rounded-lg px-4 py-1.5 ml-3 font-thin hover:bg-green-500 hover:text-white transition duration-200`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M17.772 11.996c0-2.168-.122-3.899-.228-4.992a53 53 0 0 0-4.437 2.3a53 53 0 0 0-4.21 2.693c.889.633 2.32 1.598 4.211 2.69a53 53 0 0 0 4.436 2.302c.106-1.093.228-2.825.228-4.993M17.585 4.8a1.332 1.332 0 0 1 1.846 1.065c.114.912.341 3.12.341 6.13c0 3.014-.228 5.222-.34 6.133a1.332 1.332 0 0 1-1.845 1.065c-.84-.356-2.847-1.255-5.479-2.775c-2.63-1.518-4.413-2.806-5.141-3.357a1.332 1.332 0 0 1 0-2.13c.736-.554 2.542-1.859 5.14-3.36s4.63-2.41 5.478-2.77ZM4 6a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0z" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">Prev</span>
                        </button>
                        <button onClick={() => { Redirect(pevNext?.next) }} className={`border group border-red-500 text-red-500 ${pevNext?.next ? '' : 'hidden'} bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 mx-3 font-thin flex justify-start items-center gap-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 7.766c0-1.554 1.696-2.515 3.029-1.715l7.056 4.234c1.295.777 1.295 2.653 0 3.43L8.03 17.949c-1.333.8-3.029-.16-3.029-1.715zM14.056 12L7 7.766v8.468zM18 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1" /></svg>
                            <span className="group-hover:text-white transition duration-200">Next</span>
                        </button>

                        <button onClick={() => { Redirect(pevNext?.last) }} className={`border group border-red-500 text-red-500 ${parseInt(pevNext?.last?.id) === parseInt(params?.id) ? 'hidden' : ''} bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 mx-3 font-thin flex justify-start items-center gap-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 7.766c0-1.554 1.696-2.515 3.029-1.715l7.056 4.234c1.295.777 1.295 2.653 0 3.43L8.03 17.949c-1.333.8-3.029-.16-3.029-1.715zM14.056 12L7 7.766v8.468zM18 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1" /></svg>
                            <span className="group-hover:text-white transition duration-200">Last</span>
                        </button>
                    </div>

                    <div className="flex justify-end my-3 mr-2">
                        {/* <button
                            onClick={() => goto(`/sale/order/edit/${params?.id}`)}
                            className="group border bg-[#FFFFFF] border-green-500 flex shadow-md justify-start items-center gap-1 text-green-500 rounded-lg px-4 py-1.5 ml-3 font-thin hover:bg-green-500 hover:text-white transition duration-200"
                        >
                            <Edit className="group-hover:text-white transition duration-200" />
                            <span className="group-hover:text-white transition duration-200">Edit</span>
                        </button> */}
                        <button onClick={() => { setIsGen(true) }} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 mx-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">PDF</span>
                        </button>
                        <button onClick={PrintInvoice} className='border border-gray-500 text-gray-600 rounded-lg bg-[#FFFFFF] shadow-md hover:bg-gray-600 hover:text-white px-4 py-1.5 mr-1 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16.9 3a1.1 1.1 0 0 1 1.094.98L18 4.1V7h1a3 3 0 0 1 2.995 2.824L22 10v7a2 2 0 0 1-1.85 1.995L20 19h-2v1.9a1.1 1.1 0 0 1-.98 1.094L16.9 22H7.1a1.1 1.1 0 0 1-1.094-.98L6 20.9V19H4a2 2 0 0 1-1.995-1.85L2 17v-7a3 3 0 0 1 2.824-2.995L5 7h1V4.1a1.1 1.1 0 0 1 .98-1.094L7.1 3zM16 16H8v4h8zm3-7H5a1 1 0 0 0-.993.883L4 10v7h2v-1.9a1.1 1.1 0 0 1 .98-1.094L7.1 14h9.8a1.1 1.1 0 0 1 1.094.98l.006.12V17h2v-7a1 1 0 0 0-1-1m-2 1a1 1 0 0 1 .117 1.993L17 12h-2a1 1 0 0 1-.117-1.993L15 10zm-1-5H8v2h8z" /></g></svg>
                            Print</button>

                    </div>
                </div>
            </div>



        </div>
    );
}

export default OpeningInvoice;