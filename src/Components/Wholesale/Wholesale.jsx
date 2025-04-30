import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import { useToImage } from '@hcorta/react-to-image'
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import WholeSaleCard from './WholeSaleCard';
import RightArrow from '../../icons/RightArrow';
import Button from '../Input/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormattedDate } from '../Input/Time';



const WholeSell = ({ shop = [], state = [], paytype = [], info = {} }) => {


    const [searchItem, setSearchItem] = useState('')
    const [total, setTotal] = useState(0);
    const [paking, setPaking] = useState(0);
    const [delivary, setDelivery] = useState(0)
    const [customer, setCustomer] = useState([])
    const [name, setName] = useState('Mehedi hasan')
    const [due, setDue] = useState(0);
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [stateId, setStateId] = useState(1);
    const [lastTotal, setLastTotal] = useState(0)
    const [values, setValues] = useState({
        pay: 0,
        pay_type: 'Cash',
        lastdiscount: 0,
        lastdiscounttype: "Fixed"
    })

    useEffect(() => {
        document.title = "Sale - KazalandBrothers";
    }, []);


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


    const Order = async () => {
        if (!userId || !values?.pay || !values?.pay_type) {
            toast("Customer Pay Amount and Pay Type are required");
            return
        }
        const token = localStorage.getItem('token');
        let orderData = [];
        allData?.map((v) => (
            orderData.push({
                "active": true,
                "product_id": v?.id,
                "username": name,
                "userId": userId,
                "name": v?.name,
                "shop": info?.shopname,
                "price": v?.price,
                "discount": v?.discount,
                "sellprice": (v?.price * v?.qty),
                "qty": v?.qty,
                "contact": values?.phone,
                "date": getFormattedDate()
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
                    shop: info?.shopname,
                    customername: name,
                    userId: userId,
                    date: getFormattedDate(),
                    total: lastTotal,
                    packing: paking,
                    delivery: delivary,
                    lastdiscount: values?.lastdiscount,
                    previousdue: due,
                    paidamount: values?.pay,
                    amount: lastTotal - values?.pay,
                    orders: orderData
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
            let discount = parseInt(parseInt(item?.price) * parseInt(item?.discount) / 100);
            return acc + (parseInt(item?.qty) * parseInt(item?.price - discount))
        }, 0);
        setTotal(amount);
        setLastTotal(amount)
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



    const GetCustomer = async (id) => {
        const token = localStorage.getItem(`token`);
        const response = await fetch(`${BaseUrl}/api/get/customers/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setCustomer(data?.items);
    }




    const ChangeQty = (id, qty) => {
        const updatedData = allData.map(item =>
            item.id === id ? { ...item, qty } : item
        );
        setAllData(updatedData);
    };

    const ChangePrice = (id, price) => {
        const updatedData = allData.map(item =>
            item.id === id ? { ...item, price } : item
        );
        setAllData(updatedData);
    };

    const ChangeDiscount = (id, discount) => {
        const updatedData = allData.map(item => {
            if (item.id === id) {
                const originalPrice = item.price;
                const discountedPrice = originalPrice - (originalPrice * parseFloat(discount) / 100);

                return {
                    ...item,
                    discount,
                    disPrice: discountedPrice,
                };
            }
            return item;
        });

        setAllData(updatedData);
    };



    const ChangeLastDiscountType = (type, amount) => {
        setValues({
            ...values,
            lastdiscounttype: type,
            lastdiscount: amount
        });
        if (type === "Fixed") {
            let temp = parseInt(total) - parseInt(amount);
            setLastTotal(parseInt(temp) + parseInt(paking) + parseInt(delivary));
        } else if (type === "Percentage") {
            let discount = parseInt(parseInt(total) * parseInt(amount) / 100);
            let temp = parseInt(total) - parseInt(discount);
            setLastTotal(parseInt(temp) + parseInt(paking) + parseInt(delivary));
        }
    }

    return (
        <div className="min-h-screen pb-12 pl-4 pt-5 pr-2 w-full">
            <ToastContainer />
            <div className='flex justify-start items-center gap-2 p-3'>
                <h1>Home</h1><RightArrow /><h1>Create Sale</h1>
            </div>


            <div className='bg-[#FFFFFF]'>
                <div className='border-b p-4'>
                    <h1>Sale Details</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1'>
                        <SelectionComponent options={state} onSelect={(v) => { setStateId(v?.id); setCustomer([]); GetCustomer(v?.id) }} label={"Thana Name"} className='rounded-l' />
                        <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div className='flex justify-start items-end pb-1'>
                        <SelectionComponent options={customer} onSelect={(v) => { setUserId(v.id); setName(v?.name); fetchUserDue(v.id) }} label={"Customer"} className='rounded-l' />
                        <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div>
                        <InputComponent placeholder={getFormattedDate()} label={'Date'} readOnly={true} />
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
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 dark:text-gray-400">
                            <tr className='border-y text-[16px] py-1'>
                                <th scope="col" className="p-2 text-center font-thin border-x">Action</th>
                                <th scope="col" className="pl-2 py-2.5 font-thin border-x">Item Code</th>
                                <th scope="col" className="px-2 py-2.5 text-left font-thin border-r">Item name</th>
                                <th scope="col" className="px-2 py-2.5 text-left font-thin border-r">Qty</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r">M.R.P</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r">Discount</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r">Sale Price</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r rounded">Total price</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allData?.map((item) => {
                                return <WholeSaleCard item={item} changeqty={ChangeQty} changedis={ChangeDiscount} changeprice={ChangePrice} onClick={() => { }} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <div className='flex justify-between gap-5'>
                        <div>
                            <div className=''>
                                <InputComponent placeholder={due} label={'Balance'} readOnly={true} className={`font-thin`} />
                            </div>
                            <div>
                                <p className='py-2 pt-1 font-semibold text-sm'>Pay Amount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' value={values?.pay} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} placeholder='' className='border-y border-l px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />
                                    <select value={values?.pay_type} onChange={(v) => { setValues({ ...values, pay_type: v.target.value }) }}
                                        className={`border text-[#6B7280] w-[35%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                        {paytype.map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div>
                            <div className=''>
                                <InputComponent placeholder={total} label={'Total'} readOnly={true} className={`font-thin`} />
                            </div>

                            <div className='flex justify-between items-center gap-4'>
                                <InputComponent label={'Packing Charge'} type={'number'} placeholder={paking} onChange={(v) => { setPaking(v); setLastTotal(parseInt(total) + parseInt(v)) }} className={`font-thin`} />
                                <InputComponent label={'Delivery Charge'} type={'number'} placeholder={delivary} onChange={(v) => { setDelivery(v); setLastTotal(parseInt(total) + parseInt(v) + parseInt(paking)) }} className={`font-thin`} />
                            </div>
                            <div className='pb-4'>
                                <p className='py-2 pt-1 font-semibold text-sm'>Discount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' value={values?.lastdiscount} onChange={(e) => { ChangeLastDiscountType(values?.lastdiscounttype, e.target.value) }} placeholder='' className='border-y border-l px-2 text-[#6B7280] focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />
                                    <select value={values?.lastdiscounttype} onChange={(e) => { ChangeLastDiscountType(e.target.value, values?.lastdiscount) }}
                                        className={`border text-[#6B7280] w-[35%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                        {[{ id: 1, name: "Fixed" }, { id: 2, name: "Percentage" }].map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className='border-t pt-2 border-black flex justify-start gap-2 '>
                                <div><h1 className='pt-[5px] w-[100px]'>Total Amount</h1></div>
                                <div className='w-full'>
                                    <input type='number' value={lastTotal} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} placeholder=''
                                        className='border text-[#6B7280] px-2 focus:outline-none rounded-r rounded-l font-thin pt-[6px] pb-[5px] w-full' />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-between  gap-5'>
                        <div className='border-t border-black'>
                            <h1 className='text-center'>Mehedi Hasan</h1>
                        </div>
                    </div>
                </div>
                <div className='p-4 border-t'>
                    <Button onClick={Order} name={'Submit'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>

        </div>
    );
}

export default WholeSell;