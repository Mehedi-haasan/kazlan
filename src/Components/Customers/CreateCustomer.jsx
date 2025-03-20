import React, { useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import SelectionComponent from "../Input/SelectionComponent";
import BaseUrl from "../../Constant";
import Add from "../../icons/Add";

const CreateCustomer = () => {
    const [selectedOption, setSelectedOption] = useState("Wholesaler");
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
        alert(data.message)
    }

    function getFormattedDate() {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('bn-BD', options);
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


    return (
        <div className="px-3 py-5 min-h-screen">
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen">
                <h1 className="py-2 px-3">Customer Details</h1>
                <div className="border-t p-3 flex justify-start items-center gap-3">
                    <label className="flex gap-1 justify-start items-center">
                        <input type="radio" name="options" value="Wholesaler" checked={selectedOption === "Wholesaler"} onChange={(e) => { setSelectedOption(e.target.value); setValues({ ...values, usertype: e.target.value }) }} />
                        Wholesaler
                    </label>
                    <label className="flex gap-1 justify-start items-center">
                        <input type="radio" name="options" value="Retailer" checked={selectedOption === "Retailer"} onChange={(e) => { setSelectedOption(e.target.value); setValues({ ...values, usertype: e.target.value }) }} />
                        Retailer
                    </label>
                </div>
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
                            <div className='border-y border-r px-3 pt-[6px] pb-[5px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                        <InputComponent label={"Address"} placeholder={'Enter address'} onChange={(v) => { setValues({ ...values, address: v }) }} />
                    </div>
                }
                {
                    active === "Balence" && <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <InputComponent label={"Opening Balance"} placeholder={'Enter opening balance'} onChange={(v) => { setValues({ ...values, balance: v }) }} />
                        <InputComponent label={"Date"} placeholder={getFormattedDate()} />
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

export default CreateCustomer