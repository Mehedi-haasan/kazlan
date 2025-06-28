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
import { getFormattedDate, handleDateConvert, PrepareOrderData } from '../Input/Time';
import { useNavigate } from 'react-router-dom';
import Calander from '../Wholesale/Calender';
import DataHeader from '../Common/DataHeader';
import SearchResultHeader from '../Common/SearchResultHeader';



const PurchaseProduct = ({ shop = [], editio = [], brand = [], category = [], state = [], info = {} }) => {
    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [edition, setEdition] = useState(false)
    const [bran, setBrand] = useState(false)
    const [catego, setCatego] = useState(false)
    const inputRef = useRef(null)
    const inputQty = useRef(null)
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
    const [selectedId, setSelectedId] = useState(0)
    const today = new Date();
    const [values, setValues] = useState({
        pay: 0,
        paking: 0,
        delivary: 0,
        pay_type: 'Chalan/Due',
        lastdiscount: 0,
        lastdiscounttype: "Fixed",
        deliverydate: ''
    })
    const [filter, setFilter] = useState({
        cate: null,
        bran: null,
        edit: null
    })

    const [raw, setRaw] = useState({
        fromDate: today.toISOString(),
        toDate: today.toISOString()
    });



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

    const SecondSearchProduct = async (edit, cate, bran, value) => {
        setSelectedId(0)
        setSearchItem(value)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/product/search/with/${edit}/${cate}/${bran}/${value}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();

        if (data?.items && data?.items?.length > 0) {
            setSearchData(data.items)
        } else {
            setSearchData([]);
        }
    }


    const Order = async () => {
        if (!userId) {
            toast("Customer Pay Amount and Pay Type are required");
            return
        }
        const token = localStorage.getItem('token');
        let orderData = await PrepareOrderData(allData, userId, name, values, info);
        try {
            const response = await fetch(`${BaseUrl}/api/purchase/product`, {
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
                    paymentmethod:"",
                    total: lastTotal,
                    packing: paking,
                    delivery: delivary,
                    lastdiscount: values?.lastdiscount,
                    previousdue: due,
                    pay_type: values?.pay_type,
                    paidamount: values?.pay,
                    amount: lastTotal - values?.pay,
                    orders: orderData,
                    updatedata: allData,
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
            let discount = parseInt(parseInt(item?.price) * parseInt(item?.discount) / 100);
            return acc + (parseInt(item?.qty) * parseInt(item?.price - discount))
        }, 0);
        setTotal(amount);
        setLastTotal(parseInt(amount) + parseInt(delivary) + parseInt(paking))
    }

    useEffect(() => {
        document.title = "Purchase Items - KazalandBrothers";
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
        const response = await fetch(`${BaseUrl}/api/get/suppliers/${id}`, {
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
            if (item?.id === id) {
                const originalPrice = item?.price;
                const discountedPrice = originalPrice - (originalPrice * parseFloat(discount) / 100);

                return {
                    ...item,
                    discount,
                    cost: discountedPrice,
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


    const HandleDelete = (id) => {
        if (!id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        const updatedData = allData?.filter(item => parseInt(item?.id) !== parseInt(id));
        setAllData(updatedData);
    };

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


    return (
        <div className="min-h-screen pb-12 px-2.5 py-5 w-full rounded-md">
            <ToastContainer />

            <div className='bg-[#FFFFFF] rounded-md'>
                <div className='border-b p-4 flex justify-between items-center'>
                    <h1>Purchase Details</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1 z-40'>
                        <SelectionComponent options={state} default_select={first} onSelect={(v) => { setSecond(true); setFirst(false); setCustomer([]); GetCustomer(v?.id) }} label={"Thana Name"} className={`rounded-l z-50`} />
                        <div onClick={() => { goto('/state') }} className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div></div>

                    <div className='relative'>
                        <Calander label={"Date"} value={handleDateConvert(new Date(raw?.fromDate))} getDate={(date) => { setValues({ ...values, deliverydate: date }) }} getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                    </div>
                </div>



                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1 z-30'>
                        <SelectionComponent options={customer} default_select={second} onSelect={(v) => { setSecond(false); setFirst(false);  setEdition(true); setUserId(v.id); setName(v?.name); fetchUserDue(v.id) }} label={"Supplier"} className='rounded-l ' />
                        <div onClick={() => { goto('/create/customer') }} className='border-y border-r px-3 py-1.5 rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div></div>

                    <div className='relative'>
                        <Calander label={"Delivery Date"} value={handleDateConvert(new Date(raw?.toDate))} getDate={(date) => { setValues({ ...values, deliverydate: date }) }} getTime={(ti) => { setRaw({ ...raw, toDate: ti }) }} />

                    </div>
                </div>





                <div className='border-b p-4'>
                    <h1>Items</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 p-4 '>
                    <div>
                        <SelectionComponent options={editio} default_select={edition}
                            onSelect={(v) => {
                                setCatego(true);
                                setEdition(false);
                                setFilter({ ...filter, edit: v?.id });
                                SecondSearchProduct(v?.id, filter?.cate, filter?.bran, null)
                            }}
                            label={'Edition'}
                        />
                    </div>
                    <div>
                        <SelectionComponent options={category} default_select={catego}
                            onSelect={(v) => {
                                setFilter({ ...filter, cate: v?.id })
                                setCatego(false)
                                setBrand(true)
                                SecondSearchProduct(filter?.edit, v?.id, filter?.bran, null)
                            }} label={'Category'} />
                    </div>
                    <div>
                        <SelectionComponent options={brand} default_select={bran}
                            onSelect={(v) => {
                                setBrand(false)
                                inputRef.current.focus()
                                setFilter({ ...filter, bran: v?.id })
                                SecondSearchProduct(filter?.edit, filter?.cate, v?.id, null)
                            }}
                            label={'Brand'} />
                    </div>
                    <div className='grid col-span-3'>
                        <h1 className='pb-1'>Enter Item Name</h1>
                        <div className='flex justify-center w-full h-[39px]'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' ref={inputRef} placeholder={'Scan Barcode/Search Items'} value={searchItem}
                                    onChange={(e) => { SecondSearchProduct(filter?.edit, filter?.cate, filter?.bran, e.target.value) }}
                                    className='p-1 mt-[2px] rounded focus:outline-none w-full font-thin'
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
                                />
                                <Search className='absolute right-1 top-2 cursor-pointer hover:bg-slate-200 rounded-full' />
                                {searchData && searchData?.length > 0 && <div className='w-full absolute top-[35px] border bg-[#FFFFFF] shadow rounded-b'>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <thead className="text-xs text-gray-900">
                                            <SearchResultHeader />
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
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-900">
                            <DataHeader />
                        </thead>
                        <tbody>
                            {allData?.map((item, i) => {
                                return <WholeSaleCard i={i} item={item} changeqty={ChangeQty} inputQty={inputQty} changedis={ChangeDiscount} ChangeDiscountType={ChangeDiscountType} changeprice={ChangePrice} onClick={HandleDelete} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <div className='flex justify-between gap-5'>
                        <div>
                            <div className=''>
                                <InputComponent placeholder={due} label={'Balance'} readOnly={true} className={``} />
                            </div>
                            <div>
                                <p className='py-2 pt-1 font-semibold text-sm'>Pay Amount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' value={values?.pay} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} placeholder='' className='border-y border-l px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[55%]' />
                                    <select value={values?.pay_type} onChange={(v) => { setValues({ ...values, pay_type: v.target.value }) }}
                                        className={`border text-[#6B7280] w-[45%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                        {[{ id: 201, name: "Chalan/Due" }, { id: 202, name: "Cash Memo" }, { id: 203, name: "Paid" }].map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div>
                            <div className=''>
                                <InputComponent placeholder={total} label={'Total'} readOnly={true} className={`text-black`} />
                            </div>

                            <div className='flex justify-between items-center gap-4'>
                                <InputComponent label={'Packing Charge'} type={'number'} placeholder={paking} onChange={(v) => { setPaking(v); setLastTotal(parseInt(total) + parseInt(v)) }} className={``} />
                                <InputComponent label={'Delivery Charge'} type={'number'} placeholder={delivary} onChange={(v) => { setDelivery(v); setLastTotal(parseInt(total) + parseInt(v) + parseInt(paking)) }} className={``} />
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
                                    <input type='number' value={lastTotal} onChange={(e) => { setLastTotal(e.target.value) }} readOnly={true} placeholder=''
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
                    <Button onClick={Order} name={'Submit'} />
                    <Button name={'Cancel'} onClick={()=>{goto(`/dashboard`)}} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>

        </div>
    );
}

export default PurchaseProduct;