import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import Modal from "../Input/Modal";
import DownModal from '../Input/DownModal'
import { useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import logo from '../Logo/userProfile.png'
import ImageSelect from "../Input/ImageSelect";
import groovyWalkAnimation from "../../lotti/Animation - 1745147041767.json";
import { useLottie } from "lottie-react";
import Notification from "../Input/Notification";



const CategoryCard = ({ item, i, isChecked, info = {}, getCategory }) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: item?.name, });
    const [isLoading, setIsLoading] = useState(false)
    const [showlotti, setLottiShow] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const handleUpdate = async (image_url, url, id) => {

        values.image_url = image_url;
        values.url = url;
        values.id = id;
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/category`, {
                method: 'PATCH',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setEdit(false)
            getCategory()
            setLottiShow(true)
            setMessage({ id: Date.now(), mgs: data?.message });
            setIsLoading(false)
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
                handleUpdate(data.image_url, item?.image_url, item?.id);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const handleDelete = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/category`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(item),
        });
        const data = await response.json();
        setIsLoading(false);
        setShow(false)
        getCategory();
        setLottiShow(true)
        setMessage({ id: Date.now(), mgs: data?.message });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };

    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        style: {
            width: 200,
            height: 200,
        },
    };

    const { View } = useLottie(options);

    return (

        <tr className={`${i % 2 === 0 ? " " : "bg-gray-100"} border-b border-x`}>
            {/* <th className="w-4 py-2 px-4 border-r">
                <div className="flex items-center">
                    <Notification message={message} />
                    <Modal show={showlotti} handleClose={() => { setLottiShow(false); }} size={`250px`}>
                        <>{View}</>
                    </Modal>
                    <input id="checkbox-table-search-1" type="checkbox" isChecked={isChecked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th> */}
            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{item?.name}
                <Notification message={message} />
                    <Modal show={showlotti} handleClose={() => { setLottiShow(false); }} size={`250px`}>
                        <>{View}</>
                    </Modal>
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">
                <img src={item?.image_url} alt={item?.image_url} className="h-10 w-10 rounded" />
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
            {info?.role === "superadmin" && <th scope="col" className=" py-3 flex justify-center items-center gap-2">
                <Edit size='20px' onClick={() => { setEdit(true) }} />
                <Remove size='18px' onClick={() => { setShow(true) }} />
                <DownModal show={show} handleClose={() => { setShow(false) }} size="320px" className="">
                    <h1 className="font-semibold text-lg py-2 text-black">Are you sure you want to delete?</h1>
                    <div className="flex justify-between items-center pb-6 pt-4">
                        <button onClick={() => { setShow(false) }} className="border px-3 py-1 rounded border-blue-500 text-blue-500">No</button>
                        <button onClick={handleDelete} disabled={isLoading} className="border px-3 py-1 rounded border-red-500 text-red-500">Yes</button>
                    </div>
                </DownModal>

                <Modal show={edit} handleClose={() => { setEdit(false) }} size={`800px`} className="w-[450px]">
                    <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                        <div className="border-b">
                            <h1 className="pl-5 text-xl py-2">Update Category Details</h1>
                        </div>
                        <div className="pt-5">
                            <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                        </div>
                        <div className="px-6 py-4">
                            <InputComponent placeholder={`Enter Category name`} value={values?.name} label={`Category Name`} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' />
                            <Button isDisable={isLoading} name="Update" onClick={() => { image_url ? handleUpload() : handleUpdate(item.image_url, "", item?.id) }} className="mt-3 border bg-blue-500 text-white" />
                        </div>
                    </div>
                </Modal>
            </th>}
        </tr>
    )
}

export default CategoryCard