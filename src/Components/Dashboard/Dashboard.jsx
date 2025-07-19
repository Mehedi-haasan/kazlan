import React, { useEffect, useState } from 'react';
import MonthlySale from './MonthlySale';
import BaseUrl from '../../Constant';
import DailySalse from './DailySalse';
import Cart from '../../icons/Cart';
import Notification from '../../icons/Notification';
import Invoice from '../RecentInvoice/Invoice';
import Button from '../Input/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Dashboard = ({ data, info = {} }) => {

    const [hourSales, setHourSales] = useState([]);
    const [month, setMonthly] = useState([]);
    const [total, setTotal] = useState(0);
    const [dailyreturn, setDailyReturn] = useState(0);
    const [dailyPurchase, setDailyPurchase] = useState(0);
    const [allData, setAllData] = useState([])

    const HourlySalesData = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order/daily/salse`, {
            method: "GET",
            headers: {
                'authorization': token
            }
        });
        const data = await response.json();

        if (data?.items) {
            const salesData = data.items.map((sa, i) => (
                { x: new Date(2025, 0, 1, sa?.h), y: sa?.sales || 0 }
            ));
            let total = 0
            const totalSale = data.items.map((sa, i) => (
                total = total + sa?.sales
            ));
            setTotal(total)
            setHourSales(salesData);
        }
    };

    const DailySaleReturn = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order/daily/salse/return/pruchase`, {
            method: "GET",
            headers: {
                'authorization': token
            }
        });
        const data = await response.json();
        if (data) {
            setDailyReturn(data?.returnsale || 0)
            setDailyPurchase(data?.purchasesale || 0)
        }
    };

    const MonthlySalesData = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/user/order/monthly`, {
            method: "GET",
            headers: {
                'authorization': token
            }
        });
        const data = await response.json();

        if (data?.items) {
            const formattedData = data.items.map(item => ({
                x: new Date(item.x),
                y: item.y
            }));
            setMonthly(formattedData);
        }
    };

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token && token !== 'undefined') {
            HourlySalesData()
            MonthlySalesData()
            DailySaleReturn()
        }
    }, [])

    useEffect(() => {
        document.title = "Dashboard - KazalandBrothers";
    }, []);

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
            setAllData(data?.items)
        } catch (error) {
            toast(error);
        }
    }

    const UploadToServer = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/postget/offline/data`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ allData: allData })
            });

            const data = await response.json();
            toast(data?.message);
        } catch (error) {
            toast(error);
        }
    }

    return (
        <div className='bg-[#F7F7FF] pt-6 pl-3 pr-2 min-h-screen pb-12 relative'>
            <ToastContainer />

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-blue-500'>
                        <Cart className="text-[#FFFFFF] h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12" />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl pl-1'>{total}.00</h1>
                        <p className='font-semibold'>Total Sale</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl pl-1'>{dailyPurchase}</h1>
                        <p className='font-semibold'>Purchase Amount</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl'>{dailyreturn}</h1>
                        <p className='font-semibold'>Sale Return</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-2 lg:p-3 2xl:p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-2 lg:p-3 2xl:p-5 border rounded-full bg-[#FFF2E8]'>
                        <Notification height="35px" width="35px" className={`h-6 lg:h-8 2xl:h-12 w-6 lg:w-8 2xl:w-12`} />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-2xl lg:text-3xl 2xl:text-5xl'>{data?.length > 0 ? data?.length : 0}</h1>
                        <p className='font-semibold'>Notifications</p>
                    </div>
                </div>


            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 lg:gap-7 pb-5'>
                <div className='rounded-lg'>
                    <DailySalse hourSales={hourSales} />
                </div>
                <div>
                    <MonthlySale month={month} />
                </div>
                <div className='grid col-span-1 lg:col-span-2'>

                    <div className='rounded-xl overflow-hidden bg-[#FFFFFF] p-4 shadow-lg'>
                        <div className='flex justify-between items-center'>
                            <h1 className='pb-2'>Recent Invoices</h1>
                            {BaseUrl === 'http://localhost:8050' && <Button isDisable={false} onClick={FetchData} name={'FetchData'} />}
                            {BaseUrl === 'http://localhost:8050' && <Button isDisable={false} onClick={UploadToServer} name={'Upload to Server'} />}
                        </div>
                        <Invoice info={info} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;