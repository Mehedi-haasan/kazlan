import { useState, useEffect } from "react"
import InputComponent from "../Input/InputComponent"
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Logo/userProfile.png'


const CreateBrand = ({ entries }) => {

    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: "", });
    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        document.title = `Brand - Kazaland Brothers`;

    }, []);

    const handleUpdate = async (image_url) => {
        setIsLoading(true)
        values.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/brand`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setValues({ ...values, name: '' })
            toast(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
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
                handleUpdate(data.image_url)
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


    return (
        <div className="px-2 pt-5 min-h-screen pb-12">
            <ToastContainer />
            <div className="pt-1 bg-[#FFFFFF] shadow-lg rounded-lg w-[50%]">
                <div className="border-b">
                    <h1 className="pl-5 text-xl py-2">Brand Details</h1>
                </div>
                <div className="flex justify-start items-center gap-5 px-6 pt-5">
                    <div>
                        <p className='pb-2 font-thin'>Brand Picture</p>
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
                <div className="px-6 py-4">
                    <InputComponent placeholder={`Enter Category name`} handleEnter={() => { image_url ? handleUpload() : handleUpdate("") }} value={values?.name} label={`Brand name`} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' />
                    <Button isDisable={isLoading} name="Create" onClick={() => { image_url ? handleUpload() : handleUpdate("") }} className="mt-3 border bg-blue-500 text-white" />
                </div>
            </div>
        </div>
    )
}

export default CreateBrand