import { useEffect, useState, useRef } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import WholeSaleCard from '../Wholesale/WholeSaleCard';
import Button from '../Input/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormattedDate } from '../Input/Time';
import { useNavigate } from 'react-router-dom';
import Calender from '../Wholesale/Calender';






const SaleReturn = ({ shop = [], state = [], info = {} }) => {

    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const inputRef = useRef(null)
    const inputQty = useRef(null)
    const today = new Date();
    const goto = useNavigate()
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
    const [lastTotal, setLastTotal] = useState(0)
    const [user, setUser] = useState({});
    const [invoId, setInvoId] = useState(null)
    const [loadInvo, setLoadInvo] = useState(true)
    const [selectedId, setSelectedId] = useState(0)
    const [values, setValues] = useState({
        pay: 0,
        paking: 0,
        delivary: 0,
        pay_type: 'Cash',
        lastdiscount: 0,
        lastdiscounttype: "Fixed",
        deliverydate: ''
    })

    const [raw, setRaw] = useState({
        fromDate: today.toISOString(),
        toDate: today.toISOString()
    });




    const handleDateConvert = (date) => {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formatted
    };


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
        if (!userId) {
            toast("Customer are required");
            return
        }
        const token = localStorage.getItem('token');
        let orderData = [];
        allData?.forEach((v) => {
            let sale = 0;
            const price = parseInt(v?.price) || 0;
            const discount = parseInt(v?.discount) || 0;
            const qty = parseInt(v?.qty) || 0;
            if (v?.discount_type === "Fixed") {
                sale = (price - discount) * qty;
            } else if (v?.discount_type === "Percentage") {
                const discountedPrice = price - (price * discount / 100);
                sale = discountedPrice * qty;
            }

            orderData.push({
                active: true,
                product_id: v?.product ? v?.product?.id : v?.id,
                username: name,
                userId: userId,
                name: v?.name,
                shop: info?.shopname,
                price: price,
                discount: discount,
                discount_type: v?.discount_type,
                sellprice: sale,
                qty: qty,
                contact: values?.phone,
                date: getFormattedDate(),
                deliverydate: values?.deliverydate
            });
        });
        try {
            const response = await fetch(`${BaseUrl}/api/return/sale`, {
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
                    total: total,
                    packing: paking,
                    delivery: delivary,
                    lastdiscount: values?.lastdiscount,
                    previousdue: due,
                    paidamount: total,
                    amount: total,
                    orders: orderData,
                    deliverydate: values?.deliverydate
                }),
            });

            const data = await response.json();
            toast(data?.message);
            goto(`/invoice/${data?.invoice}`)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    const CalculateAmount = () => {
        let amount = allData?.reduce((acc, item) => {
            if (item?.discount_type === "Fixed") {
                let price = parseInt(parseInt(item?.price) - item?.discount);
                return acc + (parseInt(item?.qty) * parseInt(price))
            } else {
                let discount = parseInt(parseInt(item?.price) * parseInt(item?.discount) / 100);
                return acc + (parseInt(item?.qty) * parseInt(item?.price - discount))
            }

        }, 0);
        setTotal(amount);
        setLastTotal(parseInt(amount) + parseInt(delivary) + parseInt(paking))

    }

    const GetCustomer = async (id) => {
        const token = localStorage.getItem(`token`);
        const response = await fetch(`${BaseUrl}/api/get/customers/1/100`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setCustomer(data?.items);
    }

    useEffect(() => {
        CalculateAmount()
        document.title = "Sale Return - KazalandBrothers";
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

    const ChangeDiscountType = (type, id) => {
        const updatedData = allData.map(item => {
            if (item.id === id) {
                if (type === "Percentage") {
                    const discountedPrice = item?.price - (item?.price * parseFloat(item?.discount) / 100);
                    return {
                        ...item,
                        discount_type: type,
                        disPrice: discountedPrice
                    };
                } else if (type === "Fixed") {
                    const discountedPrice = item?.price - parseFloat(item?.discount)
                    return {
                        ...item,
                        discount_type: type,
                        disPrice: discountedPrice
                    };
                }

            }
            return item;
        });
        setAllData(updatedData)
    }

    const HandleDelete = (id) => {
        if (!id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        const updatedData = allData?.filter(item => parseInt(item?.id) !== parseInt(id));
        setAllData(updatedData);
    };


    const GetInvoiceData = async (id) => {

        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/order/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token
            }
        });
        const data = await response.json();
        setAllData(data?.items);
        setUser(data?.user);
        setName(data?.user?.name);
        setUserId(data?.user?.id)
        setLoadInvo(false)

    }

    useEffect(() => {
        setTotal(total + values?.delivary + values?.paking)
    }, [total, values?.delivary, values?.paking])


    return (
        <div className="min-h-screen pb-12 px-2.5 py-7 w-full">
            <ToastContainer />



            <div className='bg-[#FFFFFF]'>
                <div className='border-b p-4 flex justify-between items-center'>
                    <h1>Sale Return Details</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>

                    {loadInvo ? <div className='flex justify-start items-end pb-1 z-40'>
                        <SelectionComponent defaultvalue={user?.state} default_select={first} options={state} onSelect={(v) => { setSecond(true); setFirst(false); setCustomer([]); GetCustomer(v?.id) }} label={"Thana Name"} className='rounded-l' />
                        <div onClick={() => { goto('/state') }} className='border-y border-r px-3 pt-[6px] pb-[7px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div> : <div>
                        <h1 className='py-1 text-[15px]'>Thana Name</h1>
                        <div className='flex justify-start items-end pb-1 z-30'>
                            <div className='relative border  text-black w-full h-[38px] rounded-l'>
                                <h1 className='font-thin p-1.5 '>{user?.state}</h1>
                            </div>
                            <div onClick={() => { goto('/state') }} className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                    </div>}




                    <div></div>
                    <div className=''>
                        <h1 className='pb-1 text-[15px]'>Load Previous Invoice </h1>
                        <div className='flex justify-center w-full h-[39px]'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y  text-black w-full px-1'>
                                <input type='number' placeholder={'Enter Invoice number'}
                                    onKeyDown={(e) => { if (e.key === "Enter") { GetInvoiceData(e.target.value) } }}
                                    onChange={(e) => { setInvoId(e.target.value) }}
                                    className='p-1 mt-[2px] rounded focus:outline-none w-full font-thin' />
                            </div>
                            <div onClick={() => { GetInvoiceData(invoId) }} className='border px-3 pt-[7px] pb-[7px] rounded-r cursor-pointer text-white bg-blue-500'>
                                Load
                            </div>
                        </div>
                    </div>


                    {loadInvo ? <div className='flex justify-start items-end pb-1 z-30'>
                        <SelectionComponent options={customer} default_select={second} onSelect={(v) => { setSecond(false); setFirst(false); inputRef.current.focus(); setUserId(v.id); setName(v?.name); fetchUserDue(v.id) }} label={"Customer"} className='rounded-l' />
                        <div onClick={() => { goto('/create/customer') }} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div> : <div>
                        <h1 className='py-1 text-[15px]'>Customer Name</h1>
                        <div className='flex justify-start items-end pb-1 z-30'>
                            <div className='relative border  text-black w-full h-[38px] rounded-l'>
                                <h1 className='font-thin p-1.5 '>{user?.name}</h1>
                            </div>
                            <div onClick={() => { goto('/state') }} className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                    </div>}

                    <div></div>
                    <div className='relative'>
                        <Calender label={"Date"} value={handleDateConvert(new Date(raw?.toDate))} getDate={(date) => { setValues({ ...values, deliverydate: date }) }} getTime={(ti) => { setRaw({ ...raw, toDate: ti }) }} />
                    </div>
                </div>

                <div className='border-b p-4'>
                    <h1>Items</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 '>
                    <div>
                        {info?.role === "superadmin" ? <SelectionComponent options={shop} onSelect={() => { }} label={'Warehouse'} /> : <InputComponent placeholder={info?.shopname} label={'Warehouse'} readOnly={true} />}
                    </div>
                    <div className='grid col-span-2'>
                        <h1 className='pb-1 text-[15px]'>Enter Item Name</h1>
                        <div className='flex justify-center w-full h-[39px]'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' ref={inputRef} placeholder={'Scan Barcode/Search Items'} value={searchItem} onChange={SearchProduct}
                                    onKeyDown={(e) => {
                                        if (e.key === "ArrowDown") {
                                            if (searchData?.length === 0 && allData?.length > 0) {
                                                inputQty.current.focus()
                                            }
                                            if (selectedId === searchData?.length - 1) {
                                                setSelectedId(0)
                                            } else {
                                                setSelectedId(selectedId + 1)
                                            }

                                        } else if (e.key === "ArrowUp") {
                                            if (searchData?.length === 0) {
                                                setSecond(true)
                                            }
                                            if (selectedId === 0) {
                                                setSelectedId(searchData?.length - 1)
                                            } else {
                                                setSelectedId(selectedId - 1)
                                            }

                                        } else if (e.key === "Enter") {
                                            if (searchData?.length === 0 && allData?.length > 0) {
                                                inputQty.current.focus()
                                                setSelectedId(0)
                                            } else {
                                                setAllData([...allData, searchData[selectedId]]);
                                                setSearchData([]);
                                                setSearchItem('');
                                                setSelectedId(0)
                                            }
                                        }
                                    }}
                                    className='p-1 mt-[2px] rounded focus:outline-none w-full font-thin' />
                                <Search className='absolute right-1 top-2 cursor-pointer hover:bg-slate-200 rounded-full' />
                                {searchData && searchData?.length > 0 && <div className='w-full absolute top-[35px] border bg-[#FFFFFF] shadow rounded-b'>
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead class="text-xs text-gray-900">
                                            <tr className='border-b border-black text-[16px]'>
                                                <th scope="col" className="px-1 py-2 font-thin">Name</th>
                                                <th scope="col" className="px-1 py-2 font-thin">Edition</th>
                                                <th scope="col" className="px-4 py-2 text-left font-thin">Brand</th>
                                                <th scope="col" className="px-4 py-2 text-left font-thin">Category</th>
                                                <th scope="col" className="px-4 py-2 text-left font-thin">Purchase Price</th>
                                                <th scope="col" className="pl-4 py-2 text-left font-thin">Salse Price</th>
                                                <th scope="col" className="pl-4 py-2 text-left font-thin ">Discount</th>
                                                <th scope="col" className="pr-3 py-2 text-right font-thin">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchData?.map((item, i) => {
                                                return <tr key={i} className={`border-b cursor-pointer ${selectedId === i ? 'bg-gray-100' : ''}`} onClick={() => { setAllData([...allData, item]); setSearchData([]); setSearchItem('') }}>
                                                    <th scope="col" className="px-1 py-2 font-thin text-left">{item?.name}</th>
                                                     <th scope="col" className="px-1 py-2 font-thin text-left">{item?.edition}</th>
                                                    <th scope="col" className="px-4 py-2 text-left font-thin">{item?.brand?.name}</th>
                                                    <th scope="col" className="px-4 py-2 text-left font-thin">{item?.category?.name}</th>
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
                            <div onClick={() => { goto('/create') }} className='border px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>



                <div className='p-4 w-full overflow-hidden overflow-x-auto'>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-900">
                            <tr className='border-y text-[16px] py-1'>
                                <th scope="col" className="p-2 text-center font-thin border-x">Action</th>
                                <th scope="col" className="pl-2 py-2.5 font-thin border-x">Qty</th>
                                <th scope="col" className="py-2.5 px-2.5 font-thin border-r">Year</th>
                                <th scope="col" className="py-2.5 px-2.5 font-thin border-r">Category</th>
                                <th scope="col" className="py-2.5 px-2.5 font-thin border-r">Brand</th>
                                <th scope="col" className="px-2 py-2.5 text-left font-thin border-r">Item name</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r">M.R.P</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r">Discount</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r">Sale Price</th>
                                <th scope="col" className="pl-2 py-2.5 text-left font-thin border-r rounded">Total price</th>

                            </tr>
                        </thead>
                        <tbody>
                            {allData?.map((item) => {
                                return <WholeSaleCard item={item} inputQty={inputQty} changeqty={ChangeQty} changedis={ChangeDiscount} changeprice={ChangePrice} ChangeDiscountType={ChangeDiscountType} onClick={HandleDelete} lastdiscount={user?.lastdiscount} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <div className='flex justify-between gap-5'>
                        <div>
                            <div className=''>
                                <InputComponent placeholder={user?.balance ? user?.balance : due} label={'Balance'} readOnly={true} className={``} />
                            </div>
                            <div>
                                <p className='py-2 pt-1 font-semibold text-sm'>Pay Amount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' value={total} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} readOnly={true} placeholder={total} className='border-y border-l px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />
                                    <select value={values?.pay_type} onChange={(v) => { setValues({ ...values, pay_type: v.target.value }) }}
                                        className={`border text-[#6B7280] w-[35%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                        {[{ id: 201, name: "Cash" }, { id: 202, name: "Due" }].map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div>
                            <div className=''>
                                <InputComponent placeholder={total} label={'Total'} readOnly={true} className={``} />
                            </div>

                            <div className='flex justify-between items-center gap-4'>
                                <InputComponent label={'Packing Charge'} type={'number'}
                                    placeholder={user?.packing ? user?.packing : paking} value={user?.packing ? user?.packing : paking}
                                    readOnly={loadInvo ? false : true}
                                    onChange={(v) => { setPaking(v); setLastTotal(parseInt(total) + parseInt(v)) }} className={``} />
                                <InputComponent label={'Delivery Charge'} type={'number'} placeholder={user?.delivery ? user?.delivery : delivary}
                                    value={user?.delivery ? user?.delivery : delivary}
                                    readOnly={loadInvo ? false : true}
                                    onChange={(v) => { setDelivery(v); setLastTotal(parseInt(total) + parseInt(v) + parseInt(paking)) }} className={``} />
                            </div>
                            <div className='pb-4'>
                                <p className='py-2 pt-1 font-semibold text-sm'>Discount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' value={user?.lastdiscount ? user?.lastdiscount : values?.lastdiscount}
                                        readOnly={loadInvo ? false : true}
                                        placeholder={user?.lastdiscount ? user?.lastdiscount : lastTotal}
                                        onChange={(e) => { ChangeLastDiscountType(values?.lastdiscounttype, e.target.value) }}
                                        className='border-y border-l px-2 text-[#6B7280] focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />
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
                                    <input type='number' value={total} readOnly={true} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} placeholder={total}
                                        className='border text-[#6B7280] px-2 focus:outline-none rounded-r rounded-l font-thin pt-[6px] pb-[5px] w-full' />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-between  gap-5'>
                        <div className='border-t border-black'>
                            <h1 className='text-center'>{info?.name}</h1>
                        </div>
                    </div>
                </div>
                <div className='p-4 border-t'>
                    <Button onClick={Order} name={'Return'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>

        </div>
    );
}

export default SaleReturn;