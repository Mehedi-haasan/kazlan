import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceCard from './InvoiceCard';
import Modal from '../Input/Modal';
import MiniButton from '../Input/MiniButton';
import PaymentTotal from './PaymentTotal';
import Search from '../../icons/Search';
import SellCard from './SellCard';
import SelectionComponent from '../Input/SelectionComponent';
import BaseUrl from '../../Constant';
import { useToImage } from '@hcorta/react-to-image'
import Tabeheader from './Tableheader';
import BarCode from '../../icons/BarCode';
import Add from '../../icons/Add';
import CreactProduct from '../ProductCreate/CreactProduct';


const Invoice = ({ isOrder = true, }) => {

    const [data, setData] = useState({});
    const [total, setTotal] = useState(0);
    const [stateName, setStateName] = useState('Tangail')
    const [name, setName] = useState('Mehedi hasan')
    const [due, setDue] = useState(0);
    const [pay, setPay] = useState(0)
    const [invoice_id, setInvoiceId] = useState(712)
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [show, setShow] = useState(false);
    const [isPdf, setPdf] = useState(false);
    const [isImg, setImg] = useState(false);
    const [state, setState] = useState([]);
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState(1);
    const [stateId, setStateId] = useState(1);
    const [mobile, setMobile] = useState('')
    const [flatDiscount, setFlatDiscount] = useState(0);
    const [percentageDiscount, setPercentageDiscount] = useState(0);
    const [discountType, setDiscountType] = useState("Percentage");
    const [date, setDate] = useState('');
    const [isCreate, setIsCreate] = useState(false)

    const options = {
        width: 1000,
        backgroundColor: '#ffffff' // Set background color to white
    };
    const { ref, getPng } = useToImage(options)

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

    const downloadPDF = () => {
        const capture = document.querySelector('.actual-receipt');
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('receipt.pdf');
        })
        setPdf(false)
    }

    const PrintfPdf = () => {
        window.print()
    }

    const Order = async () => {
        const token = localStorage.getItem('token');
        let dis = discountType === "Percentage" ? percentageDiscount : (parseInt(flatDiscount) * 100) / total;
        let orderData = [];
        allData?.map((v) => (
            orderData.push({
                "invoice_id": invoice_id,
                "product_id": v?.id,
                "username": name,
                "userId": userId,
                "name": v?.name,
                "price": v?.price,
                "discount": parseInt(dis),
                "discountType": discountType,
                "discountamount": parseInt(v?.price * v?.qty * dis / 100),
                "sellprice": (v?.price * v?.qty) - (v?.price * v?.qty * dis / 100),
                "qty": v?.qty,
                "contact": mobile,
                "date": date,
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
                    userId: userId,
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

        const fetchState = async () => {
            const response = await fetch(`${BaseUrl}/api/get/state`);
            const data = await response.json();
            if (data && data?.items?.length > 0) {
                setState(data?.items || []);
            }
        }
        setDate(getFormattedDate())
        fetchState()
    }, [])

    useEffect(() => {

        const fetchUserDue = async () => {
            const response = await fetch(`${BaseUrl}/api/users/due/${userId}`);
            const data = await response.json();
            if (data && data?.items) {
                setDue(data?.items?.amount || 0);
            }
        }
        fetchUserDue()
    }, [userId])

    useEffect(() => {

        const fetchUser = async () => {
            const response = await fetch(`${BaseUrl}/api/get/users/${stateId}`);
            const data = await response.json();
            if (data && data?.items?.length > 0) {
                setUser(data?.items || []);
                setUserId(data?.items[0]?.id)
            }
        }
        fetchUser()
    }, [stateId])

    return (
        <div className="min-h-screen">

            <div className='w-full mx-auto border min-h-screen rounded'>
                <div className="mt-4 px-3 pt-1">

                    <div>
                        <div className='flex justify-center w-full pb-1.5'>
                            <div className='border rounded-l py-1 px-3 cursor-pointer text-[#008CFF] flex justify-center items-center'>
                                <BarCode />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' placeholder='স্ক্যান / পণ্যের নাম লিখুন' onChange={SearchProduct} className='p-1 my-auto rounded focus:outline-none h-full w-full' />
                                <Search className='absolute right-1 top-1.5 cursor-pointer hover:bg-slate-200 rounded-full' />
                            </div>
                            <div
                                // onClick={() => { setIsCreate(true) }}
                                className='border rounded-r py-1 px-3 cursor-pointer text-[#008CFF] flex justify-center items-center'>
                                <Add />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex justify-start gap-3 items-center'>
                                <h1 className='font-semibold w-[80px]'>ঠিকানা</h1>
                                <div className='flex justify-start items-center gap-3'>
                                    <h1 className='font-semibold'>:</h1>
                                    <SelectionComponent options={state} onSelect={(value) => { setStateName(value?.name); setStateId(value?.id) }} label={''} />
                                </div>
                            </div>
                            <div className='flex justify-start gap-3 items-center'>
                                <h1 className='font-semibold'>তারিখ</h1>
                                <div className='flex justify-start items-center gap-3'>
                                    <h1 className='font-semibold'>:</h1>
                                    <input placeholder={date} className='border focus:outline-none rounded p-1 border-black text-black' />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between pb-1'>
                            <div className='flex justify-start gap-3 items-center'>
                                <h1 className='font-semibold w-[80px]'>নাম</h1>
                                <div className='flex justify-start items-center gap-3'>
                                    <h1 className='font-semibold'>:</h1>
                                    <SelectionComponent options={user} onSelect={(v) => { setName(v?.name); setUserId(v?.id); setDue(0) }} label={''} />
                                </div>
                            </div>
                            <div className='flex justify-start gap-3 items-center'>
                                <h1 className='font-semibold'>মেমো নং</h1>
                                <div className='flex justify-start items-center gap-3'>
                                    <h1 className='font-semibold'>:</h1>
                                    <input placeholder={invoice_id} className='border focus:outline-none rounded p-1 border-black text-black' />
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='flex justify-start gap-3 items-center py-1'>
                                <h1 className='font-semibold w-[80px]'>মোবাইল</h1>
                                <div className='flex justify-start items-center gap-3'>
                                    <h1 className='font-semibold'>:</h1>
                                    <input placeholder='মোবাইল নম্বর' onChange={(e) => { setMobile(e.target.value) }} className='border focus:outline-none rounded p-1 border-black text-black' />
                                </div>
                            </div>
                            <div className='flex justify-end gap-3 items-center'>
                                <h1 className='font-semibold'>ডিসকাউন্ট</h1>
                                <div className='flex justify-start items-center gap-3'>
                                    <h1 className='font-semibold'>:</h1>
                                    <SelectionComponent options={[{ id: 1, name: "Percentage" }, { id: 2, name: "Flat Discount" }]} onSelect={(v) => { setDiscountType(v?.name); setPercentageDiscount(0); setFlatDiscount(0) }} label={''} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal show={isCreate} handleClose={() => { setIsCreate(false) }} className={`w-[800px]`}>
                        <CreactProduct />
                    </Modal>

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
                                // value={qty}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setAllData([...allData, data]);
                                        setData([]);
                                        setShow(false);
                                        // setQty(0)
                                    }
                                }}
                                placeholder={""}
                            />
                        </div>
                        <div className='flex justify-between items-center py-1'>
                            <h1>Comn</h1>
                            <input type='number'
                                className="text-right focus:outline-none w-16 border rounded"
                                onChange={(e) => setData({ ...data, qty: e.target.value })}
                                // value={qty}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setAllData([...allData, data]);
                                        setData([]);
                                        setShow(false);
                                        // setQty(0)
                                    }
                                }}
                                placeholder={""}
                            />
                        </div>
                        <div className='flex justify-end items-center pt-1'>
                            <MiniButton name={`Done`} onClick={() => { setAllData([...allData, data]); setData([]); setShow(false); }} />
                        </div>
                    </Modal>


                    <div className='relative overflow-x-auto my-5'>
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
                                <PaymentTotal
                                    data={allData}
                                    discountPercentage={(e) => { setPercentageDiscount(e.target.value) }}
                                    discountFlat={(e) => { setFlatDiscount(e.target.value) }}
                                    flatDiscount={flatDiscount}
                                    percentageDiscount={percentageDiscount}
                                    discountType={discountType}
                                    due={due}
                                    pay={pay}
                                    changePay={(e) => { setPay(e) }}
                                    setTotalPrice={(v) => { setTotal(v) }}
                                />

                            </tbody>
                        </table>
                    </div>
                </div>



                <Modal show={isPdf} handleClose={() => { setPdf(false) }} className={`w-[1000px]`}>
                    <div className="actual-receipt mt-2 px-10">
                        <div className='pt-3'>
                            <div className='flex justify-between'>
                                <div className='flex justify-start gap-3 items-center'>
                                    <h1 className='font-semibold w-[90px]'>ঠিকানা</h1>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h1 className='font-semibold'>:</h1>
                                        <input placeholder={stateName} className='border focus:outline-none rounded p-1 border-black text-black' />
                                    </div>
                                </div>
                                <div className='flex justify-start gap-3 items-center'>
                                    <h1 className='font-semibold'>তারিখ</h1>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h1 className='font-semibold'>:</h1>
                                        <input placeholder={date} className='border focus:outline-none rounded p-1 border-black text-black' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between pb-1 pt-2'>
                                <div className='flex justify-start gap-3 items-center'>
                                    <h1 className='font-semibold w-[90px]'>নাম</h1>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h1 className='font-semibold'>:</h1>
                                        <input placeholder={name} className='border focus:outline-none rounded p-1 border-black text-black' />
                                    </div>
                                </div>
                                <div className='flex justify-start gap-3 items-center'>
                                    <h1 className='font-semibold'>মেমো নং</h1>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h1 className='font-semibold'>:</h1>
                                        <input placeholder={invoice_id} className='border focus:outline-none rounded p-1 border-black text-black' />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <div className='flex justify-start gap-3 items-center py-1'>
                                    <h1 className='font-semibold w-[90px]'>মোবাইল</h1>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h1 className='font-semibold'>:</h1>
                                        <input placeholder='মোবাইল নম্বর' onChange={(e) => { setMobile(e.target.value) }} className='border focus:outline-none rounded p-1 border-black text-black' />
                                    </div>
                                </div>
                                <div className='flex justify-end gap-3 items-center'>
                                    <h1 className='font-semibold'>ডিসকাউন্ট</h1>
                                    <div className='flex justify-start items-center gap-3'>
                                        <h1 className='font-semibold'>:</h1>
                                        <input placeholder={discountType} className='border focus:outline-none rounded p-1 border-black text-black' />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='relative overflow-x-auto py-5'>
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <Tabeheader />
                                <tbody>
                                    {allData?.map((item) => {
                                        return <InvoiceCard key={item?.id} id={item?.id} name={item?.name} qty={item?.qty} price={item?.price} />
                                    })}
                                    <PaymentTotal
                                        data={allData}
                                        discountPercentage={(e) => { setPercentageDiscount(e.target.value) }}
                                        discountFlat={(e) => { setFlatDiscount(e.target.value) }}
                                        flatDiscount={flatDiscount}
                                        percentageDiscount={percentageDiscount}
                                        discountType={discountType}
                                        due={due}
                                        pay={pay}
                                        setTotalPrice={(v) => { setTotal(v) }}
                                    />

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className='flex justify-end items-end'>
                        <button onClick={downloadPDF} className='border rounded px-4 py-1.5 mr-1 font-semibold'>Download Pdf</button>
                        <button onClick={Order} className='border rounded px-4 py-1.5 mr-1 font-semibold'>Order</button>
                    </div>
                </Modal>



                <Modal show={isImg} handleClose={() => { setImg(false) }} className={`w-[1050px]`}>
                    <div ref={ref} className='bg-white w-[1000px]'>
                        <div className="actual-receipt mt-2 px-10">
                            <div className='pt-3'>
                                <div className='flex justify-between'>
                                    <div className='flex justify-start gap-3 items-center'>
                                        <h1 className='font-semibold w-[90px]'>ঠিকানা</h1>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h1 className='font-semibold'>:</h1>
                                            <input placeholder={stateName} className='border focus:outline-none rounded p-1 border-black text-black' />
                                        </div>
                                    </div>
                                    <div className='flex justify-start gap-3 items-center'>
                                        <h1 className='font-semibold'>তারিখ</h1>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h1 className='font-semibold'>:</h1>
                                            <input placeholder={date} className='border focus:outline-none rounded p-1 border-black text-black' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between pb-1 pt-2'>
                                    <div className='flex justify-start gap-3 items-center'>
                                        <h1 className='font-semibold w-[90px]'>নাম</h1>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h1 className='font-semibold'>:</h1>
                                            <input placeholder={name} className='border focus:outline-none rounded p-1 border-black text-black' />
                                        </div>
                                    </div>
                                    <div className='flex justify-start gap-3 items-center'>
                                        <h1 className='font-semibold'>মেমো নং</h1>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h1 className='font-semibold'>:</h1>
                                            <input placeholder={invoice_id} className='border focus:outline-none rounded p-1 border-black text-black' />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex justify-start gap-3 items-center py-1'>
                                        <h1 className='font-semibold w-[90px]'>মোবাইল</h1>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h1 className='font-semibold'>:</h1>
                                            <input placeholder='মোবাইল নম্বর' onChange={(e) => { setMobile(e.target.value) }} className='border focus:outline-none rounded p-1 border-black text-black' />
                                        </div>
                                    </div>
                                    <div className='flex justify-end gap-3 items-center'>
                                        <h1 className='font-semibold'>ডিসকাউন্ট</h1>
                                        <div className='flex justify-start items-center gap-3'>
                                            <h1 className='font-semibold'>:</h1>
                                            <input placeholder={discountType} className='border focus:outline-none rounded p-1 border-black text-black' />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='relative overflow-x-auto py-5'>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <Tabeheader />
                                    <tbody>
                                        {allData?.map((item) => {
                                            return <InvoiceCard key={item?.id} id={item?.id} name={item?.name} qty={item?.qty} price={item?.price} />
                                        })}
                                        <PaymentTotal
                                            data={allData}
                                            discountPercentage={(e) => { setPercentageDiscount(e.target.value) }}
                                            discountFlat={(e) => { setFlatDiscount(e.target.value) }}
                                            flatDiscount={flatDiscount}
                                            percentageDiscount={percentageDiscount}
                                            discountType={discountType}
                                            due={due}
                                            pay={pay}
                                            setTotalPrice={(v) => { setTotal(v) }}
                                        />

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-end'>
                        <button onClick={getPng} className='border rounded px-4 py-1.5 mr-1 font-semibold'>Download Image</button>
                        <button onClick={Order} className='border rounded px-4 py-1.5 mr-1 font-semibold'>Order</button>
                    </div>
                </Modal>


                {/* receipt action */}
                <div className="flex justify-end my-3 mr-2">
                    <button onClick={() => { setPdf(true) }} className='border rounded px-4 py-1.5 mx-3 font-semibold'>Generate Pdf</button>
                    <button onClick={() => { setImg(true) }} className='border rounded px-4 py-1.5 mr-1 font-semibold'>Generate Png</button>
                    <button onClick={PrintfPdf} className='border rounded px-4 py-1.5 mr-1 font-semibold'>Print</button>
                    {isOrder && <button onClick={Order} className='border rounded px-4 py-1.5 mx-3 font-semibold'>Order</button>}
                </div>
            </div>



        </div>
    );
}

export default Invoice;