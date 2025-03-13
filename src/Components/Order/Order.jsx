import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import BaseUrl from '../../Constant';
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent';
import Updown from '../../icons/Updown';
import ShowEntries from '../Input/ShowEntries';
import InputComponent from '../Input/InputComponent';
import RecentInvoice from '../RecentInvoice/RecentInvoice';
import Invoice from '../RecentInvoice/Invoice';

const Order = ({ type = [], entries = [], user = [] }) => {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([])


    const getOrder = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setData(data.items)
    }
    useEffect(() => {
        getOrder()
    }, [])


    const SearchProduct = async (e) => {
        e.preventDefault();
        const id = e.target.value
        const token = localStorage.getItem('token')
        if (id) {
            const response = await fetch(`${BaseUrl}/api/product/single/order/${id}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setData(data.items)
        } else {
            setData(searchData);
        }
    }

    return (
        <div className='bg-white relative pt-5 px-2'>

            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Order List</h1>
                <Button name={'Create item'} />
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <SelectionComponent options={type} label={'Customer'} />
                    </div>
                    <div>
                        <SelectionComponent options={user} label={'User'} />
                    </div>
                    <div>
                        <InputComponent placeholder={"From Date"} label={"From Date"} />
                    </div>
                    <div>
                        <InputComponent placeholder={"To Date"} label={"To Date"} />
                    </div>

                </div>

                <div className='flex justify-between items-center my-3'>
                    <div>
                        <ShowEntries options={entries} />
                    </div>
                    <div className="flex justify-start items-center gap-1.5 mt-5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name" className="focus:outline-none border rounded p-1.5 " />
                    </div>
                </div>
                <div className="w-full overflow-hidden overflow-x-auto">
                    <Invoice />
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-normal'>Showing 1 to 3 of 3 entries</h1>
                    <div>
                        <button className="border-y border-l rounded-l py-1.5 px-3 bg-blue-50">Prev</button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">1</button>
                        <button className="border-y border-r rounded-r py-1.5 px-3 bg-blue-50">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Order;