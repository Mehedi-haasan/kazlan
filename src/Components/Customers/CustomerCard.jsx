import React, { useState } from "react";
import Remove from '../../icons/Remove'
import Edit from "../../icons/Edit";
import BaseUrl from "../../Constant";
import Loading from "../../icons/Loading";
import Modal from "../Input/Modal";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import Add from "../../icons/Add";
import { NavLink } from "react-router-dom";

const CustomerCard = ({ item, state = [], i, info = {}, select, OpenModal,outside }) => {
    const [values, setValues] = useState({})
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState("Address");
    const [option, setOption] = useState(false)

    const DeleteCustomer = async () => {

    }



    const handleSubmit = async (e) => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        e.preventDefault()
        const response = await fetch(`${BaseUrl}/api/update/customer/${item?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        setShow(false)
        setIsLoading(false)
        alert(data.message)
    }

    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }


    return (
        <tr className={`border-b ${i % 2 == 0 ? 'bg-gray-50' : ''}`}>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.name}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.phone}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.email}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.bankname}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.accountname}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.accountnumber}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.stateId}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.address}</th>
            <th scope="col" className={`px-2 py-2 border-r font-bold  `}>
                <button className={`border rounded-full px-4 mx-auto block ${item?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray4100` : `${item?.balance < 1 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                    {item?.balance}
                </button>
                {/* <button className={`border rounded-full px-4 mx-auto block ${item?.balance < 1 ? 'text-red-600 bg-red-100 border-red-100' : 'text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]'} `}>{item?.balance}</button> */}
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>

             <th scope="col" className="p-1 flex justify-center items-center border-r gap-2 relative">
                {
                    select === item?.id && <div className="absolute -top-10 bg-white shadow-xl rounded-md right-14 w-[140px] p-1 z-50">
                        <div onClick={() => { setEdit(!edit) }} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <Edit size="15px" />Edit
                        </div>
                        <NavLink to={`/customer/balance/${item?.id}`} onClick={() => setOption(false)} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0" /><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599zM19.425 10H9.397l7.469-2.546l1.522-.487zM15.55 5.79L7.84 8.418l6.106-4.878zM3.5 18.169v-4.34A3 3 0 0 0 5.33 12h13.34a3 3 0 0 0 1.83 1.83v4.34A3 3 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169" />
                            </svg>Make Payment
                        </NavLink>
                        <NavLink to={`/payment/history/${item?.id}`} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 text-xs rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z"/></svg>Payment History
                        </NavLink>
                        <div onClick={() => { setShow(true) }} className={`${info?.role === "admin" ? 'hidden':''}flex justify-start items-center text-xs gap-2 cursor-pointer text-red-500 hover:bg-gray-200 pl-[5px] py-[3px] rounded`}>
                            <Remove onClick={() => { setShow(true) }} className={`text-red-500`} size="14px" />Delete
                        </div>
                    </div>
                }
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { OpenModal(item?.id) }} className="cursor-pointer" width="25" height="22" viewBox="0 0 40 40">
                    <g fill="currentColor"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" />
                        <circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" />
                    </g>
                </svg>

                <Modal show={edit} handleClose={() => { setEdit(false) }} size={``} className='w-[1000px]'>
                    <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <InputComponent label={"Full Name"} placeholder={item?.name} onChange={(v) => { setValues({ ...values, name: v }) }} />
                        <InputComponent label={"Email"} placeholder={item?.email} onChange={(v) => { setValues({ ...values, email: v }) }} />
                        <InputComponent label={"Phone"} placeholder={item?.phone} onChange={(v) => { setValues({ ...values, phone: v }) }} />
                        <InputComponent label={"Bank Name"} placeholder={item?.bankname} onChange={(v) => { setValues({ ...values, bankname: v }) }} />
                        <InputComponent label={"Account Name"} placeholder={item?.accountname} onChange={(v) => { setValues({ ...values, accountname: v }) }} />
                        <InputComponent label={"Account Number"} placeholder={item?.accountnumber} onChange={(v) => { setValues({ ...values, accountnumber: v }) }} />
                    </div>
                    <div className="p-3">
                        <div className="flex justify-start items-end">
                            <button onClick={() => { setActive("Address") }} className={`${active === "Address" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Address</button>
                            <button onClick={() => { setActive("Balence") }} className={`${active === "Balence" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Balence</button>
                            <div className="border-b w-full"></div>
                        </div>
                    </div>
                    {
                        active === "Address" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className='flex justify-start items-end pb-1'>
                                <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={"Thana"} className='rounded-l' />
                                <div className='border-y border-r font-thin text-[#212529] px-3 pt-[4px] pb-[4px] rounded-r cursor-pointer'>
                                    <Add />
                                </div>
                            </div>
                            <InputComponent label={"Address"} placeholder={item?.address} onChange={(v) => { setValues({ ...values, address: v }) }} />
                        </div>
                    }
                    {
                        active === "Balence" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <p className='pb-2 font-semibold text-sm'>Balance</p>
                                <div className='flex justify-start items-end pb-1'>
                                    <input type='number' value={item?.balance} onChange={(e) => { setValues({ ...values, balance: e.target.value }) }} placeholder={item?.balance} className='border-y border-l px-2 focus:outline-none rounded-l  pt-2 pb-[7px] w-[50%] font-thin' />
                                    <select value={item?.balance_type} onChange={(v) => { setValues({ ...values, balance_type: v.target.value }) }}
                                        className={`border text-[#6B7280] w-[50%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                    >
                                        {[{ id: 1, name: "To Pay" }, { id: 2, name: "To Receive" }].map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'>{name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>
                    }

                    <div className='p-3'>
                        <Button onClick={handleSubmit} name={'Submit'} />
                        <Button name={'Cancel'} onClick={() => { setEdit(false) }} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                    </div>
                </Modal>

                <Modal show={show} handleClose={() => { setShow(false) }} size={``} className=''>
                    <h1 className="py-3 text-lg">Are you sure you want to delete this?</h1>
                    <div className="flex justify-between items-center p-4">
                        <button onClick={DeleteCustomer} className="border px-4 py-1.5 rounded border-r font-thin text-[#212529]ed-500 text-red-500">Yes</button>
                        <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 text-blue-500">No</button>
                    </div>
                </Modal>

            </th>

        </tr>
    )
}

export default CustomerCard