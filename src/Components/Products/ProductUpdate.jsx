import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button';
import BaseUrl from '../../Constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import ImageSelect from '../Input/ImageSelect'

const ProductUpdate = () => {
    const params = useParams()
    const [image_url, setImage_Url] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [value, setValue] = useState('')
    const [active, setActive] = useState("Pricing")
    const [values, setValues] = useState({})


    const GetProduct = async () => {
        const res = await fetch(`${BaseUrl}/api/get/product/search/${params?.id}`);
        const data = await res.json()
        setValues(data?.items)
    }



    useEffect(() => {
        document.title = "Items - KazalandBrothers";
        GetProduct()
    }, []);



    const handleupdateProduct = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/single/product`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            toast(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };



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
                        <InputComponent onChange={(e) => setValues({ ...values, name: e })} label={"Item Name*"} isRequered={true} value={values?.name} placeholder={values?.name} type={""} className={``} />

                        <InputComponent onChange={(e) => { }} label={"Brand / Publishers*"} value={values?.brand?.name} placeholder={values?.brand?.name} readOnly={true} />

                        <InputComponent onChange={(e) => { }} label={"Category*"} value={values?.category?.name} placeholder={values?.category?.name} readOnly={true} />

                        <InputComponent onChange={(e) => { }} label={"Supplier*"} isRequered={true} placeholder={values?.compId} readOnly={true} />

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
                                        <InputComponent label={"M.R.P*"} value={values?.cost} placeholder={values?.cost} type={'number'} isRequered={true} onChange={(v) => { setValues({ ...values, cost: v }) }} />
                                        <InputComponent label={"Sale Price*"} value={values?.price} placeholder={values?.price} type={'number'} isRequered={true} onChange={(v) => { setValues({ ...values, price: v }) }} />
                                        <div>
                                            <p className='pb-2 pt-2 font-semibold text-sm'>Discount on Sale</p>
                                            <div className='flex justify-start items-end pb-1'>
                                                <input type='number' value={values?.discount} placeholder={values?.discount} onChange={(e) => { setValues({ ...values, discount: e.target.value }) }} className='border-y border-l px-2 focus:outline-none rounded-l  pt-[6px] pb-[5px] w-[50%]' />
                                                <select value={values?.discount_type} onChange={(e) => { setValues({ ...values, discount_type: e.target.value }) }}
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
                                {active === "Stock" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <InputComponent label={"Warehopuse"} value={values?.company?.name} placeholder={values?.company?.name} readOnly={true} onChange={(v) => { setValues({ ...values, price: v }) }} />
                                    <div>
                                        <p className='pb-2 font-semibold text-sm'>Quantity</p>
                                        <div className='flex justify-start items-end pb-1 pt-2'>
                                            <input type='number' value={values?.qty} placeholder={values?.qty} className='border-y border-l focus:outline-none rounded-l px-2 pt-[6px] pb-[5px] w-[200px]' />
                                            <select value={values?.qty_type} onChange={(e) => { setValues({ ...values, qty_type: e.target.value }) }} className={`border text-[#6B7280] w-full text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                                                {qt.map(({ id, name }) => (<option key={id} value={name} className='text-[#6B7280]'> {name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                }

                                {active === "Image" && <div className=" grid grid-cols-1 gap-4">
                                    <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={values?.image_url} reset={()=>{setImageFile(null)}}/>
                                </div>
                                }

                            </div>
                        </div>

                    </div>
                    <div className='flex justify-start items-center gap-4'>
                        <Button onClick={handleupdateProduct} isDisable={isLoading} name={"Create"} />
                        <button className='bg-gray-100 rounded-md px-5 py-2 font-thin hover:bg-gray-300'>Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;