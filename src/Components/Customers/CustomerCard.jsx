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
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../Input/Notification";
import Updown from "../../icons/Updown";

const CustomerCard = ({ item, state = [], i, info = {}, GetCustomer, select, OpenModal, outside, isChecked, TikBox }) => {
    const [values, setValues] = useState({})
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState("Address");
    const [option, setOption] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const goto = useNavigate()

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
            setIsLoading(false);
            setMessage({ ...message, id: Date.now(), mgs: data?.message })
            setShow(false)
            GetCustomer()
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
        setMessage({ id: Date.now(), mgs: data.message });
    }

    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }


    // const GetProduct = async (id) => {
    //     const token = localStorage.getItem('token')
    //     setIsLoading(true)
    //     const res = await fetch(`${BaseUrl}/api/get/payment/history/${id}`, {
    //         method: 'POST',
    //         headers: {
    //             "authorization": token,
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //         body: JSON.stringify(raw)
    //     });
    //     const data = await res.json()
    //     setValues(data?.items);
    //     setReverse([...data?.history]?.reverse());
    //     setData(data?.history);
    //     setIsLoading(false)
    //     setTotalItem(data?.count)
    // }


    return (
        <tr className={`border-b ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <Modal show={false} handleClose={() => { }} size={'1000px'} className={``} crosshidden={false}  >
                        <div>
                            <div className="pb-4 border-b">
                                <h1>Payment History</h1>
                            </div>
                            <div className="pt-3">
                                <p className="font-thin">Supplier Name:Jamshedgi Tata</p>
                                <p className="font-thin">Balance:20000.00</p>

                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:bg-[#040404] dark:text-white mt-4">
                                    <thead className="text-sm text-gray-900 bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                                        <tr className='border'>
                                            <th scope="col" className="p-1 border-r">
                                                <div className="flex justify-center items-center">
                                                    Transaction Date
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="p-1 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Payment Direction
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="p-1 text-right border-r">
                                                <div className="flex justify-center items-center">
                                                    Receipt No.
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="p-1 text-right border-r">
                                                <div className="flex justify-center items-center">
                                                    Payment Type
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="p-1 text-right border-r">
                                                <div className="flex justify-center items-center">
                                                    Amount
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="p-1 text-right border-r">
                                                <div className="flex justify-center items-center">
                                                    Action
                                                    <Updown />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2]?.map((item, i) => {
                                            return <tr className="border-x border-b">
                                                <td className="border-r py-1.5">{item}</td>
                                                <td className="border-r py-1.5">{item}</td>
                                                <td className="border-r py-1.5">{item}</td>
                                                <td className="border-r">{item}</td>
                                                <td className="border-r py-1.5">{item}</td>
                                                <td>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <button className='group text-red-500 rounded-lg ml-3 font-thin flex justify-start items-center gap-1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="transition duration-200" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fillRule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clipRule="evenodd" /></g></svg>
                                                            <span className="group-hover:text-white transition duration-200"></span>
                                                        </button>
                                                        <button className='text-gray-600 rounded-lg font-thin flex justify-start items-center gap-1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16.9 3a1.1 1.1 0 0 1 1.094.98L18 4.1V7h1a3 3 0 0 1 2.995 2.824L22 10v7a2 2 0 0 1-1.85 1.995L20 19h-2v1.9a1.1 1.1 0 0 1-.98 1.094L16.9 22H7.1a1.1 1.1 0 0 1-1.094-.98L6 20.9V19H4a2 2 0 0 1-1.995-1.85L2 17v-7a3 3 0 0 1 2.824-2.995L5 7h1V4.1a1.1 1.1 0 0 1 .98-1.094L7.1 3zM16 16H8v4h8zm3-7H5a1 1 0 0 0-.993.883L4 10v7h2v-1.9a1.1 1.1 0 0 1 .98-1.094L7.1 14h9.8a1.1 1.1 0 0 1 1.094.98l.006.12V17h2v-7a1 1 0 0 0-1-1m-2 1a1 1 0 0 1 .117 1.993L17 12h-2a1 1 0 0 1-.117-1.993L15 10zm-1-5H8v2h8z" /></g></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </Modal>
                    <input id="checkbox-table-search-1" type="checkbox" onChange={() => TikBox(item.id)} checked={isChecked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-2 py-2 border-x font-thin" id="kalpurush">{item?.name}
                <Notification message={message} />
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.id}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.phone}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.email}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.bankname}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.accountname}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.accountnumber}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">{item?.state?.name}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin" id="kalpurush">{item?.address}</th>
            <th scope="col" className={`px-2 py-2 border-r font-bold  `}>
                {/* <button className={`border rounded-full px-4 mx-auto block ${item?.balance === 0 ? `text-gray-900 bg-gray-300 border-gray-100` : `${item?.balance < 0 ? `text-[#15CA20] bg-[#DAE9D9] border-[#DAE9D9]` : ` text-red-600 bg-red-100 border-red-100`}`} `}>
                    {Math.abs(item?.balance) }
                </button> */}

                {item?.balance*-1}
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin ">{formatDate(item?.createdAt)}</th>

            <th scope="col" className="p-1 flex justify-center items-center border-r gap-2 relative dark:bg-[#040404] dark:text-white">
                {
                    select === item?.id && <div className="absolute -top-12 bg-white dark:bg-[#040404] dark:text-white shadow-xl rounded-md right-14 w-[140px] p-1.5 z-50 border border-red-500">
                        <div onClick={() => { goto(`/update/customer/${item?.id}/${item?.state?.name}`) }} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <Edit size="15px" />Edit
                        </div>
                        <NavLink to={`/customer/balance/${item?.id}`} onClick={() => setOption(false)} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0" /><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599zM19.425 10H9.397l7.469-2.546l1.522-.487zM15.55 5.79L7.84 8.418l6.106-4.878zM3.5 18.169v-4.34A3 3 0 0 0 5.33 12h13.34a3 3 0 0 0 1.83 1.83v4.34A3 3 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169" />
                            </svg>Make Payment
                        </NavLink>
                        <NavLink to={`/payment/history/${item?.id}`} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 text-xs rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z" /></svg>Payment History
                        </NavLink>
                        <div onClick={() => { setShow(true) }} className={`${info?.role === "admin" ? 'hidden' : ''} flex justify-start items-center text-xs gap-2 cursor-pointer text-red-500 hover:bg-gray-200 pl-[5px] py-[3px] rounded`}>
                            <Remove onClick={() => { setShow(true) }} className={`text-red-500`} size="14px" />Delete
                        </div>
                        {/* <NavLink to={`/yearly/bonus/${item?.id}`} onClick={() => setOption(false)} className={`${info?.role === "superadmin" ? "" : "hidden"} flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0" /><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599zM19.425 10H9.397l7.469-2.546l1.522-.487zM15.55 5.79L7.84 8.418l6.106-4.878zM3.5 18.169v-4.34A3 3 0 0 0 5.33 12h13.34a3 3 0 0 0 1.83 1.83v4.34A3 3 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169" />
                            </svg>Yearly Bonas
                        </NavLink> */}
                    </div>
                }
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { OpenModal(item?.id) }} className="cursor-pointer" width="25" height="22" viewBox="0 0 40 40">
                    <g fill="currentColor"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" />
                        <circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" />
                    </g>
                </svg>

                <Modal show={edit} handleClose={() => { setEdit(false) }} size={``} className='w-[1000px]'>
                    <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4 dark:bg-[#040404] dark:text-white">
                        <InputComponent label={"Full Name"} placeholder={item?.name} onChange={(v) => { setValues({ ...values, name: v }) }} />
                        <InputComponent label={"Email"} placeholder={item?.email} onChange={(v) => { setValues({ ...values, email: v }) }} />
                        <InputComponent label={"Phone"} placeholder={item?.phone} onChange={(v) => { setValues({ ...values, phone: v }) }} />
                        <InputComponent label={"Bank Name"} placeholder={item?.bankname} onChange={(v) => { setValues({ ...values, bankname: v }) }} />
                        <InputComponent label={"Account Name"} placeholder={item?.accountname} onChange={(v) => { setValues({ ...values, accountname: v }) }} />
                        <InputComponent label={"Account Number"} placeholder={item?.accountnumber} onChange={(v) => { setValues({ ...values, accountnumber: v }) }} />
                    </div>
                    <div className="p-3">
                        <div className="flex justify-start items-end">
                            <button onClick={() => { setActive("Address") }} className={`${active === "Address" ? "border-x border-t gap-1 border-green-500 text-green-500" : "border-b text-blue-600"} px-4 py-1.5 rounded-t flex justify-start items-center font-thin`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"><path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" /><path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" /></g></svg>
                                Address</button>
                            <button onClick={() => { setActive("Balence") }} className={`${active === "Balence" ? "border-x border-t  border-green-500 text-green-500" : "border-b text-blue-600"} px-4 py-1.5  gap-1 rounded-t flex justify-start items-center font-thin`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M16 12h2v4h-2z" /><path fill="currentColor" d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2M5 5h13v2H5a1.001 1.001 0 0 1 0-2m15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15z" /></svg>
                                Balance</button>
                            <div className="border-b w-full"></div>
                        </div>
                    </div>
                    {
                        active === "Address" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className='flex justify-start items-end pb-1'>
                                <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={"Thana"} className='rounded-l' />
                                <div className='border-y border-r font-thin  px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer'>
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
                        <button onClick={() => { DeleteCustomer(item?.id) }} className="border px-4 py-1.5 rounded border-r font-thin ed-500 text-red-500">Yes</button>
                        <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 text-blue-500">No</button>
                    </div>
                </Modal>

            </th>

        </tr>
    )
}

export default CustomerCard