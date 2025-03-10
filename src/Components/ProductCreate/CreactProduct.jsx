import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent'
import BaseUrl from '../../Constant';


const CreactProduct = ({ handleClose, category }) => {

    const [image_url, setImage_Url] = useState();
    let type = [{ id: 1, name: "Physical" }, { id: 2, name: "Digital" }]
    const [value, setValue] = useState('')
    const [values, setValues] = useState({
        categoryId: 1,
        qty: 0,
        product_type: true,
    })



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
            handleClose(false)
            alert(data?.message)
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



    return (
        <div className=''>
            <div className=''>
                <h1 className='text-3xl font-semibold text-center py-5'>Product Create</h1>

                <div className='max-w-[600px] mx-auto border border-[#c71f66] rounded-lg p-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
                        <div className='mt-3'>
                            <h1 className='font-semibold py-1'>Select your Product Picture</h1>
                            <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                        </div>
                        <div>
                            <InputComponent onChange={(e) => setValues({ ...values, qty: e })} label={"Quantity"} placeholder={"Quantity"} type={"number"} isRequered={""} />
                        </div>

                        <InputComponent onChange={(e) => setValues({ ...values, name: e })} label={"Product Name"} placeholder={"Product Name"} type={""} isRequered={""} />
                        <SelectionComponent options={type} onSelect={(e) => setValues({ ...values, product_type: e?.name })} label={"Product Type"} />
                        <InputComponent onChange={(e) => setValues({ ...values, cost: e })} label={"Cost Price"} placeholder={"Cost Price"} type={"number"} isRequered={""} />
                        <InputComponent onChange={(e) => setValues({ ...values, price: e })} label={"Sell Price"} placeholder={"Sell Price"} type={"number"} isRequered={""} />
                        <InputComponent onChange={(e) => setValues({ ...values, standard_price: e })} label={"Standrard Price"} placeholder={"Standrard Price"} type={"number"} isRequered={""} />
                        <SelectionComponent options={category} onSelect={(e) => setValues({ ...values, category: e?.id })} label={"Product Category"} />
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