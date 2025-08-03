import React, { useEffect, useState } from "react";
import Remove from '../../icons/Remove'
import Edit from "../../icons/Edit";
import BaseUrl from "../../Constant";
import Modal from "../Input/Modal";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import Add from "../../icons/Add";
import { NavLink } from "react-router-dom";
import Notification from "../Input/Notification";

const SupplierCard = ({ item, i, state = [], info = {}, GetSupplier, select, OpenModal, outside }) => {
    const [values, setValues] = useState({})
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState("Address")
    const [option, setOption] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });

    const DeleteCustomer = async (id) => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token')
            const response = await fetch(`${BaseUrl}/api/delete/customer/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token,
                }
            });

            const data = await response.json();
            setMessage({ ...message, id: Date.now(), mgs: data?.message })
            GetSupplier()
            setIsLoading(false);
            setShow(false)
        } catch (error) {
            console.error('Delete customer error:', error);
            setMessage({ ...message, id: Date.now(), mgs: error?.message })
        } finally {
            setIsLoading(false);
        }
    };




    const handleSubmit = async (e) => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        e.preventDefault()
        const response = await fetch(`${BaseUrl}/api/update/supplier/${item?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        setIsLoading(false)
        alert(data.message)
    }

    useEffect(() => {
        setValues(item)
    }, [item])


    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }



    return (
        <tr className={`border-b ${i % 2 === 1 ? 'bg-[#FAF9EE]' : ''}`}>
            {/* <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th> */}
            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{item?.name}
                <Notification message={message} />
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.phone}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.email}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.bankname}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.accountname}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.accountnumber}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.address}</th>

            <th scope="col" className={`px-2 py-2 border-r font-bold  `}>
                <button className={`border rounded-full px-4 mx-auto block ${item?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray4100` : `${item?.balance < 1 ? `text-red-600 bg-red-100 border-red-100` : `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]`}`} `}>
                    {Math.abs(item?.balance)}
                </button>
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
            <th scope="col" className="p-1 flex justify-center items-center border-r gap-2 relative">
                {
                    select === item?.id && <div className="absolute -top-[50px] bg-white shadow-xl rounded-md right-12 w-[140px] p-1 z-50 border border-red-500">
                        <div onClick={() => { setEdit(!edit); setOption(false) }} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <Edit size="15px" />Edit
                        </div>
                        <NavLink to={`/supplier/balance/${item?.id}`} onClick={() => setOption(false)} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M6 9.5A2 2 0 0 1 7.937 11H13.5a.5.5 0 0 1 .09.992L13.5 12l-5.563.001a2 2 0 0 1-3.874 0L2.5 12a.5.5 0 0 1-.09-.992L2.5 11h1.563A2 2 0 0 1 6 9.5m4-7A2 2 0 0 1 11.937 4H13.5a.5.5 0 0 1 .09.992L13.5 5l-1.563.001a2 2 0 0 1-3.874 0L2.5 5a.5.5 0 0 1-.09-.992L2.5 4h5.563A2 2 0 0 1 10 2.5" />
                            </svg>Make Payment
                        </NavLink>
                        <NavLink to={`/payment/history/${item?.id}`} onClick={() => setOption(false)} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M6 9.5A2 2 0 0 1 7.937 11H13.5a.5.5 0 0 1 .09.992L13.5 12l-5.563.001a2 2 0 0 1-3.874 0L2.5 12a.5.5 0 0 1-.09-.992L2.5 11h1.563A2 2 0 0 1 6 9.5m4-7A2 2 0 0 1 11.937 4H13.5a.5.5 0 0 1 .09.992L13.5 5l-1.563.001a2 2 0 0 1-3.874 0L2.5 5a.5.5 0 0 1-.09-.992L2.5 4h5.563A2 2 0 0 1 10 2.5" />
                            </svg>Payment History
                        </NavLink>
                        <div onClick={() => { setShow(true); setOption(false) }} className={`${info?.role === 'admin' ? 'hidden' : ''} flex justify-start items-center gap-2 cursor-pointer text-red-500 hover:bg-gray-200 pl-1.5 py-1 rounded text-xs`}>
                            <Remove onClick={() => { setShow(true) }} className={`text-red-500`} size="14px" />Delete
                        </div>
                    </div>
                }
                <svg xmlns="http://www.w3.org/2000/svg" ref={outside} onClick={() => { OpenModal(item?.id) }} className="cursor-pointer" width="25" height="22" viewBox="0 0 40 40">
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
                        {/* <div className="flex justify-start items-end">
                            <button onClick={() => { setActive("Address") }} className={`${active === "Address" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Address</button>
                            <button onClick={() => { setActive("Balence") }} className={`${active === "Balence" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Balence</button>
                            <div className="border-b w-full"></div>
                        </div> */}

                        <div className="flex justify-start items-end">
                            <button onClick={() => { setActive("Address") }} className={`${active === "Address" ? "border-x border-t gap-1 border-green-500 text-green-500" : "border-b text-blue-600"} px-4 py-1.5 rounded-t flex justify-start items-center font-thin`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"><path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" /><path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" /></g></svg>
                                Address</button>
                            <button onClick={() => { setActive("Balence") }} className={`${active === "Balence" ? "border-x border-t border-green-500 text-green-500" : "border-b text-blue-600"} px-4 py-1.5 rounded-t flex justify-start items-center gap-1`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M16 12h2v4h-2z" /><path fill="currentColor" d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2M5 5h13v2H5a1.001 1.001 0 0 1 0-2m15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15z" /></svg>
                                Balance</button>
                            <div className="border-b w-full"></div>
                        </div>
                    </div>
                    {
                        active === "Address" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className='flex justify-start items-end pb-1'>
                                <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={"Thana"} className='rounded-l' />
                                <div className='border-y border-r font-thin text-[#212529] px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer'>
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
                                        {[{ id: 1, name: "You Pay" }, { id: 2, name: "You Receive" }].map(({ id, name }) => (
                                            <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
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
                        <button onClick={() => { DeleteCustomer(item?.id) }} className="border px-4 py-1.5 rounded border-r font-thin text-[#212529]ed-500 text-red-500">Yes</button>
                        <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 text-blue-500">No</button>
                    </div>
                </Modal>

            </th>


        </tr >
    )
}

export default SupplierCard