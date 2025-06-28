import React, { useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { getFormattedDate } from "../Input/Time";
import SelectionComponent from "../Input/SelectionComponent";
import { NavLink } from "react-router-dom";

const CustomerPayment = ({ info, state }) => {

    const params = useParams()
    const goto = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        balance: 0,
        paid: 0,
        email: '',
        phone: '',
        accountnumber: '',
        balance_type: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        values.shop = info?.shopname;
        values.date = ""
        values.deliverydate = ""
        const token = localStorage.getItem('token')
        let type = 1;
        if (values?.balance_type === "To Receive") {
            type = 1;
        } else if (values?.balance_type === "To Pay") {
            type = 1;
        }
        const response = await fetch(`${BaseUrl}/api/update/customer/balance/${params?.id}/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        setIsLoading(false);
        toast(data.message);
        if (data?.customertype === "Supplier") {
            goto(`/suppliers`)
        } else {
            goto(`/customers`)
        }

    }

    const GetUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/customer/${params?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            }
        });
        const data = await response.json();
        setValues(data?.items)
    }

    useEffect(() => {
        GetUser()
    }, [params?.id])


    return (
        <div className="px-3 py-5 min-h-screen pb-12">
            <ToastContainer />
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">

                <div className="flex justify-between items-center  py-2 bg-[#FFFFFF] border-b pr-2">
                    <h1 className="font-semibold text-lg">Customer Payment</h1>
                    <NavLink to={`/payment/history/${values?.id}`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Customer Transaction</NavLink>
                </div>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputComponent label={"Customer"} placeholder={values?.name} onChange={(v) => { setValues({ ...values, name: v }) }} />
                    <InputComponent label={"Date"} placeholder={getFormattedDate()} value={getFormattedDate()} onChange={(v) => { setValues({ ...values, email: v }) }} />

                    <div className="pt-2">
                        <SelectionComponent label={"Payment Type"}
                            options={[{ id: 1, name: 'Cash' }, { id: 2, name: 'Check' }, { id: 3, name: 'Bank Transfar' }, { id: 4, name: 'Mobile Banking' }]}
                            onSelect={(v) => { setValues({ ...values, paymentmethod: v?.name }) }}
                        />
                    </div>
                    <InputComponent label={"Balance"} placeholder={values?.balance} value={values?.balance} readOnly={true} onChange={(v) => { setValues({ ...values, balance: v }) }} />
                    <div>
                        <p className='pt-1.5 pb-1.5 font-semibold'>Payment</p>
                        <div className='flex justify-start items-end pb-1'>

                            <select value={values?.balance_type} onChange={(e) => { setValues({ ...values, balance_type: e.target.value }) }}
                                className={`border text-[#6B7280] w-[30%] text-sm focus:outline-none font-thin rounded-l block p-2`}
                            >
                                {[{ id: 1, name: "To Pay" }, { id: 2, name: "To Receive" }].map(({ id, name }) => (
                                    <option key={id} value={name} className='text-[#6B7280]'>{name}</option>
                                ))}
                            </select>
                            <input type='number' value={values?.paid}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (values?.paid !== 0) {
                                            handleSubmit()
                                        }
                                    }
                                }}
                                onChange={(e) => { setValues({ ...values, paid: e.target.value }) }} placeholder={values?.paid} className='border-y border-r px-2 focus:outline-none rounded-r  pt-[6px] pb-[5px] w-[50%] font-thin' />
                        </div>
                    </div>

                    <div>
                        <h1 className="py-1">Description</h1>
                        <textarea placeholder="Enter your note" className="font-thin focus:outline-none border p-1.5 w-full rounded" />
                    </div>
                </div>


                <div className='p-3 flex justify-start items-center gap-3'>
                    <Button onClick={handleSubmit} isDisable={isLoading} name={'Submit'} />
                    <Button name={'Cancel'} onClick={() => { goto(`/customers`) }} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default CustomerPayment