import { useState, useEffect, useRef } from "react"
import Button from "../Input/Button"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant'
import StateCard from "./StateCard";
import Updown from "../../icons/Updown";
import ShowEntries from "../Input/ShowEntries";
import Notification from "../Input/Notification";
import Loading from "../../icons/Loading";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';

const State = ({ entries = [] }) => {

    const input_name = useRef(null)
    const [values, setValues] = useState("");
    const [show, setShow] = useState(false);
    const [state, setState] = useState([])
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [totalItem, setTotalItem] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)
    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    useEffect(() => {
        input_name.current.focus()
    }, [])
    const getState = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/state/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setState(data.items)
        setTotalItem(data?.items?.length)
    }


    useEffect(() => {
        document.title = `States - Kazaland Brothers`;
        getState()
    }, [page, pageSize]);

    const handleCreate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/state`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    name: values
                }),
            });

            const data = await response.json();
            setShow(false)
            getState()
            setValues('')
            setMessage({ id: Date.now(), mgs: data?.message });
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }


    return (
        <div className="pt-5 px-2 min-h-screen pb-12">
            <Notification message={message} />
            <div>
                <Modal show={show} handleClose={() => { setShow(false) }} size={`500px`} className="">
                    <div className="pt-1">
                        <div className=''>
                            <h1 className='text-[15px] pb-1.5'>State name</h1>
                            <input type="text" ref={input_name} value={values} placeholder={`Enter State name`}
                                onChange={(e) => setValues(e.target.value)}
                                className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") { handleCreate() }
                                }}
                            />
                        </div>

                        <Button isDisable={false} name="Create" onClick={handleCreate} className="mt-3 border bg-blue-500 text-white" />
                    </div>
                </Modal>
            </div>

            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Thana List</h1>
                <Button onClick={() => { setShow(true) }} name={'Create State'} />
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div ref={ref}>
                    <div ref={targetRef} className="pt-3  w-full overflow-hidden overflow-x-auto">
                        <table className="min-w-[600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:bg-[#040404] dark:text-white">
                            <thead class="text-gray-900 dark:bg-[#040404] dark:text-white">
                                <tr className='border'>
                                    {/* <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th> */}
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center">
                                            Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Thana Code
                                            <Updown />
                                        </div>
                                    </th>

                                    <th scope="col" className="pl-4 pr-1 py-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state?.map((item) => (<StateCard item={item} callState={getState} />))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + state?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + state?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + state?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default State