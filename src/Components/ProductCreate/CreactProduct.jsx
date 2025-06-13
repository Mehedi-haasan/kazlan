import React, { useState, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent'
import BaseUrl from '../../Constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Add from '../../icons/Add';
import logo from '../Logo/photo.png'
import ImageSelect from '../Input/ImageSelect'


const CreactProduct = ({ handleClose, callAgain, info = {} }) => {
    const goto = useNavigate()

    const input_name = useRef(null);
    const edit = useRef(null)
    const desc = useRef(null)
    const mrp = useRef(null)
    const sale = useRef(null)
    const dis = useRef(null)
    const qt = useRef(null)
    useEffect(() => {
        input_name.current?.focus();
    }, []);


    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [category, setCategory] = useState([]);
    const [image_url, setImage_Url] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [shop, setShop] = useState([])
    const [supplier, setSupplier] = useState([])
    const [brand, setBrand] = useState([])

    const [active, setActive] = useState("Pricing")
    const [values, setValues] = useState({
        categoryId: 1,
        compId: 1,
        brandId: 1,
        image_url: "",
        qty: 0,
        qty_type: '',
        discount: 0,
        discount_type: "Percentage",
        product_type: "Physical",
        description: '',
        year: '2026',
        edition: ''
    })


    const getCategory = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/category`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setCategory(data.items);
        setValues({ ...values, categoryId: data?.items[0]?.id })
    }


    const getBrand = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/brand`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setBrand(data.items);
        setValues({ ...values, brandId: data?.items[0]?.id })
    }

    const GetSupplier = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/suppliers/${1}/${100}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        setSupplier(data?.items);
        setValues({ ...values, supplier: data?.items[0]?.name })
    }

    const FetchShop = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/shop/list/with/info/${1}/${20}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        });
        const data = await response.json();
        setShop(data?.items)
    }


    useEffect(() => {
        document.title = "Items - KazalandBrothers";
        FetchShop()
        getCategory()
        getBrand()
        GetSupplier()
    }, []);

    const anotherFunction = () => {
        setIsLoading(false);
        goto('/items')
    }


    const handleCreate = async (image_url) => {

        if (!values?.name || !values?.supplier || !values?.cost || !values?.price) {
            toast("Required field is missing");
            return;
        }
        values.image_url = image_url;
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/product`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setIsLoading(false)
            toast(data?.message)
            anotherFunction();
            handleClose(false);
            callAgain()
            goto('/items')
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    const handleUpload = async () => {

        if (!values?.name || !values?.supplier || !values?.cost || !values?.price || !values?.qty) {
            toast("Required field is missing");
            return;
        }
        const formData = new FormData();
        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            toast("Image file is missing in the payload");
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/upload/image`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                },
                body: formData,
            });

            const data = await response.json();
            if (data) {
                handleCreate(data.image_url)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        setIsLoading(false)
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        qt.current.focus()
    }, [active])


    return (
        <div className='min-h-screen pb-12 p-6 relative'>
            <ToastContainer />
            <div className='shadow-lg bg-[#FFFFFF] rounded-xl'>
                <div className='border-b px-5'>
                    <h1 className='text-2xl font-semibold  py-5'>Item Details</h1>
                </div>

                <div className='w-full mx-auto rounded-lg p-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
                        <div>


                            <div className='flex justify-start items-center w-full'>
                                <div className='w-[55%]'>
                                    <h1 className='text-[15px] pb-1.5'>Item Name</h1>
                                    <input
                                        type="text"
                                        ref={input_name}
                                        value={values?.name}
                                        placeholder="Enter item name"
                                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                                        className="px-2 pt-[8px] pb-[7px] text-[#6B7280] focus:outline-none rounded-l font-thin border-y border-x w-full"

                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                edit.current.focus()
                                            } else if (e.key === "Escape") { }
                                        }}
                                    />

                                </div>

                                <div className='w-[45%]'>
                                    <h1 className='text-[15px] pb-1.5'>Edition</h1>
                                    <input
                                        type="text"
                                        ref={edit}
                                        value={values?.edition}
                                        placeholder="Enter edition"
                                        onChange={(e) => setValues({ ...values, edition: e.target.value })}
                                        className="px-2 pt-[7px] pb-[8px] text-[#6B7280] focus:outline-none rounded-r font-thin border-y border-r w-full"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                setFirst(true)
                                            } else if (e.key === "Escape") { }
                                        }}
                                    />

                                </div>
                            </div>


                        </div>

                        <div className='flex justify-start items-end pb-1 z-40'>
                            <SelectionComponent options={brand} default_select={first} onSelect={(v) => { setFirst(false); setSecond(true); setValues({ ...values, brandId: v?.id }) }} label={"Brand / Publishers*"} className='rounded-l' />
                            <div onClick={() => goto(`/brand`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>

                        <div className='flex justify-start items-end pb-1 '>
                            <SelectionComponent options={category} default_select={second} onSelect={(v) => { setSecond(false); setThird(true); setValues({ ...values, categoryId: v?.id }) }} label={"Category*"} className='rounded-l' />
                            <div onClick={() => goto(`/category`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>


                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={supplier} default_select={third} onSelect={(v) => { desc.current?.focus(); setValues({ ...values, supplier: v?.name }) }} label={"Supplier*"} className='rounded-l' />
                            <div onClick={() => goto(`/create/supplier`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                        <div className='my-2 grid col-span-1 pb-2'>
                            <div>
                                <h1 className="py-1">Description</h1>
                                <textarea placeholder="Enter your note" ref={desc} value={values?.description}
                                    onChange={(e) => { setValues({ ...values, description: e?.target?.value }) }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            mrp.current?.focus();
                                        }
                                    }}
                                    className="font-thin focus:outline-none border p-1.5 w-full rounded" />
                            </div>
                        </div>

                        <div className='pt-1'>
                            <div className="p-3">
                                <div className="flex justify-start items-end">
                                    <button onClick={() => { setActive("Pricing") }} className={`${active === "Pricing" ? "border-x border-t border-green-500 text-green-500" : "border-b text-blue-500"} px-4 py-1.5 rounded-t flex justify-start items-start font-thin`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M18.09 10.5V9h-8.5V4.5A1.5 1.5 0 0 0 8.09 3a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 8.09 6v3h-3v1.5h3v6.2c0 2.36 1.91 4.27 4.25 4.3c2.34-.04 4.2-1.96 4.16-4.3c0-1.59-.75-3.09-2-4.08a4 4 0 0 0-.7-.47c-.22-.1-.46-.15-.7-.15c-.71 0-1.36.39-1.71 1c-.19.3-.29.65-.29 1c.01 1.1.9 2 2.01 2c.62 0 1.2-.31 1.58-.8c.21.47.31.98.31 1.5c.04 1.5-1.14 2.75-2.66 2.8c-1.53 0-2.76-1.27-2.75-2.8v-6.2z" />
                                        </svg>
                                        Pricing
                                    </button>
                                    <button onClick={() => { setActive("Stock") }} className={`${active === "Stock" ? "border-x border-t border-green-500 text-green-500" : "border-b text-blue-500"} px-4 py-1.5 rounded-t flex justify-start items-center gap-1 font-thin`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 8h18v9q0 1.25-.875 2.125T18 20H6q-1.25 0-2.125-.875T3 17zm2 2v7q0 .425.288.713T6 18h12q.425 0 .713-.288T19 17v-7zM3 7V5h6V4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4v1h6v2zm9 7" /></svg>
                                        Stock</button>
                                    <button onClick={() => { setActive("Image") }} className={`${active === "Image" ? "border-x border-t border-green-500 text-green-600" : "border-b text-blue-500"} px-4 py-1.5 rounded-t flex justify-start items-center gap-1 font-thin`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4z" /><path fill="currentColor" d="m8 11l-3 4h11l-4-6l-3 4z" /><path fill="currentColor" d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" /></svg>
                                        Image</button>
                                    <div className="border-b w-full"></div>
                                </div>
                            </div>

                            <div className='h-[120px]'>
                                {
                                    active === "Pricing" && <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <InputComponent label={"M.R.P*"} input_focus={mrp} placeholder={'Enter M.R.P'} type={'number'} handleEnter={(e) => { sale.current.focus() }} isRequered={true} value={values?.cost} onChange={(v) => { setValues({ ...values, cost: v, cost: v }) }} />
                                        <InputComponent label={"Sale Price"} input_focus={sale} placeholder={'Enter sale price'} type={'number'} handleEnter={(e) => { dis.current.focus() }} isRequered={true} value={values?.price} onChange={(v) => { setValues({ ...values, price: v }) }} />
                                        <div>
                                            <p className='pb-2 pt-1 font-semibold text-[15px]'>Discount on Sale</p>
                                            <div className='flex justify-start items-end pb-1'>
                                                <input type='number' ref={dis} onChange={(e) => { setValues({ ...values, discount: e.target.value }) }}
                                                    onKeyDown={(e) => { if (e.key === "Enter") { setActive("Stock"); qt.current.focus() } }}
                                                    placeholder={values?.discount} className='border-y border-l px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[50%]' />
                                                <select value={values?.discount_type} onChange={(v) => { setValues({ ...values, discount_type: v.target.value }) }}
                                                    className={`border text-[#6B7280] w-[50%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                                >
                                                    {[{ id: 1, name: "Percentage" }, { id: 2, name: "Fixed" }].map(({ id, name }) => (
                                                        <option key={id} value={name} className='text-[#6B7280]'>{name}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className={`${active === "Stock" ? '' : 'hidden'} p-3 grid grid-cols-1 lg:grid-cols-2 gap-4`}>
                                    {
                                        info?.role === "superadmin" && <div className='flex justify-start items-end pb-1'>
                                            <SelectionComponent options={shop} onSelect={(v) => { setValues({ ...values, supplier: v?.name }) }} label={"Warehouse Stock*"} className='rounded-l' />
                                            <div className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                                <Add />
                                            </div>
                                        </div>
                                    }

                                    <div>
                                        <p className='pb-2 font-semibold text-sm'>Quantity</p>
                                        <div className='flex justify-start items-end pb-1'>
                                            <input type='number' ref={qt} placeholder={values?.qty}
                                                onChange={(e) => { setValues({ ...values, qty: e.target.value }) }}
                                                onKeyDown={(e) => { if (e.key === "Enter") { handleCreate('') } }}
                                                className='border-y border-l font-thin focus:outline-none rounded-l px-2 pt-[6px] pb-[5px] w-[200px]' />
                                            <select value={values?.qty_type} onChange={(e) => { setValues({ ...values, qty_type: e.target.value }) }}
                                                className={`border text-[#6B7280] w-full text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                                {[{ id: 1, name: "None" }, { id: 2, name: "Pcs" }, { id: 3, name: "Kgs" }, { id: 4, name: "Bgs" }, { id: 5, name: "Bottol" }].map(({ id, name }) => (
                                                    <option key={id} value={name} className='text-[#6B7280]'>{name}</option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                </div>


                                {
                                    active === "Image" && <div className=" grid grid-cols-1 gap-4">
                                        <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                                    </div>
                                }

                            </div>
                        </div>

                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <Button onClick={() => { image_url == null ? handleCreate('') : handleUpload() }} isDisable={isLoading} name={isLoading ? 'Creating' : 'Create'} />
                        <button onClick={() => { goto('/items') }} className='bg-gray-100 rounded-md px-5 py-2 font-thin hover:bg-gray-300'>Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreactProduct;