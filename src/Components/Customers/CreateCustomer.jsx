import React, { useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import BaseUrl from "../../Constant";
import Add from "../../icons/Add";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Selection from "../Input/Selection";

const CreateCustomer = () => {
    const [selectedOption, setSelectedOption] = useState("Party-Wholesaler");
    const [state, setState] = useState([])
    const [active, setActive] = useState("Address")
    const [values, setValues] = useState({
        "stateId": 1,
        "usertype": "Wholesaler"
    })
    const handleSubmit = async (e) => {
        console.log(values)
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
        toast(data.message)
    }

    function getFormattedDate() {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-EN', options);
    }

    const getState = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/state`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setState(data?.items);
        setValues({ ...values, stateId: data?.items[0]?.id })
    }

    useState(() => {
        getState()
    }, [])


    let qt = [{
        id: 1,
        name: "To Pay"
    },
    {
        id: 2,
        name: "To Receive"
    }]

    let cus = [{
        id: 1,
        name: "Wholesaler"
    },
    {
        id: 2,
        name: "Retailer"
    }]


    return (
        <div className="px-3 py-5 min-h-screen pb-12">
            <ToastContainer />
            <div className="p-3 shadow bg-white rounded mb-2">
                <h1 className="py-2 px-3">Customer Details</h1>
            </div>
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen pb-12 pt-4">
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="">
                        <Selection options={cus} onSelect={(v) => { setValues({ ...values, usertype: v?.name }) }} label={'Customer Type*'} />
                    </div>
                    <InputComponent label={"Full Name*"} placeholder={'Enter full name'} onChange={(v) => { setValues({ ...values, name: v }) }} />
                    <InputComponent label={"Phone*"} placeholder={'Enter full phone'} onChange={(v) => { setValues({ ...values, phone: v }) }} />
                    <InputComponent label={"Email"} placeholder={'Enter full email'} onChange={(v) => { setValues({ ...values, email: v }) }} />

                    <InputComponent label={"Bank Name"} placeholder={'Enter bank name'} onChange={(v) => { setValues({ ...values, bankname: v }) }} />
                    <InputComponent label={"Account Name"} placeholder={'Enter account name'} onChange={(v) => { setValues({ ...values, accountname: v }) }} />
                    <InputComponent label={"Account Number"} placeholder={'Enter account number'} onChange={(v) => { setValues({ ...values, accountnumber: v }) }} />
                    <div>
                        <div className="py-3">
                            <div className="flex justify-start items-end">
                                <button onClick={() => { setActive("Address") }} className={`${active === "Address" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Address</button>
                                <button onClick={() => { setActive("Balance") }} className={`${active === "Balance" ? "border-x border-t border-green-500 text-green-500" : "border-b"} px-4 py-1.5 rounded-t`}>Balance</button>
                                <div className="border-b w-full"></div>
                            </div>
                        </div>
                        {
                            active === "Address" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className='flex justify-start items-end pb-1'>
                                    <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={"Thana Name"} className='rounded-l' />
                                    <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE] '>
                                        <Add />
                                    </div>
                                </div>
                                <InputComponent label={"Address"} placeholder={'Enter address'} onChange={(v) => { setValues({ ...values, address: v }) }} />
                            </div>
                        }
                        {
                            active === "Balance" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* <InputComponent label={"Opening Balance"} placeholder={'Enter opening balance'} onChange={(v) => { setValues({ ...values, balance: v }) }} />
                                <InputComponent label={"Date"} placeholder={getFormattedDate()} /> */}
                                <div>
                                    <p className='pb-2 font-semibold text-sm'>Opening Balance</p>
                                    <div className='flex justify-start items-end pb-1'>
                                        <input type='number' onChange={(e) => { setValues({ ...values, balance: e.target.value }) }} placeholder='Enter opening balance' className='border-y border-l px-2 focus:outline-none rounded-l  pt-[6px] pb-[5px] w-[50%] font-thin' />
                                        <select value={values?.discount_type} onChange={(v) => { setValues({ ...values, balance_type: v.target.value }) }}
                                            className={`border text-[#6B7280] w-[50%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}
                                        >
                                            {qt.map(({ id, name }) => (

                                                <option key={id} value={name} className='text-[#6B7280]'> {name}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>


                <div className='p-3 '>
                    <Button onClick={handleSubmit} name={'Submit'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default CreateCustomer