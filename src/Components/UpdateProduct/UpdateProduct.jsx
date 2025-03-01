import React, { useEffect, useState } from 'react';
import SellCard from '../Sell/SellCard';
import Modal from '../Input/Modal';
import MiniButton from '../Input/MiniButton';
import BaseUrl from '../../Constant';
import InvoiceCard from '../Invoice/InvoiceCard';
import Search from '../../icons/Search';
import Button from '../Input/Button';


const UpdateProduct = () => {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [show, setShow] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);


    const SearchProduct = async (e) => {
        e.preventDefault();
        const name = e.target.value
        const token = localStorage.getItem('token')
        if (name) {
            const response = await fetch(`${BaseUrl}/api/get/product/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setSearchData(data.items)
        } else {
            setSearchData([]);
        }
    }


    const UpdateProductQty = async () => {
        setIsLoad(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/update/product`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(allData)
        });
        const data = await response.json();
        setIsLoad(true)
        alert(data?.message)
    }



    return (
        <div>
            <div className='flex justify-between mt-1'>
                <div className='flex justify-start gap-3 items-center'>
                    <h1 className='font-semibold w-[90px]'>অনুসন্ধান</h1>
                    <h1 className='font-semibold'>:</h1>
                    <div className='relative border rounded border-black text-black'>
                        <input type='text' placeholder='পণ্যের নাম লিখুন' onChange={SearchProduct} className='p-1 rounded focus:outline-none' />
                        <Search className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 p-[2px] rounded-full' />
                    </div>
                </div>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <tr className='border-b-2 border-black text-lg'>
                        <th scope="col" className="pr-6 py-2 ">পরিমাণ</th>
                        <th scope="col" className="px-4 py-2 text-center">বইয়ের নাম এবং শ্রেণী</th>
                        <th scope="col" className="px-4 py-2 text-center">প্রকাশক</th>
                        <th scope="col" className="pl-4 py-2 text-right">মূল্য</th>
                        <th scope="col" className="pl-4 py-2 text-right">বিক্রয় মূল্য</th>
                        <th scope="col" className="pl-4 py-2 text-right">মোট মূল্য</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchData?.map((product) => {
                            return <SellCard key={product?.id} product={product} onClick={() => { setData(product); setSearchData([]); setShow(true) }} />
                        })
                    }

                    {allData?.map((item) => {
                        return <InvoiceCard key={item?.id} id={item?.id} name={item?.name} qty={item?.qty} cost={item?.cost} price={item?.price} />
                    })}
                </tbody>
            </table>
            <Modal show={show} handleClose={() => { setShow(false) }} className={`w-[500px]`}>
                <div className='flex justify-between items-center py-1'>
                    <h1>Name</h1>
                    <h1>{data?.name}</h1>
                </div>
                <div className='flex justify-between items-center py-1'>
                    <h1>Price</h1>
                    <h1>{data?.price}</h1>
                </div>
                <div className='flex justify-between items-center py-1'>
                    <h1>Qty</h1>
                    <input
                        className="text-right focus:outline-none w-12"
                        onChange={(e) => setData({ ...data, qty: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setAllData([...allData, data]);
                                setData([]);
                                setShow(false);
                            }
                        }}
                        placeholder={""}
                    />
                </div>
                <div className='flex justify-end items-center py-1'>
                    <MiniButton name={`Done`} onClick={() => { setAllData([...allData, data]); setData([]); setShow(false); }} />
                </div>
            </Modal>

            <Button isDisable={isLoad} name={'Update'} onClick={UpdateProductQty} className='' />
        </div>

    );
};

export default UpdateProduct;