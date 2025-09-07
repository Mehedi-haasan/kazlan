import { useState, useEffect, useRef } from "react"
import InputComponent from "../Input/InputComponent"
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Notification from "../Input/Notification";
import logo from '../Logo/photo.png'
import { useNavigate, useParams } from "react-router-dom";


const UpdateBrand = () => {

    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: "", });
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const goto = useNavigate()
    const params = useParams()
    const input_name = useRef(null);

    useEffect(() => {
        input_name.current?.focus();
    }, []);

    const GetSingleBrand = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/get/single/brand/${params?.id}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            setValues(data?.items)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    useEffect(() => {
        document.title = `Brand Update - Kazaland Brothers`;
        GetSingleBrand()
    }, []);


    const handleUpdate = async (image_url) => {
        values.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/brand`, {
                method: 'PATCH',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            setMessage({ id: Date.now(), mgs: data?.message });
            goto('/brand')
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
                handleUpdate(data.image_url, values?.image_url, values?.id)
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
        <div className="px-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="pt-1 bg-[#FFFFFF] shadow-lg rounded-lg w-full">
                <div className="border-b">
                    <h1 className="pl-5 text-xl py-2">Brand Update Details</h1>
                </div>
                <div className="flex justify-start items-center gap-5 px-6 pt-5">
                    <div>
                        <p className='pb-2 font-thin'>Brand Picture</p>
                        <img src={values?.image_url ? values?.image_url : logo} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-red-500 p-1" />
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
                <div className="px-6 py-4">
                    {/* <InputComponent placeholder={values?.name} input_focus={true} handleEnter={() => { image_url ? handleUpload() : handleUpdate("") }} value={values?.name} label={`Brand name`} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' /> */}


                    <div className=''>
                        <h1 className='text-[15px] pb-1.5'>Brand name</h1>
                        <input
                            type="text"
                            ref={input_name}
                            value={values?.name}
                            placeholder="Enter Brand name"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"

                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    image_url ? handleUpload() : handleUpdate("")
                                } else if (e.key === "Escape") { }
                            }}
                        />

                    </div>

                    <Button isDisable={isLoading} name="Update" onClick={() => { image_url ? handleUpload() : handleUpdate("") }} className="mt-3 border bg-blue-500 text-white" />
                </div>
            </div>
        </div>
    )
}

export default UpdateBrand