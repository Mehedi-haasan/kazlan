import { useState } from "react"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant';
import Remove from "../../icons/Remove";
import SelectionComponent from "../Input/SelectionComponent";
import Button from "../Input/Button";
import Updown from "../../icons/Updown";

const Category = ({ category }) => {

    const [image_url, setImage_Url] = useState();
    const [values, setValues] = useState({ name: "", });
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
        <div className="px-2 pt-5">

            <div>
                <Modal show={show} handleClose={() => { setShow(false) }} size="500px" className="">
                    <div className="pt-1">
                        <InputComponent placeholder={`Enter Category name`} label={`Category name`} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg' />
                        <div className="pt-1">
                            <h1 className="py-1 font-semibold">Select image</h1>
                            <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                        </div>
                        <Button isDisable={false} name="Create" onClick={handleUpload} className="mt-3 border bg-blue-500 text-white" />
                    </div>
                </Modal>
            </div>
            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Category List</h1>
                <Button name={'Create Category'} onClick={()=>setShow(true)}/>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <h1 className="mt-2">Entries </h1>
                        <SelectionComponent options={[]} />
                    </div>
                    <div className="flex justify-start items-center gap-1.5 mt-5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name" className="focus:outline-none border rounded p-1.5 " />
                    </div>
                </div>
                <div className="pt-3">
                    <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr className='border'>
                                <th className="w-4 py-2 px-4 border-r">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 border-r ">
                                    <div className="flex justify-between items-center">
                                        Name
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Item Code
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Image
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        status
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="pl-4 pr-1 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                category?.map((item) => (
                                    <tr className='border-b'>
                                        <th className="w-4 py-2 px-4 border-x">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-2 border-r">{item?.name}</th>
                                        <th scope="col" className="px-2 py-2 border-r">#{item?.id}</th>
                                        <th scope="col" className="px-2 py-2 border-r">
                                            <img src={item?.image_url} alt={item?.image_url} className="h-10 w-10 rounded" />
                                        </th>
                                        <th scope="col" className="px-2 py-2 border-r">Active</th>
                                        <th scope="col" className="px-2 py-2 flex justify-end items-center border-r"><Remove /></th>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1>Showing 1 to 3 of 3 entries</h1>
                    <div>
                        <button className="border-y border-l rounded-l py-1.5 px-3 bg-blue-50">Prev</button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">1</button>
                        <button className="border-y border-r rounded-r py-1.5 px-3 bg-blue-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category