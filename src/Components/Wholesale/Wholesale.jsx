import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import BaseUrl from '../../Constant';
import { useToImage } from '@hcorta/react-to-image'
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import WholeSaleCard from './WholeSaleCard';
import RightArrow from '../../icons/RightArrow';
import MiniButton from '../Input/MiniButton';
import Modal from '../Input/Modal';
import Button from '../Input/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const WholeSell = ({ shop = [], state = [], paytype = [], info = {} }) => {

    const [data, setData] = useState({ qty: 0, comn: 0 });
    const [searchItem, setSearchItem] = useState('')
    const [total, setTotal] = useState(0);
    const [stateName, setStateName] = useState('Tangail')
    const [customer, setCustomer] = useState([])
    const [name, setName] = useState('Mehedi hasan')
    const [due, setDue] = useState(0);
    const [pay, setPay] = useState(0)
    const [invoice_id, setInvoiceId] = useState(712)
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [show, setShow] = useState(false);
    const [isPdf, setPdf] = useState(false);
    const [userId, setUserId] = useState(1);
    const [stateId, setStateId] = useState(1);
    const [mobile, setMobile] = useState('01750834062')
    const [date, setDate] = useState('');

    const options = {
        width: 1000,
        backgroundColor: '#ffffff'
    };
    const { ref, getPng } = useToImage(options)

    const SearchProduct = async (e) => {
        const name = e.target.value
        setSearchItem(name)
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
        let orderData = [];
        allData?.map((v) => (
            orderData.push({
                "active": true,
                "invoice_id": invoice_id,
                "product_id": v?.id,
                "username": name,
                "userId": userId,
                "name": v?.name,
                "shop": info?.shopname,
                "price": v?.price,
                "discount": v?.comn,
                "sellprice": (v?.price * v?.qty),
                "qty": v?.qty,
                "contact": mobile,
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
                    shop: info?.shopname,
                    customername: name,
                    userId: userId,
                    invoice_id: invoice_id,
                    date: date,
                    total: total,
                    previousdue: due,
                    paidamount: pay,
                    amount: total - pay,
                    orders: orderData
                }),
            });

            const data = await response.json();
            toast(data?.message)
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


    // Fetch Customer due
    const fetchUserDue = async () => {
        const token = localStorage.getItem(`token`);
        const response = await fetch(`${BaseUrl}/api/get/customer/due/${userId}`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setDue(data?.balance);
        if (data && data?.balance) {
            setDue(data?.balance);
        }
    }


    useEffect(() => {
        fetchUserDue()
    }, [userId])




    // Customer Fetch state wise
    useEffect(() => {
        const GetCustomer = async () => {
            const token = localStorage.getItem(`token`);
            const response = await fetch(`${BaseUrl}/api/get/wholesell/customers/${stateId}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            if (data && data?.items?.length > 0) {
                setCustomer(data?.items);
                setUserId(data?.items[0]?.id);
                fetchUserDue()
                setName(data?.items[0]?.name);
            }
        }

        GetCustomer()

    }, [stateId])



    let nameee = "Scan/Type product name";

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
                        <SelectionComponent options={state} onSelect={(v) => { setStateId(v?.id); setStateName(v?.name); setCustomer([]) }} label={"State"} className='rounded-l' />
                        <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div className='flex justify-start items-end pb-1'>
                        <SelectionComponent options={customer} onSelect={(v) => { setUserId(v.id); setName(v?.name) }} label={"Customer"} className='rounded-l' />
                        <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div>
                        <InputComponent placeholder={getFormattedDate()} label={'Date'} />
                    </div>
                    <div>
                        <InputComponent placeholder={`Shop1/${invoice_id}`} label={'Sale Code'} />
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
                        <h1 className='pb-1 font-thin'>Enter Item Name</h1>
                        <div className='flex justify-center w-full'>
                            <div className='border px-3 py-1 rounded-l cursor-pointer'>
                                <BarCode className='text-[#3C96EE]' />
                            </div>
                            <div className='relative border-y text-black w-full'>
                                <input type='text' placeholder={nameee} value={searchItem} onChange={SearchProduct} className='p-1.5 rounded focus:outline-none w-full font-thin' />
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
                        <thead class="text-xs text-gray-900 dark:text-gray-400">
                            <tr className='border-b border-black text-[16px]'>
                                <th scope="col" className="pr-6 py-2 font-thin">Serial</th>
                                <th scope="col" className="px-4 py-2 text-center font-thin">Item name</th>
                                <th scope="col" className="px-4 py-2 text-center font-thin">Qty</th>
                                <th scope="col" className="pl-4 py-2 text-right font-thin">M.R.P</th>
                                <th scope="col" className="pl-4 py-2 text-right font-thin ">Discount</th>
                                <th scope="col" className="pl-4 py-2 text-right font-thin">Sale Price</th>
                                <th scope="col" className="pl-4 py-2 text-right font-thin">Total price</th>
                                <th scope="col" className="pl-4 py-2 text-right font-thin">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData?.map((item) => {
                                return <WholeSaleCard item={item} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <h1 className='pb-2 font-thin'>Payment</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={paytype} onSelect={() => { }} label={"Payment Type"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                        <div>
                            <InputComponent placeholder={total} label={'Amount'} readOnly={true} className={`font-thin`} />
                        </div>
                        <div>
                            <InputComponent placeholder={due} label={'Previous due'} readOnly={true} className={`font-thin`} />
                        </div>
                        <div>
                            <InputComponent placeholder={"Enter amount"} onChange={(e) => { setPay(parseInt(e)) }} label={'Pay amount'} className={`font-thin`} />
                        </div>
                        <div>
                            <InputComponent label={'Payment Note'} placeholder={`Enter note`} onChange={(v) => { }} className={`font-thin`} />
                        </div>
                    </div>
                </div>
                <div className='p-4 border-t'>
                    <Button onClick={Order} name={'Submit'} />
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
                        value={data?.qty}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setAllData([...allData, data]);
                                setData({});
                                setShow(false);
                                setSearchItem('')
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
                        onChange={(e) => setData({ ...data, comn: e.target.value })}
                        value={data?.comn}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setAllData([...allData, data]);
                                setData({});
                                setShow(false);
                                setSearchItem('')
                                // setQty(0)
                            }
                        }}
                        placeholder={""}
                    />
                </div>
                <div className='flex justify-end items-center pt-1'>
                    <MiniButton name={`Done`} onClick={() => { setAllData([...allData, data]); setData({}); setShow(false); setSearchItem('') }} />
                </div>
            </Modal>
        </div>
    );
}

export default WholeSell;