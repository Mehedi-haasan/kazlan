import React, { useState, useRef, useEffect } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import BaseUrl from "../../Constant";
import Add from "../../icons/Add";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const CreateSupplier = ({ state }) => {
    const open_bala = useRef(null)
    const goto = useNavigate()
    const [active, setActive] = useState("Address");
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        "stateId": 1,
        "usertype": "Supplier",
        "balance": 0,
        "balance_type": 'To Receive',
        "address": "",
        "customertype": "Supplier"
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
    const handleSubmit = async (e) => {
        if (!values?.stateId || !values?.name || !values?.phone || !values?.address) {
            toast("Required Field are missing");
            return
        }
        setIsLoading(true)
        const token = localStorage.getItem('token')
        e.preventDefault()
        const response = await fetch(`${BaseUrl}/api/create/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        setIsLoading(false);
        toast(data.message)
        goto('/suppliers')
    }

    useEffect(() => {
        if (auto?.open_b) {
            open_bala.current.focus()
        }
    }, [auto])


    return (
        <div className="px-3 py-5 min-h-screen pb-12">
            <ToastContainer />
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">
                <h1 className="py-2 px-3">Supplier Details</h1>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputComponent label={"Full Name"} placeholder={'Enter full name'} input_focus={auto?.fame} handleEnter={() => { setAuto({ ...auto, fame: false, phone: true }) }} onChange={(v) => { setValues({ ...values, name: v }) }} />
                    <InputComponent label={"Phone"} placeholder={'Enter full phone'} input_focus={auto?.phone} handleEnter={() => { setAuto({ ...auto, phone: false, email: true }) }} onChange={(v) => { setValues({ ...values, phone: v }) }} />
                    <InputComponent label={"Email"} placeholder={'Enter full email'} input_focus={auto?.email} handleEnter={() => { setAuto({ ...auto, phone: false, bname: true }) }} onChange={(v) => { setValues({ ...values, email: v }) }} />
                    <InputComponent label={"Bank Name"} placeholder={'Enter bank name'} input_focus={auto?.bname} handleEnter={() => { setAuto({ ...auto, bname: false, aname: true }) }} onChange={(v) => { setValues({ ...values, bankname: v }) }} />
                    <InputComponent label={"Account Name"} placeholder={'Enter account name'} input_focus={auto?.aname} handleEnter={() => { setAuto({ ...auto, aname: false, anum: true }) }} onChange={(v) => { setValues({ ...values, accountname: v }) }} />
                    <InputComponent label={"Account Number"} placeholder={'Enter account number'} input_focus={auto?.anum} handleEnter={() => { setAuto({ ...auto, anum: false, tname: true }) }} onChange={(v) => { setValues({ ...values, accountnumber: v }) }} />
                </div>
                <div className="p-3">



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
                            <SelectionComponent options={state} default_select={auto?.tname} default_value={auto?.t_value}
                                onSelect={(v) => {
                                    setValues({ ...values, stateId: v?.id });
                                    setAuto({ ...auto, t_value: v?.name, tname: false, addres: true });
                                }} label={"Thana Name"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[7px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                        <InputComponent label={"Address"} placeholder={'Enter address'}
                            input_focus={auto?.addres}
                            handleEnter={() => {
                                setActive("Balence")
                                setAuto({ ...auto, addres: false, open_b: true });
                            }} value={values?.address} onChange={(v) => { setValues({ ...values, address: v }) }} />
                    </div>
                }
                {
                    active === "Balence" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <p className='pb-2 font-semibold text-sm'>Opening Balance</p>
                            <div className='flex justify-start items-end pb-1'>
                                <input type='number' value={values?.balance}
                                    ref={open_bala} onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit(e)
                                        }
                                    }} onChange={(e) => { setValues({ ...values, balance: e.target.value }) }} placeholder='Enter opening balance' className='border-y border-l px-2 focus:outline-none rounded-l  pt-[6px] pb-[5px] w-[50%] font-thin' />
                                <select value={values?.balance_type} onChange={(v) => { setValues({ ...values, balance_type: v.target.value }) }}
                                    className={`border w-[50%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                >
                                    {[{ id: 1, name: "To Pay" }, { id: 2, name: "To Receive" }].map(({ id, name }) => (
                                        <option key={id} value={name} className=''>{name}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    </div>
                }

                <div className='p-3'>
                    <Button onClick={handleSubmit} isDisable={isLoading} name={'Submit'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default CreateSupplier