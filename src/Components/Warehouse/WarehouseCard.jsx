import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import Modal from "../Input/Modal";
import { useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import Notification from '../Input/Notification'
import DownModal from "../Input/DownModal";
import ImageSelect from "../Input/ImageSelect";
import logo from '../Logo/logu (2).png'


const WarehouseCard = ({ item, i, FetchShop }) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [image_url, setImage_Url] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: item?.name, });
    const [message, setMessage] = useState({ id: '', mgs: '' });

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
            setEdit(false)
            FetchShop()
            setMessage({ id: Date.now(), mgs: data?.message });
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
                handleUpdate(data.image_url, item?.image_url, item?.id)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/company/${item?.id}`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();
        setMessage({ id: Date.now(), mgs: data?.message });
        FetchShop()
        setShow(false)
        setMessage({ id: Date.now(), mgs: data?.message });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        setValues(item)
    }, [item])

    return (

        <tr className={`border-b ${i %2 === 1 ? 'bg-[#FAF9EE]': ''}`}>
            {/* <th className="w-4 py-2 px-4 border-x">

                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th> */}
            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{item?.name}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.count}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]"> {item?.TotalCost}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.TotalCost}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]"> {item?.TotalWorth}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]"> {item?.TotalWorth - item?.TotalCost}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]"> {item?.employee}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2">
                <Notification message={message} />
                <Edit size='22px' onClick={() => { setEdit(true) }} />
                <Remove size='18px' onClick={() => { setShow(true) }} />
                <DownModal show={show} handleClose={() => { setShow(false) }} size="320px" className="">
                    <h1 className="font-semibold text-lg py-2 text-black">Are you sure you want to delete?</h1>
                    <div className="flex justify-between items-center pb-6 pt-4">
                        <button onClick={() => { setShow(false) }} className="border px-3 py-1 rounded border-blue-500 text-blue-500">No</button>
                        <button onClick={handleDelete} className="border px-3 py-1 rounded border-red-500 text-red-500">Yes</button>
                    </div>
                </DownModal>

                <Modal show={edit} handleClose={() => { setEdit(false) }} size="450px" className="w-[650px]">
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
                            <Button isDisable={false} name="Update" onClick={() => { image_url ? handleUpload() : handleUpdate(item?.image_url, "", item?.id) }} className="mt-3 border bg-blue-500 text-white" />
                        </div>
                    </div>
                </Modal>
            </th>
        </tr>
    )
}

export default WarehouseCard