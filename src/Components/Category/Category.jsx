import { useState, useEffect } from "react"
import Button from "../Input/Button"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant';
import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";

const Category = () => {

    const [image_url, setImage_Url] = useState();
    const [values, setValues] = useState({ name: "", });
    const [category, setCategory] = useState([])
    const [show, setShow] = useState(false)

    const handleCreate = async (image_url) => {

        values.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/category`, {
                method: 'POST',
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

    useEffect(() => {
        const fetchState = async () => {
            const response = await fetch(`${BaseUrl}/api/get/category`);
            const data = await response.json();
            if (data && data?.items?.length > 0) {
                setCategory(data?.items || []);
            }
        }

        fetchState()
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
                handleCreate(data.image_url)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Category</h1>
                <Button isDisable={false} name="Add Category" onClick={() => { setShow(true) }} className="" />
            </div>
            <div>
                <Modal show={show} handleClose={() => { setShow(false) }} size="500px" className="">
                    <div className="pt-1">
                        <InputComponent placeholder={`Enter Category name`} label={`Category name`} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg' />
                        <div className="pt-1">
                            <h1 className="py-1 font-semibold">Select image</h1>
                            <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                        </div>
                        <Button isDisable={false} name="Create" onClick={handleUpload} className="mt-3" />
                    </div>
                </Modal>
            </div>

            <div className="">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='shadow'>
                            <th scope="col" className="pl-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="pl-1 py-3 text-left">
                                Id
                            </th>
                            <th scope="col" className="pl-1 py-3 text-left">
                                Category name
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Category image
                            </th>
                            <th scope="col" className="px-4 py-3 text-right pr-5">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category?.map((cate) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cate?.id}
                                    </th>
                                    <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cate?.name}
                                    </th>
                                    <td className="px-4 py-4">
                                        <img src={cate?.image_url} alt="category" className="h-12 w-12 rounded"/>
                                    </td>
                                    <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">
                                        <Edit size='25px' />
                                        <Remove size='25px' />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Category