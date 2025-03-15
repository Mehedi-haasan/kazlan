import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import Modal from "../Input/Modal";
import { useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";


const WarehouseCard = ({ item, i }) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [image_url, setImage_Url] = useState();
    const [values, setValues] = useState({ name: item?.name, });

    const handleUpdate = async (image_url, url, id) => {

        values.image_url = image_url;
        values.url = url;
        values.id = id;
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
            setShow(false)
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
                handleUpdate(data.image_url, item?.image_url, item?.id)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/category`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ id: item?.id, url: item?.image_url }),
        });
        const data = await response.json();
        alert(data?.message)
    }

    return (

        <tr className={`border-b ${i % 2 === 0 ? 'bg-gray-200':''}`}>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-2 py-2 border-r">{item?.first_name}</th>
            <th scope="col" className="px-2 py-2 border-r">{item?.count}</th>
            <th scope="col" className="px-2 py-2 border-r"> {item?.TotalCost}</th>
            <th scope="col" className="px-2 py-2 border-r">{item?.TotalCost}</th>
            <th scope="col" className="px-2 py-2 border-r"> {item?.TotalWorth}</th>
            <th scope="col" className="px-2 py-2 border-r"> {item?.TotalWorth - item?.TotalCost}</th>
            <th scope="col" className="px-2 py-2 border-r">Admin</th>
            <th scope="col" className="px-2 py-2 flex justify-end items-center border-r">
                <Edit size='25px' onClick={() => { setEdit(true) }} />
                <Remove size='25px' onClick={() => { setShow(true) }} />
                <Modal show={show} handleClose={() => { setShow(false) }} size="350px" className="">
                    <h1 className="font-semibold text-lg py-2 text-black">Are you sure you want to delete?</h1>
                    <div className="flex justify-between items-center pb-6 pt-4">
                        <button onClick={() => { setShow(false) }} className="border px-3 py-1 rounded border-blue-500 text-blue-500">No</button>
                        <button onClick={handleDelete} className="border px-3 py-1 rounded border-red-500 text-red-500">Yes</button>
                    </div>
                </Modal>

                <Modal show={edit} handleClose={() => { setEdit(false) }} size="450px" className="w-[450px]">
                    <div className="pt-1">
                        <InputComponent placeholder={values?.name} label={"Enter Category name"} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg' />
                        <div className="pt-1">
                            <h1 className="py-1 font-semibold">Select image</h1>
                            <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                        </div>
                        <Button isDisable={false} name="Update" onClick={() => { image_url ? handleUpload() : handleUpdate(item?.image_url, "", item?.id) }} className="mt-3 border bg-blue-500 text-white" />
                    </div>
                </Modal>
            </th>
        </tr>
    )
}

export default WarehouseCard