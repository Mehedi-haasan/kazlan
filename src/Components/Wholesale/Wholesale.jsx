import { useEffect, useState, useRef } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import WholeSaleCard from './WholeSaleCard';
import Button from '../Input/Button';
import Notification from '../Input/Notification'
import { getFormattedDate, CalculateAmount } from '../Input/Time';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calender'
import SearchResultHeader from '../Common/SearchResultHeader';
import DataHeader from '../Common/DataHeader';
import EscapeRedirect from './EscapeRedirect'
import Remove from '../../icons/Remove';
import SelectionComponentSearch from '../Input/SelectionComponentSearch';




const WholeSell = ({ shop = [], editio = [], brand = [], category = [], state = [], info = {} }) => {


    const [itemQuan, setItemQuan] = useState(null)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [edition, setEdition] = useState(false)
    const [bran, setBrand] = useState(false)
    const [catego, setCatego] = useState(false)
    const [pack, setPack] = useState(false)
    const [deli, setDeli] = useState(false)
    const [quan, setQuan] = useState(false)
    const inputRef = useRef(null)
    const inputQty = useRef(null)
    const dis_ref = useRef(null)
    const typeRef = useRef(null);
    const paytypeRef = useRef(null);
    const discount_ref = useRef(null)
    const last_pay = useRef()
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
    const [disValue, setDisValue] = useState(false);
    const [payTypeShow, setPayTypeShow] = useState(false);
    const [prepareData, setPrepareData] = useState({})
    const [prep_value, setPrep_Value] = useState(false)
    let PayType = [{ id: 1, name: "Challan" }, { id: 2, name: "Due" }, { id: 3, name: "Cash" }]
    const today = new Date();
    const [raw, setRaw] = useState({
        fromDate: today.toISOString(),
        toDate: today.toISOString()
    });
    let data = [{ id: 1, name: "Percentage" }, { id: 2, name: "Fixed" }]
    const [filter, setFilter] = useState({
        cate: null,
        cate_value: "Select a filter",
        bran: null,
        bran_value: 'Select a filter',
        edit: null,
        edit_value: 'Select a filter',
        state: 'Select a filter',
        customer: 'Select a filter',
    })

    const handleDateConvert = (date) => {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formatted
    };

    const [values, setValues] = useState({
        pay: 0,
        paking: 0,
        delivary: 0,
        pay_type: 'Challan',
        lastdiscount: 0,
        lastdiscounttype: "Fixed",
        deliverydate: ''
    })

    EscapeRedirect()

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
            setMessage({ id: Date.now(), mgs: "Customer Pay Amount and Pay Type are required" });
            return
        }
        const token = localStorage.getItem('token');
        let orderData = [];
        allData?.forEach((v) => {
            let sale = 0;
            const price = parseInt(v?.cost) || 0;
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
                product_id: v?.id,
                code: v?.code,
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
            const response = await fetch(`${BaseUrl}/api/post/order`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    shop: info?.shopname,
                    customername: name,
                    paymentmethod: "",
                    userId: userId,
                    date: getFormattedDate(),
                    total: lastTotal,
                    methodname: "",
                    packing: paking,
                    delivery: delivary,
                    lastdiscount: values?.lastdiscount,
                    previousdue: due,
                    paidamount: values?.pay,
                    amount: parseInt(lastTotal) - parseInt(values?.pay),
                    orders: orderData,
                    deliverydate: values?.deliverydate
                }),
            });

            const data = await response.json();
            setMessage({ id: Date.now(), mgs: data?.message });
            goto(`/invoice/${data?.invoice}`)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }


    useEffect(() => {
        const fetchAmount = async () => {
            let { amount, lastTotal } = await CalculateAmount(allData, delivary, paking, values?.lastdiscount);
            setTotal(amount);
            setLastTotal(lastTotal);
            document.title = "Sale Return - KazalandBrothers";
        };

        fetchAmount();
    }, [allData, values, delivary, paking]);


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



    const HandleDelete = (id) => {
        if (!id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;

        const updatedData = allData?.filter(item => parseInt(item?.id) !== parseInt(id));
        setAllData(updatedData);
    };


    useEffect(() => {
        if (prep_value) {
            discount_ref.current.focus()
        }
    }, [prep_value])


    const ChangeDis = (value, type) => {
        if (type === "Fixed") {
            setPrepareData(prev => ({
                ...prev,
                discount: value,
                discount_type: type,
                price: parseInt(prev?.cost) - value
            }));
        } else if (type === "Percentage") {
            const discount = (parseInt(prepareData?.cost) * parseInt(value)) / 100;
            setPrepareData(prev => ({
                ...prev,
                discount: value,
                discount_type: type,
                price: parseInt(prev?.cost) - discount
            }));
        }
    }

    const ChangeQty = (id, qty) => {
        let updateId = parseInt(id)
        let updateQty = parseInt(qty)
        const updatedData = allData.map((item) => {
            if (item?.id === updateId) {
                return { ...item, qty: updateQty };
            } else {
                return item;
            }
        });
        setAllData(updatedData);
    };



    return (
        <div className="min-h-screen pb-12 px-2.5 py-7 w-full">

            <div className='bg-[#FFFFFF] rounded-md'>
                <div className='border-b p-4 flex justify-between items-center'>
                    <h1>Sale Details</h1>
                    <Notification message={message} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1 z-40'>
                        <SelectionComponent default_select={first} options={state} default_value={filter?.state}
                            onSelect={(v) => { setSecond(true); setFirst(false); setCustomer([]); GetCustomer(v?.id); setFilter({ ...filter, state: v?.name }) }}
                            label={"Thana Name"} className='rounded-l z-50' />
                        <div onClick={() => { goto('/state') }} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div></div>

                    <div className='relative'>
                        <Calendar label={"Date"} value={handleDateConvert(new Date(raw?.fromDate))}
                            getDate={(date) => { setValues({ ...values, deliverydate: date }) }}
                            getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                    </div>


                    <div className='flex justify-start items-end pb-1 z-30'>
                        <SelectionComponent default_select={second} options={customer} default_value={filter?.customer}
                            onSelect={(v) => {
                                setSecond(false); setFirst(false); setQuan(true);
                                setFilter({ ...filter, customer: v?.name }); setUserId(v.id); setName(v?.name); fetchUserDue(v.id)
                            }}
                            label={"Customer"} className='rounded-l' />
                        <div onClick={() => { goto('/create/customer') }} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div></div>
                    <Calendar label={"Delivery Date"} value={handleDateConvert(new Date(raw?.toDate))}
                        getDate={(date) => { setValues({ ...values, deliverydate: date }) }} getTime={(ti) => { setRaw({ ...raw, toDate: ti }) }} />

                </div>

                <div className='border-b p-4'>
                    <h1>Items</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-3 p-4 '>
                    <div>
                        <InputComponent label={'Quantity'} type={'number'} input_focus={quan} placeholder={0} value={itemQuan}
                            handleEnter={() => { setQuan(false); setEdition(true) }} handleTab={() => { setPack(true) }}
                            onChange={(v) => { setItemQuan(v); }} className={``} />
                    </div>
                    <div className='pt-1.5'>
                        <SelectionComponentSearch options={editio} default_select={edition} default_value={filter?.edit_value}
                            onSelect={(v) => {
                                setCatego(true);
                                setEdition(false);
                                setFilter({ ...filter, edit: v?.id, edit_value: v?.name });
                                SecondSearchProduct(v?.id, filter?.cate, filter?.bran, null)
                            }}
                            handleRight={() => { setEdition(false); setCatego(true); }}
                            handleLeft={() => { setEdition(false); setQuan(true); }}
                            label={'Edition'}
                        />
                    </div>
                    <div className='pt-1.5'>
                        <SelectionComponentSearch options={category} default_select={catego} default_value={filter?.cate_value}
                            handleRight={() => { setCatego(false); setBrand(true); }}
                            handleLeft={() => { setCatego(false); setEdition(true); }}
                            onSelect={(v) => {
                                setFilter({ ...filter, cate: v?.id, cate_value: v?.name })
                                setCatego(false)
                                setBrand(true)
                                SecondSearchProduct(filter?.edit, v?.id, filter?.bran, null)
                            }} label={'Category'} />
                    </div>
                    <div className='pt-1.5'>
                        <SelectionComponentSearch options={brand} default_select={bran} default_value={filter?.bran_value}
                            handleRight={() => { setBrand(false); inputRef.current.focus() }}
                            handleLeft={() => { setBrand(false); setCatego(true); }}
                            onSelect={(v) => {
                                setBrand(false)
                                inputRef.current.focus()
                                setFilter({ ...filter, bran: v?.id, bran_value: v?.name })
                                SecondSearchProduct(filter?.edit, filter?.cate, v?.id, null)
                            }}
                            label={'Brand'} />
                    </div>
                    <div className='grid col-span-5'>
                        <h1 className='pb-1'>Enter Item Name</h1>
                        <div className='flex justify-center w-full h-[39px]'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' ref={inputRef} placeholder={'Scan Barcode/Search Items'} value={searchItem}
                                    onChange={(e) => { SecondSearchProduct(filter?.edit, filter?.cate, filter?.bran, e.target.value) }} className='p-1 mt-[2px] rounded focus:outline-none w-full font-thin'
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
                                                let data = { ...searchData[selectedId], qty: itemQuan > 0 ? itemQuan : 1 };
                                                setPrepareData(data)
                                                setSearchData([]);
                                                setSearchItem('');
                                                setSelectedId(0);
                                                setItemQuan(0);
                                                setFilter({
                                                    ...filter,
                                                    cate: null,
                                                    bran: null,
                                                    edit: null,
                                                    edit_value: 'Select a filter',
                                                    bran_value: 'Select a filter',
                                                    cate_value: 'Select a filter'
                                                });
                                                setPrep_Value(true)
                                            }

                                        }
                                    }}
                                />
                                <Search className='absolute right-1 top-2 cursor-pointer hover:bg-slate-200 rounded-full' />
                                {searchData && searchData?.length > 0 && <div className='w-full absolute top-[35px] border bg-[#FFFFFF] shadow rounded-b'>
                                    <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <div className="text-xs text-gray-900">
                                            <SearchResultHeader />
                                        </div>
                                        <div>
                                            {searchData?.map((item, i) => {
                                                return <div key={i} className={`border-b cursor-pointer grid grid-cols-8 ${selectedId === i ? 'bg-gray-100' : ''}`} onClick={() => {
                                                    let data = { ...item, qty: itemQuan > 0 ? itemQuan : 1 };
                                                    setPrepareData(data)
                                                    setSearchData([]);
                                                    setSearchItem('');
                                                    setItemQuan(0);
                                                    setFilter({
                                                        ...filter,
                                                        cate: null,
                                                        bran: null,
                                                        edit: null,
                                                        edit_value: 'Select a filter',
                                                        bran_value: 'Select a filter',
                                                        cate_value: 'Select a filter'
                                                    });
                                                    setPrep_Value(true);
                                                }}>
                                                    <div className="px-1 py-2 font-thin text-left grid col-span-2">{item?.name}</div>
                                                    <div className="px-1 py-2 font-thin text-left">{item?.edition}</div>
                                                    <div className="px-2 py-2 text-left font-thin">{item?.brand?.name}</div>
                                                    <div className="px-2 py-2 text-left font-thin">{item?.category?.name}</div>
                                                    <div className="pl-2 py-2 text-left font-thin">{item?.cost}</div>
                                                    <div className="pl-2 py-2 text-left font-thin">{item?.discount}</div>
                                                    <div className="pr-3 py-2 text-right font-thin">{item?.qty}</div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                }

                            </div>
                            <div onClick={() => { goto('/create') }} className='border px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>



                <div className='p-4 w-full'>
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <DataHeader />
                        <div>
                            {Object.keys(prepareData || {}).length > 0 && (
                                <div className={`border-b border-x text-[15px] text-black grid grid-cols-12`}>
                                    <div className="py-2 flex justify-center items-center">
                                        <Remove onClick={() => { }} />
                                    </div>
                                    <div className="px-2 py-2 text-left font-thin border-l">{prepareData?.qty}</div>
                                    <div className="px-2 py-2 text-left font-thin border-l">{prepareData?.edition}</div>
                                    <div className="px-2 py-2 text-left font-thin border-l">{prepareData?.category?.name}</div>
                                    <div className="px-2 py-2 text-left font-thin border-l">{prepareData?.brand?.name}</div>
                                    <div className="px-2 py-2 text-left font-thin border-l grid col-span-2">{prepareData?.name}</div>
                                    <div className="py-2 text-center font-thin border-x">{prepareData?.cost}</div>
                                    <div className='flex justify-start items-center border-r'>
                                        <input type='number' ref={discount_ref}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    setAllData([...allData, prepareData]);
                                                    setPrepareData({})
                                                    setPrep_Value(false)
                                                    setQuan(true);
                                                } else if (e.key === "ArrowRight") {
                                                    e.preventDefault();
                                                    typeRef.current?.focus();
                                                    setDisValue(true);
                                                    setSelectedId(0)
                                                }
                                            }}
                                            placeholder={0}
                                            onChange={(e) => {
                                                ChangeDis(e.target.value, prepareData?.discount_type)
                                            }}
                                            className=' px-2 focus:outline-none rounded-l font-thin py-2 full' />
                                    </div>
                                    <div className='relative z-50 border-l'>
                                        <input ref={typeRef} value={prepareData?.discount_type} onKeyDown={(e) => {
                                            if (e.key === "ArrowDown") {
                                                if (selectedId === data?.length - 1) {
                                                    setSelectedId(0)
                                                } else {
                                                    setSelectedId(selectedId + 1)
                                                }

                                            } else if (e.key === "ArrowUp") {
                                                if (selectedId === 0) {
                                                    setSelectedId(data?.length - 1)
                                                } else {
                                                    setSelectedId(selectedId - 1)
                                                }
                                            } else if (e.key === "Enter" && data[selectedId]) {
                                                ChangeDis(prepareData?.discount, data[selectedId]?.name)
                                                setDisValue(false);
                                                setSelectedId(0);
                                                discount_ref.current?.focus();
                                            }
                                        }} className='p-2 focus:outline-none w-full text-[#212529] font-thin' />
                                        {
                                            disValue && <div className={`px-0 max-h-[250px] absolute left-0 top-[37px] right-0 z-50 border-x border-b rounded-b overflow-hidden overflow-y-scroll hide-scrollbar bg-white`}>
                                                {
                                                    data?.map((opt, i) => {
                                                        return <div onMouseEnter={() => { }}
                                                            ref={el => selectedId === i && el?.scrollIntoView({ block: 'nearest' })}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "ArrowDown") {
                                                                    setSelectedId(i + 2)
                                                                }
                                                            }}

                                                            onClick={() => { }}
                                                            className={`font-thin text-sm cursor-pointer px-2 py-1 text-[#212529] ${i === selectedId ? 'bg-gray-100' : ''}`}>
                                                            {opt?.name}
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className="pl-2 py-2 text-center font-thin border-l">{prepareData?.disPrice || prepareData?.price}</div>
                                    <div className="pl-2 py-2 text-right font-thin border-l">{parseInt(prepareData?.disPrice || prepareData?.price) * parseInt(prepareData?.qty)}</div>
                                </div>
                            )}
                            {allData?.map((item, i) => {
                                return <WholeSaleCard key={i} item={item} onClick={HandleDelete} ChangeQty={ChangeQty} />
                            })}
                        </div>
                    </div>
                </div>

                <div className='p-4'>
                    <div className='flex justify-between gap-5'>
                        <div>
                            <div className=''>
                                <InputComponent placeholder={due} value={due} label={'Balance'} readOnly={true} className={``} />
                            </div>
                            <div>
                                <p className='py-2 pt-1 font-semibold text-sm'>Pay Amount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' ref={last_pay}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                Order()
                                            } else if (e.key === "ArrowRight") {
                                                paytypeRef.current.focus();
                                                setPayTypeShow(true)
                                            }
                                        }}


                                        onChange={(e) => { setValues({ ...values, pay: e.target.value }) }}
                                        placeholder={values?.pay} className='border-y border-l px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />
                                    {/* <select value={values?.pay_type} onChange={(v) => { setValues({ ...values, pay_type: v.target.value }) }}
                                        className={`border text-[#6B7280] w-[35%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                        {[{ id: 1, name: "Challan" }, { id: 2, name: "Due" }, { id: 3, name: "Cash" }].map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                        ))}
                                    </select> */}


                                    <div className='relative z-50 border'>
                                        <input ref={paytypeRef} value={values?.pay_type} onKeyDown={(e) => {
                                            if (e.key === "ArrowDown") {
                                                if (selectedId === PayType?.length - 1) {
                                                    setSelectedId(0)
                                                } else {
                                                    setSelectedId(selectedId + 1)
                                                }

                                            } else if (e.key === "ArrowUp") {
                                                if (selectedId === 0) {
                                                    setSelectedId(PayType?.length - 1)
                                                } else {
                                                    setSelectedId(selectedId - 1)
                                                }
                                            } else if (e.key === "Enter" && PayType[selectedId]) {
                                                setPayTypeShow(false);
                                                setSelectedId(0);
                                                setValues({ ...values, pay_type: PayType[selectedId].name })
                                                last_pay.current?.focus();
                                            }
                                        }} className='px-2 pt-[5px] pb-[6px] rounded-r focus:outline-none w-full text-[#212529] font-thin' />
                                        {
                                            payTypeShow && <div className={`px-0 max-h-[250px] absolute left-0 top-[37px] right-0 z-50 border-x border-b rounded-b overflow-hidden overflow-y-scroll hide-scrollbar bg-white`}>
                                                {
                                                    PayType?.map((opt, i) => {
                                                        return <div onMouseEnter={() => { }}
                                                            ref={el => selectedId === i && el?.scrollIntoView({ block: 'nearest' })}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "ArrowDown") {
                                                                    setSelectedId(i + 2)
                                                                }
                                                            }}

                                                            onClick={() => { }}
                                                            className={`font-thin text-sm cursor-pointer px-2 py-1 text-[#212529] ${i === selectedId ? 'bg-gray-100' : ''}`}>
                                                            {opt?.name}
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-between pt-24'>
                                <div className='border-t border-black'>
                                    <h1 className='text-center pt-[2px] text-[15px]'>{info?.name}</h1>
                                </div>
                            </div>

                        </div>

                        <div>
                            <div className=''>
                                <InputComponent placeholder={total} value={total} label={'Total'} readOnly={true} className={``} />
                            </div>

                            <div className='flex justify-between items-center gap-4'>
                                <InputComponent label={'Packing Charge'} type={'number'} input_focus={pack} placeholder={paking}
                                    handleEnter={() => { setPack(false); setDeli(true) }} value={paking}
                                    onChange={(v) => { setPaking(parseFloat(v)); }} className={``}
                                />
                                <InputComponent label={'Delivery Charge'} type={'number'} input_focus={deli} placeholder={delivary}
                                    handleEnter={() => { setDeli(false); dis_ref.current.focus() }} value={delivary}
                                    onChange={(v) => { setDelivery(parseInt(v)); }} className={``}
                                />
                            </div>
                            <div className='pb-4'>
                                <p className='py-2 pt-1 font-semibold text-sm'>Discount</p>
                                <div className='flex justify-start items-end pb-1 pt-1'>
                                    <input type='number' ref={dis_ref}
                                        onKeyDown={(e) => { if (e.key === "Enter") { last_pay.current.focus() } }}
                                        onChange={(e) => { setValues({ ...values, lastdiscount: e.target.value }) }}
                                        placeholder={values?.lastdiscount} className='border px-2 text-[#6B7280] focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-full' />
                                </div>
                            </div>
                            <div className='border-t pt-2 border-black flex justify-start gap-2 '>
                                <div><h1 className='pt-[5px] w-[100px]'>Total Amount</h1></div>
                                <div className='w-full'>
                                    <input type='number' value={lastTotal} readOnly={true} onChange={(e) => { setValues({ ...values, pay: e.target.value }) }} placeholder={lastTotal}
                                        className='border text-[#6B7280] px-2 focus:outline-none rounded-r rounded-l font-thin pt-[6px] pb-[5px] w-full' />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className='p-4 border-t'>
                    <Button onClick={Order} name={'Submit'} />
                    <Button name={'Cancel'} onClick={() => { goto(`/dashboard`) }} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    );
}

export default WholeSell;