import React, { useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import Notification from "../Input/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { BanglaToEnglish, handleDateConvert } from "../Input/Time";
import SelectionComponent from "../Input/SelectionComponent";
import { NavLink } from "react-router-dom";
import Calendar from "../Wholesale/Calender";

const CustomerPayment = ({ info, state }) => {

    const params = useParams()
    const goto = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [paymentType, setPaymentType] = useState([])
    const [paymentMethod, setPaymentMethod] = useState([])
    const [date, setDate] = useState(null)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 0);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const [raw, setRaw] = useState({
        fromDate: sevenDaysAgo.toLocaleDateString("en-US", options),
        toDate: today.toLocaleDateString("en-US", options),
        userId: null,
        type: null
    });
    function getFormattedDate(date) {
        if (!date) return ""; // handle null/undefined safely
        const d = new Date(date); // convert string -> Date
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    }
    const [values, setValues] = useState({
        balance: 0,
        paid: 0,
        email: '',
        phone: '',
        accountnumber: '',
        balance_type: 'You Receive',
        note: '',
        paymentmethod: 'Select a filter',
        type: 'Make Payment',
        methodname: "Online",
        status: "Online",
        date: ''
    })





    const handleSubmit = async () => {

        setIsLoading(true)
        values.shop = info?.shopname;
        const token = localStorage.getItem('token')
        let type = 2;
        if (values?.balance_type === "You Receive") {
            type = 2;
            values['type'] = 'Make Payment'
        } else if (values?.balance_type === "You Pay") {
            type = 1;
            values['type'] = 'Make Payment'
        } else if (values?.balance_type === "Yearly Bonus") {
            type = 1;
            values['type'] = 'Yearly Bonus'
        }
        values['status'] = 'Online'
        values['date'] = date

         let pay = paymentType.map(item => item.name);
        if (pay.includes(values?.paymentmethod)) {
            values['type'] = 'Online Collection'
        }

        if (values?.paymentmethod === "Cash") {
            values['type'] = 'Make Payment'
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
        const response = await fetch(`${BaseUrl}/api/get/all/attribute/by/3`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setPaymentType(data.items);
    }
    const PaymentMethod = async (id) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/attribute/value/by/${id}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setPaymentMethod(data.items);
    }

    useEffect(() => {
        GetUser()
        PaymentType()
    }, [params?.id])


    return (
        <div className="px-3 py-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">

                <div className="flex justify-between items-center  py-2 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white border-b pr-2">
                    <h1 className="font-semibold text-lg">Customer Payment</h1>
                    <NavLink to={`/payment/history/${values?.id}`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Customer Transaction</NavLink>
                </div>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputComponent className={`text-black`} label={"Customer"}
                        placeholder={values?.name} onChange={(v) => { setValues({ ...values, name: v }); }} readOnly={true} value={values?.name} />


                    <div>
                        <Calendar label={"Date"} value={date} getDate={(date) => { setDate(getFormattedDate(date)); setValues({ ...values, date: date }) }} getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                    </div>
                    <div className="pt-2 flex justify-start items-center gap-4">
                        <SelectionComponent label={"Payment Type"}
                            options={paymentType} default_value={values?.paymentmethod}
                            onSelect={(v) => { setValues({ ...values, paymentmethod: v?.name }); PaymentMethod(v?.id) }}
                        />
                        <SelectionComponent label={"Select Method"}
                            options={paymentMethod} default_value={values?.methodname} value={values?.methodname} placeholder={values?.methodname}
                            onSelect={(v) => { setValues({ ...values, methodname: v?.name }) }}
                        />
                    </div>
                    <InputComponent className={`text-black`} label={"Balance"} placeholder={values?.balance} value={values?.balance} readOnly={true} onChange={(v) => { setValues({ ...values, balance: v }) }} />
                    <div>
                        <p className='pt-1.5 pb-1.5 font-semibold'>Payment</p>
                        <div className='flex justify-start items-end pb-1 dark:bg-[#040404] dark:text-white'>

                            <select value={values?.balance_type} onChange={(e) => { setValues({ ...values, balance_type: e.target.value }) }}
                                className={`border text-[#6B7280] w-[30%] text-sm focus:outline-none font-thin rounded-l block p-2 dark:bg-[#040404] dark:text-white`}
                            >
                                {[{ id: 1, name: "You Receive" }, { id: 2, name: "You Pay" }, { id: 3, name: "Yearly Bonus" }].map(({ id, name }) => (
                                    <option key={id} value={name} className='text-[#6B7280] dark:text-white'>{name}</option>
                                ))}
                            </select>
                            <input type='text' value={values?.paid}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (values?.paid !== 0) {
                                            handleSubmit()
                                        }
                                    }
                                }}
                                onChange={(e) => {
                                    let num = BanglaToEnglish(e.target.value)
                                    setValues({ ...values, paid: num })
                                }} placeholder={values?.paid} className='border-y border-r px-2 dark:bg-[#040404] dark:text-white focus:outline-none rounded-r  pt-[6px] pb-[5px] w-[50%] font-thin' />
                        </div>
                    </div>

                    <div>
                        <h1 className="py-1">Note</h1>
                        <textarea placeholder="Enter your note" onChange={(e) => { setValues({ ...values, note: e.target.value }) }} className="font-thin dark:bg-[#040404] dark:text-white focus:outline-none border p-1.5 w-full rounded" />
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