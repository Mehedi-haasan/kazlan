import React, { useEffect, useRef, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import BaseUrl from "../../Constant";
import Add from "../../icons/Add";
import Selection from "../Input/Selection";
import { useNavigate } from "react-router-dom";
import EscapeRedirect from "../Wholesale/EscapeRedirect";
import Notification from "../Input/Notification";
import { BanglaToEnglish } from "../Input/Time";
import RightArrow from "../../icons/RightArrow";

const CreateCustomer = ({ state = [], info = {} }) => {

    const [message, setMessage] = useState({ id: '', mgs: '' });
    const goto = useNavigate()
    const open_bala = useRef(null)
    const [active, setActive] = useState("Address")
    const dis = useRef(null)
    const [selectedId, setSelectedId] = useState(0)
    const disOnSale = [{ id: 1, name: "You Pay" }, { id: 2, name: "You Receive" }]
    const [disType, setDisType] = useState(false)
    const dtype = useRef()
    const [values, setValues] = useState({
        "stateId": 1,
        "usertype": "Customer",
        "balance": 0,
        "balance_type": 'You Receive',
        "address": "",
        "customertype": 'Party',
        "shopname": info?.shopname
    })
    const [auto, setAuto] = useState({
        fame: true,
        phone: false,
        email: false,
        bname: false,
        aname: false,
        anum: false,
        tname: false,
        t_value: "Select a filter",
        addres: false,
        open_b: false
    })
    const handleSubmit = async () => {
        if (!values?.phone) {
            setMessage({ id: Date.now(), mgs: "Required Field are missing" });
            return
        }
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/create/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        setMessage({ id: Date.now(), mgs: data?.message });
        goto('/customers')
    }

    const handleSubmitOffline = async (e) => {
        if (!values?.phone) {
            return
        }
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/create/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        goto('/customers')
    }


    EscapeRedirect("/customers")

    useEffect(() => {
        if (auto?.open_b) {
            dis.current.focus()
        }
    }, [auto])




    return (
        <div className="px-3 py-5 min-h-screen pb-12">

            <div className="p-3 shadow bg-white rounded mb-2 flex justify-between items-center">
                <h1 className="py-2 px-3" >Customer Details</h1>
                <Notification message={message} />
            </div>
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen pb-12 pt-4">
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="pt-1.5">
                        <Selection options={[{ id: 1, name: "Party" }, { id: 2, name: "Normal" }]}
                            onSelect={(v) => { setValues({ ...values, customertype: v?.name }) }} label={'Customer Type*'} />
                    </div>

                    <InputComponent label={values?.customertype === "Party" ? "Full Name*" : "Full Name"} input_focus={auto?.fame} handleEnter={() => { setAuto({ ...auto, fame: false, phone: true }) }}
                        placeholder={'Enter full name'} onChange={(v) => { setValues({ ...values, name: v }) }} />

                    <InputComponent label={values?.customertype === "Party" ? "Phone*" : "Phone*"} input_focus={auto?.phone} handleEnter={() => { setAuto({ ...auto, phone: false, email: true }) }}
                        placeholder={'Enter phone number'} onChange={(v) => { setValues({ ...values, phone: v }) }} />

                    <InputComponent label={"Email"} placeholder={'Enter email'} input_focus={auto?.email} handleEnter={() => { setAuto({ ...auto, phone: false, bname: true }) }}
                        onChange={(v) => { setValues({ ...values, email: v }) }} />

                    <InputComponent label={"Bank Name"} placeholder={'Enter bank name'} input_focus={auto?.bname} handleEnter={() => { setAuto({ ...auto, bname: false, aname: true }) }}
                        onChange={(v) => { setValues({ ...values, bankname: v }) }} />
                    <InputComponent label={"Account Name"} placeholder={'Enter account name'} input_focus={auto?.aname} handleEnter={() => { setAuto({ ...auto, aname: false, anum: true }) }}
                        onChange={(v) => { setValues({ ...values, accountname: v }) }} />
                    <InputComponent label={"Account Number"} placeholder={'Enter account number'} input_focus={auto?.anum} handleEnter={() => { setAuto({ ...auto, anum: false, tname: true }) }}
                        onChange={(v) => { setValues({ ...values, accountnumber: v }) }} />
                    <div>
                        <div className="py-3">
                            <div className="flex justify-start items-end">
                                <button onClick={() => { setActive("Address") }} className={`${active === "Address" ? "border-x border-t gap-1 border-green-500 text-green-500" : "border-b text-blue-600"} px-4 py-1.5 rounded-t flex justify-start items-center font-thin`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"><path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" /><path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" /></g></svg>
                                    Address</button>
                                <button onClick={() => { setActive("Balance") }} className={`${active === "Balance" ? "border-x border-t  border-green-500 text-green-500" : "border-b text-blue-600"} px-4 py-1.5  gap-1 rounded-t flex justify-start items-center font-thin`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M16 12h2v4h-2z" /><path fill="currentColor" d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2M5 5h13v2H5a1.001 1.001 0 0 1 0-2m15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15z" /></svg>
                                    Balance</button>
                                <div className="border-b w-full"></div>
                            </div>
                        </div>
                        {
                            active === "Address" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className='flex justify-start items-end pb-1'>
                                    <SelectionComponent options={state} default_select={auto?.tname}
                                        default_value={auto?.t_value}
                                        onSelect={(v) => {
                                            setValues({ ...values, stateId: v?.id });
                                            setAuto({ ...auto, t_value: v?.name, tname: false, addres: true });

                                        }} label={values?.usertype === "Party" ? "Thana Name*" : "Thana Name"} className='rounded-l' />
                                    <div onClick={() => goto('/state')} className='border-y border-r px-3 pt-[6px] pb-[7px] rounded-r cursor-pointer text-[#3C96EE] '>
                                        <Add />
                                    </div>
                                </div>
                                <InputComponent label={"Address"} placeholder={'Enter address'} input_focus={auto?.addres}
                                    handleEnter={() => {
                                        setActive("Balance")
                                        setAuto({ ...auto, addres: false, open_b: true });
                                    }}
                                    value={values?.address} onChange={(v) => { setValues({ ...values, address: v }) }} />
                            </div>
                        }
                        {
                            active === "Balance" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* <div>
                                    <p className='pb-2 font-semibold text-sm'>Opening Balance</p>
                                    <div className='flex justify-start items-end pb-1'>
                                        <input type='text' ref={open_bala} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit();
                                                handleSubmitOffline()
                                            }
                                        }} onChange={(e) => {
                                            let num = BanglaToEnglish(e.target.value)
                                            setValues({ ...values, balance: num })
                                        }} className='border-y border-l px-2 focus:outline-none rounded-l  pt-[6px] pb-[5px] w-[50%] font-thin' />
                                        <select value={values?.balance_type} onChange={(v) => { setValues({ ...values, balance_type: v.target.value }) }}
                                            className={`border w-[50%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                        >
                                            {[{ id: 1, name: "You Pay" }, { id: 2, name: "You Receive" }].map(({ id, name }) => (
                                                <option key={id} value={name} className=''> {name}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div> */}

                                <div>
                                    <p className='py-2 pt-1 font-semibold text-sm'>Opening Balance</p>
                                    <div className='flex justify-start items-end pb-1 pt-1'>
                                        <input ref={dis}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSubmit();
                                                } else if (e.key === "ArrowRight") {
                                                    dtype.current.focus();
                                                    setDisType(true)
                                                }
                                            }}

                                            onChange={(e) => {
                                                let num = BanglaToEnglish(e.target.value);
                                                setValues({ ...values, balance: num })
                                            }}
                                            value={values?.balance}
                                            placeholder={values?.balance} className='border-y border-l dark:bg-[#040404] dark:text-white px-2 focus:outline-none rounded-l font-thin pt-[6px] pb-[5px] w-[65%]' />

                                        <div className='relative z-50 border'>
                                            <RightArrow className='absolute rotate-90 top-2 right-2' />
                                            <input ref={dtype} value={values?.balance_type} onClick={() => { setDisType(!disType); }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "ArrowDown") {
                                                        if (selectedId === disOnSale?.length - 1) {
                                                            setSelectedId(0)
                                                        } else {
                                                            setSelectedId(selectedId + 1)
                                                        }
                                                    } else if (e.key === "ArrowUp") {
                                                        if (selectedId === 0) {
                                                            setSelectedId(disOnSale?.length - 1)
                                                        } else {
                                                            setSelectedId(selectedId - 1)
                                                        }
                                                    } else if (e.key === "Enter" && disOnSale[selectedId]) {
                                                        setDisType(false);
                                                        setSelectedId(0);
                                                        setValues({ ...values, balance_type: disOnSale[selectedId].name })
                                                        dis.current?.focus();
                                                    }
                                                }} className='px-2 pt-[5px] pb-[6px] rounded-r focus:outline-none w-full text-[#212529] dark:bg-[#040404] dark:text-white font-thin' />
                                            {
                                                disType && <div className={`px-0 max-h-[250px] absolute left-0 top-[37px] dark:bg-[#040404] dark:text-white right-0 z-50 border-x border-b rounded-b overflow-hidden overflow-y-scroll hide-scrollbar bg-white`}>
                                                    {
                                                        disOnSale?.map((opt, i) => {
                                                            return <div onMouseEnter={() => { setSelectedId(i) }}
                                                                ref={el => selectedId === i && el?.scrollIntoView({ block: 'nearest' })}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "ArrowDown") {
                                                                        setSelectedId(i + 2)
                                                                    }
                                                                }}

                                                                onClick={() => {
                                                                    setDisType(false);
                                                                    setValues({ ...values, balance_type: disOnSale[selectedId].name })
                                                                    setSelectedId(0);
                                                                    dis.current?.focus();
                                                                }}
                                                                className={`font-thin text-sm cursor-pointer px-2 py-1 text-[#212529] dark:text-white ${i === selectedId ? 'bg-gray-100 dark:bg-[#040404] dark:text-white' : ''}`}>
                                                                {opt?.name}
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>


                <div className='p-3 '>
                    <Button onClick={() => { handleSubmit(); handleSubmitOffline() }} name={'Submit'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default CreateCustomer