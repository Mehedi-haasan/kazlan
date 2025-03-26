import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent'
import BaseUrl from '../../Constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreactProduct = ({ handleClose, callAgain }) => {

    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState([]);
    const [supplier, setSupplier] = useState([])
    const [brand, setBrand] = useState([])
    const [value, setValue] = useState('')
    const [values, setValues] = useState({
        categoryId: 1,
        brandId: 1,
        qty: 0,
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



    useEffect(() => {
        document.title = "Items - KazalandBrothers";
        getCategory()
        getBrand()
        GetSupplier()
    }, []);



    const handleCreate = async (image_url) => {

        values.image_url = image_url;
        values.description = value;
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
            toast(data?.message)
            handleClose(false);
            callAgain()
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }



    const handleUpload = async () => {
        const formData = new FormData();
        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            console.error("Image file is missing in the payload");
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
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };

    return (
        <div className='min-h-screen'>
            <ToastContainer />
            <div className=''>
                <h1 className='text-3xl font-semibold text-center py-5'>Item Create</h1>

                <div className='max-w-[600px] mx-auto border border-[#c71f66] rounded-lg p-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
                        <div className="">
                            {imageFile ? (
                                <label className="cursor-pointer">
                                    <h1 className="font-semibold pt-1 pb-2">Selected Picture</h1>
                                    <img src={imageFile} alt="Preview" className="w-full h-24 object-cover rounded-lg border border-red-500 p-1" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            ) : (
                                <div>
                                    <h1 className="font-semibold py-1">Select your item Picture</h1>
                                    <input
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        type="file"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <InputComponent onChange={(e) => setValues({ ...values, qty: e })} label={"Quantity"} placeholder={"Quantity"} type={"number"} isRequered={""} />
                        </div>

                        <InputComponent onChange={(e) => setValues({ ...values, name: e })} label={"Item Name"} placeholder={"Item Name"} type={""} isRequered={""} />
                        <SelectionComponent options={supplier} onSelect={(e) => setValues({ ...values, supplier: e?.name })} label={"Supplier"} />
                        <InputComponent onChange={(e) => setValues({ ...values, cost: e })} label={"Cost Price"} placeholder={"Cost Price"} type={"number"} isRequered={""} />
                        <InputComponent onChange={(e) => setValues({ ...values, price: e })} label={"Sell Price"} placeholder={"Sell Price"} type={"number"} isRequered={""} />
                        <SelectionComponent options={brand} onSelect={(e) => setValues({ ...values, brandId: e?.id })} label={"Item Brand"} />
                        <SelectionComponent options={category} onSelect={(e) => setValues({ ...values, categoryId: e?.id })} label={"Item Category"} />
                        <div className='my-2 grid col-span-2'>
                            <h1 className='font-semibold py-1'>Description</h1>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                    </div>
                    <div className=''>
                        <Button onClick={handleUpload} isDisable={false} name={"Create"} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreactProduct;