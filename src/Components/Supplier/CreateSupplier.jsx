import React, { useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import BaseUrl from "../../Constant";
import Add from "../../icons/Add";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSupplier = ({ state }) => {

    const [active, setActive] = useState("Address");
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        "stateId": 1,
        "usertype": "Supplier"
    })
    const handleSubmit = async (e) => {
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
    }


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
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">
                <h1 className="py-2 px-3">Supplier Details</h1>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputComponent label={"Full Name"} placeholder={'Enter full name'} onChange={(v) => { setValues({ ...values, name: v }) }} />
                    <InputComponent label={"Email"} placeholder={'Enter full email'} onChange={(v) => { setValues({ ...values, email: v }) }} />
                    <InputComponent label={"Phone"} placeholder={'Enter full phone'} onChange={(v) => { setValues({ ...values, phone: v }) }} />
                    <InputComponent label={"Bank Name"} placeholder={'Enter bank name'} onChange={(v) => { setValues({ ...values, bankname: v }) }} />
                    <InputComponent label={"Account Name"} placeholder={'Enter account name'} onChange={(v) => { setValues({ ...values, accountname: v }) }} />
                    <InputComponent label={"Account Number"} placeholder={'Enter account number'} onChange={(v) => { setValues({ ...values, accountnumber: v }) }} />
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
                            <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={"State"} className='rounded-l' />
                            <div className='border-y border-r px-3 pt-[6px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                        <InputComponent label={"Address"} placeholder={'Enter address'} onChange={(v) => { setValues({ ...values, address: v }) }} />
                    </div>
                }
                {
                    active === "Balence" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
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

                <div className='p-3'>
                    <Button onClick={handleSubmit} name={'Submit'} />
                    <Button name={'Cancel'} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default CreateSupplier