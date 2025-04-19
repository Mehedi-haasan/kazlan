import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent'
import BaseUrl from '../../Constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Add from '../../icons/Add';
import Selection from '../Input/Selection';
import logo from '../Logo/userProfile.png'
import ImageSelect from '../Input/ImageSelect'

const CreactProduct = ({ handleClose, callAgain, info = {} }) => {
    const goto = useNavigate()
    const [category, setCategory] = useState([]);
    const [image_url, setImage_Url] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [shop, setShop] = useState([])
    const [supplier, setSupplier] = useState([])
    const [brand, setBrand] = useState([])
    const [value, setValue] = useState('')
    const [active, setActive] = useState("Pricing")
    const [selectedId, setSelectedId] = useState(1)
    const [values, setValues] = useState({
        categoryId: 1,
        compId: 1,
        brandId: 1,
        image_url: "",
        qty: 0,
        discount_type: "Percentage",
        product_type: "Physical",
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



    const handleCreate = async () => {
        values.description = value;
        console.log(values)
        // const token = localStorage.getItem('token');
        // try {
        //     const response = await fetch(`${BaseUrl}/api/create/product`, {
        //         method: 'POST',
        //         headers: {
        //             'authorization': token,
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //         body: JSON.stringify(values),
        //     });

        //     const data = await response.json();
        //     toast(data?.message)
        //     handleClose(false);
        //     callAgain()
        //     goto('/items')
        // } catch (error) {
        //     console.error('Error updating variant:', error);
        // }
    }

    const handleUpload = async () => {
        setIsLoading(true)
        const formData = new FormData();
        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            toast("Image file is missing in the payload");
            setIsLoading(false)
            return;
        }
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

    const handleSelect = () => { }

    let dis = [{
        id: 1,
        name: "Percentage"
    },
    {
        id: 2,
        name: "Fixed"
    }]

    let qt = [{
        id: 1,
        name: "None"
    },
    {
        id: 2,
        name: "Pcs"
    },
    {
        id: 3,
        name: "Kgs"
    },
    {
        id: 4,
        name: "Bgs"
    },
    {
        id: 5,
        name: "Bottol"
    }]

    return (
        <div className='min-h-screen pb-12 p-6'>
            <ToastContainer />
            <div className='shadow-lg bg-[#FFFFFF] rounded-xl'>
                <div className='border-b px-5'>
                    <h1 className='text-2xl font-semibold  py-5'>Item Details</h1>
                </div>

                <div className='w-full mx-auto rounded-lg p-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
                        <InputComponent onChange={(e) => setValues({ ...values, name: e })} label={"Item Name*"} isRequered={true} placeholder={"Enter Item Name"} type={""} className={``} />

                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={brand}  onSelect={(v)=>{}} label={"Brand / Publishers*"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>

                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={category} onSelect={(v)=>{}} label={"Category*"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>


                        <div className='flex justify-start items-end pb-1'>
                            <SelectionComponent options={supplier}  onSelect={(v)=>{}} label={"Supplier*"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                        <div className='my-2 grid col-span-1 pb-2'>
                            <h1 className='py-1 font-semibold text-sm'>Description</h1>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>

                        <div className='pt-1'>
                            <div className="p-3">
                                <div className="flex justify-start items-end">
                                    <button onClick={() => { setActive("Pricing") }} className={`${active === "Pricing" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t flex justify-start items-center gap-1`}>$Pricing</button>
                                    <button onClick={() => { setActive("Stock") }} className={`${active === "Stock" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Stock</button>
                                    <button onClick={() => { setActive("Image") }} className={`${active === "Image" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Image</button>
                                    <div className="border-b w-full"></div>
                                </div>
                            </div>

                            <div>
                                {
                                    active === "Pricing" && <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <InputComponent label={"M.R.P*"} placeholder={'Enter M.R.P'} type={'number'} isRequered={true} onChange={(v) => { setValues({ ...values, cost: v }) }} />
                                        <InputComponent label={"Sale Price*"} placeholder={'Enter sell price'} type={'number'} isRequered={true} onChange={(v) => { setValues({ ...values, price: v }) }} />
                                        <div>
                                            <p className='pb-2 pt-1 font-semibold text-sm'>Discount on Sale</p>
                                            <div className='flex justify-start items-end pb-1'>
                                                <input type='number' onChange={(e) => { setValues({ ...values, dis_amount: e.target.value }) }} placeholder='' className='border-y border-l px-2 focus:outline-none rounded-l  pt-[6px] pb-[5px] w-[50%]' />
                                                <select value={values?.discount_type} onChange={(v) => { setValues({ ...values, discount_type: v.target.value }) }}
                                                    className={`border text-[#6B7280] w-[50%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                                >
                                                    {dis.map(({ id, name }) => (

                                                        <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    active === "Stock" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {
                                            info?.role === "superadmin" && <div>
                                                <Selection options={shop} onSelect={(v) => { setValues({ ...values, compId: v?.id }) }} label={'Warehouse Stock'} />
                                            </div>
                                        }
                                        <div>
                                            <p className='pb-2 font-semibold text-sm'>Quantity</p>
                                            <div className='flex justify-start items-end pb-1'>
                                                <input type='number' placeholder='' className='border-y border-l focus:outline-none rounded-l px-2 pt-[6px] pb-[5px] w-[200px]' />
                                                <select id={selectedId} value={selectedId} onChange={handleSelect}
                                                    className={`border text-[#6B7280] w-full text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                                >
                                                    {qt.map(({ id, name }) => (

                                                        <option key={id} value={id} className='text-[#6B7280]'> {name}</option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                }

                                {
                                    active === "Image" && <div className=" grid grid-cols-1 gap-4">
                                        <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                                    </div>
                                }

                            </div>
                        </div>

                    </div>
                    <div className='flex justify-start items-center gap-4'>
                        <Button onClick={handleCreate} isDisable={false} name={"Create"} />
                        <button className='bg-gray-100 rounded-md px-5 py-2 font-thin hover:bg-gray-300'>Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreactProduct;