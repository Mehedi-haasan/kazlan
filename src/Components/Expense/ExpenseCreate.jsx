import React, { useEffect, useRef, useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import Notification from "../Input/Notification";
import { useNavigate } from "react-router-dom";
import { BanglaToEnglish, getFormattedDate } from "../Input/Time";
import SelectionComponent from "../Input/SelectionComponent";

const ExpenseCreate = ({ info }) => {

    const goto = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [expenseType, setExpensetype] = useState([])
    const [defa, setDefa] = useState(true)
    const amt = useRef()
    const [values, setValues] = useState({
        expensename: "",
        shopname: "",
        balance: 0,
        paid: 0,
        type: 'Expense',
        note: ''
    })


    const handleSubmit = async (shopname) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        const payload = { ...values, shopname: shopname };
        const response = await fetch(`${BaseUrl}/api/post/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        setIsLoading(false);
        setMessage({ id: Date.now(), mgs: data?.message });
        goto(`/dashboard`)
    }



    const Expensetype = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/all/attribute/by/Expense`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setExpensetype(data.items);
    }

    useEffect(() => {
        document.title = `Add Expense - Kazaland Brothers`;
        Expensetype()
    }, [])


    return (
        <div className="px-3 py-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow-lg min-h-screen pb-12 pl-2 pt-2">

                <div className="flex justify-between items-center  py-2 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white border-b pr-2">
                    <h1 className="font-semibold text-lg">Expense Payment</h1>

                </div>
                <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">

                    <div className="pt-2 flex justify-start items-center gap-4">
                        <SelectionComponent label={"Expense Type"}
                            default_select={defa}
                            options={expenseType} default_value={values?.expensename}
                            value={values?.expensename}
                            onSelect={(v) => { setValues({ ...values, expensename: v?.name, type: v?.name }); setDefa(false); amt.current.focus() }}
                        />
                    </div>

                    <InputComponent className={`text-black`} label={"Date"} readOnly={true} placeholder={getFormattedDate()} value={getFormattedDate()} onChange={(v) => { setValues({ ...values, email: v }) }} />
                    <div>
                        <p className='pt-[2px] pb-1.5 font-semibold'>Amount</p>
                        <div className='flex justify-start items-end pb-1 dark:bg-[#040404] dark:text-white'>
                            <input type='text' ref={amt} value={values?.paid}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (values?.paid !== 0) {
                                            handleSubmit(info?.shopname)
                                        }
                                    }
                                }}
                                onChange={(e) => {
                                    let num = BanglaToEnglish(e.target.value)
                                    setValues({ ...values, paid: num })
                                }} placeholder={values?.paid} className='border px-2 dark:bg-[#040404] dark:text-white focus:outline-none rounded w-full p-1.5 font-thin' />
                        </div>
                    </div>

                    <div>
                        <h1 className="py-1">Note</h1>
                        <textarea placeholder="Enter your note" onChange={(e) => { setValues({ ...values, note: e.target.value }) }} className="font-thin dark:bg-[#040404] dark:text-white focus:outline-none border p-1.5 w-full rounded" />
                    </div>
                </div>


                <div className='p-3 flex justify-start items-center gap-3'>
                    <Button onClick={() => { handleSubmit(info?.shopname) }} isDisable={isLoading} name={'Submit'} />
                    <Button name={'Cancel'} onClick={() => { goto(`/customers`) }} className={'bg-blue-50 hover:bg-red-500 text-black hover:text-white'} />
                </div>
            </div>
        </div>
    )
}

export default ExpenseCreate