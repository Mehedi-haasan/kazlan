import React, { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import Cart from '../../icons/Cart';
import Notification from '../../icons/Notification';
import Button from '../Input/Button';
import NotiFi from '../Input/Notification';
import InvoiceTemp from '../RecentInvoice/InvoiceTemp';
import RecentReceipt from '../RecentInvoice/RecentReceipt';



const Dashboard = ({ info = {} }) => {

    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const [summary, setSummary] = useState({})


    useEffect(() => {
        document.title = "Dashboard - KazalandBrothers";
    }, []);


    const DeleteLocalData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8050/api/delete/offline/data`, {
                method: 'DELETE',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            setMessage({ id: Date.now(), mgs: data?.message });
        } catch (error) {
            setMessage({ id: Date.now(), mgs: error?.message });
        }
    }


    const UploadToServer = async (allData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://portal.kazalandbrothers.xyz/api/postget/offline/data`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ allData: allData })
            });

            const data = await response.json();
            if (data && data?.success === true) {
                DeleteLocalData()
            }
        } catch (error) {
            setMessage({ id: Date.now(), mgs: error });
        }
    }

    const FetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8050/api/get/offline/data`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            if (data && data?.success === true) {
                UploadToServer(data?.items)
            }
        } catch (error) {
            setMessage({ id: Date.now(), mgs: error });
        }
    }


    const [invoices, setInvoices] = useState([]);
    const [reciept, setReciept] = useState([])
    const RecentInvoice = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/user/recent/order/${1}/15`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();
        let recent_invoice = data?.items?.filter(
            (item) => ["Sale", "Sale Return", "Purchase items", "Return Purchase"].includes(item?.type)
        );
        let recent_receipt = data?.items?.filter(
            (item) => ["Expense", "Make Payment", "Opening", "Online Collection"].includes(item?.type)
        );
        setInvoices(recent_invoice);
        setReciept(recent_receipt)
    }


    const BulkData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/get/order/summary`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            setSummary(data?.items)
        } catch (error) {
            setMessage({ id: Date.now(), mgs: error });
        }
    }

    useEffect(() => {
        BulkData()
        RecentInvoice()
    }, [])




    return (
        <div className='bg-[#F7F7FF] dark:bg-[#040404] pt-6 pl-3 pr-2 min-h-screen pb-12 relative'>
            <NotiFi message={message} />

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-blue-500'>
                        <Cart className="text-[#FFFFFF] h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12" />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl pl-1'>{summary?.sale}.00</h1>
                        <p className='font-semibold bg-white dark:bg-[#040404] text-black dark:text-white'>Sale Orders</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl pl-1'>{summary?.purchase}</h1>
                        <p className='font-semibold'>Purchase Orders</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl'>{summary?.cash}</h1>
                        <p className='font-semibold'>Cash Collections</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <Notification height="35px" width="35px" className={`h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12`} />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl'>{summary?.online}</h1>
                        <p className='font-semibold'>Online Collections</p>
                    </div>
                </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 pt-4'>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-blue-500'>
                        <Cart className="text-[#FFFFFF] h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12" />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl pl-1'>{summary?.return}.00</h1>
                        <p className='font-semibold bg-white dark:bg-[#040404] text-black dark:text-white'>Sale Returns</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl pl-1'>{summary?.pur_return}</h1>
                        <p className='font-semibold'>Return To Suppliers</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl'>{summary?.nagad}</h1>
                        <p className='font-semibold'>Nagad Sale</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white dark:bg-[#040404] min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <Notification height="35px" width="35px" className={`h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12`} />
                    </div>
                    <div className='flex justify-start items-end gap-1 dark:text-white'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl'>{summary?.expense}</h1>
                        <p className='font-semibold'>Total Expense</p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 lg:gap-7 pb-5 dark:bg-[#040404] dark:text-white rounded-md'>
                <div className='grid col-span-1 lg:col-span-2'>

                    <div className='rounded-xl overflow-hidden bg-[#FFFFFF] dark:bg-[#040404] p-3 shadow-lg dark:text-white'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-[20px]'>Recent Invoices</h1>
                            <div>
                                {BaseUrl === 'http://localhost:8050' && <Button isDisable={false} onClick={FetchData} name={'Upload to Server'} />}
                            </div>
                        </div>
                        <InvoiceTemp info={info} invoices={invoices} RecentInvoice={RecentInvoice} />

                    </div>
                </div>

                <div className='grid col-span-1 lg:col-span-2'>

                    <div className='rounded-xl overflow-hidden bg-[#FFFFFF] dark:bg-[#040404] p-3 shadow-lg dark:text-white'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-[20px]'>Recent Receipt</h1>
                        </div>
                        <RecentReceipt info={info} invoices={reciept} RecentInvoice={RecentInvoice} />

                    </div>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;