import React, { useEffect, useState } from 'react';
import Charts3 from './Charts3';
import Charts4 from './Charts4';
import Charts6 from './Charts6';
import Charts7 from './Charts7';
import BaseUrl from '../../Constant';



const Dashboard = () => {

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
        <div className='bg-[#F7F7FF] pt-5 px-2 min-h-screen'>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border-l-8 border-blue-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>{total}.00</h1>
                        <p className='font-semibold'>Total Sale</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border-l-8 border-red-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>2</h1>
                        <p className='font-semibold'>Customer Request</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border-l-8 border-blue-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>50</h1>
                        <p className='font-semibold'>Customer Complains</p>
                    </div>
                </div>
                <div className='shadow-md flex justify-around items-center p-5 rounded-lg bg-white min-h-[170px] border-l-8 border-red-500'>
                    <div className='p-5 border rounded-full bg-[#FFF2E8]'>
                        <img src='https://cdn-icons-png.flaticon.com/128/6586/6586553.png' className='h-12 w-12 ' alt='image' />
                    </div>
                    <div className='flex justify-start items-end gap-1'>
                        <h1 className='font-bold text-5xl'>12</h1>
                        <p className='font-semibold'>Notifications</p>
                    </div>
                </div>


            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 lg:gap-7 pb-5'>
                <div className='rounded-lg'>
                    <Charts3 hourSales={hourSales} />
                </div>
                <div>
                    <Charts7 month={month} />
                </div>
                <div className='grid col-span-1 lg:col-span-2'>

                    <div className='rounded-xl overflow-hidden bg-white p-4'>
                        <div className='border-b border-black'>
                            <h1 className='pb-2'>Recent Invoices</h1>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                                <tr className='border-b text-md'>
                                    <th scope="col" className="pr-6 py-2 ">পরিমাণ</th>
                                    <th scope="col" className="px-4 py-2 text-center">বইয়ের নাম এবং শ্রেণী</th>
                                    <th scope="col" className="px-4 py-2 text-center">প্রকাশক</th>
                                    <th scope="col" className="pl-4 py-2 text-right">মূল্য</th>
                                    <th scope="col" className="pl-4 py-2 text-right">বিক্রয় মূল্য</th>
                                    <th scope="col" className="pl-4 py-2 text-right">মোট মূল্য</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr key={89} className="bg-white dark:bg-gray-800 border-b">
                                    <th scope="row" className="pr-6 pl-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {5}
                                    </th>
                                    <td className="px-6 py-2 text-center">
                                        {"Mehedi"}
                                    </td>
                                    <td className="px-6 py-2 text-center">
                                        {"Islamia Library"}
                                    </td>
                                    <td className="pl-6 py-2 text-right">
                                        {8}
                                    </td>
                                    <td className="pl-6 py-2 text-right">
                                        {3}
                                    </td>
                                    <td className="pl-6 py-2 text-right">
                                        {7}
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;