import { useState, useEffect, useRef } from "react"
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Notification from "../Input/Notification";
import { useNavigate } from "react-router-dom";


const AttributeTypeCreate = ({ entries }) => {

    const [values, setValues] = useState({ name: "", type: "Attribute Type" });
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const goto = useNavigate()


    useEffect(() => {
        document.title = `Attribute - Kazaland Brothers`;

    }, []);


    const handleCreate = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/attribute/type`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setValues({ ...values, name: '' })
            setMessage({ id: Date.now(), mgs: data?.message });
            goto('/attribute')
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }






    return (
        <div className="px-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                <div className="border-b">
                    <h1 className="pl-5 text-xl py-2">Attribute Type Details</h1>
                </div>
                <div className="px-6 py-4">

                    <div className='w-full pt-1'>
                        <h1 className='text-[15px] pb-1.5'>Name</h1>
                        <input
                            type="text"
                            value={values?.name}
                            placeholder="Enter name"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleCreate();
                                }
                            }}
                        />
                    </div>
                    <Button isDisable={isLoading} name="Create" onClick={() => { handleCreate(); }} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                </div>
            </div>
        </div>
    )
}

export default AttributeTypeCreate