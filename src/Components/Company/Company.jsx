import React, { useEffect, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';
import BaseUrl from '../../Constant'

const Company = () => {

    const [values, setValues] = useState({})
    const [companyInfo, setCompanyInfo] = useState({})
    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {
        document.title = `Company info - Kazaland Brothers`;
    }, []);

    const PostInfo = async (image_url) => {
        values.image_url = image_url;
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/create/company/info`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
    }

    const GetCompInfo = async (compId) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${BaseUrl}/api/get/company/info/${compId}`, {
            method: "GET",
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        const data = await response.json();
        setValues(data?.items)
    }


    useEffect(() => {
        const compId = localStorage.getItem('compId')
        GetCompInfo(compId)
    }, [])


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
                PostInfo(data.image_url)
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
        <div className='px-3 py-5 min-h-screen text-[#32393f]'>
            <div className='bg-[#FFFFFF] rounded shadow w-[50%]'>
                <div className='border-b px-5'>
                    <h1 className='py-3 text-2xl text-[#32393f]'>Warehouse Details</h1>
                </div>
                <div className="pb-2 px-5 pt-2">
                    {imageFile ? (
                        <label className="cursor-pointer">
                            <h1 className="font-thin pt-1 pb-2">Selected Picture</h1>
                            <img src={imageFile} alt="Preview" className="w-full h-24 object-cover rounded-lg border border-red-500 p-1" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden font-thin"
                            />
                        </label>
                    ) : (
                        <div>
                            <h1 className="py-1 font-thin">Select your Warehouse logo</h1>
                            <input className='font-thin'
                                accept="image/*"
                                onChange={handleImageChange}
                                type="file"
                            />
                        </div>
                    )}
                </div>
                <div className='px-5'>
                    <InputComponent onChange={(e) => { setValues({ ...values, name: e }) }} label={'Warehouse Name'} placeholder={values?.name || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, description: e }) }} label={'Description'} placeholder={values?.description || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, email: e }) }} label={'Email'} placeholder={values?.email || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, phone: e }) }} label={'Phone'} placeholder={values?.phone || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, address: e }) }} label={'Address'} placeholder={values?.address || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, footertext: e }) }} label={'Footer Text'} placeholder={values?.footertext || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <Button onClick={handleUpload} name={'Create'} />
                </div>
            </div>
        </div>
    );
};

export default Company;