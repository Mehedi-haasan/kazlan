import { useState, useEffect } from "react"
import InputComponent from "../Input/InputComponent"
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Notification from "../Input/Notification";
import SelectionComponent from "../Input/SelectionComponent";
import { useNavigate, useParams } from "react-router-dom";


const UpdateAttribute = () => {

    const [values, setValues] = useState({ name: "", });
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [first, setFirst] = useState({
        first: true,
        value: 'Select a filter'
    })
    const goto = useNavigate()
    const params = useParams()


    const GetSingleAttribute = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/get/single/attribute/${params?.id}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            setValues(data?.items);
            setFirst({ ...first, value: data?.items?.type, first: false })
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }


    useEffect(() => {
        GetSingleAttribute()
        document.title = `Attribute - Kazaland Brothers`;

    }, []);


    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/attribute`, {
                method: 'PATCH',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            goto('/attribute')
            setMessage({ id: Date.now(), mgs: data?.message });
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }


    return (
        <div className="px-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                <div className="border-b">
                    <h1 className="pl-5 text-xl py-2">Attribute Update Details</h1>
                </div>
                <div className="px-6 py-4">
                    <SelectionComponent options={[{ id: 0, name: 'Payment Type' }, { id: 1, name: 'Bank Transfar' }, { id: 2, name: "Mobile Banking" }, { id: 3, name: 'Edition' }, { id: 4, name: 'Quantity' }]} default_select={first?.first} default_value={first?.value}
                        onSelect={(v) => {
                            setValues({
                                ...values,
                                type: v?.name,
                            })
                            setFirst({ ...first, value: v?.name })
                        }} label={"Type*"} className='rounded-r' />
                    <div className='w-full'>
                        <h1 className='text-[15px] pb-1.5'>Name</h1>
                        <input
                            type="text"
                            value={values?.name}
                            placeholder="Enter item name"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleUpdate()
                                }
                            }}
                        />

                    </div>
                    {/* <InputComponent placeholder={values?.name} input_focus={true} value={values?.name} label={`Name`} handleEnter={handleUpdate} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' /> */}
                    <Button isDisable={isLoading} name="Create" onClick={handleUpdate} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                </div>
            </div>
        </div>
    )
}

export default UpdateAttribute