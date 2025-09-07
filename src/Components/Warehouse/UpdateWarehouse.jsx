import { useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import ImageSelect from "../Input/ImageSelect";
import logo from '../Logo/logu (2).png'
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../Input/Notification";


const UpdateWarehouse = () => {

    const params = useParams()
    const goto = useNavigate()
    const [image_url, setImage_Url] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: '', });
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });

    const handleUpdate = async (image_url, url, id) => {

        values.image_url = image_url;
        values.url = url;
        values.id = id;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/company/info`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setMessage({ id: Date.now(), mgs: data?.message });
            goto('/warehouses')
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

    const FetchShop = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/company/info/${params?.id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        });
        const data = await response.json();
        setValues(data?.items)
    }


    useEffect(() => {
        document.title = "Update Warehouse - Kazaland Brothers";
        FetchShop()
    }, [])

    return (

        <div className="p-4 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white min-h-screen">
            <Notification message={message} />
            <div className="pt-1">
                <div>
                    <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                </div>
                <div className="pl-6">
                    <InputComponent onChange={(e) => { setValues({ ...values, name: e }) }} label={'Warehouse Name'} value={values?.name} placeholder={values?.name || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, description: e }) }} label={'Description'} value={values?.description} placeholder={values?.description || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, email: e }) }} label={'Email'} value={values?.email} placeholder={values?.email || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, phone: e }) }} label={'Phone*'} value={values?.phone} placeholder={values?.phone || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, address: e }) }} label={'Address'} value={values?.address} placeholder={values?.address || 'N/A'} className={`text-[#32393f] font-thin`} />
                    <InputComponent onChange={(e) => { setValues({ ...values, shopcode: e }) }} label={'Shop Code*'} value={values?.shopcode} placeholder={values?.shopcode || 'N/A'} className={`text-[#32393f] font-thin`} />
                </div>

                <div className="pl-6">
                    <Button isDisable={false} name="Update" onClick={() => { image_url ? handleUpload() : handleUpdate(values?.image_url, "", values?.id) }} className="mt-3 border bg-blue-500 text-white" />
                </div>
            </div>
        </div>
    )
}

export default UpdateWarehouse