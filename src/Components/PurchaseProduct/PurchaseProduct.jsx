import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import { useToImage } from '@hcorta/react-to-image'
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import RightArrow from '../../icons/RightArrow';
import Button from '../Input/Button';
import PurchaseProductCard from './PurchaseProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormattedDate } from '../Input/Time';



const PurchaseProduct = ({ shop = [], paytype = [], info = {} }) => {


    const [searchItem, setSearchItem] = useState('')
    const [total, setTotal] = useState(0);
    const [supplier, setSupplier] = useState([])
    const [due, setDue] = useState(0);
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [values, setValues] = useState({})


    const SearchProduct = async (e) => {
        const name = e.target.value
        setSearchItem(name)
        const token = localStorage.getItem('token')
        if (name) {
            const response = await fetch(`${BaseUrl}/api/get/product/search/with/${name}`, {
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


    const PurchaseProduct = async () => {
        if (!userId) {
            toast("Please Select Supplier first");
            return
        }
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/product`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    allData: allData,
                    userId: userId,
                    balance: total - parseInt(values?.pay),
                    shop: info?.shopname,
                    pay: values?.pay,
                    total: total
                }),
            });

            const data = await response.json();
            toast(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    const CalculateAmount = () => {
        let amount = allData?.reduce((acc, item) => {
            return acc + (parseInt(item?.qty) * parseInt(item?.cost))
        }, 0);
        setTotal(amount);
    }

    useEffect(() => {
        CalculateAmount()
    }, [allData]);


    const fetchUserDue = async (id) => {
        const token = localStorage.getItem(`token`);
        const response = await fetch(`${BaseUrl}/api/get/customer/due/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setDue(data?.balance);
        setValues({ ...values, phone: data?.phone })
    }



    useEffect(() => {
        const GetSupplier = async () => {
            const token = localStorage.getItem(`token`);
            const response = await fetch(`${BaseUrl}/api/get/suppliers/1/100`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            setSupplier(data?.items);
        }
        document.title = "Purchase - KazalandBrothers";
        GetSupplier()

    }, [])


    const ChangeQty = (id, qty) => {
        const updatedData = allData.map(item =>
            item.id === id ? { ...item, qty } : item
        );
        setAllData(updatedData);
    };



    return (
        <div className="min-h-screen pb-12 pl-4 pt-5 pr-2 w-full">
            <ToastContainer />

            <div className='bg-[#FFFFFF]'>
                <div className='border-b p-4'>
                    <h1>Purchase Details</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1'>
                        <SelectionComponent options={supplier} onSelect={(v) => { setUserId(v.id); fetchUserDue(v.id) }} label={"Supplier"} className='rounded-l' />
                        <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div>
                        <InputComponent placeholder={getFormattedDate()} label={'Date'} readOnly={true} />
                    </div>
                    <div>
                        <InputComponent placeholder={`${info?.shopcode}`} label={'Sale Code'} readOnly={true} />
                    </div>

                </div>

                <div className='border-b p-4'>
                    <h1>Items</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 '>
                    <div>
                        {info?.role === "superadmin" ? <SelectionComponent options={shop} onSelect={() => { }} label={'Warehouse'} /> : <InputComponent placeholder={info?.shopname} label={'Warehouse'} readOnly={true} />}
                    </div>
                    <div className='grid col-span-2 pt-[2px]'>
                        <h1 className='pb-1 font-thin'>Enter Item Name</h1>
                        <div className='flex justify-center w-full h-[39px]'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' placeholder={'Scan Barcode/Search Items'} value={searchItem} onChange={SearchProduct} className='p-1 mt-[2px] rounded focus:outline-none w-full font-thin' />
                                <Search className='absolute right-1 top-2 cursor-pointer hover:bg-slate-200 rounded-full' />
                                {searchData && searchData?.length > 0 && <div className='w-full absolute top-[35px] border bg-[#FFFFFF] shadow rounded-b'>
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead class="text-xs text-gray-900">
                                            <tr className='border-b border-black text-[16px]'>
                                                <th scope="col" className="px-1 py-2 font-thin">Name</th>
                                                <th scope="col" className="px-4 py-2 text-left font-thin">Category</th>
                                                <th scope="col" className="px-4 py-2 text-left font-thin">Purchase Price</th>
                                                <th scope="col" className="pl-4 py-2 text-left font-thin">Salse Price</th>
                                                <th scope="col" className="pl-4 py-2 text-left font-thin ">Discount</th>
                                                <th scope="col" className="pr-3 py-2 text-right font-thin">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchData?.map((item) => {
                                                return <tr className='border-b cursor-pointer' onClick={() => { setAllData([...allData, item]); setSearchData([]); setSearchItem('') }}>
                                                    <th scope="col" className="px-1 py-2 font-thin text-left">{item?.name}</th>
                                                    <th scope="col" className="px-4 py-2 text-left font-thin">{"Cate"}</th>
                                                    <th scope="col" className="px-4 py-2 text-left font-thin">{item?.cost}</th>
                                                    <th scope="col" className="pl-4 py-2 text-left font-thin">{item?.price}</th>
                                                    <th scope="col" className="pl-4 py-2 text-left font-thin">{item?.discount}</th>
                                                    <th scope="col" className="pr-3 py-2 text-right font-thin">{item?.qty}</th>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                }

                            </div>
                            <div className='border px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>



                <div className='p-4 w-full overflow-hidden overflow-x-auto'>
                    <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 dark:text-gray-400">
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
                                return <PurchaseProductCard item={item} changeqty={ChangeQty} onClick={() => { }} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <div className=''>
                            <InputComponent placeholder={due} label={'Balance'} readOnly={true} className={`font-thin`} />
                        </div>

                        <div>
                            <InputComponent label={'Total Amount'} placeholder={total} onChange={(v) => { }} readOnly={true} className={`font-thin`} />
                        </div>
                        <div>
                            <p className='py-2 pt-1 font-semibold text-sm'>Pay Amount</p>
                            <div className='flex justify-start items-end pb-1 pt-1'>
                                <input type='number' value={values?.discount} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} placeholder='' className='border-y border-l px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />
                                <select value={values?.discount_type} onChange={(v) => { setValues({ ...values, pay_type: v.target.value }) }}
                                    className={`border text-[#6B7280] w-[35%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                    {paytype.map(({ id, name }) => (
                                        <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                    ))}
                                </select>

                            </div>
                        </div>

                    </div>
                </div>
                <div className='p-4 border-t'>
                    <Button onClick={PurchaseProduct} name={'Submit'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>

        </div>
    );
}

export default PurchaseProduct;