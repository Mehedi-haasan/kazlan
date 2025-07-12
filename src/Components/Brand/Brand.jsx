import { useState, useEffect, useRef } from "react"
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
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
import logo from '../Logo/userProfile.png'
import Excel from '../Input/Excel'
import Search from "../Input/Search";
import ImageSelect from "../Input/ImageSelect";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../lotti/Animation - 1745147041767.json";
import EscapeRedirect from "../Wholesale/EscapeRedirect";


const Brand = ({ entries, info = {} }) => {

    const targetRef = useRef();
    const [inpo, setInpo] = useState(false)
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [image_url, setImage_Url] = useState();
    const [bran, setBran] = useState([])
    const [values, setValues] = useState({ name: "", });
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [showlotti, setLottiShow] = useState(false)


    const handleCreate = async (image_url) => {
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
            setLottiShow(true)
            getBrand();
            setValues({ ...values, name: '' })
            toast(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }


    const handleUpload = async () => {

        if (!values?.name) {
            toast("Required field is missing")
            return
        }
        const formData = new FormData();
        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            toast("Image file is missing in the payload");
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
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
        setIsLoading(false)
    }


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
        setTotalItem(data?.count)
        setIsLoading(false)
    }

    useEffect(() => {
        document.title = `Brands - Kazaland Brothers`;
        getBrand()
    }, [page, pageSize]);



    const SearchBrand = async (value) => {
        const name = value
        const token = localStorage.getItem('token')
        if (name !== '') {
            const response = await fetch(`${BaseUrl}/api/get/brand/filter/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setBran(data?.items);
            console.log(data?.items)
        } else {
            getBrand()
        }
    }






    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };


    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        style: { width: 200, height: 200, },
    };

    const { View } = useLottie(options);

    // useEffect(() => {
    //     input_focus.current.focus()
    // }, [show])


    useEffect(() => {
        if (showlotti) {
            const timer = setTimeout(() => {
                setLottiShow(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [showlotti]);

    EscapeRedirect()

    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-12">
            <ToastContainer />
            <div>
                <Modal show={showlotti} handleClose={() => { setLottiShow(false); }} size={`250px`}>
                    <>{View}</>
                </Modal>
                <Modal show={show} handleClose={() => { setShow(false) }} size={`800px`} className="">
                    <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                        <div className="border-b">
                            <h1 className="pl-5 text-xl py-2">Brand Details</h1>
                        </div>
                        <div className="pt-5">
                            <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                        </div>
                        <div className="px-6 py-4">
                            <InputComponent placeholder={`Enter Brand name`} input_focus={inpo} value={values?.name} label={`Brand Name`} handleEnter={() => { handleCreate("") }} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' />
                            <Button isDisable={isLoading} name="Create" onClick={handleUpload} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Brand List</h1>

                <button onClick={() => { setShow(true); setInpo(true) }} className={`bg-blue-500 rounded px-4 py-1.5 font-thin text-white`}>Create Brand</button>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={SearchBrand} />
                    </div>
                </div>
                <div ref={ref}>
                    <div ref={targetRef} className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="min-w-[600px] w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-md text-gray-900">
                                <tr className='border text-black font-bold'>
                                    <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" onChange={() => { setIsChecked(!isChecked) }} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center font-bold text-[16px]">
                                            Brand
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center text-[16px]">
                                            Logo
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r text-[16px]">
                                        <div className="flex justify-between items-center">
                                            Created by
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r text-[16px]">
                                        <div className="flex justify-between items-center">
                                            Created at
                                            <Updown />
                                        </div>
                                    </th>
                                    {info?.role === "superadmin" && <th scope="col" className="pl-1 pr-1 py-2 text-center text-[16px]">Action</th>}
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    bran?.map((item, i) => (
                                        <BrandCard item={item} i={i} isChecked={isChecked} info={info} getBrand={getBrand} />
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + bran?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + bran?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + bran?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Brand