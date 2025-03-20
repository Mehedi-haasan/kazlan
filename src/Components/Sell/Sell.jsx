import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import SellCard from './SellCard';
import RightArrow from '../../icons/RightArrow';
import MiniButton from '../Input/MiniButton';
import Modal from '../Input/Modal';
import Button from '../Input/Button';



const Sell = ({ shop = [], paytype = [], info = {} }) => {

    const [data, setData] = useState({});
    const [total, setTotal] = useState(0);
    const [name, setName] = useState('Random')
    const [pay, setPay] = useState(0)
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState('');


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



    const Order = async () => {
        const token = localStorage.getItem('token');
        let orderData = [];
        allData?.map((v) => (
            orderData.push({
                "active": true,
                "invoice_id": 2,
                "product_id": v?.id,
                "username": name,
                "userId": 1,
                "name": v?.name,
                "shop": info?.name,
                "price": v?.price,
                "discount": v?.comn,
                "sellprice": (v?.price * v?.qty),
                "qty": v?.qty,
                "contact": "123456789",
                "date": date
            })
        ))

        try {
            const response = await fetch(`${BaseUrl}/api/post/order`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    shop: info?.name,
                    userId: 1,
                    date: date,
                    total: total,
                    previousdue: 0,
                    paidamount: pay,
                    amount: total - pay,
                    orders: orderData
                }),
            });

            const data = await response.json();
            alert(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    function getFormattedDate() {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('bn-BD', options);
    }

    useEffect(() => {
        setDate(getFormattedDate())
    }, [])


    useEffect(() => {
        let amount = allData?.reduce((acc, item) => {
            let discount = parseInt(item?.price * item?.comn / 100);
            return acc + (parseInt(item?.qty) * parseInt(item?.price - discount))
        }, 0);

        setTotal(amount);
    }, [allData]);


    return (
        <div className="min-h-screen pl-4 pt-5 pr-2">

            <div className='flex justify-start items-center gap-2 p-3'>
                <h1>Home</h1><RightArrow /><h1>Create Sale</h1>
            </div>


            <div className='bg-[#FFFFFF]'>
                <div className='border-b p-4'>
                    <h1>Sale Details</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1'>
                        <div className='w-full'>
                            <h1>Customer</h1>
                            <input placeholder={'Enter'} onChange={(e) => { setName(e.target.value) }} className='rounded-l focus:outline-none border px-1 py-1.5 w-full' />
                        </div>
                        <div className='border-y border-r px-3 py-1.5 rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div>
                        <InputComponent placeholder={getFormattedDate()} label={'Date'} />
                    </div>
                    <div>
                        <InputComponent placeholder={'Shop1/111'} label={'Sale Code'} />
                    </div>
                    <div>
                        <InputComponent placeholder={'Optional'} label={'Reference No.'} />
                    </div>
                    <div>
                        <InputComponent placeholder={'BDT'} label={'Exchange Rate'} />
                    </div>
                </div>

                <div className='border-b p-4'>
                    <h1>Items</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div>
                        <SelectionComponent options={shop} onSelect={() => { }} label={'Warehouse'} />
                    </div>
                    <div className='grid col-span-2'>
                        <h1 className='pb-1'>Enter item name</h1>
                        <div className='flex justify-center w-full'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' placeholder='স্ক্যান / পণ্যের নাম লিখুন' onChange={SearchProduct} className='p-1.5 rounded focus:outline-none w-full' />
                                <Search className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 rounded-full' />

                                {
                                    searchData && searchData?.length > 0 && <div className='w-full absolute top-[37px] border bg-[#FFFFFF] shadow rounded-b'>
                                        <div className='flex justify-between items-center py-1 px-1.5 bg-gray-100 text-sm'>
                                            <h1>Name</h1>
                                            <h1>Category</h1>
                                            <h1>Purchase Price</h1>
                                            <h1>Salse Price</h1>
                                            <h1>Stock</h1>
                                        </div>
                                        {
                                            searchData?.map((item) => {
                                                return <div onClick={() => { setData(item); setSearchData([]); setShow(true) }} className='flex justify-between items-center py-1 px-1.5 text-sm border-t font-roboto cursor-pointer hover:bg-blue-100 hover:text-blue-500'>
                                                    <h1>{item?.name}</h1>
                                                    <h1>Category</h1>
                                                    <h1>{item?.cost}</h1>
                                                    <h1>{item?.price}</h1>
                                                    <h1 className='pr-1'>{item?.qty}.00</h1>
                                                </div>
                                            })
                                        }
                                    </div>
                                }

                            </div>
                            <div className='border px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>



                <div className='p-4 w-full overflow-hidden overflow-x-auto'>
                    <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr className='border-b border-black text-[16px]'>
                                <th scope="col" className="pr-6 py-2 ">Serial</th>
                                <th scope="col" className="px-4 py-2 text-center">Item</th>
                                <th scope="col" className="px-4 py-2 text-center">Qty</th>
                                <th scope="col" className="pl-4 py-2 text-right">Unit</th>
                                <th scope="col" className="pl-4 py-2 text-right">Price/unit</th>
                                <th scope="col" className="pl-4 py-2 text-right">Discount</th>
                                <th scope="col" className="pl-4 py-2 text-right">Total</th>
                                <th scope="col" className="pl-4 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData?.map((item) => {
                                return <SellCard item={item} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <h1 className='pb-2'>Payment</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={paytype} onSelect={() => { }} label={"Payment Type"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                        <div>
                            <InputComponent placeholder={total} label={'Amount'} />
                        </div>
                        <div>
                            <InputComponent placeholder={0} onChange={(e) => { setPay(parseInt(e)) }} label={'Pay amount'} />
                        </div>
                        <div>
                            <InputComponent label={'Payment Note'} />
                        </div>
                    </div>
                </div>
                <div className='p-4 border-t'>
                    <Button name={'Submit'} onClick={Order} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>

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
                    <input type='number'
                        className="text-right focus:outline-none w-16 border rounded"
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
                <div className='flex justify-between items-center py-1'>
                    <h1>Comn</h1>
                    <input type='number'
                        className="text-right focus:outline-none w-16 border rounded"
                        onChange={(e) => setData({ ...data, comn: e.target.value })}
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
                <div className='flex justify-end items-center pt-1'>
                    <MiniButton name={`Done`} onClick={() => { setAllData([...allData, data]); setData([]); setShow(false); }} />
                </div>
            </Modal>
        </div>
    );
}

export default Sell;