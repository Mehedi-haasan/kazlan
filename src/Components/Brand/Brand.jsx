import { useState, useEffect } from "react"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Updown from "../../icons/Updown";
import ShowEntries from "../Input/ShowEntries";
import BrandCard from "./BrandCard";
import Loading from "../../icons/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Brand = ({ brands, entries }) => {

    const [image_url, setImage_Url] = useState();
    const [bran, setBran] = useState([])
    const [values, setValues] = useState({ name: "", });
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)

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
            setShow(false);
            getBrand();
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

    useEffect(() => {
        document.title = `Brands - Kazaland Brothers`;
        getBrand()
    }, [page, pageSize]);



    const getBrand = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/brand/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setBran(data.items)
        setIsLoading(false)
    }


    const SearchBrand = async (e) => {
        e.preventDefault();
        const name = e.target.value
        const token = localStorage.getItem('token')
        if (name) {
            const response = await fetch(`${BaseUrl}/api/get/product/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            // setData(data.items)
        }
    }

    return (
        <div className="px-2 pt-5 min-h-screen">
            <ToastContainer />
            <div>
                <Modal show={show} handleClose={() => { setShow(false) }} size="500px" className="">
                    <div className="pt-1">
                        <InputComponent placeholder={`Enter brand name`} label={`Brand name`} value={values?.name} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg' />
                        <div className="pt-1">
                            <h1 className="py-1 font-semibold">Select image</h1>
                            <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                        </div>
                        <Button isDisable={isLoading} name="Create" onClick={handleUpload} className="mt-3 border bg-blue-500 text-white" />
                    </div>
                </Modal>
            </div>
            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Brand List</h1>
                <Button name={'Create Brand'} onClick={() => setShow(true)} />
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        <div>
                            <button className="border-y border-l rounded rounded-l px-3 py-1.5">Excel</button>
                            <button className="border px-3 py-1.5">CSV</button>
                            <button className="border-y border-r rounded rounded-r px-3 py-1.5">PDF</button>
                        </div>
                        <div className="flex justify-start items-center gap-1.5">
                            <h1>Search : </h1>
                            <input placeholder="Enter name" onChange={SearchBrand} className="focus:outline-none border rounded p-1.5 " />
                        </div>
                    </div>
                </div>
                <div className="pt-3 w-full overflow-hidden overflow-x-auto">
                    <table class="min-w-[600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr className='border text-black font-bold'>
                                <th className="w-4 py-2 px-4 border-r">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 border-r ">
                                    <div className="flex justify-between items-center font-bold text-md">
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
                                bran?.map((item, i) => (
                                    <BrandCard item={item} i={i} />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1>Showing 1 to 3 of 3 entries</h1>
                    <div className='flex justify-start'>
                        <button onClick={() => { page > 0 ? setPage(page - 1) : setPage(1) }} className="border-y border-l rounded-l py-1.5 px-3 bg-blue-50">
                            {isLoading ? <Loading className='h-6 w-7' /> : "Prev"}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">{page}</button>
                        <button onClick={() => { setPage(page + 1) }} className="border-y border-r rounded-r py-1.5 px-3 bg-blue-50">
                            {isLoading ? <Loading className='h-6 w-7' /> : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Brand