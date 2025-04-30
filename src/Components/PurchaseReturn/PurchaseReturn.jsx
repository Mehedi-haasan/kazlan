import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import { useToImage } from '@hcorta/react-to-image'
import SelectionComponent from '../Input/SelectionComponent';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import BarCode from '../../icons/BarCode';
import Search from '../../icons/Search';
import PurchaseProductCard from '../PurchaseProduct/PurchaseProductCard';
import RightArrow from '../../icons/RightArrow';
import MiniButton from '../Input/MiniButton';
import Modal from '../Input/Modal';
import Button from '../Input/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormattedDate } from '../Input/Time';



const PruchaseReturn = ({ shop = [], paytype = [] }) => {

    const [data, setData] = useState({});
    const [due, setDue] = useState(0)
    const [total, setTotal] = useState(0)
    const [userId, setUserId] = useState(null)
    const [allData, setAllData] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [show, setShow] = useState(false);
    const [supplier, setSupplier] = useState([]);
    const [searchItem, setSearchItem] = useState('')

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




    const PurchaseReturn = async () => {
        if (!userId) {
            toast("Please Select Supplier first");
            return
        }
        const token = localStorage.getItem('token');
        let orderData = [];
        allData?.map((v) => orderData.push({ "id": v?.id, "qty": v?.qty }))
        try {
            const response = await fetch(`${BaseUrl}/api/return/purchase`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    data: orderData,
                    userId: userId,
                    total: total
                }),
            });

            const data = await response.json();
            toast(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
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
        document.title = "Purchase Return - KazalandBrothers";
        GetSupplier()

    }, [])


    useEffect(() => {
        let amount = allData?.reduce((acc, item) => {
            return acc + (parseInt(item?.qty) * parseInt(item?.price))
        }, 0);

        setTotal(parseInt(amount));
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
        const updatedData = allData.map(item =>
            item.id === id ? { ...item, discount } : item
        );
        setAllData(updatedData);
    };


    return (
        <div className="min-h-screen pb-12 pl-4 pt-5 pr-2">
            <ToastContainer />
            <div className='flex justify-start items-center gap-2 p-3'>
                <h1>Home</h1><RightArrow /><h1>Purchase Return</h1>
            </div>


            <div className='bg-[#FFFFFF]'>
                <div className='border-b p-4'>
                    <h1>Sale Details</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4'>
                    <div className='flex justify-start items-end pb-1'>
                        <SelectionComponent options={supplier} onSelect={(v) => { fetchUserDue(v?.id); setUserId(v?.id) }} label={"Supplair"} className='rounded-l' />
                        <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                            <Add />
                        </div>
                    </div>
                    <div>
                        <InputComponent placeholder={getFormattedDate()} label={'Date'} />
                    </div>
                    <div>
                        <InputComponent placeholder={'Shop1/111'} label={'Sale Code'} />
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
                            <div className='border px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>



                <div className='p-4 w-full overflow-hidden overflow-x-auto'>
                    <table class="min-w-[800px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-sm text-gray-900  dark:text-gray-400">
                            <tr className='border-b border-gray-400 text-[16px]'>
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
                                return <PurchaseProductCard item={item} changeqty={ChangeQty} changedis={ChangeDiscount} changeprice={ChangePrice} onClick={() => { }} />
                            })}
                        </tbody>
                    </table>
                </div>

                <div className='p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div>
                            <InputComponent label={'Balance'} placeholder={due} />
                        </div>
                        <div>
                            <InputComponent label={'Amount'} placeholder={total} />
                        </div>
                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={paytype} onSelect={() => { }} label={"Payment Type"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE]'>
                                <Add />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-4 '>
                    <Button name={'Submit'} onClick={PurchaseReturn} />
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
                <div className='flex justify-end items-center pt-1'>
                    <MiniButton name={`Done`} onClick={() => { setAllData([...allData, data]); setData([]); setShow(false); }} />
                </div>
            </Modal>
        </div>
    );
}

export default PruchaseReturn;