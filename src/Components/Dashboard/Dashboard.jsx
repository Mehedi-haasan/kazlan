import React, { useEffect, useState } from 'react';
import MonthlySale from './MonthlySale';
import BaseUrl from '../../Constant';
import DailySalse from './DailySalse';
import Cart from '../../icons/Cart';
import Notification from '../../icons/Notification';
import Invoice from '../RecentInvoice/Invoice';



const Dashboard = ({ data }) => {

    const [hourSales, setHourSales] = useState([]);
    const [month, setMonthly] = useState([]);
    const [total, setTotal] = useState(0)

    const HourlySalesData = async () => {
        const response = await fetch(`${BaseUrl}/api/get/order/daily/salse`);
        const data = await response.json();

        if (data?.items) {
            const salesData = data.items.map((sa, i) => (
                { x: new Date(2024, 0, 1, sa?.h), y: sa?.sales || 0 }
            ));
            let total = 0
            const totalSale = data.items.map((sa, i) => (
                total = total + sa?.sales
            ));
            setTotal(total)
            setHourSales(salesData);
        }
    };

    const MonthlySalesData = async () => {
        const response = await fetch(`${BaseUrl}/api/get/user/order/monthly`);
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
        }
    }, [])

    return (
        <div className='bg-[#F7F7FF] pt-6 pl-3 pr-2 min-h-screen relative'>


            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-5 border rounded-full bg-blue-500'>
                        <Cart className="text-[#FFFFFF]" />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>{total}.00</h1>
                        <p className='font-semibold'>Total Sale</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>2</h1>
                        <p className='font-semibold'>Customer Request</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-blue-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>50</h1>
                        <p className='font-semibold'>Customer Complains</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border border-l-4 border-red-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <Notification height="35px" width="35px" />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>{data?.length > 0 ? data?.length : 0}</h1>
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
                        <div className=''>
                            <h1 className='pb-2'>Recent Invoices</h1>
                        </div>
                        <Invoice />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;