import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import RightArrow from '../../icons/RightArrow';
import Button from '../Input/Button';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaleReturnCard from './SaleReturnCard';




const SaleReturn = ({ shop = [] }) => {

    const [user, setUser] = useState({});
    const [prevAll, setPrevAll] = useState([])
    const [prevTotal, setPrevTotal] = useState(0)
    const [total, setTotal] = useState(0);
    const [allData, setAllData] = useState([])
    const [invoice, setInvoice] = useState(0)



    const GetReturnProduct = async (e) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${BaseUrl}/api/get/order/${invoice}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();
        setAllData(data?.items);
        setPrevAll(data?.items)
        setUser(data?.user)

    }

    const ReturnSaleProduct = async (e) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/return/sale`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                invoiceId: invoice,
                data: allData,
                total: total,
                returnamount: parseInt(prevTotal) - parseInt(total)
            }),
        });
        const data = await response.json();
        toast(data?.message)

    }

    useEffect(() => {
        document.title = "Sale Return - KazalandBrothers";
    }, [])


    const CalculatePrevAmount = () => {
        let amount = prevAll?.reduce((acc, item) => {
            return acc + (parseInt(item?.price) * parseInt(item?.qty))
        }, 0);

        setPrevTotal(parseInt(amount));
    }

    useEffect(() => {
        CalculatePrevAmount()
    }, []);


    const CalculateAmount = () => {
        let amount = allData?.reduce((acc, item) => {
            return acc + (parseInt(item?.price) * parseInt(item?.qty))
        }, 0);

        setTotal(parseInt(amount));
    }

    useEffect(() => {
        CalculateAmount()
    }, [allData]);


    const ChangeQty = (id, qty) => {
        const updatedData = allData.map(item =>
            item.id === id ? { ...item, qty } : item
        );
        setAllData(updatedData);
    };

    console.log(allData);

    return (
        <div className="min-h-screen pb-12 pl-4 pt-5 pr-2">
            <ToastContainer />
            <div className='flex justify-start items-center gap-2 p-3'>
                <h1>Home</h1><RightArrow /><h1>Sale Return</h1>
            </div>


            <div className='bg-[#FFFFFF]'>
                <div className='border-b p-4'>
                    <h1>Sale Return</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div>
                        <InputComponent placeholder={user?.state} label={'State'} readOnly={true} />
                    </div>
                    <div>
                        <InputComponent placeholder={user?.name} label={'Customer'} readOnly={true} />
                    </div>
                    <div className=''>
                        <h1 className='pb-[7px]'>Invoice number</h1>
                        <div className='flex justify-center w-full'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' onKeyDown={(e) => { if (e.key === "Enter") { GetReturnProduct() } }} placeholder='Enter invoice number' onChange={(e) => { setInvoice(e.target.value) }} className='p-1.5 rounded focus:outline-none w-full font-thin' />
                                <Search onClick={GetReturnProduct} className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 rounded-full' />
                            </div>
                            <div className='border px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                    <div>
                        <InputComponent placeholder={allData[0]?.date} label={'Date'} readOnly={true} />
                    </div>
                    <div>
                        <InputComponent placeholder={user?.phone} label={'Mobile'} readOnly={true} />
                    </div>

                </div>




                <div className='p-4 w-full overflow-hidden overflow-x-auto'>
                    <table class="min-w-[800px] w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-sm text-gray-900 ">
                            <tr className='border-y text-[16px] py-1'>
                                <th scope="col" className="pl-4 py-2.5 font-thin border-x">Serial</th>
                                <th scope="col" className="px-4 py-2.5 text-left font-thin border-r">Item name</th>
                                <th scope="col" className="px-4 py-2.5 text-left font-thin border-r">Qty</th>
                                <th scope="col" className="pl-4 py-2.5 text-left font-thin border-r">M.R.P</th>
                                <th scope="col" className="pl-4 py-2.5 text-left font-thin border-r">Discount</th>
                                <th scope="col" className="pl-4 py-2.5 text-left font-thin border-r">Sale Price</th>
                                <th scope="col" className="pl-4 py-2.5 text-left font-thin">Total price</th>
                                <th scope="col" className="py-2.5 text-center font-thin border-x">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData?.map((item) => {
                                return <SaleReturnCard item={item} changeqty={ChangeQty} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <h1 className='pb-2'>Payment</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <div>
                            <InputComponent label={'Amount'} placeholder={total} value={total} readOnly={true} />
                        </div>
                        <div>
                            <InputComponent label={'Due'} placeholder={parseInt(user?.balance || 0)} value={user?.balance} readOnly={true} />
                        </div>
                        <div>
                            <InputComponent label={'Return Amount'} placeholder={total - parseInt(user?.balance || 0)} readOnly={true} />
                        </div>
                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={[{ id: 23, name: "Cash" }, { id: 24, name: "Due" }]} onSelect={() => { }} label={"Payment Type"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-4 border-t'>
                    <Button name={'Return'} onClick={ReturnSaleProduct} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    );
}

export default SaleReturn;