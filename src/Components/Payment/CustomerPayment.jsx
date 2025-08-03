import React, { useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import Notification from "../Input/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { getFormattedDate } from "../Input/Time";
import SelectionComponent from "../Input/SelectionComponent";
import { NavLink } from "react-router-dom";

const CustomerPayment = ({ info, state }) => {

    const params = useParams()
    const goto = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [paymentType, setPaymentType] = useState([])
    const [paymentMethod, setPaymentMethod] = useState([])
    const [mobile, setMobile] = useState([])
    const [values, setValues] = useState({
        balance: 0,
        paid: 0,
        email: '',
        phone: '',
        accountnumber: '',
        balance_type: 'You Receive',
        note: '',
        paymentmethod: 'Select a filter',
        type: ''
    })


    const handleSubmit = async () => {

        setIsLoading(true)
        values.shop = info?.shopname;
        const token = localStorage.getItem('token')
        let type = 2;
        if (values?.balance_type === "You Receive") {
            type = 2;
        } else if (values?.balance_type === "You Pay") {
            type = 1;
        } else if (values?.balance_type === "Yearly Bonus") {
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
        setMessage({ id: Date.now(), mgs: data?.message });
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

    const PaymentType = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/all/attribute/by/Payment Type`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setPaymentType(data.items);
    }
    const PaymentMethod = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/all/attribute/by/Bank`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setPaymentMethod(data.items);
    }
    const MobileBanking = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/all/attribute/by/Mobile Banking`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setMobile(data.items);
    }


    useEffect(() => {
        GetUser()
        PaymentType()
        PaymentMethod()
        MobileBanking()
    }, [params?.id])


    return (
        <div className="px-3 py-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="bg-[#FFFFFF] rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">

                <div className="flex justify-between items-center  py-2 bg-[#FFFFFF] border-b pr-2">
                    <h1 className="font-semibold text-lg">Customer Payment</h1>
                    <NavLink to={`/payment/history/${values?.id}`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Customer Transaction</NavLink>
                </div>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputComponent className={`text-black`} label={"Customer"}
                        placeholder={values?.name} onChange={(v) => { setValues({ ...values, name: v }); }} readOnly={true} value={values?.name} />


                    <InputComponent className={`text-black`} label={"Date"} readOnly={true} placeholder={getFormattedDate()} value={getFormattedDate()} onChange={(v) => { setValues({ ...values, email: v }) }} />

                    <div className="pt-2 flex justify-start items-center gap-4">
                        <SelectionComponent label={"Payment Type"}
                            options={paymentType} default_value={values?.paymentmethod}
                            onSelect={(v) => { setValues({ ...values, paymentmethod: v?.name, type: v?.name }) }}
                        />
                        {
                            values?.paymentmethod === "Bank Transfar" && <SelectionComponent label={"Select Method"}
                                options={paymentMethod} default_value={values?.methodname} value={values?.methodname} placeholder={values?.methodname}
                                onSelect={(v) => { setValues({ ...values, methodname: v?.name }) }}
                            />
                        }
                        {
                            values?.paymentmethod === "Mobile Banking" && <SelectionComponent label={"Select Method"}
                                options={mobile} default_value={values?.methodname} value={values?.methodname} placeholder={values?.methodname}
                                onSelect={(v) => { setValues({ ...values, methodname: v?.name }) }}
                            />
                        }
                    </div>
                    <InputComponent className={`text-black`} label={"Balance"} placeholder={values?.balance} value={values?.balance} readOnly={true} onChange={(v) => { setValues({ ...values, balance: v }) }} />
                    <div>
                        <p className='pt-1.5 pb-1.5 font-semibold'>Payment</p>
                        <div className='flex justify-start items-end pb-1'>

                            <select value={values?.balance_type} onChange={(e) => { setValues({ ...values, balance_type: e.target.value }) }}
                                className={`border text-[#6B7280] w-[30%] text-sm focus:outline-none font-thin rounded-l block p-2`}
                            >
                                {[{ id: 1, name: "You Receive" }, { id: 2, name: "You Pay" }, { id: 3, name: "Yearly Bonus" }].map(({ id, name }) => (
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
                        <h1 className="py-1">Note</h1>
                        <textarea placeholder="Enter your note" onChange={(e) => { setValues({ ...values, note: e.target.value }) }} className="font-thin focus:outline-none border p-1.5 w-full rounded" />
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