import React, { useEffect, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import Notification from "../Input/Notification";
import { useNavigate, useParams } from "react-router-dom";
import { BanglaToEnglish, formatDate } from "../Input/Time";
import SelectionComponent from "../Input/SelectionComponent";
import { NavLink } from "react-router-dom";
import Calendar from "../Wholesale/Calender";

const SupplierPayment = ({ info, state }) => {
    const goto = useNavigate()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
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

    const [values, setValues] = useState({
        balance: 0,
        paid: 0,
        email: '',
        phone: '',
        accountnumber: '',
        balance_type: 'You Receive',
        payment_type: 'You Receive',
        note: '',
        paymentmethod: 'Select a filter'
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        values.shop = info?.shopname;
        let type = 1;
        if (values?.balance_type === "You Receive") {
            type = 1;
            values['type'] = 'Make Payment'
        } else if (values?.balance_type === "You Pay") {
            type = 2;
            values['type'] = 'Make Payment'
        } else if (values?.balance_type === "Yearly Bonus") {
            type = 2;
            values['type'] = 'Yearly Bonus';
            values['payment_type'] = "Yearly Bonus"
        }
        values['status'] = 'Online'
        values['date'] = date
        let pay = paymentType?.map(item => item?.name);
        if (pay?.includes(values?.paymentmethod)) {
            values['type'] = 'Online Collection'
        }

        if (values?.paymentmethod === "Cash") {
            values['type'] = 'Make Payment'
        }

        const response = await fetch(`${BaseUrl}/api/update/supplier/balance/${params?.id}/${type}`, {
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
        goto(`/suppliers`)
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
        let newValues = { ...data?.items };
        newValues.payment_type = "You Pay";
        newValues.balance_type = "You Pay";
        setValues(newValues)
        setMessage({ id: Date.now(), mgs: data?.message });
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
            <div className="bg-[#FFFFFF]  dark:bg-[#040404] dark:text-white rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">

                <div className="flex justify-between items-center  py-2 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white border-b pr-2">
                    <h1 className="font-semibold text-lg">Supplier Payment</h1>
                    <NavLink to={`/payment/history/${values?.id}`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Supplier Transaction</NavLink>
                </div>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputComponent label={"Supplier"} placeholder={values?.name} value={values?.name} onChange={(v) => { setValues({ ...values, name: v }) }} />
                    <div>
                        <Calendar label={"Date"} value={date} getDate={(date) => { setDate(formatDate(date)); setValues({ ...values, date: date }) }} getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
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
                    <div>
                        <p className='pt-1.5 pb-1.5 font-semibold'>Balance</p>
                        <input className={`border w-full rounded focus:outline-none p-1.5 ${values?.balance === 0 ? `text-gray-900` : `${values?.balance > 0 ? `text-red-600` : `text-[#15CA20]`}`} `}
                            label={"Balance"} placeholder={Math.abs(values?.balance)} value={Math.abs(values?.balance)} readOnly={true} />
                    </div>
                    <div>
                        <p className='pt-1.5 pb-1.5 font-semibold'>Payment</p>
                        <div className='flex justify-start items-end pb-1 dark:bg-[#040404] dark:text-white'>

                            <select value={values?.balance_type} onChange={(v) => { setValues({ ...values, balance_type: v.target.value, payment_type: v.target.value }) }}
                                className={`border text-[#6B7280] w-[30%] text-sm focus:outline-none font-thin rounded-l block p-2 dark:bg-[#040404] dark:text-white`}>
                                {[{ id: 1, name: "You Receive" }, { id: 2, name: "You Pay" },{ id: 3, name: "Yearly Bonus" }].map(({ id, name }) => (
                                    <option key={id} value={name} className='text-[#6B7280] dark:text-white'> {name}</option>
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
                                }} placeholder={values?.paid} className='border-y dark:bg-[#040404] dark:text-white border-r px-2 focus:outline-none rounded-r  pt-[6px] pb-[5px] w-[50%] font-thin' />
                        </div>
                    </div>
                    <div>
                        <h1 className="py-1">Note</h1>
                        <textarea placeholder="Enter your note" onChange={(e) => { setValues({ ...values, note: e.target.value }) }} className="font-thin dark:bg-[#040404] dark:text-white focus:outline-none border p-1.5 w-full rounded" />
                    </div>
                </div>


                <div className='p-3 flex justify-start items-center gap-3'>
                    <Button onClick={handleSubmit} isDisable={isLoading} name={'Submit'} />
                    <Button name={'Cancel'} onClick={() => { goto(`/suppliers`) }} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default SupplierPayment