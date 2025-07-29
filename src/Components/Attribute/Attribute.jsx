import { useState, useEffect, useRef } from "react"
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Updown from "../../icons/Updown";
import ShowEntries from "../Input/ShowEntries";
import AttributeCard from "./AttributeCard";
import Loading from "../../icons/Loading";
import Notification from "../Input/Notification";
import Excel from '../Input/Excel'
import Search from "../Input/Search";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../lotti/Animation - 1745147041767.json";
import EscapeRedirect from "../Wholesale/EscapeRedirect";
import SelectionComponent from "../Input/SelectionComponent";


const Attribute = ({ entries, info = {} }) => {

    const targetRef = useRef();
    const [inpo, setInpo] = useState(false)
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [bran, setBran] = useState([])
    const [values, setValues] = useState({ name: "", });
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [showlotti, setLottiShow] = useState(false);
    const [first, setFirst] = useState({
        first: true,
        value: 'Bank'
    })
    const [message, setMessage] = useState({ id: '', mgs: '' });

    const handleCreate = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/attribute`, {
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
            setValues({ ...values, name: '' })
            setMessage({ id: Date.now(), mgs: data?.message });
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }

    const handleCreateLocally = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8050/api/create/attribute`, {
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
            setValues({ ...values, name: '' })
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }



    const GetAttribute = async () => {
        // setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/attribute/${page}/${pageSize}`, {
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
        document.title = `Attributes - Kazaland Brothers`;
        GetAttribute()
    }, [page, pageSize]);



    const SearchBrand = async (value) => {
        const name = value
        const token = localStorage.getItem('token')
        if (name !== '') {
            const response = await fetch(`${BaseUrl}/api/get/attribute/filter/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setBran(data?.items);
        } else {
        }
    }



    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        style: { width: 200, height: 200, },
    };

    const { View } = useLottie(options);


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
            <Notification message={message} />
            <div>
                <Modal show={showlotti} handleClose={() => { setLottiShow(false); }} size={`250px`} crosshidden={true}>
                    <>{View}</>
                </Modal>
                <Modal show={show} handleClose={() => { setShow(false) }} size={`800px`} className="">
                    <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                        <div className="border-b">
                            <h1 className="pl-5 text-xl py-2">Attribute Details</h1>
                        </div>
                        <div className="px-6 py-4">
                            <SelectionComponent options={[{ id: 0, name: 'Payment Type' }, { id: 1, name: 'Bank' }, { id: 2, name: "Mobile Banking" }, { id: 3, name: 'Edition' }, { id: 4, name: 'Quantity' }]} default_select={first?.first} default_value={first?.value}
                                onSelect={(v) => {
                                    setValues({
                                        ...values,
                                        type: v?.name,
                                    })
                                    setFirst({ ...first, value: v?.name })
                                }} label={"Type*"} className='rounded-r' />
                            <InputComponent placeholder={`Enter name`} input_focus={inpo} value={values?.name} label={`Name`} handleEnter={() => { handleCreate(); handleCreateLocally() }} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' />
                            <Button isDisable={isLoading} name="Create" onClick={() => { handleCreate(); handleCreateLocally() }} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Attribute List</h1>

                <button onClick={() => { setShow(true); setInpo(true) }} className={`bg-blue-500 rounded px-4 py-1.5 font-thin text-white`}>Create Attribute</button>
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
                                    {/* <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" onChange={() => { setIsChecked(!isChecked) }} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th> */}
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center font-bold text-[16px]">
                                            Attribute
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center font-bold text-[16px]">
                                            Type
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
                                        <AttributeCard item={item} i={i} isChecked={isChecked} info={info} GetAttribute={GetAttribute} />
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

export default Attribute