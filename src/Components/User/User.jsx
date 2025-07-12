import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Updown from '../../icons/Updown'
import Remove from '../../icons/Remove'
import Edit from "../../icons/Edit";
import ShowEntries from "../Input/ShowEntries";
import BaseUrl from "../../Constant";
import Loading from "../../icons/Loading";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import Modal from "../Input/Modal";
import SelectionComponent from '../Input/SelectComp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EscapeRedirect from "../Wholesale/EscapeRedirect";


const User = ({ entries, info = {} }) => {

    const targetRef = useRef();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const options = { width: 1600, backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(options)
    const [values, setValues] = useState({
        usertype: "Wholesaler",
        compId: 1,
        stateId: 1
    });
    const GetUsers = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        const response = await fetch(`${BaseUrl}/api/get/users/with/role/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        setIsLoading(false)
        setUsers(data?.items)
        setTotalItem(data?.items?.length)
    }

    useEffect(() => {
        document.title = "User info - KazalandBrothers";
        if (info?.role === "superadmin") {
            GetUsers()
        }
    }, [])


    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BaseUrl}/api/update/single/users/by/super/admin`, {
            method: "PATCH",
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values)
        })
        const data = await response.json()
        setOpen(false)
        toast(data?.message)

    }

    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/single/users/by/super/admin`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        setShow(false)
        toast(data?.message)
    }

    EscapeRedirect()

    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <ToastContainer />
            <div className="flex justify-between items-center px-4 py-2 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">User List</h1>
                <NavLink to={`/registration`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Create user</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        <Excel onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} Jpg={getPng} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div>
                    <Modal show={open} handleClose={() => { setOpen(false) }} size={`650px`} className={""}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className=''>
                                <label className="block text-sm  mb-1 font-thin">Full Name</label>
                                <input type="text" onChange={(e) => { setValues({ ...values, name: e.target.value }) }}
                                    className="w-full p-1.5 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.name} value={values?.name} />
                            </div>
                            <div>
                                <label className="block  text-sm  mb-1 font-thin">Phone</label>
                                <input type="text" onChange={(e) => { setValues({ ...values, username: e.target.value }) }}
                                    className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.username} value={values?.username} />
                            </div>
                            <div>
                                <label className="block  text-sm  mb-1 font-thin">Bank Name</label>
                                <input type="text" onChange={(e) => { setValues({ ...values, bankname: e.target.value }) }}
                                    className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.bankname} value={values?.bankname} />
                            </div>
                            <div>
                                <label className="block  text-sm  mb-1 font-thin">Account Name</label>
                                <input type="text" onChange={(e) => { setValues({ ...values, accountname: e.target.value }) }}
                                    className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.accountname} value={values?.accountname} />
                            </div>
                            <div>
                                <label className="block  text-sm  mb-1 font-thin">Account Number</label>
                                <input type="number" onChange={(e) => { setValues({ ...values, accountnumber: e.target.value }) }}
                                    className="w-full p-1.5 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.accountnumber} value={values?.accountnumber} />
                            </div>
                            <div>
                                <label className="block  text-sm  mb-1 font-thin">Address</label>
                                <input type="text" onChange={(e) => { setValues({ ...values, address: e.target.value }) }}
                                    className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.address} value={values?.address} />
                            </div>
                            <div>
                                <label className="block  text-sm  mb-1 font-thin">Email</label>
                                <input type="email" onChange={(e) => { setValues({ ...values, email: e.target.value }) }}
                                    className="w-full p-1.5 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 "
                                    placeholder={values?.email} value={values?.email} />
                            </div>
                            {/* <div>
                                <SelectionComponent options={user} onSelect={(v) => { setValues({ ...values, rules: [v?.name] }) }} label={`User Role`} className='' />
                            </div> */}

                            <div className="grid col-span-1 lg:col-span-2">
                                <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600  text-white py-3 rounded-lg transition-all">
                                    Update
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal show={show} handleClose={() => { setShow(false) }} size={`380px`} className={""}>
                        <h1 className="py-3 text-sm font-thin">Are you sure you want to delete this?</h1>
                        <div className="flex justify-between items-center p-4">
                            <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 bg-blue-500 text-white">No</button>
                            <button onClick={handleDelete} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
                        </div>
                    </Modal>
                </div>
                <div ref={ref}>
                    <div ref={targetRef} className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-sm text-gray-900">
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
                                            Mobile
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Email
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Bank Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Account Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Bank Account
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Address
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Type
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Role
                                            <Updown />
                                        </div>
                                    </th>
                                    {info?.role === "superadmin" && <th scope="col" className="pl-4 pr-1 py-2 text-center">Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item, i) => (
                                    <tr className={`border-b font-thin ${i % 2 == 0 ? 'bg-gray-50' : ''}`}>
                                        <th className="w-4 py-2 px-4 border-x">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.name}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.username}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.email}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.bankname}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.accountname}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.accountnumber}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.address}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.usertype}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.role?.length > 0 ? item?.role[0]?.name : 'User'}</th>
                                        {info?.role === "superadmin" && <th scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2">
                                            <Edit onClick={() => { setValues(item); setOpen(true) }} />
                                            <Remove onClick={() => { setValues(item); setShow(true) }} />
                                        </th>}
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + users?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + users?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + users?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User