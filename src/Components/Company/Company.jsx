import React, { useEffect, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';
import BaseUrl from '../../Constant'
import logo from '../Logo/userProfile.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Company = () => {

    const [values, setValues] = useState({})
    const [companyInfo, setCompanyInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {
        document.title = `Company info - Kazaland Brothers`;
    }, []);

    const PostInfo = async (image_url) => {
        setIsLoading(true)
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
        toast(data?.message)
        setIsLoading(false)
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
        // GetCompInfo(compId)
    }, [])


    const handleUpload = async () => {
        setIsLoading(true)
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
            setIsLoading(false)
            if (data) {
                PostInfo(data.image_url)
            }
        } catch (error) {
            setIsLoading(false)
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
        <div className='px-3 py-5 min-h-screen pb-12 text-[#32393f]'>
            <ToastContainer />
            <div className='bg-[#FFFFFF] rounded shadow w-[50%]'>
                <div className='border-b px-5'>
                    <h1 className='py-3 text-2xl text-[#32393f]'>Warehouse Details</h1>
                </div>

                <div className="flex justify-start items-center gap-5 pb-2 px-5 pt-2">
                    <div>
                        <p className='pb-2 font-thin'>Shop Logo</p>
                        <img src={imageFile ? imageFile : logo} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-red-500 p-1" />
                    </div>
                    <div>
                        <div className='flex justify-start items-center gap-2 pt-10'>
                            <div className='border rounded-lg px-4 py-1'>
                                <label>
                                    <h1 className="font-semibold pt-1 pb-2">Browse</h1>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className='border rounded-lg px-4 py-1.5'>
                                <h1 className="font-semibold py-1">Reset</h1>
                            </div>

                        </div>
                        <p className='font-thin py-1 text-sm'>Allowed JPG, GIF or PNG. Max size of 1MB</p>
                    </div>
                </div>
                <div className='px-5'>
                    <InputComponent onChange={(e) => { setValues({ ...values, name: e }) }} label={'Warehouse Name'} placeholder={values?.name || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, description: e }) }} label={'Description'} placeholder={values?.description || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, email: e }) }} label={'Email'} placeholder={values?.email || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, phone: e }) }} label={'Phone*'} placeholder={values?.phone || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, address: e }) }} label={'Address'} placeholder={values?.address || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, shopcode: e }) }} label={'Shop Code*'} placeholder={values?.shopcode || 'N/A'} className={`text-[#32393f] font-thin`} />
                    {/* <InputComponent onChange={(e) => { setValues({ ...values, shopcode: e }) }} label={' Sale Prefix'} placeholder={values?.shopcode || 'N/A'} className={`text-[#32393f] font-thin`} /> */}
                    {/* <InputComponent onChange={(e) => { setValues({ ...values, footertext: e }) }} label={'Footer Text'} placeholder={values?.footertext || 'N/A'} className={`text-[#32393f] font-thin`} /> */}
                    <Button onClick={handleUpload} name={'Create'} />
                </div>
            </div>
        </div>
    );
};

export default Company;